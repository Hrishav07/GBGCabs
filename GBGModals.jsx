import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Lock,
  LogOut,
  Calendar,
  Phone,
  Mail,
  User,
  Building,
  MapPin,
  Sparkles,
  Search,
  Check,
  Zap,


  Shield,
  FileSpreadsheet
} from "lucide-react";
import gbgApi from "./gbgApi.js";

/**
 * 1. BOOKING & TEST RIDE MODAL
 */
export function BookingModal({ isOpen, onClose, initialService = "scooter_subscription", initialModel = "" }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    service_type: initialService,
    vehicle_model: initialModel || "GBG EV Multi-Brand",
    city: "Noida / Delhi NCR",
    preferred_date: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service_type: initialService,
        vehicle_model: initialModel || prev.vehicle_model
      }));
      setError("");
      setSuccessData(null);
    }
  }, [isOpen, initialService, initialModel]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await gbgApi.createBooking(formData);
      setSuccessData(res.data);
    } catch (err) {
      setError(err.message || "Failed to submit booking request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0C101A] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF6C1E]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {successData ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold">Booking Request Confirmed!</h3>
            <p className="text-sm text-slate-300 max-w-sm">
              Thank you, <strong className="text-white">{successData.customer_name}</strong>. Our fleet executive has received your request and will call you shortly.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Reference ID:</span>
                <span className="font-mono font-bold text-[#EF6C1E]">{successData.booking_ref}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Category:</span>
                <span className="capitalize font-semibold text-white">{successData.service_type.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Selected Vehicle:</span>
                <span className="font-semibold text-white">{successData.vehicle_model}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Phone:</span>
                <span className="font-semibold text-white">{successData.customer_phone}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 font-bold text-sm tracking-wide transition-all shadow-lg shadow-orange-500/25 mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF6C1E]/15 border border-[#EF6C1E]/30 text-xs font-bold text-[#EF6C1E] uppercase tracking-wider mb-2">
                <Zap size={13} className="fill-[#EF6C1E]" />
                <span>GoBabyGo Electric Mobility</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">Book Ride or Schedule Test Ride</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fast verification, battery swapping access, and tailored EV packages.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Service Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "scooter_subscription", label: "Gig Scooter Subscription" },
                    { id: "test_ride", label: "Showroom Test Ride" },
                    { id: "cab_ride", label: "EV Cab Booking" },
                    { id: "fleet_lease", label: "Corporate Fleet Lease" }
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => setFormData({ ...formData, service_type: srv.id })}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        formData.service_type === srv.id
                          ? "bg-[#EF6C1E] border-[#EF6C1E] text-white shadow-md shadow-orange-500/20"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Vehicle Model Preference
                </label>
                <select
                  value={formData.vehicle_model}
                  onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                >
                  {formData.vehicle_model &&
                    ![
                      "GBG EV Multi-Brand",
                      "Motovolt Urbano",
                      "BG EV Electric",
                      "Zelio Green City",
                      "Custom Retro Vespa Edition",
                      "Any / Recommend for me"
                    ].includes(formData.vehicle_model) && (
                      <option value={formData.vehicle_model} className="bg-[#0C101A]">
                        {formData.vehicle_model}
                      </option>
                    )}
                  <option value="GBG EV Multi-Brand" className="bg-[#0C101A]">GBG EV Multi-Brand (Commercial Workhorse)</option>
                  <option value="Motovolt Urbano" className="bg-[#0C101A]">Motovolt Urbano (High-Torque Delivery)</option>
                  <option value="BG EV Electric" className="bg-[#0C101A]">BG EV Commuter Series</option>
                  <option value="Zelio Green City" className="bg-[#0C101A]">Zelio Green City Scooter</option>
                  <option value="Custom Retro Vespa Edition" className="bg-[#0C101A]">Custom Retro Vespa Performance Edition</option>
                  <option value="Any / Recommend for me" className="bg-[#0C101A]">Any / Recommend for me</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    City / Region
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Noida / Delhi NCR"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Preferred Date (Optional)
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Special Requirements / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need battery swap near Sector 62, daily delivery rider"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E] transition-colors text-xs sm:text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Submit Booking Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 2. B2B PARTNER & INVESTOR INQUIRY MODAL
 */
export function InquiryModal({ isOpen, onClose, initialType = "corporate_fleet" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    inquiry_type: initialType,
    fleet_size: "10-50 EVs",
    city: "Noida / NCR",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, inquiry_type: initialType }));
      setError("");
      setSuccess(false);
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await gbgApi.createInquiry(formData);
      setRefId(res.data?.inquiry_ref || "");
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0A0F1D] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {success ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold">Partner Inquiry Received</h3>
            <p className="text-sm text-slate-300 max-w-sm">
              Thank you for reaching out. Our enterprise mobility partnership team will review your proposal and get in touch within 24 hours.
            </p>
            {refId && (
              <p className="text-xs text-slate-400">
                Inquiry Reference: <span className="font-mono font-bold text-blue-400">{refId}</span>
              </p>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                <Building size={13} />
                <span>Enterprise Partnerships</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">Partner with GoBabyGo Cabs</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Corporate fleet leasing, gig economy hubs, or Buy-Lease-Earn asset investment.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Partnership Category
                </label>
                <select
                  value={formData.inquiry_type}
                  onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                >
                  <option value="corporate_fleet" className="bg-[#0A0F1D]">Corporate Fleet Leasing (B2B)</option>
                  <option value="buy_lease_investor" className="bg-[#0A0F1D]">Buy, Lease & Earn (Fleet Investor)</option>
                  <option value="gig_delivery_partner" className="bg-[#0A0F1D]">Quick-Commerce Logistics (Zomato, Swiggy, Zepto Hub)</option>
                  <option value="ev_retail_showroom" className="bg-[#0A0F1D]">GBG X Showroom Franchise & Dealership</option>
                  <option value="general_inquiry" className="bg-[#0A0F1D]">General Partnership / Corporate Contact</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Email & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. QuickLogistics Pvt Ltd"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Fleet Size / Investment Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Estimated Fleet Scope
                  </label>
                  <select
                    value={formData.fleet_size}
                    onChange={(e) => setFormData({ ...formData, fleet_size: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  >
                    <option value="1-5 EVs" className="bg-[#0A0F1D]">1 - 5 EVs (Small fleet / Pilot)</option>
                    <option value="10-50 EVs" className="bg-[#0A0F1D]">10 - 50 EVs (Standard Commercial)</option>
                    <option value="50-200 EVs" className="bg-[#0A0F1D]">50 - 200 EVs (Enterprise Regional)</option>
                    <option value="200+ EVs" className="bg-[#0A0F1D]">200+ EVs (Pan-India Deployment)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Target City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="Noida / Delhi NCR"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Partnership Requirements / Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details regarding your fleet requirements, delivery hub locations, or investment preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-xs sm:text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Send Partner Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 3. FLEET ADMIN CONTROL CENTER MODAL
 */
export function AdminDashboardModal({ isOpen, onClose }) {
  const [token, setToken] = useState(() => {
    return (typeof window !== "undefined" && localStorage.getItem("gbg_admin_token")) || "";
  });
  const [adminUser, setAdminUser] = useState(null);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("admin@gbgcabs.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard states
  const [activeTab, setActiveTab] = useState("bookings");
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [systemHealth, setSystemHealth] = useState(null);

  // Load data when authenticated
  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await gbgApi.adminLogin(loginEmail, loginPassword);
      const authToken = res.data?.token;
      setToken(authToken);
      setAdminUser(res.data?.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("gbg_admin_token", authToken);
      }
    } catch (err) {
      setLoginError(err.message || "Invalid credentials. (Default: admin@gbgcabs.com / Admin@GBG2026!)");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setAdminUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("gbg_admin_token");
    }
  };

  const loadDashboardData = async () => {
    if (!token) return;
    setDashboardLoading(true);

    try {
      // Parallel requests
      const [statsRes, bookingsRes, inquiriesRes, subscribersRes, healthRes] = await Promise.all([
        gbgApi.getAdminStats(token).catch(() => null),
        gbgApi.getAdminBookings(token).catch(() => null),
        gbgApi.getAdminInquiries(token).catch(() => null),
        gbgApi.getAdminSubscribers(token).catch(() => null),
        gbgApi.checkHealth().catch(() => null)
      ]);

      if (statsRes?.data) setStats(statsRes.data);
      if (bookingsRes?.data) setBookings(bookingsRes.data);
      if (inquiriesRes?.data) setInquiries(inquiriesRes.data);
      if (subscribersRes?.data) setSubscribers(subscribersRes.data);
      if (healthRes?.data) setSystemHealth(healthRes.data);
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
      }
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleStatusChange = async (id, type, newStatus) => {
    try {
      await gbgApi.updateStatus(token, id, type, newStatus);
      if (type === "booking") {
        setBookings((prev) =>
          prev.map((b) => (b.id === id || b.booking_ref === id ? { ...b, status: newStatus } : b))
        );
      } else {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id || i.inquiry_ref === id ? { ...i, status: newStatus } : i))
        );
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#090D17] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[92vh] flex flex-col">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#EF6C1E] to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Shield size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">GBG Fleet Command Center</h3>
                {systemHealth && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    systemHealth.database?.mode === "mysql_pdo"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-400"
                  }`}>
                    {systemHealth.database?.mode === "mysql_pdo" ? "MySQL Live" : "File Fallback"}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                GoBabyGo Cabs • Secure Lead Management & Telematics Backoffice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Log Out"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close Admin Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        {!token ? (
          // LOGIN SCREEN
          <div className="py-12 flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-[#EF6C1E] mb-4 shadow-inner">
              <Lock size={26} />
            </div>
            <h4 className="text-2xl font-black text-white text-center">Fleet Admin Login</h4>
            <p className="text-xs text-slate-400 text-center max-w-xs mt-1 mb-6">
              Enter your credentials to access live bookings, partner leads, and export metrics.
            </p>

            {loginError && (
              <div className="w-full mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@gbgcabs.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#EF6C1E]"
                />
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  Default credentials: admin@gbgcabs.com / Admin@GBG2026!
                </p>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Access Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          // DASHBOARD
          <div className="flex-1 overflow-y-auto pt-6 space-y-6">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Bookings</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">{stats?.counts?.bookings ?? bookings.length}</span>
                  <span className="text-xs text-[#EF6C1E] font-bold">Rides & Test</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Partner Leads</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">{stats?.counts?.inquiries ?? inquiries.length}</span>
                  <span className="text-xs text-blue-400 font-bold">B2B & Investor</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Subscribers</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">{stats?.counts?.subscribers ?? subscribers.length}</span>
                  <span className="text-xs text-emerald-400 font-bold">Newsletter</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Quick Actions</span>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={loadDashboardData}
                    disabled={dashboardLoading}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Refresh Data"
                  >
                    <RefreshCw size={16} className={dashboardLoading ? "animate-spin" : ""} />
                  </button>
                  <a
                    href={gbgApi.getExportUrl(activeTab, token)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#EF6C1E] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/20"
                    title="Export Current Tab to CSV"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Export CSV</span>
                  </a>
                </div>
              </div>
            </div>

            {/* TAB SELECTOR & SEARCH */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                {[
                  { id: "bookings", label: `Bookings (${bookings.length})` },
                  { id: "inquiries", label: `Inquiries (${inquiries.length})` },
                  { id: "subscribers", label: `Subscribers (${subscribers.length})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 shadow-md"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter results..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#EF6C1E]"
                />
              </div>
            </div>

            {/* TAB 1: BOOKINGS TABLE */}
            {activeTab === "bookings" && (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 uppercase tracking-wider text-slate-400 text-[10px] font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service & Model</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings
                      .filter((b) => {
                        if (!searchFilter) return true;
                        const q = searchFilter.toLowerCase();
                        return (
                          (b.customer_name || "").toLowerCase().includes(q) ||
                          (b.customer_phone || "").toLowerCase().includes(q) ||
                          (b.booking_ref || "").toLowerCase().includes(q)
                        );
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#EF6C1E]">{item.booking_ref}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{item.customer_name}</div>
                            <div className="text-[11px] text-slate-400">{item.customer_phone} • {item.customer_email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="capitalize text-slate-200">{item.service_type?.replace(/_/g, " ")}</div>
                            <div className="text-[11px] text-slate-400">{item.vehicle_model}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{item.city || "NCR"}</td>
                          <td className="py-3 px-4 text-slate-400">{item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                item.status === "confirmed" || item.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : item.status === "contacted"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {item.status || "pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={item.status || "pending"}
                              onChange={(e) => handleStatusChange(item.id, "booking", e.target.value)}
                              className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-[#EF6C1E]"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No bookings recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: INQUIRIES TABLE */}
            {activeTab === "inquiries" && (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 uppercase tracking-wider text-slate-400 text-[10px] font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Partner</th>
                      <th className="py-3 px-4">Category & Scope</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries
                      .filter((i) => {
                        if (!searchFilter) return true;
                        const q = searchFilter.toLowerCase();
                        return (
                          (i.name || "").toLowerCase().includes(q) ||
                          (i.company_name || "").toLowerCase().includes(q) ||
                          (i.inquiry_ref || "").toLowerCase().includes(q)
                        );
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-blue-400">{item.inquiry_ref}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{item.name}</div>
                            <div className="text-[11px] text-slate-400">{item.company_name || "Individual"} • {item.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="capitalize text-slate-200">{item.inquiry_type?.replace(/_/g, " ")}</div>
                            <div className="text-[11px] text-slate-400">{item.fleet_size || "Standard"}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-300" title={item.message}>
                            {item.message}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                item.status === "converted"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : item.status === "in_progress"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {item.status || "new"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={item.status || "new"}
                              onChange={(e) => handleStatusChange(item.id, "inquiry", e.target.value)}
                              className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="converted">Converted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No partner inquiries recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: SUBSCRIBERS TABLE */}
            {activeTab === "subscribers" && (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 uppercase tracking-wider text-slate-400 text-[10px] font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscribers
                      .filter((s) => {
                        if (!searchFilter) return true;
                        return (s.email || "").toLowerCase().includes(searchFilter.toLowerCase());
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">{item.email}</td>
                          <td className="py-3 px-4 text-slate-400">{item.source || "Website Footer"}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {item.status || "active"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
                          </td>
                        </tr>
                      ))}
                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          No newsletter subscribers yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 4. INTERACTIVE FOOTER NEWSLETTER SUBSCRIPTION COMPONENT
 */
export function FooterNewsletter({ isLight = false }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await gbgApi.subscribeNewsletter(email);
      setMessage(res.message || "Thank you for subscribing!");
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setMessage(err.message || "Failed to subscribe. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto my-10 p-6 sm:p-8 rounded-3xl border backdrop-blur-md text-center space-y-4 transition-colors duration-300 ${
      isLight
        ? "bg-white border-slate-200/90 shadow-lg shadow-slate-200/50"
        : "bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-white/10"
    }`}>
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
        isLight
          ? "bg-orange-50 border border-orange-200 text-[#EF6C1E]"
          : "bg-[#EF6C1E]/20 text-[#EF6C1E]"
      }`}>
        <Sparkles size={13} />
        <span>Stay Ahead</span>
      </div>

      <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
        isLight ? "text-slate-900" : "text-white"
      }`}>
        India's Green Mobility Network Updates
      </h3>
      <p className={`text-xs sm:text-sm max-w-md mx-auto ${
        isLight ? "text-slate-600" : "text-slate-400"
      }`}>
        Subscribe for new EV model releases, swap hub expansions, and gig rider lease benefits delivered straight to your inbox.
      </p>

      {message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center justify-center gap-2 max-w-md mx-auto ${
            isSuccess
              ? isLight ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
              : isLight ? "bg-rose-50 border border-rose-200 text-rose-700" : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
          }`}
        >
          {isSuccess ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:border-[#EF6C1E] transition-all ${
            isLight
              ? "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              : "bg-white/5 border-white/15 text-white placeholder-slate-500"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
          <span>Subscribe</span>
        </button>
      </form>
    </div>
  );
}
