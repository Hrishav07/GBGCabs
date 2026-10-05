# GoBabyGo Cabs (GBG EV & GBG X) — Complete Backend & Server Deployment Guide

This repository contains a full-stack electric mobility platform featuring:
- **Frontend**: Ultra-responsive React 18 SPA with Tailwind CSS, animated SVG hero, interactive fleet showcases, and lead generation modals.
- **Backend**: Clean, production-ready PHP 8.x REST API with input validation, PDO MySQL support, HMAC-SHA256 Bearer Token authentication, CSV data exports, and persistent file-based fallback storage.
- **Database**: Production MySQL 8.x schema with indexed tables for Bookings, B2B Partner Inquiries, Newsletter Subscribers, and Admin Users.

---

## Table of Contents
1. [Local Development (Zero-Config Setup)](#1-local-development-zero-config-setup)
2. [Database Setup & Migrations](#2-database-setup--migrations)
3. [REST API Endpoints Reference](#3-rest-api-endpoints-reference)
4. [Deployment Option A: cPanel / Shared Hosting (Hostinger, Bluehost, etc.)](#4-deployment-option-a-cpanel--shared-hosting)
5. [Deployment Option B: Cloud Linux VPS (Ubuntu + Nginx + PHP-FPM + Let's Encrypt)](#5-deployment-option-b-cloud-linux-vps)
6. [Deployment Option C: Docker Multi-Container Launch](#6-deployment-option-c-docker-multi-container-launch)
7. [Admin Portal & Security Best Practices](#7-admin-portal--security-best-practices)

---

## 1. Local Development (Zero-Config Setup)

You can run both the frontend and backend simultaneously on your machine.

### Step 1: Start the PHP Backend Server
In a terminal, run:
```bash
php -S localhost:8000 backend/router.php
```
*The API is now live at `http://localhost:8000/api/`.*  
*(Note: If MySQL is not running or not configured yet, the backend automatically uses persistent JSON file storage in `backend/data/` so you never get broken pages or 500 errors!)*

### Step 2: Start the Vite Frontend Server
In another terminal, run:
```bash
npm run dev
```
*The frontend is live at `http://localhost:5173/`.*  
Vite automatically proxies all `/api/*` calls to `http://localhost:8000/api/*`.

---

## 2. Database Setup & Migrations

When you have a MySQL server running (locally or on your production server):

1. Open `backend/.env` and update your database credentials:
   ```env
   DB_DRIVER=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=gbg_cabs_db
   DB_USER=root
   DB_PASS=YourSecretPassword
   ```

2. Run the automated migration script:
   ```bash
   php backend/database/migrate.php
   ```
   This will:
   - Create the database `gbg_cabs_db` if it doesn't already exist.
   - Execute all table schemas (`bookings`, `inquiries`, `newsletter_subscribers`, `admin_users`).
   - Create or update the initial Superadmin user (`admin@gbgcabs.com` / `Admin@GBG2026!`).

---

## 3. REST API Endpoints Reference

### Public Client Endpoints
| Method | Endpoint | Description | Sample Payload |
|---|---|---|---|
| `GET` | `/api/health.php` | System status, database health, environment check | — |
| `POST` | `/api/bookings.php` | Create booking, scooter rental, or test ride | `{"customer_name": "Rajesh Kumar", "customer_email": "rajesh@example.com", "customer_phone": "9876543210", "service_type": "test_ride", "vehicle_model": "Motovolt Urbano", "city": "Noida"}` |
| `POST` | `/api/inquiries.php` | Submit B2B fleet or investor partner inquiry | `{"name": "Anil Gupta", "email": "anil@quickfleet.in", "phone": "9811223344", "company_name": "QuickFleet", "inquiry_type": "corporate_fleet", "fleet_size": "25 EVs", "message": "Fleet requirement details..."}` |
| `POST` | `/api/newsletter.php` | Subscribe to EV mobility updates & news | `{"email": "rider@gmail.com", "source": "website_footer"}` |

### Admin & Staff Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login.php` | None | Authenticate admin (`email`, `password`) -> returns JWT token |
| `GET` | `/api/auth/me.php` | Bearer Token | Get logged-in admin user info |
| `GET` | `/api/admin/stats.php` | Bearer Token | Dashboard statistics (total bookings, leads, subscribers) |
| `GET` | `/api/bookings.php` | Bearer Token | List all bookings with optional filters (`status`, `search`) |
| `GET` | `/api/inquiries.php` | Bearer Token | List all inquiries with optional filters |
| `GET` | `/api/newsletter.php` | Bearer Token | List all newsletter subscribers |
| `POST` | `/api/admin/update-status.php` | Bearer Token | Update lead status (`{"id": 1, "type": "booking", "status": "contacted"}`) |
| `GET` | `/api/admin/export.php?type=bookings&token=...` | Token | Download complete data as Microsoft Excel compatible `.csv` |

---

## 4. Deployment Option A: cPanel / Shared Hosting

*Ideal for: Hostinger, Bluehost, Namecheap, GoDaddy, HostGator.*

1. **Build the Frontend**:
   Run `npm run build` on your computer. This generates the production `dist/` folder.

2. **Upload Files via cPanel File Manager or FTP**:
   - Upload the contents of `dist/` directly into your `public_html/` folder.
   - Upload the entire `backend/` folder into `public_html/backend/` (or one level above `public_html` for extra security).
   - Copy `backend/.htaccess` into your root directory or inside `backend/`.

3. **Configure MySQL Database in cPanel**:
   - Go to **MySQL Databases** in cPanel.
   - Create a database: e.g. `u123456_gbgcabs`.
   - Create a MySQL user and assign all privileges to the database.
   - Open **phpMyAdmin**, click your database, go to **Import**, and upload `backend/database/schema.sql`.

4. **Update `backend/.env`**:
   Update `DB_NAME`, `DB_USER`, `DB_PASS`, and change `JWT_SECRET` to a random 32+ character string.

---

## 5. Deployment Option B: Cloud Linux VPS

*Ideal for: DigitalOcean Droplets, AWS EC2 / Lightsail, Linode, Hetzner, Vultr.*

### Step 1: Install Nginx, PHP 8.3 & MySQL on Ubuntu
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx mysql-server php8.3-fpm php8.3-mysql php8.3-curl php8.3-mbstring php8.3-xml git -y
```

### Step 2: Clone & Deploy the Codebase
```bash
sudo mkdir -p /var/www/gbgcabs
sudo chown -R $USER:$USER /var/www/gbgcabs
cd /var/www/gbgcabs
git clone <your-git-repository-url> .
```

### Step 3: Build Frontend Assets
```bash
npm install
npm run build
```

### Step 4: Configure Nginx & Free SSL
1. Copy `backend/nginx.conf.example` to `/etc/nginx/sites-available/gbgcabs.com`.
2. Edit domain names and paths:
   ```bash
   sudo nano /etc/nginx/sites-available/gbgcabs.com
   sudo ln -s /etc/nginx/sites-available/gbgcabs.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
3. Issue a free SSL certificate with Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d gbgcabs.com -d www.gbgcabs.com
   ```

---

## 6. Deployment Option C: Docker Multi-Container Launch

If your server has Docker & Docker Compose installed:

```bash
docker compose up -d --build
```
This automatically spins up:
- **`gbg_backend`** on port `8000` (PHP 8.3 Apache)
- **`gbg_mysql`** on port `3306` (MySQL 8.0 with automatic `schema.sql` database seeding)
- **`gbg_adminer`** on port `8080` (Web UI for database browsing)

---

## 7. Admin Portal & Security Best Practices

### Default Superadmin Credentials
- **URL**: Click the subtle **"Fleet Admin"** link in the website footer or navigate to the admin modal.
- **Email**: `admin@gbgcabs.com`
- **Default Password**: `Admin@GBG2026!`

> [!IMPORTANT]
> Change the default admin password in `backend/.env` and update the database before making the website public!

### Security Checklist for Production:
1. **Change `JWT_SECRET`**: Set a unique, cryptographically random string (e.g. run `openssl rand -hex 32` in bash).
2. **Force HTTPS**: Ensure all API requests and logins use SSL/TLS encryption.
3. **Restrict CORS**: In `backend/.env`, set `CORS_ALLOWED_ORIGINS` to only your exact production domains (e.g. `https://gbgcabs.com,https://www.gbgcabs.com`).
4. **Permissions**: Ensure `backend/data/` (if using file fallback) has `755` permissions and is owned by `www-data`.
