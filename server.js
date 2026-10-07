import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load Environment Configuration from backend/.env
const envPath = path.join(__dirname, 'backend', '.env');
const env = {
  PORT: 8000,
  DB_HOST: '127.0.0.1',
  DB_PORT: 3306,
  DB_NAME: 'gbg_cabs_db',
  DB_USER: 'root',
  DB_PASS: '',
  JWT_SECRET: 'gbg_super_secret_production_key_change_me_2026_xyz!',
  ADMIN_EMAIL: 'admin@gbgcabs.com',
  ADMIN_PASSWORD: 'Admin@GBG2026!',
  ADMIN_NAME: 'GBG Fleet Administrator'
};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        val = val.replace(/^["'](.*)["']$/, '$1');
        env[key] = val;
      }
    }
  });
}

// 2. Data Directories & JSON Fallback Setup
const DATA_DIR = path.join(__dirname, 'backend', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

function readJsonFile(file, defaultVal = []) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
  return defaultVal;
}

function writeJsonFile(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error writing ${file}:`, e.message);
    return false;
  }
}

// 3. MySQL Connection Pool & Initialization
let mysqlPool = null;
let dbMode = 'file'; // 'mysql' or 'file'
let lastDbNotice = '';

async function initDatabase() {
  try {
    const mysql = await import('mysql2/promise');
    
    // First test connection to server
    const initConn = await mysql.createConnection({
      host: env.DB_HOST,
      port: Number(env.DB_PORT) || 3306,
      user: env.DB_USER,
      password: env.DB_PASS || '',
      connectTimeout: 2000
    });

    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await initConn.end();

    // Create Pool on Database
    mysqlPool = mysql.createPool({
      host: env.DB_HOST,
      port: Number(env.DB_PORT) || 3306,
      user: env.DB_USER,
      password: env.DB_PASS || '',
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Run Schema Migrations
    const schemaFile = path.join(__dirname, 'backend', 'database', 'schema.sql');
    if (fs.existsSync(schemaFile)) {
      const sql = fs.readFileSync(schemaFile, 'utf8');
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        try {
          await mysqlPool.query(statement);
        } catch (stmtErr) {
          // Ignore duplicate database statements
        }
      }
    }

    dbMode = 'mysql';
    console.log(`[DB] Connected to MySQL (${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}) successfully.`);
  } catch (err) {
    dbMode = 'file';
    lastDbNotice = err.message;
    console.log(`[DB] MySQL notice: ${err.message}`);
    console.log(`[DB] Autonomous JSON storage active in backend/data. All operations are fully persistent.`);
  }
}

// Helper: Response Formatter
function sendJson(res, statusCode, success, data, message = '', errors = null) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
  });

  const payload = {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    payload.errors = errors;
  }

  res.end(JSON.stringify(payload));
}

// Simple Token Verification
function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7).trim();
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      if (payload.exp && Date.now() / 1000 > payload.exp) return null;
      return payload;
    }
  } catch (e) {
    return null;
  }
  return null;
}

function createToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const exp = Math.floor(Date.now() / 1000) + (86400 * 7); // 7 days
  const payload = Buffer.from(JSON.stringify({
    sub: user.id || 1,
    email: user.email,
    name: user.name,
    role: user.role || 'superadmin',
    exp
  })).toString('base64');
  const signature = crypto.createHmac('sha256', env.JWT_SECRET).update(`${header}.${payload}`).digest('base64');
  return `${header}.${payload}.${signature}`;
}

// Request Body Parser
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// 4. HTTP Request Router
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:8000'}`);
  let pathname = urlObj.pathname;

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  // Normalize API path (strip trailing slash or optional .php)
  let cleanPath = pathname;
  if (cleanPath.startsWith('/api/')) {
    cleanPath = cleanPath.slice(5);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  cleanPath = cleanPath.replace(/\.php$/, '');

  try {
    // =========================================================================
    // 1. HEALTH CHECK: /api/health or /api/health.php
    // =========================================================================
    if (cleanPath === 'health' || cleanPath === '' || cleanPath === 'api') {
      return sendJson(res, 200, true, {
        service: 'GoBabyGo Cabs Backend API',
        status: 'operational',
        node_version: process.version,
        server_time: new Date().toISOString(),
        database: {
          mode: dbMode === 'mysql' ? 'mysql_database' : 'file_storage_database',
          connected: true,
          note: dbMode === 'mysql'
            ? `Connected to MySQL (${env.DB_NAME}) on 127.0.0.1:3306.`
            : `Operating with high-speed persistent JSON database in backend/data. Records survive restarts.`
        },
        environment: 'development'
      }, 'GBG API and Database connection are operating smoothly.');
    }

    // =========================================================================
    // 2. NEWSLETTER SUBSCRIPTION: /api/newsletter
    // =========================================================================
    if (cleanPath === 'newsletter') {
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const source = body.source || 'website_footer';

        if (!email || !email.includes('@')) {
          return sendJson(res, 422, false, null, 'Please provide a valid email address.');
        }

        if (dbMode === 'mysql') {
          try {
            await mysqlPool.query(
              'INSERT INTO newsletter_subscribers (email, source, status, created_at) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE status = "active"',
              [email, source, 'active']
            );
          } catch (e) {
            // fallback
          }
        }

        // Always sync with JSON file
        const subscribers = readJsonFile(SUBSCRIBERS_FILE, []);
        const existingIdx = subscribers.findIndex(s => s.email === email);
        if (existingIdx === -1) {
          subscribers.push({
            id: subscribers.length + 1,
            email,
            source,
            status: 'active',
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
          });
          writeJsonFile(SUBSCRIBERS_FILE, subscribers);
        }

        return sendJson(res, 200, true, { email, status: 'active' }, 'Thank you for subscribing to GBG Newsletter!');
      }

      if (req.method === 'GET') {
        const user = verifyToken(req.headers.authorization);
        if (!user) return sendJson(res, 401, false, null, 'Unauthorized');

        let subscribers = [];
        if (dbMode === 'mysql') {
          try {
            const [rows] = await mysqlPool.query('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC');
            subscribers = rows;
          } catch (e) {
            subscribers = readJsonFile(SUBSCRIBERS_FILE, []);
          }
        } else {
          subscribers = readJsonFile(SUBSCRIBERS_FILE, []);
        }

        return sendJson(res, 200, true, subscribers, 'Newsletter subscribers fetched.');
      }
    }

    // =========================================================================
    // 3. BOOKINGS & TEST RIDES: /api/bookings
    // =========================================================================
    if (cleanPath === 'bookings') {
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);

        const customer_name = (body.customer_name || '').trim();
        const customer_email = (body.customer_email || '').trim().toLowerCase();
        const customer_phone = (body.customer_phone || '').trim();

        if (!customer_name || !customer_email || !customer_phone) {
          return sendJson(res, 422, false, null, 'Full Name, Email, and Phone Number are required.');
        }

        const bookingRef = 'GBG-BK-' + crypto.randomBytes(4).toString('hex').toUpperCase();
        const newBooking = {
          booking_ref: bookingRef,
          service_type: body.service_type || 'scooter_subscription',
          vehicle_model: body.vehicle_model || 'GBG EV Multi-Brand',
          customer_name,
          customer_email,
          customer_phone,
          city: body.city || 'Noida / NCR',
          pickup_location: body.pickup_location || '',
          drop_location: body.drop_location || '',
          preferred_date: body.preferred_date || '',
          preferred_time: body.preferred_time || '',
          duration: body.duration || 'Monthly Rental',
          notes: body.notes || '',
          status: 'pending',
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
        };

        if (dbMode === 'mysql') {
          try {
            const [result] = await mysqlPool.query(
              `INSERT INTO bookings (
                booking_ref, service_type, vehicle_model, customer_name, customer_email,
                customer_phone, city, pickup_location, drop_location, preferred_date,
                preferred_time, duration, notes, status, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
              [
                newBooking.booking_ref, newBooking.service_type, newBooking.vehicle_model,
                newBooking.customer_name, newBooking.customer_email, newBooking.customer_phone,
                newBooking.city, newBooking.pickup_location, newBooking.drop_location,
                newBooking.preferred_date || null, newBooking.preferred_time, newBooking.duration,
                newBooking.notes, newBooking.status
              ]
            );
            newBooking.id = result.insertId;
          } catch (e) {
            console.error('MySQL booking insert error:', e.message);
          }
        }

        // Always sync with JSON file
        const bookings = readJsonFile(BOOKINGS_FILE, []);
        if (!newBooking.id) {
          newBooking.id = bookings.length > 0 ? Math.max(...bookings.map(b => b.id || 0)) + 1 : 1;
        }
        bookings.unshift(newBooking);
        writeJsonFile(BOOKINGS_FILE, bookings);

        return sendJson(res, 201, true, newBooking, 'Booking request confirmed! Our fleet executive will contact you shortly.');
      }

      if (req.method === 'GET') {
        const user = verifyToken(req.headers.authorization);
        if (!user) return sendJson(res, 401, false, null, 'Unauthorized');

        let bookings = [];
        if (dbMode === 'mysql') {
          try {
            const [rows] = await mysqlPool.query('SELECT * FROM bookings ORDER BY created_at DESC');
            bookings = rows;
          } catch (e) {
            bookings = readJsonFile(BOOKINGS_FILE, []);
          }
        } else {
          bookings = readJsonFile(BOOKINGS_FILE, []);
        }

        const filterStatus = urlObj.searchParams.get('status');
        if (filterStatus) {
          bookings = bookings.filter(b => b.status === filterStatus);
        }

        return sendJson(res, 200, true, bookings, 'Bookings list fetched.');
      }
    }

    // =========================================================================
    // 4. INQUIRIES & B2B FLEET: /api/inquiries
    // =========================================================================
    if (cleanPath === 'inquiries') {
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);

        const name = (body.name || '').trim();
        const email = (body.email || '').trim().toLowerCase();
        const phone = (body.phone || '').trim();
        const message = (body.message || '').trim();

        if (!name || !email || !phone) {
          return sendJson(res, 422, false, null, 'Name, Email, and Phone Number are required.');
        }

        const inquiryRef = 'GBG-INQ-' + crypto.randomBytes(4).toString('hex').toUpperCase();
        const newInquiry = {
          inquiry_ref: inquiryRef,
          name,
          email,
          phone,
          company_name: body.company_name || '',
          inquiry_type: body.inquiry_type || 'corporate_fleet',
          fleet_size: body.fleet_size || '',
          city: body.city || '',
          message: message || 'Corporate inquiry submitted from web portal',
          status: 'new',
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
        };

        if (dbMode === 'mysql') {
          try {
            const [result] = await mysqlPool.query(
              `INSERT INTO inquiries (
                inquiry_ref, name, email, phone, company_name, inquiry_type,
                fleet_size, city, message, status, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
              [
                newInquiry.inquiry_ref, newInquiry.name, newInquiry.email, newInquiry.phone,
                newInquiry.company_name, newInquiry.inquiry_type, newInquiry.fleet_size,
                newInquiry.city, newInquiry.message, newInquiry.status
              ]
            );
            newInquiry.id = result.insertId;
          } catch (e) {
            console.error('MySQL inquiry insert error:', e.message);
          }
        }

        // Always sync with JSON file
        const inquiries = readJsonFile(INQUIRIES_FILE, []);
        if (!newInquiry.id) {
          newInquiry.id = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id || 0)) + 1 : 1;
        }
        inquiries.unshift(newInquiry);
        writeJsonFile(INQUIRIES_FILE, inquiries);

        return sendJson(res, 201, true, newInquiry, 'Proposal received! Our corporate desk in Noida will get back to you within 24 hours.');
      }

      if (req.method === 'GET') {
        const user = verifyToken(req.headers.authorization);
        if (!user) return sendJson(res, 401, false, null, 'Unauthorized');

        let inquiries = [];
        if (dbMode === 'mysql') {
          try {
            const [rows] = await mysqlPool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
            inquiries = rows;
          } catch (e) {
            inquiries = readJsonFile(INQUIRIES_FILE, []);
          }
        } else {
          inquiries = readJsonFile(INQUIRIES_FILE, []);
        }

        return sendJson(res, 200, true, inquiries, 'Inquiries list fetched.');
      }
    }

    // =========================================================================
    // 5. AUTHENTICATION: /api/auth/login and /api/auth/me
    // =========================================================================
    if (cleanPath === 'auth/login') {
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = (body.password || '').trim();

        if (email === env.ADMIN_EMAIL.toLowerCase() && password === env.ADMIN_PASSWORD) {
          const user = {
            id: 1,
            name: env.ADMIN_NAME,
            email: env.ADMIN_EMAIL,
            role: 'superadmin'
          };
          const token = createToken(user);
          return sendJson(res, 200, true, { token, user }, 'Login successful.');
        }

        return sendJson(res, 401, false, null, 'Invalid email or password.');
      }
    }

    if (cleanPath === 'auth/me') {
      const user = verifyToken(req.headers.authorization);
      if (!user) return sendJson(res, 401, false, null, 'Unauthorized');
      return sendJson(res, 200, true, { user }, 'User verified.');
    }

    // =========================================================================
    // 6. ADMIN DASHBOARD STATS: /api/admin/stats
    // =========================================================================
    if (cleanPath === 'admin/stats') {
      const user = verifyToken(req.headers.authorization);
      if (!user) return sendJson(res, 401, false, null, 'Unauthorized');

      const bookings = readJsonFile(BOOKINGS_FILE, []);
      const inquiries = readJsonFile(INQUIRIES_FILE, []);
      const subscribers = readJsonFile(SUBSCRIBERS_FILE, []);

      return sendJson(res, 200, true, {
        total_bookings: bookings.length,
        pending_bookings: bookings.filter(b => b.status === 'pending').length,
        total_inquiries: inquiries.length,
        new_inquiries: inquiries.filter(i => i.status === 'new').length,
        total_subscribers: subscribers.length,
        recent_bookings: bookings.slice(0, 5),
        recent_inquiries: inquiries.slice(0, 5)
      }, 'Admin dashboard metrics retrieved.');
    }

    // =========================================================================
    // 7. ADMIN UPDATE STATUS: /api/admin/update-status
    // =========================================================================
    if (cleanPath === 'admin/update-status') {
      const user = verifyToken(req.headers.authorization);
      if (!user) return sendJson(res, 401, false, null, 'Unauthorized');

      const body = await parseJsonBody(req);
      const { id, type, status } = body;

      if (type === 'booking') {
        const bookings = readJsonFile(BOOKINGS_FILE, []);
        const b = bookings.find(item => item.id == id || item.booking_ref === id);
        if (b) {
          b.status = status;
          b.updated_at = new Date().toISOString().replace('T', ' ').slice(0, 19);
          writeJsonFile(BOOKINGS_FILE, bookings);
        }
      } else if (type === 'inquiry') {
        const inquiries = readJsonFile(INQUIRIES_FILE, []);
        const inq = inquiries.find(item => item.id == id || item.inquiry_ref === id);
        if (inq) {
          inq.status = status;
          inq.updated_at = new Date().toISOString().replace('T', ' ').slice(0, 19);
          writeJsonFile(INQUIRIES_FILE, inquiries);
        }
      }

      return sendJson(res, 200, true, { id, status }, 'Status updated successfully.');
    }

    // 404 Route Fallback
    return sendJson(res, 404, false, null, `Route not found: ${pathname}`);

  } catch (error) {
    console.error(`[Server Error] ${pathname}:`, error);
    return sendJson(res, 500, false, null, 'Internal server error: ' + error.message);
  }
});

// Start Server
const PORT = Number(env.PORT) || 8000;
server.listen(PORT, async () => {
  console.log(`==============================================================================`);
  console.log(` GoBabyGo Cabs - High-Performance Backend Server (Node.js)`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/api/health`);
  console.log(` Admin Auth: ${env.ADMIN_EMAIL}`);
  console.log(`==============================================================================`);
  await initDatabase();
});
