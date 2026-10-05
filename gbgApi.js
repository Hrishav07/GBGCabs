/**
 * GoBabyGo Cabs - Frontend API Client
 * Seamlessly connects React UI to the PHP backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}/api/${endpoint.replace(/^\/api\//, '')}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      const errorMsg = data?.message || (data?.errors ? Object.values(data.errors).join(', ') : 'Request failed');
      const error = new Error(errorMsg);
      error.status = response.status;
      error.errors = data?.errors;
      throw error;
    }

    return data;
  } catch (err) {
    console.warn(`[GBG API Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export const gbgApi = {
  // 1. Health Check
  async checkHealth() {
    return request('health.php');
  },

  // 2. Newsletter Subscription
  async subscribeNewsletter(email, source = 'website_footer') {
    return request('newsletter.php', {
      method: 'POST',
      body: JSON.stringify({ email, source })
    });
  },

  // 3. Create Booking / Test Ride Request
  async createBooking(bookingData) {
    return request('bookings.php', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  // 4. Create General / B2B Inquiry
  async createInquiry(inquiryData) {
    return request('inquiries.php', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  // 5. Admin Authentication
  async adminLogin(email, password) {
    return request('auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async adminMe(token) {
    return request('auth/me.php', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 6. Admin Data & Stats
  async getAdminStats(token) {
    return request('admin/stats.php', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminBookings(token, status = '') {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return request(`bookings.php${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminInquiries(token, status = '') {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return request(`inquiries.php${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminNewsletterSubscribers(token) {
    return request('newsletter.php', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 7. Update Record Status
  async updateStatus(token, id, type, status) {
    return request('admin/update-status.php', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, type, status })
    });
  },

  getExportUrl(type, token) {
    return `${API_BASE}/api/admin/export.php?type=${encodeURIComponent(type)}&token=${encodeURIComponent(token)}`;
  }
};

export default gbgApi;
