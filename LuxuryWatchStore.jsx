import React, { useState, useEffect, Component } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
  Target,
  ChevronDown,
  HelpCircle,
  Send,
  Zap,
  Users,
  Scale,
  Sun,
  Moon
} from "lucide-react";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("GBG Cabs Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090D14] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-[#121824] border border-orange-500/40 p-8 rounded-3xl max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-orange-400 mb-3">Notice on Display</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              We encountered a minor render issue. Please click below to reload and restore normal view.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-semibold text-xs tracking-wider uppercase transition-all shadow-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const TimelineSketches = {
  PolygonMap: () => (
    <svg viewBox="0 0 160 85" className="w-36 h-auto opacity-90 drop-shadow-sm" fill="none">
      <polygon points="12,20 28,12 40,24 25,36 10,28" fill="#CBD5E1" opacity="0.75" />
      <polygon points="40,24 60,18 72,32 55,42 25,36" fill="#94A3B8" opacity="0.85" />
      <polygon points="72,32 95,22 108,38 90,50 55,42" fill="#64748B" opacity="0.9" />
      <polygon points="90,50 108,38 125,48 112,65 85,58" fill="#CBD5E1" opacity="0.65" />
      <polygon points="112,65 125,48 145,55 138,75 105,72" fill="#94A3B8" opacity="0.8" />
      <polygon points="60,18 85,8 95,22" fill="#F1F5F9" opacity="0.9" />
      <polygon points="30,45 52,44 48,68 25,58" fill="#CBD5E1" opacity="0.75" />
    </svg>
  ),
  MessageSketch: () => (
    <div className="flex items-center gap-2 select-none opacity-85">
      <svg viewBox="0 0 45 40" className="w-9 h-auto" fill="none" stroke="#E2E8F0" strokeWidth="1.8">
        <path d="M5 20 C5 10 35 8 38 18 C40 26 28 32 18 31 L10 36 L12 28 C6 26 5 23 5 20 Z" strokeLinecap="round" strokeLinejoin="round" />
        <text x="13" y="22" fill="#F1F5F9" fontSize="11" fontFamily="system-ui, cursive, sans-serif" fontWeight="bold">hi</text>
      </svg>
      <svg viewBox="0 0 45 40" className="w-10 h-auto" fill="none" stroke="#E2E8F0" strokeWidth="1.8">
        <rect x="4" y="10" width="36" height="24" rx="2" strokeLinecap="round" />
        <path d="M4 11 L22 25 L40 11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 33 L16 22" strokeLinecap="round" />
        <path d="M40 33 L28 22" strokeLinecap="round" />
      </svg>
    </div>
  ),
  ScribbleCheck: () => (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-85" fill="none">
      <circle cx="40" cy="40" r="32" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="3 2" />
      <path
        d="M12 40 C10 22 22 10 40 10 C58 10 70 22 70 40 C70 58 58 70 40 70 C24 70 12 56 16 38"
        stroke="#E2E8F0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="40" cy="40" r="22" stroke="#CBD5E1" strokeWidth="1.2" />
      <path
        d="M28 41 L36 49 L52 31"
        stroke="#F8FAFC"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  RiderSketch: () => (
    <svg viewBox="0 0 60 90" className="w-12 h-auto opacity-85" fill="none" stroke="#E2E8F0" strokeWidth="1.6">
      <path d="M22 18 C22 14 36 14 36 18 C38 18 44 20 44 23 L22 23 Z" strokeLinejoin="round" />
      <circle cx="28" cy="24" r="7" />
      <path d="M22 32 L34 32 L38 58 L20 58 Z" strokeLinejoin="round" />
      <path d="M23 58 L22 84 M33 58 L34 84" strokeLinecap="round" />
      <path d="M22 36 L15 50 L24 52" strokeLinecap="round" />
      <path d="M34 36 L43 46 L38 52" strokeLinecap="round" />
      <rect x="36" y="44" width="14" height="18" rx="1.5" stroke="#F1F5F9" strokeWidth="1.5" />
      <line x1="39" y1="49" x2="47" y2="49" />
      <line x1="39" y1="53" x2="47" y2="53" />
      <line x1="39" y1="57" x2="45" y2="57" />
    </svg>
  ),
  WavingHand: () => (
    <div className="flex items-center gap-2 select-none opacity-85">
      <svg viewBox="0 0 35 30" className="w-8 h-auto" fill="none" stroke="#E2E8F0" strokeWidth="1.6">
        <path d="M4 14 C4 6 26 4 28 12 C30 18 20 22 14 21 L8 25 L9 19 C5 18 4 16 4 14 Z" strokeLinecap="round" strokeLinejoin="round" />
        <text x="10" y="15" fill="#F1F5F9" fontSize="9" fontFamily="system-ui, cursive, sans-serif" fontWeight="bold">hi</text>
      </svg>
      <svg viewBox="0 0 50 60" className="w-11 h-auto" fill="none" stroke="#E2E8F0" strokeWidth="1.8">
        <path
          d="M18 52 C18 52 14 38 14 32 C14 28 17 28 17 32 L17 22 C17 18 20 18 20 22 L20 14 C20 10 23 10 23 14 L23 18 C23 12 26 12 26 16 L26 24 C26 20 29 20 29 24 L30 36 C30 44 26 52 26 52 Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11 26 C8 24 8 20 11 18" strokeLinecap="round" />
        <path d="M36 26 C39 24 39 20 36 18" strokeLinecap="round" />
      </svg>
    </div>
  )
};

export const GoBabyGoLogo = ({ className = "h-12 w-auto", variant = "default" }) => {
  const [imgError, setImgError] = useState(false);
  const navyColor = variant === "light" ? "#F8FAFC" : "#0F1E38";
  const orangeColor = "#EF6C1E";

  if (!imgError) {
    return (
      <img
        src="gobabygo-original_2.webp"
        alt="GoBabyGo Cabs"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center select-none group cursor-pointer transition-transform duration-300 hover:scale-[1.03] bg-transparent">
      <svg
        viewBox="0 0 200 190"
        className={`${className} overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="gbg-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#gbg-glow)">
          <g stroke={navyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M42 96 C30 96 28 84 39 80 C46 79 48 86 46 93" />
            <path d="M158 96 C170 96 172 84 161 80 C154 79 152 86 154 93" />
            <path d="M48 106 C44 122 44 136 45 152 C45 156 50 158 54 158 H70 C74 158 76 154 76 150 V142 H124 V150 C124 154 126 158 130 158 H146 C150 158 155 156 155 152 C156 136 156 122 152 106 C148 94 136 88 124 86 H76 C64 88 52 94 48 106 Z" />
          </g>
          <path d="M54 116 C54 105 65 102 74 108 C70 120 61 122 54 116 Z" fill={navyColor} />
          <path d="M146 116 C146 105 135 102 126 108 C130 120 139 122 146 116 Z" fill={navyColor} />
          <path d="M74 74 C82 66 118 66 126 74" stroke={navyColor} strokeWidth="7" strokeLinecap="round" fill="none" />
          <path
            d="M100 12 C60 12 36 42 36 78 C36 110 88 142 100 154 C112 142 164 110 164 78 C164 42 140 12 100 12 Z"
            stroke={orangeColor}
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="100" cy="56" r="21" fill={orangeColor} />
          <g transform="translate(0, 184)">
            <text x="22" y="0" fill={orangeColor} fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">
              GO
            </text>
            <text x="66" y="0" fill={navyColor} fontSize="20" fontStyle="italic" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
              BABY
            </text>
            <text x="142" y="0" fill={orangeColor} fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">
              GO
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export const ExactGbgEvLogo = ({ className = "h-28 sm:h-36 md:h-40 w-auto" }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="images_4.jpg"
        onError={() => setImgError(true)}
        alt="GBG EV Official Logo"
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="56" r="48" fill="#E66723" />
        <path d="M48 34 H55 L61 40 H99 L105 34 H112" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="47" y="27" width="8" height="6" rx="1.5" fill="#FFFFFF" />
        <rect x="105" y="27" width="8" height="6" rx="1.5" fill="#FFFFFF" />
        <circle cx="80" cy="40" r="7.5" fill="#FFFFFF" />
        <path d="M64 45 C64 45 61 74 68 84 C71 88 77 92 80 92 C83 92 89 88 92 84 C99 74 96 45 96 45 Z" fill="#FFFFFF" />
        <ellipse cx="69" cy="62" rx="2.5" ry="4.5" fill="#E66723" />
        <ellipse cx="91" cy="62" rx="2.5" ry="4.5" fill="#E66723" />
        <path d="M82 54 L75 66 H80 L77 78 L87 64 H81 Z" fill="#E66723" />
        <path d="M75 92 H85 V99 H75 Z" fill="#FFFFFF" />
        <text x="18" y="142" fill="#2563EB" fontSize="30" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.04em">
          GBG
        </text>
        <text x="96" y="142" fill="#E66723" fontSize="30" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.04em">
          EV
        </text>
      </svg>
    </div>
  );
};

export const ExactGbgxLogo = ({ className = "h-14 sm:h-18 md:h-20 w-auto" }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="Screenshot 2026-08-31 150402_4.png"
        onError={() => setImgError(true)}
        alt="GBGX Official Logo"
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 460 110" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 92 24 H 26 C 14 24 6 32 6 44 V 66 C 6 78 14 86 26 86 H 92 C 104 86 112 78 112 66 V 55 H 52 M 112 55 V 66"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 144 24 H 198 C 210 24 218 30 218 41 C 218 52 210 55 198 55 H 144 V 24 Z" />
          <path d="M 144 55 H 202 C 214 55 222 62 222 72 C 222 81 214 86 202 86 H 144 V 55 Z" />
        </g>
        <path
          d="M 338 24 H 272 C 260 24 252 32 252 44 V 66 C 252 78 260 86 272 86 H 338 C 350 86 358 78 358 66 V 55 H 298 M 358 55 V 66"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 390 24 L 452 86" />
          <path d="M 452 24 L 390 86" />
        </g>
      </svg>
    </div>
  );
};

const HERO_EV_SLIDES = [
  {
    id: "last-mile-fleet",
    tag: "Commercial Fleet Ecosystem",
    badge: "10,000+ Active EV Scooters",
    title: "Electric Mobility Beyond the Ordinary",
    description:
      "Empowering India's gig workers and last-mile delivery giants with heavy-duty, high-efficiency electric scooters designed for rigorous all-day commercial performance.",
    cta: "Explore Fleet Ecosystem",
    ctaTarget: "#subsidiaries",
    nodeLabel: "B2B Delivery Fleet",
    nodeCity: "Zomato, Swiggy, Zepto Hubs",
    bgImage:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=85",
    thumb:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "gbgx-retail",
    tag: "Multi-Brand EV Platform",
    badge: "Top-Rated Electric Scooters",
    title: "Curated Electric Rides, Redefined",
    description:
      "GBGX is India's dedicated showroom and e-store for certified electric scooters, genuine lithium battery packs, fast chargers, and smart riding accessories under one roof.",
    cta: "Discover GBGX Scooters",
    ctaTarget: "#subsidiaries",
    nodeLabel: "GBGX Multi-Brand Hub",
    nodeCity: "Noida Sector 62 & Pan-India",
    bgImage:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=2400&q=85",
    thumb:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "battery-swap-hubs",
    tag: "Battery Swapping & Charging",
    badge: "75+ Operational Hubs",
    title: "Zero Downtime Battery Swapping",
    description:
      "Our localized charging and fast battery swapping infrastructure ensures delivery riders swap drained batteries in under 90 seconds, keeping fleets rolling non-stop.",
    cta: "Locate Nearest Hub",
    ctaTarget: "#faq",
    nodeLabel: "Rapid Battery Swap",
    nodeCity: "Delhi NCR, Bengaluru, Mumbai",
    bgImage:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2400&q=85",
    thumb:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "buy-lease-earn",
    tag: "Passive Asset Wealth",
    badge: "300+ Trusted Investors",
    title: "Buy, Lease & Earn with Green Assets",
    description:
      "A high-yield fintech asset platform: Acquire commercial electric scooters and lease them directly to GBG EV. Enjoy fixed monthly passive rentals with complete fleet telematics.",
    cta: "View Investment Model",
    ctaTarget: "#about",
    nodeLabel: "Asset Leasing Model",
    nodeCity: "Passive Returns • Up to 30% ROI",
    bgImage:
      "https://images.unsplash.com/photo-1620802051873-455b76615b13?auto=format&fit=crop&w=2400&q=85",
    thumb:
      "https://images.unsplash.com/photo-1620802051873-455b76615b13?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "rider-onboarding",
    tag: "Accessible Urban Mobility",
    badge: "50,000+ Happy Riders",
    title: "Zero Fuel Cost for Delivery Gig Stars",
    description:
      "Flexible weekly & monthly scooter subscriptions eliminate heavy petrol expenses, maintenance burdens, and financing obstacles for gig workers across India.",
    cta: "Join as GBG Rider",
    ctaTarget: "#contact",
    nodeLabel: "Gig Rider Network",
    nodeCity: "30+ Indian Smart Cities",
    bgImage:
      "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=2400&q=85",
    thumb:
      "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=80"
  }
];

const FAQS = [
  {
    category: "GoBabyGo Group",
    question: "What is the relationship between GoBabyGo Cabs, GBG EV, and GBGX?",
    answer:
      "GoBabyGo Cabs Private Limited (founded in 2021) is the parent entity powering India's clean urban mobility ecosystem. GBG EV functions as its dedicated B2B fleet operations and last-mile logistics management vertical, while GBGX operates as the nation's multi-brand EV retail platform for certified electric scooters, spares, and accessories."
  },
  {
    category: "GBG EV Fleet",
    question: "What scale does GBG EV currently operate across India?",
    answer:
      "GBG EV manages an active fleet of over 10,000 commercial electric vehicles across 30+ smart Indian cities, backed by more than 75 dedicated operational charging and battery swapping hubs."
  },
  {
    category: "Delivery Partnerships",
    question: "Which logistics and last-mile platforms use GBG EV scooters?",
    answer:
      "Our commercial EV fleets are actively deployed by leading last-mile delivery and quick-commerce companies including Zomato, Swiggy, Blinkit, Zepto, Porter, and Instamart to achieve lower per-kilometer delivery costs and zero tailpipe emissions."
  },
  {
    category: "GBGX Platform",
    question: "What products and brands are available on GBGX?",
    answer:
      "GBGX (gbgx.in) is a comprehensive multi-brand EV platform partnering with over 10 leading manufacturers, including E-Sprinto, Bgauss, YoBykes, Goeen, Zelio, and Gravton. In addition to verified scooters, GBGX offers certified lithium-ion battery packs, chargers, tires, brake components, and genuine accessories."
  },
  {
    category: "Charging & Swapping",
    question: "How does GBG EV's charging and battery swapping infrastructure operate?",
    answer:
      "With 75+ operational hubs located near high-demand commercial clusters in Delhi-NCR, Bengaluru, Mumbai, and beyond, riders can swap depleted batteries in under 90 seconds, ensuring zero operational downtime for all-day delivery schedules."
  },
  {
    category: "Rider Onboarding",
    question: "How can delivery gig workers get an EV scooter from GBG EV?",
    answer:
      "Gig workers can subscribe to GBG EV scooters on flexible daily, weekly, or monthly rental plans without heavy vehicle financing or fuel expenses. Subscriptions include comprehensive maintenance, battery swapping access, insurance, and telematics support."
  },
  {
    category: "Headquarters & Contact",
    question: "Where is GoBabyGo Cabs headquartered and how can partners get in touch?",
    answer:
      "GoBabyGo Cabs is headquartered at Tower B, The Corenthum, Sector 62, Noida, Uttar Pradesh 201301. You can reach out directly via contact@gbgev.com, call +91 88000 23546, or submit an inquiry using the online partner form."
  }
];

function MainApp() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("gbg_theme");
      if (savedTheme) return savedTheme;
      return "light";
    }
    return "light";
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [inlineContactSuccess, setInlineContactSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gbg_theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isLight = theme === "light";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_EV_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_EV_SLIDES[activeSlide] || HERO_EV_SLIDES[0];

  return (
    <div
      className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#090D14] text-slate-100"
      }`}
    >
      {/* 
        ========================================================================
        1. HERO SECTION & FLOATING GLASS NAVIGATION
        ========================================================================
      */}
      <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {HERO_EV_SLIDES.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "1000ms"
            }}
          >
            <img
              src={item.bgImage}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isLight 
                ? "bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-slate-900/30" 
                : "bg-gradient-to-r from-black/85 via-black/55 to-black/30"
            }`} />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isLight
                ? "bg-gradient-to-t from-[#F8FAFC] via-transparent to-black/60"
                : "bg-gradient-to-t from-[#090D14] via-transparent to-black/60"
            }`} />
          </div>
        ))}

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* FLOATING GLASS NAVIGATION HEADER */}
        <header className="relative z-30 w-full pt-6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a
              href="#home"
              className="flex items-center bg-transparent transition-all duration-300 focus:outline-none"
              aria-label="Go Baby Go Cabs"
            >
              <GoBabyGoLogo className="h-12 sm:h-14 w-auto" variant="light" />
            </a>

            <nav className="hidden md:flex items-center space-x-10 text-[13px] tracking-[0.16em] uppercase font-medium text-white/90">
              <a href="#home" className="hover:text-orange-400 transition-colors duration-200">
                Home
              </a>
              <a href="#subsidiaries" className="hover:text-orange-400 transition-colors duration-200">
                GBG EV
              </a>
              <a href="#subsidiaries" className="hover:text-orange-400 transition-colors duration-200">
                GBG X
              </a>
              <a href="#about" className="hover:text-orange-400 transition-colors duration-200">
                About Us
              </a>
              <a href="#faq" className="hover:text-orange-400 transition-colors duration-200">
                FAQ
              </a>
              <a href="#contact" className="hover:text-orange-400 transition-colors duration-200">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white transition-all border border-white/15 flex items-center justify-center shadow-lg"
                aria-label={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
                title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
              >
                {isLight ? (
                  <Moon size={18} strokeWidth={1.75} className="text-amber-300" />
                ) : (
                  <Sun size={18} strokeWidth={1.75} className="text-amber-400" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className={`fixed inset-0 z-40 backdrop-blur-2xl flex flex-col p-8 pt-24 md:hidden transition-colors ${
            isLight ? "bg-slate-900/95 text-white" : "bg-black/95 text-slate-200"
          }`}>
            <div className="flex items-center justify-between absolute top-6 left-6 right-6">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white"
              >
                {isLight ? <Moon size={15} className="text-amber-300" /> : <Sun size={15} className="text-amber-400" />}
                <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-lg font-medium tracking-wider uppercase mt-4">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                Home
              </a>
              <a href="#subsidiaries" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                GBG EV (B2B Fleet & Hubs)
              </a>
              <a href="#subsidiaries" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                GBG X (Multi-Brand EV Platform)
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                About GoBabyGo Cabs
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                Frequently Asked Questions
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400">
                Contact
              </a>
            </div>
          </div>
        )}

        {/* HERO MAIN BODY */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 flex flex-col justify-center py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full transition-all">
                <span className="bg-white text-slate-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                  NEW
                </span>
                <span className="text-xs font-medium text-white/90 tracking-wide">
                  {slide.tag} • {slide.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white tracking-tight leading-[1.12]">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={slide.ctaTarget}
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-medium text-sm px-6 py-3.5 rounded-full backdrop-blur-md border border-white/25 transition-all shadow-xl hover:shadow-orange-500/10 group"
                >
                  <span>{slide.cta}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50"
                >
                  <span>Explore FAQ</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <span>10,000+ Active Fleets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <span>75+ Operational Hubs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <span>30+ Indian Cities</span>
                </div>
              </div>
            </div>

            {/* Right Curved Arc Rail Carousel */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-end">
              <div className="relative w-full max-w-[400px] h-[480px] sm:h-[520px] flex items-center justify-end select-none">
                <svg
                  className="absolute right-14 sm:right-16 top-4 h-[470px] w-48 pointer-events-none hidden sm:block opacity-40"
                  viewBox="0 0 160 480"
                  fill="none"
                >
                  <path
                    d="M 120,20 Q 30,240 120,460"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                  {HERO_EV_SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveSlide(dotIdx)}
                      className={`transition-all duration-300 rounded-full ${
                        dotIdx === activeSlide
                          ? "w-2.5 h-6 bg-white shadow-lg"
                          : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="relative w-full h-full flex flex-col justify-between py-2 pr-8 sm:pr-10">
                  {HERO_EV_SLIDES.map((item, idx) => {
                    const isActive = idx === activeSlide;
                    const arcOffsets = [
                      "translate-x-4",
                      "-translate-x-5",
                      "-translate-x-12",
                      "-translate-x-5",
                      "translate-x-4"
                    ];
                    const offsetClass = arcOffsets[idx] || "";

                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveSlide(idx)}
                        className={`flex items-center justify-end gap-3 sm:gap-4 transition-all duration-500 cursor-pointer group ${offsetClass}`}
                      >
                        <div
                          className={`text-right transition-all duration-300 ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-60 group-hover:opacity-100 translate-x-1"
                          }`}
                        >
                          <p className={`text-xs sm:text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-slate-200"}`}>
                            {item.nodeLabel}
                          </p>
                          <p className="text-[11px] text-slate-300 font-light truncate max-w-[150px]">
                            {item.nodeCity}
                          </p>
                        </div>

                        <div
                          className={`relative rounded-full overflow-hidden transition-all duration-500 shrink-0 ${
                            isActive
                              ? "w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-white/90 shadow-2xl scale-110"
                              : "w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-white/40 opacity-75 group-hover:opacity-100 group-hover:scale-105 group-hover:ring-white/70"
                          }`}
                        >
                          <img
                            src={item.thumb}
                            alt={item.nodeLabel}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {isActive && <div className="absolute inset-0 bg-orange-500/15" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM IMPACT STRIP */}
        <div className={`relative z-20 w-full border-t transition-colors ${
          isLight
            ? "border-slate-200/80 bg-white/70 backdrop-blur-md text-slate-800"
            : "border-white/10 bg-black/40 backdrop-blur-md text-white"
        }`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>10,000+</p>
              <p className={`text-[11px] uppercase tracking-wider ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Active Commercial EVs
              </p>
            </div>
            <div>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>75+ Hubs</p>
              <p className={`text-[11px] uppercase tracking-wider ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Charging & Swapping Centers
              </p>
            </div>
            <div>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>1,215,546</p>
              <p className={`text-[11px] uppercase tracking-wider ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Tree Plantation Impact
              </p>
            </div>
            <div>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>2,556 Tons</p>
              <p className={`text-[11px] uppercase tracking-wider ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                CO₂ Emissions Saved
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. SUBSIDIARY LOGO CARDS (SIDE BY SIDE: GBG EV & GBGX)
        ========================================================================
      */}
      <section id="subsidiaries" className="py-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* GBG EV Card - Pure Solid White Background */}
          <a
            href="https://gbgev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#FFFFFF] rounded-3xl p-10 sm:p-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-slate-200 cursor-pointer min-h-[220px]"
            title="Visit GBG EV Official Platform (gbgev.com)"
          >
            <div className="w-full flex items-center justify-center">
              <ExactGbgEvLogo className="h-28 sm:h-36 md:h-40 w-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
          </a>

          {/* GBGX Card - Pure Solid Pitch Black Background */}
          <a
            href="https://gbgx.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#000000] rounded-3xl p-10 sm:p-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-neutral-800 cursor-pointer min-h-[220px]"
            title="Visit GBGX Official Platform (gbgx.in)"
          >
            <div className="w-full flex items-center justify-center">
              <ExactGbgxLogo className="h-16 sm:h-20 md:h-24 w-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
          </a>

        </div>
      </section>

      {/* 
        ========================================================================
        3. ABOUT US: PARENT OVERVIEW, 6-STEP VERTICAL INFOGRAPHIC, GBG EV & GBGX
        ========================================================================
      */}
      <section id="about" className={`py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t transition-colors ${
        isLight ? "border-slate-200" : "border-slate-800/80"
      }`}>
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className={`text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full border ${
            isLight
              ? "text-orange-600 bg-orange-100 border-orange-200"
              : "text-orange-400 bg-orange-950/40 border-orange-800/40"
          }`}>
            About GoBabyGo Cabs
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Powering India's Green Mobility Revolution
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Founded in <strong>2021</strong> as <strong>GoBabyGo Cabs (OPC) Private Limited</strong>, our mission has always been to redefine urban mobility with sustainable, smart, and inclusive solutions. Headquartered in Noida, we have rapidly expanded into India's premier EV fleet management and multi-brand ecosystem.
          </p>
        </div>

        {/* 4 CORE STAT HIGHLIGHTS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <div className={`p-6 rounded-2xl border text-center transition-all ${
            isLight 
              ? "bg-white border-slate-200 shadow-sm hover:border-orange-500/50" 
              : "bg-[#121824] border-slate-800 hover:border-orange-500/40"
          }`}>
            <p className="text-3xl sm:text-4xl font-black text-orange-500">2021</p>
            <p className={`text-xs uppercase tracking-wider font-semibold mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Founded</p>
            <p className={`text-[11px] mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Noida, Uttar Pradesh</p>
          </div>
          <div className={`p-6 rounded-2xl border text-center transition-all ${
            isLight 
              ? "bg-white border-slate-200 shadow-sm hover:border-orange-500/50" 
              : "bg-[#121824] border-slate-800 hover:border-orange-500/40"
          }`}>
            <p className={`text-3xl sm:text-4xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>10,000+</p>
            <p className={`text-xs uppercase tracking-wider font-semibold mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Active Vehicles</p>
            <p className={`text-[11px] mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Commercial EV Fleet</p>
          </div>
          <div className={`p-6 rounded-2xl border text-center transition-all ${
            isLight 
              ? "bg-white border-slate-200 shadow-sm hover:border-orange-500/50" 
              : "bg-[#121824] border-slate-800 hover:border-orange-500/40"
          }`}>
            <p className="text-3xl sm:text-4xl font-black text-emerald-500">75+</p>
            <p className={`text-xs uppercase tracking-wider font-semibold mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Hubs</p>
            <p className={`text-[11px] mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Charging & Swap Stations</p>
          </div>
          <div className={`p-6 rounded-2xl border text-center transition-all ${
            isLight 
              ? "bg-white border-slate-200 shadow-sm hover:border-orange-500/50" 
              : "bg-[#121824] border-slate-800 hover:border-orange-500/40"
          }`}>
            <p className="text-3xl sm:text-4xl font-black text-amber-500">30+</p>
            <p className={`text-xs uppercase tracking-wider font-semibold mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Cities</p>
            <p className={`text-[11px] mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Pan-India Footprint</p>
          </div>
        </div>

        {/* 
          TIMELINE INFOGRAPHIC: THE JOURNEY OF GBG CABS
          Glassy translucent container
        */}
        <div className="mb-24">
          <div className={`relative backdrop-blur-2xl rounded-3xl p-8 sm:p-14 lg:p-16 border overflow-hidden transition-all duration-300 ${
            isLight
              ? "bg-white/80 border-slate-200 shadow-2xl text-slate-800"
              : "bg-white/[0.04] border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] text-slate-100"
          }`}>
            
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-16 select-none relative z-10">
              <p className={`text-xs sm:text-sm font-semibold tracking-[0.26em] uppercase ${
                isLight ? "text-slate-500" : "text-slate-300"
              }`}>
                TIMELINE INFOGRAPHIC
              </p>
              <h3 className="text-base sm:text-lg font-serif italic text-orange-500 mt-1 font-normal tracking-wide">
                The Journey of GBG Cabs
              </h3>
              <p className={`text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-medium mt-1 ${
                isLight ? "text-slate-400" : "text-slate-400"
              }`}>
                BY GOBABYGO CABS PRIVATE LIMITED
              </p>
              
              <div className="relative w-full max-w-md mx-auto mt-6 flex items-center justify-between">
                <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-slate-300" : "bg-white/40"}`} />
                <span className={`flex-1 h-[1px] mx-1 ${
                  isLight 
                    ? "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" 
                    : "bg-gradient-to-r from-white/10 via-white/30 to-white/10"
                }`} />
                <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-slate-300" : "bg-white/40"}`} />
              </div>
            </div>

            {/* TIMELINE VERTICAL SPINE CANVAS */}
            <div className="relative max-w-4xl mx-auto py-4 z-10">
              
              <div className={`absolute left-1/2 -translate-x-1/2 top-4 bottom-14 w-[1px] hidden sm:block ${
                isLight ? "bg-slate-300" : "bg-white/20"
              }`} />

              <div className="relative flex justify-center mb-10 hidden sm:flex">
                <div className={`w-5 h-5 rounded-full border shadow-inner ${
                  isLight ? "bg-slate-200 border-slate-300" : "bg-slate-400/40 border-white/30"
                }`} />
              </div>

              {/* STEPS LIST */}
              <div className="space-y-16 sm:space-y-20 relative">

                {/* STEP 01 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-center sm:text-right pr-0 sm:pr-8 flex justify-center sm:justify-end items-center">
                    <span
                      className={`text-3xl sm:text-4xl select-none font-serif italic font-normal tracking-tight drop-shadow-sm ${
                        isLight ? "text-slate-700" : "text-slate-200"
                      }`}
                      style={{ fontFamily: "'Dancing Script', 'Playfair Display', cursive, serif" }}
                    >
                      welcome
                    </span>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#3D2547] to-[#1E1124] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      01
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                      <div className={`w-10 h-[1px] relative flex items-center justify-end ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -mr-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        ONBOARDING & FOUNDATION
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Founded GoBabyGo Cabs (OPC) Private Limited in Noida, laying the foundational roots for corporate and clean urban transit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 02 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-left sm:text-right pr-0 sm:pr-8 order-2 sm:order-1 flex sm:justify-end items-center gap-4">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        DISCOVERY & EV PILOTS
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Conducted intensive commercial two-wheeler pilots for gig riders, proving the economic and operational viability of EV scooters.
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className={`w-10 h-[1px] relative flex items-center justify-start ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -ml-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative order-1 sm:order-2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#85758E] to-[#594B61] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      02
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 order-3 flex justify-center sm:justify-start">
                    <TimelineSketches.PolygonMap />
                  </div>
                </div>

                {/* STEP 03 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-center sm:text-right pr-0 sm:pr-8 flex justify-center sm:justify-end items-center">
                    <TimelineSketches.MessageSketch />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#B5A6BD] to-[#786980] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      03
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                      <div className={`w-10 h-[1px] relative flex items-center justify-end ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -mr-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        LAUNCH OF GBG EV (2023)
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Transitioned into GoBabyGo Cabs Private Limited and established GBG EV as a specialized B2B fleet leasing and maintenance platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 04 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-left sm:text-right pr-0 sm:pr-8 order-2 sm:order-1 flex sm:justify-end items-center gap-4">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        GBGX MULTI-BRAND PLATFORM
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Unveiled GBGX showroom & e-store bringing 10+ certified EV two-wheeler brands, batteries, and genuine spares under one trusted umbrella.
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className={`w-10 h-[1px] relative flex items-center justify-start ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -ml-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative order-1 sm:order-2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#3D2547] to-[#1E1124] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      04
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 order-3 flex justify-center sm:justify-start">
                    <TimelineSketches.ScribbleCheck />
                  </div>
                </div>

                {/* STEP 05 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-center sm:text-right pr-0 sm:pr-8 flex justify-center sm:justify-end items-center">
                    <TimelineSketches.RiderSketch />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#85758E] to-[#594B61] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      05
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                      <div className={`w-10 h-[1px] relative flex items-center justify-end ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -mr-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        NATIONWIDE DELIVERY (2024)
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Scaled commercial EV deployments with Zomato, Swiggy, Zepto, Blinkit, and Porter across 30+ smart cities and 75+ operational hubs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 06 */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6">
                  <div className="sm:col-span-5 text-left sm:text-right pr-0 sm:pr-8 order-2 sm:order-1 flex sm:justify-end items-center gap-4">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-tight ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        BUY, LEASE & EARN MODEL (2025)
                      </h4>
                      <p className={`text-[11px] sm:text-xs font-normal leading-relaxed mt-1 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Pioneered hands-off green asset leasing with 300+ active investors enjoying predictable monthly passive income on 10,000+ deployed EVs.
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <div className={`w-10 h-[1px] relative flex items-center justify-start ${
                        isLight ? "bg-slate-300" : "bg-white/25"
                      }`}>
                        <span className={`w-2 h-2 rounded-full -ml-1 ${isLight ? "bg-slate-400" : "bg-white/60"}`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                        <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-white/50"}`} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-center relative order-1 sm:order-2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#B5A6BD] to-[#786980] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg ring-4 ring-black/5 dark:ring-white/10 z-10 border border-white/20">
                      06
                    </div>
                  </div>

                  <div className="sm:col-span-5 pl-0 sm:pl-8 order-3 flex justify-center sm:justify-start">
                    <TimelineSketches.WavingHand />
                  </div>
                </div>

              </div>

              <div className="relative flex justify-center mt-12 hidden sm:flex">
                <div className={`w-5 h-5 rounded-full border shadow-inner ${
                  isLight ? "bg-slate-200 border-slate-300" : "bg-slate-400/40 border-white/30"
                }`} />
              </div>

              {/* BOTTOM OFFSHOOT */}
              <div className="relative mt-8 sm:mt-4 pt-6 sm:pt-0">
                <div className="flex flex-col sm:flex-row items-center justify-end sm:pr-8">
                  <div className={`w-full sm:w-56 h-0 border-b border-dotted my-4 sm:my-0 sm:mr-4 transform sm:rotate-[8deg] origin-left ${
                    isLight ? "border-slate-300" : "border-white/30"
                  }`} />

                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                      isLight 
                        ? "border-slate-300 text-slate-500 bg-slate-100" 
                        : "border-white/30 text-slate-300 bg-white/5"
                    }`}>
                      ×
                    </div>
                    <div>
                      <h5 className={`text-[11px] font-extrabold uppercase tracking-wider ${
                        isLight ? "text-slate-800" : "text-slate-200"
                      }`}>
                        2026+ EXPANSION & NET ZERO
                      </h5>
                      <p className={`text-[10px] max-w-xs leading-relaxed ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}>
                        Deploying predictive AI telematics, scaling to 50,000+ commercial EV scooters, and accelerating urban India toward zero emissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          DEDICATED SECTION: GBG EV (FLEET & B2B SUBSIDIARY)
          ========================================================================
        */}
        <div
          id="gbgev-section"
          className="mb-24 rounded-3xl bg-white text-slate-900 p-6 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border-t-8 border-l-4 border-r-4 border-b-8 border-t-[#EF6C1E] border-l-[#EF6C1E] border-r-[#2563EB] border-b-[#2563EB]"
          style={{
            boxShadow: "0 25px 50px -12px rgba(239, 108, 30, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.15)"
          }}
        >
          {/* Top Brand Showcase Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 shrink-0">
                <ExactGbgEvLogo className="h-20 sm:h-24 w-auto" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#EF6C1E] bg-orange-50 border border-orange-200">
                  <span className="w-2 h-2 rounded-full bg-[#EF6C1E]" />
                  Official Subsidiary • Fleet & Hub Operations
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                  GBG EV Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  GoBabyGo Cabs Private Limited • Dedicated EV Fleet & Investment Platform
                </p>
              </div>
            </div>

            <a
              href="https://gbgev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#EF6C1E] to-[#2563EB] hover:opacity-95 shadow-md shadow-orange-500/20 transition-all hover:scale-105 shrink-0"
            >
              <span>Visit gbgev.com</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="space-y-16 mt-10">
            {/* WHO WE ARE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#EF6C1E] font-bold bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-300">
                  Who We Are?
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  Powering India's Green Mobility Revolution
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Founded in <strong>2021</strong> as <strong>GoBabyGo Cabs (OPC) Private Limited</strong>, our mission has always been to redefine urban mobility with sustainable and inclusive solutions.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  By <strong>2023</strong>, we expanded into <strong>GoBabyGo Cabs Private Limited</strong> to serve the passenger transport market, while also launching <a href="https://gbgev.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-bold underline hover:text-[#EF6C1E]">GBG EV</a> as a dedicated platform for EV rentals and investments.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  GBG EV is a fast-growing EV investment and fleet management company transforming last-mile delivery with clean, cost-efficient electric vehicles. By connecting investors with real EV assets, we create a <strong>win-win model</strong> where delivery riders get access to reliable scooters, businesses reduce costs, and investors enjoy steady monthly income.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Headquartered in <strong>Noida</strong> with <strong>75+ operational hubs</strong> across India, GBG EV manages a rapidly growing fleet of <strong>10,000+ electric vehicles</strong> backed by the trust of <strong>300+ investors</strong>.
                </p>
                <p className="text-xs text-slate-500 font-semibold italic pt-1 border-l-2 border-[#2563EB] pl-3">
                  As a proud subsidiary of GoBabyGo Cabs Private Limited, GBG EV is not just building a business - we're powering India's transition to a greener, smarter, and more sustainable future.
                </p>
              </div>

              {/* 4 Stat Badges */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center hover:border-[#EF6C1E] transition-all shadow-sm">
                  <p className="text-3xl sm:text-4xl font-black text-[#EF6C1E]">2021</p>
                  <p className="text-xs uppercase tracking-wider text-slate-800 font-bold mt-1">Founded</p>
                  <p className="text-[11px] text-slate-500 mt-1">Since 2021</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center hover:border-[#2563EB] transition-all shadow-sm">
                  <p className="text-3xl sm:text-4xl font-black text-[#2563EB]">10,000+</p>
                  <p className="text-xs uppercase tracking-wider text-slate-800 font-bold mt-1">Active Vehicle</p>
                  <p className="text-[11px] text-slate-500 mt-1">Commercial Fleet</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center hover:border-[#EF6C1E] transition-all shadow-sm">
                  <p className="text-3xl sm:text-4xl font-black text-[#EF6C1E]">75+</p>
                  <p className="text-xs uppercase tracking-wider text-slate-800 font-bold mt-1">Hubs</p>
                  <p className="text-[11px] text-slate-500 mt-1">Swapping & Charging</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center hover:border-[#2563EB] transition-all shadow-sm">
                  <p className="text-3xl sm:text-4xl font-black text-[#2563EB]">30+</p>
                  <p className="text-xs uppercase tracking-wider text-slate-800 font-bold mt-1">Cities</p>
                  <p className="text-[11px] text-slate-500 mt-1">Pan-India Reach</p>
                </div>
              </div>
            </div>

            {/* PURPOSE: MISSION & VISION */}
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-[#2563EB] font-bold bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                  Our Purpose
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mt-2">Driven by Purpose, Guided by Values</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EF6C1E] flex items-center justify-center font-bold mb-4">
                    <Target size={22} />
                  </div>
                  <h5 className="text-lg font-bold text-slate-900">Our Mission</h5>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">
                    Helping investors earn monthly income while giving riders and businesses affordable, clean EV rides, and moving India towards a zero-emission future.
                  </p>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-[#2563EB] transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold mb-4">
                    <Sparkles size={22} />
                  </div>
                  <h5 className="text-lg font-bold text-slate-900">Our Vision</h5>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">
                    Making city travel and deliveries simple, affordable, and eco-friendly with EVs, while building a trusted investment platform.
                  </p>
                </div>
              </div>
            </div>

            {/* LEADERSHIP MESSAGE */}
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border-2 border-slate-200 relative overflow-hidden shadow-sm">
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#EF6C1E] font-bold">
                      Leadership Message
                    </span>
                    <h4 className="text-2xl font-serif italic text-slate-900 mt-0.5">
                      Message from Our Founder
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-slate-900">Akash Ali</p>
                    <p className="text-xs text-[#EF6C1E] font-bold">
                      Founder & CEO, GBG EV (GoBabyGo Cabs (OPC) Private Limited)
                    </p>
                  </div>
                </div>
                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed border-l-4 border-[#EF6C1E] pl-4 italic">
                  "At GBG EV, we don't just deploy electric scooters - we empower sustainable mobility. Every vehicle in our fleet carries with it a promise: a promise of quality, transparency, and a relationship that delivers value well beyond the initial investment. Our journey in transforming last-mile delivery has been incredible, but what excites me most is what lies ahead. Together, we're not just building an ecosystem; we're driving India's zero-emission future."
                </blockquote>
              </div>
            </div>

            {/* THE JOURNEY OF GBGEV (2021 to 2026) */}
            <div className="space-y-8 pt-4 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#EF6C1E] font-bold bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-300">
                  Our Story
                </span>
                <h4 className="text-3xl font-bold text-slate-900">The Journey of GBGEV</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  From Corporate cabs to India's fastest-growing EV fleet — every milestone fueled by ambition, innovation, and green impact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#EF6C1E] bg-orange-100 px-2.5 py-1 rounded-md">2021</span>
                  <h5 className="text-base font-bold text-slate-900">Founded GoBabyGo Cabs</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Established GoBabyGo Cabs, laying the foundation for our journey in the Corporate mobility sector.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#2563EB] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#2563EB] bg-blue-100 px-2.5 py-1 rounded-md">2022</span>
                  <h5 className="text-base font-bold text-slate-900">Explored the EV Industry</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ventured into the electric vehicle industry, researching sustainable and green mobility solutions for the future.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#EF6C1E] bg-orange-100 px-2.5 py-1 rounded-md">2023</span>
                  <h5 className="text-base font-bold text-slate-900">Launched GBG EV</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Officially launched GBG EV as a dedicated platform for electric vehicle rentals and sustainable transportation.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#2563EB] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#2563EB] bg-blue-100 px-2.5 py-1 rounded-md">2024</span>
                  <h5 className="text-base font-bold text-slate-900">Reached 200 Vehicles</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Successfully expanded our active fleet to 200 electric vehicles, marking a significant milestone in our growth.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#EF6C1E] bg-orange-100 px-2.5 py-1 rounded-md">2025</span>
                  <h5 className="text-base font-bold text-slate-900">Scaled to 5,000 Vehicles</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rapidly accelerating our mission for eco-friendly transit by scaling our fleet to 5,000 electric vehicles on the road.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#2563EB] transition-all shadow-sm space-y-2">
                  <span className="text-xs font-black text-[#2563EB] bg-blue-100 px-2.5 py-1 rounded-md">2026</span>
                  <h5 className="text-base font-bold text-slate-900">10,000+ EV Fleet</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Achieving a massive milestone of over 10,000 active vehicles, establishing ourselves as a leader in India's EV fleet revolution.
                  </p>
                </div>
              </div>
            </div>

            {/* IMPACT METRICS */}
            <div className="space-y-8 pt-4 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#2563EB] font-bold bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                  Green Impact
                </span>
                <h4 className="text-3xl font-bold text-slate-900">Impact Through Smarter Solutions</h4>
                <p className="text-slate-600 text-xs sm:text-sm italic">
                  "Every solution we develop and every EV initiative we deliver is focused on driving innovation, sustainability, and measurable value for communities and businesses."
                  <br />
                  <span className="font-bold text-slate-800 not-italic">— Akash Ali, Founder & CEO, GBG EV</span>
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">10,000+</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">Active Vehicles</p>
                  <p className="text-[10px] text-slate-500">Commercial deployment</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-[#2563EB]">50,000+</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">Happy Riders</p>
                  <p className="text-[10px] text-slate-500">Zero petrol expense</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-[#EF6C1E]">115,781</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">Deliveries Powered</p>
                  <p className="text-[10px] text-slate-500">By 100% clean EV</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-[#2B6CB0]">1,215,522</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">Tree Plantation</p>
                  <p className="text-[10px] text-slate-500">Equivalent green impact</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-sm max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E40AF]">Direct Environmental Protection</span>
                <p className="text-4xl sm:text-5xl font-black text-[#2B6CB0] my-2">2,528 Tons</p>
                <p className="text-xs sm:text-sm font-semibold text-[#1E40AF]">
                  CO₂ Emissions Saved across 30+ Indian Smart Cities
                </p>
              </div>
            </div>

            {/* OUR CORE PILLARS */}
            <div className="space-y-8 pt-4 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#EF6C1E] font-bold bg-orange-100 px-3.5 py-1.5 rounded-full border border-orange-300">
                  Our People
                </span>
                <h4 className="text-3xl font-bold text-slate-900">OUR CORE PILLARS</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  The principles driving our team across innovation, operations, and green mobility
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm">
                  <span className="text-2xl font-black text-[#EF6C1E]">01</span>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mt-2">
                    CREATIVE VISION
                  </h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    We turn bold ideas into stunning visual experiences that captivate audiences.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#2563EB] transition-all shadow-sm">
                  <span className="text-2xl font-black text-[#2563EB]">02</span>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mt-2">
                    INNOVATION FIRST
                  </h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Pushing boundaries with cutting-edge design & technology every single day.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-[#EF6C1E] transition-all shadow-sm">
                  <span className="text-2xl font-black text-[#EF6C1E]">03</span>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mt-2">
                    TEAM SYNERGY
                  </h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Collaborative minds building extraordinary results together as one unit.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 
          ========================================================================
          DEDICATED SECTION: GBG X (MULTI-BRAND EV PLATFORM)
          ========================================================================
        */}
        <div
          id="gbgx-section"
          className="mb-24 rounded-3xl bg-[#05070B] text-slate-100 p-6 sm:p-12 lg:p-14 relative overflow-hidden border-2 border-[#00E5FF]"
          style={{
            boxShadow:
              "0 0 25px rgba(0, 229, 255, 0.35), 0 0 50px rgba(0, 229, 255, 0.15), inset 0 0 20px rgba(0, 229, 255, 0.08)"
          }}
        >
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Showcase Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-black rounded-2xl border border-white/20 shadow-inner shrink-0">
                <ExactGbgxLogo className="h-10 sm:h-14 w-auto" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/5 border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Official Subsidiary • Multi-Brand EV Retail & Spares
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                  GBG X Platform
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  GoBabyGo Private Limited • Curated Electric Mobility & Parts
                </p>
              </div>
            </div>

            <a
              href="https://gbgx.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-white hover:bg-slate-200 shadow-lg shadow-white/10 transition-all hover:scale-105 shrink-0"
            >
              <span>Visit gbgx.in</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="space-y-16 mt-10">
            {/* OUR JOURNEY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  Our Journey
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  EV Excellence, Redefined
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  GBG X was born from a singular vision — to transform how India experiences premium electric mobility. What started as a passion project has evolved into the nation's most trusted destination for top-rated electric vehicles.
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We don't just sell scooters; we curate eco-friendly travel experiences. Every vehicle in our multi-brand EV inventory is handpicked, rigorously inspected, and presented with a level of transparency that sets new automotive retail standards.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 text-center hover:border-white/30 transition-all">
                  <p className="text-base sm:text-lg font-bold text-white">Premium Selection</p>
                  <p className="text-xs text-slate-400 mt-1">Handpicked EVs</p>
                </div>
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 text-center hover:border-white/30 transition-all">
                  <p className="text-base sm:text-lg font-bold text-white">Verified Quality</p>
                  <p className="text-xs text-slate-400 mt-1">100% Inspected</p>
                </div>
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 text-center hover:border-white/30 transition-all">
                  <p className="text-base sm:text-lg font-bold text-white">Seamless Process</p>
                  <p className="text-xs text-slate-400 mt-1">Hassle Free</p>
                </div>
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 text-center hover:border-white/30 transition-all">
                  <p className="text-base sm:text-lg font-bold text-white">Trusted Partner</p>
                  <p className="text-xs text-slate-400 mt-1">Since 2023</p>
                </div>
              </div>
            </div>

            {/* LEADERSHIP MESSAGE */}
            <div className="bg-white/[0.02] p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Leadership Message
                    </span>
                    <h4 className="text-2xl font-serif italic text-white mt-0.5">
                      Message from Our Founder
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-white">Akash Ali</p>
                    <p className="text-xs text-slate-400 font-semibold">
                      Founder & CEO, GBG X (GoBabyGo Private Limited)
                    </p>
                  </div>
                </div>
                <blockquote className="text-slate-300 text-sm sm:text-base leading-relaxed border-l-4 border-white/40 pl-4 italic">
                  "At GBG X, we don't just sell Scooters – we fulfill dreams. Every vehicle that leaves our showroom carries with it a promise: a promise of quality, transparency, and a relationship that lasts well beyond the purchase. Our journey has been incredible, but what excites me most is what lies ahead. Together, we're not just driving scooters; we're driving India's automotive future."
                </blockquote>
              </div>
            </div>

            {/* THE LEGACY OF GBGX */}
            <div className="space-y-8 pt-4 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  Our Journey
                </span>
                <h4 className="text-3xl font-bold text-white">The Legacy of GBGX</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  From 2023 to Future — transforming the retail automotive landscape with certified electric vehicles and spares.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all space-y-2">
                  <span className="text-xs font-black text-black bg-white px-2.5 py-1 rounded-md">2023</span>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">The Beginning</p>
                  <h5 className="text-base font-bold text-white">One-Stop EV Platform</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    GBGX launched with a vision to create a comprehensive platform for electric scooters. Started with focus on convenience, reliability, and variety.
                  </p>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all space-y-2">
                  <span className="text-xs font-black text-black bg-white px-2.5 py-1 rounded-md">2023</span>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Building Ecosystem</p>
                  <h5 className="text-base font-bold text-white">Complete EV Solutions</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Expanded beyond scooters to include genuine spare parts, batteries, tires, brakes, and essential rider accessories.
                  </p>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all space-y-2">
                  <span className="text-xs font-black text-black bg-white px-2.5 py-1 rounded-md">2024</span>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Nationwide Reach</p>
                  <h5 className="text-base font-bold text-white">Pan India Presence</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Serving riders across India with verified quality products. Platform enables easy comparison and seamless buying experience.
                  </p>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all space-y-2">
                  <span className="text-xs font-black text-black bg-white px-2.5 py-1 rounded-md">2024</span>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Rider Community</p>
                  <h5 className="text-base font-bold text-white">Trust & Convenience</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Built a thriving community of EV riders. Offering high-quality verified products and dedicated support for sustainable mobility.
                  </p>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all space-y-2">
                  <span className="text-xs font-black text-black bg-white px-2.5 py-1 rounded-md">2025</span>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Future Ready</p>
                  <h5 className="text-base font-bold text-white">Innovation Focused</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Continuously expanding offerings with future-ready solutions. AI-powered recommendations and limitless possibilities ahead.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/20 flex flex-col justify-between text-center">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">Milestone Summary</span>
                    <p className="text-xs text-slate-400 mt-1">Growth & Innovation</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 my-4">
                    <div>
                      <p className="text-xl font-black text-white">2023</p>
                      <p className="text-[10px] uppercase text-slate-400">Started</p>
                    </div>
                    <div>
                      <p className="text-xl font-black text-white">5+</p>
                      <p className="text-[10px] uppercase text-slate-400">Milestones</p>
                    </div>
                    <div>
                      <p className="text-xl font-black text-white">∞</p>
                      <p className="text-[10px] uppercase text-slate-400">Future</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">Accelerating electric two-wheeler adoption</p>
                </div>
              </div>
            </div>

            {/* WHO WE ARE & CORE VALUES */}
            <div className="space-y-8 pt-4 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  Who We Are
                </span>
                <h4 className="text-3xl font-bold text-white">Shaping the Future of Mobility</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  All decisions we make are guided by our commitment to transform the automotive retail landscape in India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold mb-4">
                    <Sparkles size={20} />
                  </div>
                  <h5 className="text-lg font-bold text-white">Our Vision</h5>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    To become India’s most loved automotive ecosystem — where every buyer finds their perfect electric vehicle match through technology, trust, and transparency.
                  </p>
                </div>

                <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold mb-4">
                    <Target size={20} />
                  </div>
                  <h5 className="text-lg font-bold text-white">Our Mission</h5>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    To democratize premium EV ownership by offering unmatched selection, fair EV pricing, and exceptional customer experience across every touchpoint.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h5 className="text-center text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
                  Our Core Values
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/10 hover:border-white/25 transition-all text-center">
                    <CheckCircle size={22} className="mx-auto text-white mb-2" />
                    <h6 className="text-sm font-bold text-white">Trust First</h6>
                    <p className="text-xs text-slate-400 mt-1">Every promise delivered</p>
                  </div>

                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/10 hover:border-white/25 transition-all text-center">
                    <Zap size={22} className="mx-auto text-white mb-2" />
                    <h6 className="text-sm font-bold text-white">Innovation</h6>
                    <p className="text-xs text-slate-400 mt-1">Tech-driven smart mobility</p>
                  </div>

                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/10 hover:border-white/25 transition-all text-center">
                    <Users size={22} className="mx-auto text-white mb-2" />
                    <h6 className="text-sm font-bold text-white">Customer Focus</h6>
                    <p className="text-xs text-slate-400 mt-1">Your satisfaction, our priority</p>
                  </div>

                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/10 hover:border-white/25 transition-all text-center">
                    <Scale size={22} className="mx-auto text-white mb-2" />
                    <h6 className="text-sm font-bold text-white">Transparency</h6>
                    <p className="text-xs text-slate-400 mt-1">Honest on-road prices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MULTI-BRAND PHILOSOPHY & BRAND PARTNERS */}
            <div className="space-y-8 pt-4 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  Multi-Brand Philosophy
                </span>
                <h4 className="text-3xl font-bold text-white">One Destination, Infinite Choices</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  We believe every buyer deserves the freedom to explore the best electric mobility solutions. That's why GBG X partners with 10+ leading EV brands.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Compare across brands in one place",
                  "Unbiased expert recommendations",
                  "Best price guarantee",
                  "Seamless trade-in options",
                  "Complete after-sales support",
                  "Certified quality assurance"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-200">
                    <CheckCircle size={16} className="text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <p className="text-center text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6">
                  Trusted Brand Partners
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  {["E-Sprinto", "GBG EV", "YoBykes", "Goeen", "Bgauss", "Zelio", "Gravton"].map((brand) => (
                    <span
                      key={brand}
                      className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-bold text-white tracking-wider hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all cursor-default"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 
        ========================================================================
        4. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
        ========================================================================
      */}
      <section id="faq" className={`py-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t transition-colors ${
        isLight ? "border-slate-200" : "border-slate-800/80"
      }`}>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${
            isLight
              ? "text-orange-600 bg-orange-100 border-orange-200"
              : "text-orange-400 bg-orange-950/40 border-orange-800/40"
          }`}>
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}>
            Everything you need to know about GoBabyGo Cabs, the GBG EV fleet operations, and the GBGX multi-brand retail platform.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isLight
                    ? "bg-white border-slate-200 hover:border-orange-400 shadow-sm"
                    : "bg-[#121824] border-slate-800 hover:border-orange-500/30"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold leading-snug ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen 
                        ? "rotate-180 bg-orange-500/20 text-orange-500" 
                        : isLight ? "bg-slate-100 text-slate-500" : "bg-white/5 text-slate-300"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 pt-2 text-sm leading-relaxed border-t ${
                    isLight 
                      ? "text-slate-600 border-slate-100 bg-slate-50/50" 
                      : "text-slate-300 border-slate-800/60 bg-black/20"
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================================================
        5. BRAND MARQUEE
        ========================================================================
      */}
      <section className={`py-14 px-6 sm:px-10 lg:px-16 border-t transition-colors ${
        isLight ? "border-slate-200 bg-slate-100/60" : "border-slate-800/60 bg-[#090D14]"
      }`}>
        <div className="max-w-7xl mx-auto">
          <p className={`text-center text-xs uppercase tracking-widest mb-8 font-semibold ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Deployed Across India's Premier Last-Mile Logistics & Top EV Brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-90">
            {["Zomato", "Swiggy", "Blinkit", "Zepto", "Porter", "Instamart", "YoBykes", "Bgauss", "Zelio", "E-Sprinto"].map((brand) => (
              <div
                key={brand}
                className={`px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all tracking-wider ${
                  isLight
                    ? "bg-white border-slate-200 text-slate-700 shadow-sm hover:border-orange-400"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        6. CONTACT US SECTION (EXACT DESIGN MATCH)
        ========================================================================
      */}
      <section id="contact" className="relative pt-20 pb-24 overflow-hidden">
        {/* Top Header Banner with Photo Backdrop - Denim Blue Theme */}
        <div className="relative bg-gradient-to-r from-[#1B365D] via-[#2B6CB0] to-[#1E3A8A] text-white pt-16 pb-36 px-6 sm:px-10 lg:px-16 text-center">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Office background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B365D]/80 via-[#2B6CB0]/90 to-[#1B365D]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#EF6C1E] text-white shadow-md">
              Connect With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Contact us
            </h2>
            <div className="w-12 h-1 bg-[#EF6C1E] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-sky-100 max-w-lg mx-auto font-light leading-relaxed">
              GoBabyGo Cabs is ready to provide the right sustainable mobility solution according to your needs
            </p>
          </div>
        </div>

        {/* Elevated Two-Column Card - Pure White with Denim Blue & Orange Accents */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 -mt-24 sm:-mt-28">
          <div className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(27,54,93,0.14)] border-t-4 border-t-[#EF6C1E] border-x border-b border-slate-100 p-8 sm:p-12 lg:p-14 text-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Get in touch */}
              <div className="lg:col-span-5 space-y-8 lg:pr-6 lg:border-r lg:border-slate-100">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]">
                    Get in touch
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Have questions about our commercial EV fleets, battery swapping hubs, or GBGX retail platform? Reach out to us directly.
                  </p>
                </div>

                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Head Office */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-900/10 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E3A8A] text-sm">Head Office</h4>
                      <p className="text-slate-500 mt-1 leading-relaxed text-xs">
                        51/3, 1st Floor, Tower B, The Corenthum, Sector 62, Noida, Uttar Pradesh 201301
                      </p>
                    </div>
                  </div>

                  {/* Email Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-900/10 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E3A8A] text-sm">Email Us</h4>
                      <a href="mailto:contact@gbgev.com" className="block text-slate-500 hover:text-[#EF6C1E] mt-1 text-xs transition-colors font-medium">
                        contact@gbgev.com
                      </a>
                      <a href="mailto:support@gbgx.in" className="block text-slate-500 hover:text-[#EF6C1E] text-xs transition-colors font-medium">
                        support@gbgx.in
                      </a>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-900/10 transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E3A8A] text-sm">Call Us</h4>
                      <a href="tel:+918800023546" className="block text-slate-500 hover:text-[#EF6C1E] mt-1 text-xs transition-colors font-medium">
                        Phone : +91 88000 23546
                      </a>
                      <p className="text-slate-500 text-xs">
                        Support : +91 120 456 7890
                      </p>
                    </div>
                  </div>
                </div>

                {/* Follow our social media */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#1E3A8A] mb-3">
                    Follow our social media
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      aria-label="X (formerly Twitter)"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#2B6CB0] hover:bg-[#EF6C1E] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      aria-label="YouTube"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Send us a message */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]">
                    Send us a message
                  </h3>
                  <div className="w-10 h-1 bg-[#EF6C1E] rounded-full mt-2" />
                </div>

                {inlineContactSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2B6CB0] flex items-center justify-center mx-auto border border-[#2B6CB0]/20">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-[#1E3A8A]">
                      Message Successfully Sent
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for reaching out to GoBabyGo Cabs. A representative will contact you shortly.
                    </p>
                    <button
                      onClick={() => setInlineContactSuccess(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#2B6CB0] text-white hover:bg-[#1E3A8A] transition-colors shadow-md"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setInlineContactSuccess(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          placeholder="Company"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Message"
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#EF6C1E] hover:bg-[#D95B12] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-orange-500/25"
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        8. FOOTER SECTION (GLASSY & TRANSLUCENT AESTHETIC)
        ========================================================================
      */}
      <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/70 dark:bg-black/65 backdrop-blur-2xl text-slate-200 pt-16 pb-10 px-6 sm:px-10 lg:px-16 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        {/* Subtle Ambient Glow Orbs for Glass Refraction */}
        <div className="absolute -top-24 left-1/4 w-96 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand, About Us & Contact Us */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <a href="#home" className="inline-block bg-transparent focus:outline-none transition-transform duration-300 hover:scale-105">
                <GoBabyGoLogo className="h-16 sm:h-20 w-auto" variant="light" />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider mb-2 drop-shadow-sm">
                About Us
              </h4>
              <p className="text-xs text-slate-300/80 leading-relaxed font-light">
                We empower sustainable urban mobility across India through high-efficiency commercial EV fleets, rapid 90-second battery swapping hubs, and curated multi-brand EV retail.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider mb-3 drop-shadow-sm">
                Contact Us
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#FF7A00] text-black flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                    <Phone size={11} fill="currentColor" />
                  </div>
                  <a href="tel:+918800023546" className="hover:text-white transition-colors">
                    +91 88000 23546
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#FF7A00] text-black flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                    <Mail size={11} />
                  </div>
                  <a href="mailto:contact@gbgev.com" className="hover:text-white transition-colors">
                    contact@gbgev.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider mb-4 drop-shadow-sm">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300/80">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#subsidiaries" className="hover:text-white transition-colors">More Search</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Events</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider mb-4 drop-shadow-sm">
              Helpful Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300/80">
              <li>
                <a href="#subsidiaries" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Supports</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Terms & Condition</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe More Info & Scroll to Top */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 drop-shadow-sm">
                Subscribe More Info
              </h4>

              {newsletterSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold backdrop-blur-md">
                  Thank you for subscribing to GBG Cabs updates!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSuccess(true);
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center bg-white/95 dark:bg-white/90 backdrop-blur-md rounded-md px-3.5 py-2.5 shadow-inner border border-white/20">
                    <Mail size={15} className="text-slate-500 mr-2.5 shrink-0" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your Email"
                      className="bg-transparent text-xs text-slate-900 w-full focus:outline-none placeholder-slate-400 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-[#FF7A00] hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Scroll-to-Top Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-7 h-7 rounded-sm bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-orange-500/30 active:scale-95"
                aria-label="Scroll to top"
              >
                <ChevronDown size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Translucent Glass Divider Rule */}
        <div className="relative z-10 max-w-7xl mx-auto border-t border-white/10 mt-12 mb-6" />

        {/* Bottom Bar: Exact 5 Social Media Icons & Copyright */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="hidden sm:block w-36" />

          {/* Centered Social Media Buttons: Facebook, X, Instagram, LinkedIn, YouTube */}
          <div className="flex items-center justify-center gap-3">
            
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-orange-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-full bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-orange-500/20"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-orange-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-orange-500/20"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-[#FF7A00] hover:bg-orange-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-orange-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

          </div>

          {/* Right Copyright */}
          <p className="text-[11px] text-slate-400 text-center sm:text-right font-light">
            2026 © GoBabyGo Cabs Private Limited. All Right reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <MainApp />
    </AppErrorBoundary>
  );
}