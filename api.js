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

  // 4. Submit B2B Fleet or Investor Inquiry
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
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // 6. Admin Stats & Lists
  async getAdminStats(token) {
    return request('admin/stats.php', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminBookings(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const ep = query ? `bookings.php?${query}` : 'bookings.php';
    return request(ep, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminInquiries(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const ep = query ? `inquiries.php?${query}` : 'inquiries.php';
    return request(ep, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAdminSubscribers(token) {
    return request('newsletter.php', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

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
