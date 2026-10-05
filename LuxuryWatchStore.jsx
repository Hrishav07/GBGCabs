import React, { useState, useEffect, useLayoutEffect, Component, useRef, useCallback } from "react";
import { flushSync } from "react-dom";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Phone,
  Mail,
  Home,
  Sparkles,
  ExternalLink,
  Target,
  ChevronDown,
  HelpCircle,
  Zap,
  Users,
  Scale,
  Sun,
  Moon,
  Smartphone,
  Compass,
  CalendarCheck,
  KeyRound,
  Lightbulb,
  Calendar,
  Car,
  BatteryCharging,
  Globe2,
  Building2,
  MapPin,
  Lock,
  ShieldCheck,
  TrendingUp,
  Award,
  Store,
  Truck,
  Wrench,
  BarChart3,
  Layers
} from "lucide-react";

import {
  BookingModal,
  InquiryModal,
  AdminDashboardModal,
  FooterNewsletter
} from "./GBGModals.jsx";

import gbgEvLogoImg from "./assets/images.jpg";
import gbgxLogoImg from "./assets/Screenshot 2026-08-31 150402.png";
import gbgEvEmblemImg from "./assets/gbg_ev_emblem.png";
import gbgEvLogoCleanImg from "./assets/gbg_ev_logo_clean.png";
import gbgxLogoWhiteImg from "./assets/gbgx_logo_white.png";
import gbgxLogoBlueImg from "./assets/gbgx_logo_blue.png";
import gbgScooterImg from "./assets/Screenshot 2026-09-11 173032.png";
import orangeVespaImg from "./assets/orange_vespa_scooter.png";
import gbgDeliveryScooterImg from "./assets/gbg_ev_delivery_scooter.png";
import heroEffortlessCommutesImg from "./assets/hero_effortless_commutes.jpg";
import heroLineupImg from "./assets/hero_multi_scooter_lineup.png";
import heroBatteriesImg from "./assets/hero_ev_batteries.png";
import heroOliveVespaImg from "./assets/hero_olive_vespa.jpg";
import heroProRiderImg from "./assets/hero_pro_rider.jpg";
import heroDeliveryNightImg from "./assets/hero_delivery_scooter_night.jpg";
import gbgHqOfficeImg from "./assets/gbg_hq_office.jpg";
import gbgEvFleetPartnersImg from "./assets/gbg_ev_fleet_partners.png";
import gbgBatteryReplacementImg from "./assets/gbg_battery_replacement.jpg";
import gbgMultiBrandFleetImg from "./assets/gbg_multibrand_fleet.jpg";
import bgaussLogoImg from "./assets/brands/bgauss.png";
import motovoltLogoImg from "./assets/brands/motovolt.png";
import gravtonLogoImg from "./assets/brands/gravton.png";
import goeenDarkImg from "./assets/brands/goeen_dark.png";
import zelioLogoImg from "./assets/brands/zelio.png";

/**
 * Performant IntersectionObserver Hook for Scroll Reveals
 */
function useScrollReveal(options = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      }
    }, options);

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [options]);

  return [domRef, isVisible];
}

/**
 * Reusable Scroll Reveal Wrapper
 */
function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 700
}) {
  const [ref, isVisible] = useScrollReveal();

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-left":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10";
      case "fade-right":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10";
      case "zoom-in":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
      case "fade-up":
      default:
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className={`transition-all ${isVisible ? "opacity-100 transform-none" : "will-change-transform " + getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}

export class AppErrorBoundary extends Component {
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

export const GoBabyGoLogo = ({ className = "h-12 w-auto", variant = "default", src = null }) => {
  const [imgError, setImgError] = useState(!src);
  const navyColor = variant === "light" ? "#F8FAFC" : "#0F1E38";
  const orangeColor = "#EF6C1E";

  if (src && !imgError) {
    return (
      <img
        src={src}
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
            <text x="22" y="0" fill={orangeColor} fontSize="20" fontWeight="900" fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.05em">
              GO
            </text>
            <text x="66" y="0" fill={navyColor} fontSize="20" fontStyle="italic" fontWeight="900" fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.06em">
              BABY
            </text>
            <text x="142" y="0" fill={orangeColor} fontSize="20" fontWeight="900" fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.05em">
              GO
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export const ExactGbgEvLogo = ({ className = "h-28 sm:h-36 md:h-40 w-auto" }) => {
  return (
    <img
      src={gbgEvLogoCleanImg}
      alt="GBG EV Official Logo"
      className={`${className} object-contain`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = gbgEvLogoImg;
      }}
    />
  );
};

export const ExactGbgxLogo = ({ className = "h-14 sm:h-18 md:h-20 w-auto", isLight = false }) => {
  return (
    <img
      src={isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg}
      alt="GBGX Official Logo"
      className={`${className} object-contain`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = gbgxLogoImg;
      }}
    />
  );
};

export const GbgEvEmblem = ({ className = "w-6 h-6", title = "GBG EV" }) => (
  <img
    src={gbgEvEmblemImg}
    alt={title}
    className={`${className} object-contain rounded-full select-none`}
    draggable="false"
  />
);

export const GbgEvNavIcon = ({ isActive = false, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${isActive ? "w-[32px] h-[32px]" : "w-[22px] h-[22px]"}`}>
      <img
        src={gbgEvEmblemImg}
        alt="GBG EV Official Emblem"
        className={`object-contain transition-all duration-200 rounded-full ${
          isActive
            ? "w-[30px] h-[30px] drop-shadow-[0_1px_6px_rgba(239,108,30,0.5)] scale-105"
            : "w-[20px] h-[20px] opacity-85 group-hover:opacity-100 group-hover:scale-110 drop-shadow-sm"
        } ${className}`}
      />
    </div>
  );
};

export const GbgxNavIcon = ({ isActive = false, isLight = false, className = "" }) => {
  const logoSrc = isActive ? gbgxLogoBlueImg : (isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg);
  return (
    <div className={`flex items-center justify-center ${isActive ? "w-[44px] h-[32px]" : "w-[34px] h-[22px]"}`}>
      <img
        src={logoSrc}
        alt="GBGX Official Logo"
        className={`object-contain transition-all duration-200 ${
          isActive
            ? "w-[42px] h-auto [filter:hue-rotate(58deg)_saturate(2)_brightness(1.2)] scale-105"
            : isLight
            ? "w-[28px] h-auto opacity-75 group-hover:opacity-100 group-hover:scale-105"
            : "w-[30px] h-auto opacity-80 group-hover:opacity-100 group-hover:scale-105"
        } ${className}`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = gbgxLogoImg;
        }}
      />
    </div>
  );
};

export const GbgEvScooterImage = ({ className = "w-full max-w-[440px] h-auto object-contain" }) => {
  const [srcIndex, setSrcIndex] = useState(0);

  const candidateSources = [
    "/assets/Screenshot 2026-09-11 173032.png",
    "/Screenshot 2026-09-11 173032.png",
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <img
      src={candidateSources[srcIndex]}
      alt="GBG EV Commercial Electric Scooter"
      className={`${className} drop-shadow-2xl transition-transform duration-500 hover:scale-105`}
      onError={() => {
        if (srcIndex < candidateSources.length - 1) {
          setSrcIndex((prev) => prev + 1);
        }
      }}
    />
  );
};

export const GbgxShowroomImage = ({ className = "w-full h-auto object-cover" }) => {
  const [srcIndex, setSrcIndex] = useState(0);

  const candidateSources = [
    "/assets/assamstoreopening-Y13Bl-Um.webp",
    "/assamstoreopening-Y13Bl-Um.webp",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <img
      src={candidateSources[srcIndex]}
      alt="GBGX Experience Store & Showroom"
      className={`${className} transition-transform duration-700`}
      onError={() => {
        if (srcIndex < candidateSources.length - 1) {
          setSrcIndex((prev) => prev + 1);
        }
      }}
    />
  );
};

const HERO_EV_SLIDES = [
  {
    id: "gbgx-multi-brand-lineup",
    tag: "Multi-Brand EV Platform",
    badge: "Motovolt • BG • Zelio • Certified",
    title: "India's Multi-Brand EV Revolution",
    description:
      "Explore India's premier lineup of certified electric two-wheelers in one dynamic ecosystem. Compare high-torque commercial workhorses and sleek family commuters with test rides and flexible ownership at GBG X.",
    cta: "Explore Multi-Brand Fleet",
    ctaTarget: "#subsidiaries",
    nodeLabel: "Multi-Brand Lineup",
    nodeCity: "Motovolt • BG • Zelio",
    bookingModel: "GBG EV Multi-Brand",
    bgImage: heroLineupImg,
    thumb: heroLineupImg,
    bgPosition: "object-[center_55%]",
    thumbPosition: "object-center"
  },
  {
    id: "urban-lifestyle-riders",
    tag: "Urban EV Lifestyle",
    badge: "Smart • Sustainable • Stylish",
    title: "Next-Gen Freedom & Effortless Commutes",
    description:
      "Designed for modern daily riders, college commuters, and green mobility advocates. Whisper-quiet electric powertrains, featherweight handling, and zero fuel costs crafted for today's lifestyle.",
    cta: "Discover Commuter Models",
    ctaTarget: "#subsidiaries",
    nodeLabel: "Urban Lifestyle Rides",
    nodeCity: "College & Daily Commute",
    bookingModel: "BG EV Electric",
    bgImage: heroEffortlessCommutesImg,
    thumb: heroEffortlessCommutesImg,
    bgPosition: "object-[center_35%]",
    thumbPosition: "object-[center_35%]"
  },
  {
    id: "advanced-battery-swapping",
    tag: "Energy & Infrastructure",
    badge: "Lithium Power • 90-Sec Swap",
    title: "Zero Downtime Battery Swapping Network",
    description:
      "Supercharge commercial and retail mobility with ultra-safe, high-density lithium packs from Future, Prime 48, and Zynecell. Supported by 75+ rapid swapping hubs keeping fleets rolling non-stop.",
    cta: "Locate Battery Swapping Hubs",
    ctaTarget: "#faq",
    nodeLabel: "Rapid Battery Swap",
    nodeCity: "75+ Swapping Hubs • Smart BMS",
    bookingModel: "GBG EV Multi-Brand",
    bgImage: heroBatteriesImg,
    thumb: heroBatteriesImg,
    bgPosition: "object-center",
    thumbPosition: "object-center"
  },
  {
    id: "retro-luxury-edition",
    tag: "Bespoke Performance Edition",
    badge: "Retro Luxury • Custom Tuned",
    title: "Heritage Elegance Meets Zero-Emission Thrill",
    description:
      "Experience the artistry of custom electric craftsmanship. Signature olive gloss bodywork, racing-grade gold inverted dampers, dual disc brakes, and instant high-torque acceleration tuned for true connoisseurs.",
    cta: "View Custom Editions",
    ctaTarget: "#subsidiaries",
    nodeLabel: "Custom Retro Edition",
    nodeCity: "Bespoke Italian Craftsmanship",
    bookingModel: "Custom Retro Vespa Edition",
    bgImage: heroOliveVespaImg,
    thumb: heroOliveVespaImg,
    bgPosition: "object-center",
    thumbPosition: "object-center"
  },
  {
    id: "commercial-delivery-fleet",
    tag: "Commercial Delivery Fleet",
    badge: "10,000+ Active Gig Pilots",
    title: "Empowering India's Last-Mile Delivery Champions",
    description:
      "Fueling India's gig economy with heavy-duty, zero-fuel commercial electric scooters. Equipped with rapid battery swapping and dedicated fleet telematics for Swiggy, Zomato, and Zepto delivery pilots.",
    cta: "Partner with GBG Fleet",
    ctaTarget: "#contact",
    nodeLabel: "Commercial Delivery Fleet",
    nodeCity: "Swiggy, Zomato, Zepto Hubs",
    bookingModel: "Motovolt Urbano",
    bgImage: heroDeliveryNightImg,
    thumb: heroDeliveryNightImg,
    bgPosition: "object-[center_55%]",
    thumbPosition: "object-center"
  }
];

const SWISS_ARCHITECTURAL_TIMELINE = [
  {
    level: "01",
    year: "2021",
    leftTitle: "FOUNDATION & ORIGIN",
    leftSub: "Sector 62, Noida HQ",
    rightTitle: "GOBABYGO CABS (OPC) PRIVATE LIMITED",
    rightItems: [
      "Inception of clean corporate cab mobility network",
      "Regulatory registrations & EV groundwork in NCR"
    ]
  },
  {
    level: "02",
    year: "2022",
    leftTitle: "COMMERCIAL EV PILOTS",
    leftSub: "Field Operations & Testing",
    rightTitle: "TWO-WHEELER LOGISTICS VIABILITY",
    rightItems: [
      "Extensive commercial fleet trials with gig delivery riders",
      "Evaluation of fast battery swapping infrastructure"
    ]
  },
  {
    level: "03",
    year: "2023",
    leftTitle: "LAUNCH OF GBG EV",
    leftSub: "Corporate Reincorporation",
    rightTitle: "DEDICATED B2B FLEET & HUB VERTICAL",
    rightItems: [
      "Transition into GoBabyGo Cabs Private Limited",
      "Specialized enterprise scooter rental & swap station hubs"
    ]
  },
  {
    level: "04",
    year: "2024",
    leftTitle: "GBGX PLATFORM",
    leftSub: "Automotive E-Store & Showroom",
    rightTitle: "MULTI-BRAND EV RETAIL & SPARES",
    rightItems: [
      "10+ leading OEM manufacturer partnerships",
      "Certified lithium battery packs, chargers & genuine parts"
    ]
  },
  {
    level: "05",
    year: "2025",
    leftTitle: "BUY, LEASE & EARN",
    leftSub: "Fintech Mobility Assets",
    rightTitle: "PASSIVE WEALTH GENERATION",
    rightItems: [
      "Over 300+ trusted retail and institutional fleet investors",
      "Telematics-backed predictable passive monthly lease returns"
    ]
  },
  {
    level: "06",
    year: "2026",
    leftTitle: "PAN-INDIA DEPLOYMENT",
    leftSub: "Major Quick-Commerce Footprint",
    rightTitle: "10,000+ ACTIVE COMMERCIAL EVS",
    rightItems: [
      "75+ operational charging & battery swap hubs across 30+ cities",
      "Over 2,556 tons of CO₂ emissions mitigated"
    ]
  },
  {
    level: "07",
    year: "2026+",
    leftTitle: "NET ZERO HORIZON",
    leftSub: "Next-Gen Logistics",
    rightTitle: "AI TELEMATICS & 50,000+ FLEET TARGET",
    rightItems: [
      "Predictive AI routing, solar swap micro-grids & pan-India scale",
      "Accelerating urban India toward universal zero-emission transport"
    ]
  }
];

const TEAM_PILLARS = [
  {
    number: "01",
    title: "CREATIVE VISION",
    description: "We turn bold ideas into stunning visual experiences that captivate audiences."
  },
  {
    number: "02",
    title: "INNOVATION FIRST",
    description: "Pushing boundaries with cutting-edge design & technology every single day."
  },
  {
    number: "03",
    title: "TEAM SYNERGY",
    description: "Collaborative minds building extraordinary results together as one unit."
  }
];

const TEAM_MEMBERS = [
  {
    name: "Akash Ali",
    role: "CEO & Founder",
    department: "Executive Leadership",
    badge: "Founder & Visionary",
    image: "/team/akash_headshot.png",
    bio: "Visionary leader driving innovation and growth across all departments with 15+ years of experience.",
    tags: ["EV Fleet Scaling", "Strategic Growth", "Clean Mobility"],
    theme: "orange",
  },
  {
    name: "Vijaya Shrivastava",
    role: "Chief of Staff",
    department: "Executive Operations",
    badge: "Strategy & Governance",
    image: "/team/vijaya_headshot.png",
    bio: "Crafting visually stunning experiences with creative excellence and brand storytelling mastery.",
    tags: ["Corporate Strategy", "Operations", "Governance"],
    theme: "navy",
  },
  {
    name: "Suryansh Raj Pandey",
    role: "Head of Marketing",
    department: "Brand & Growth",
    badge: "Marketing & Outreach",
    image: "/team/suryansh_headshot.png",
    bio: "Designing intuitive and beautiful user-centered interfaces that delight millions of users.",
    tags: ["Brand Strategy", "Market Expansion", "Digital Growth"],
    theme: "orange",
  },
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

function SwissArchitecturalTimeline({ isLight }) {
  return (
    <div className="mb-32">
      <ScrollReveal variant="fade-up" className="text-center mb-16">
        <h3
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          The Growth Evolution of GBG Cabs
        </h3>
        <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
      </ScrollReveal>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {SWISS_ARCHITECTURAL_TIMELINE.map((item, idx) => {
          return (
            <ScrollReveal
              key={item.level}
              variant="fade-up"
              delay={idx * 60}
              className="w-full group"
            >
              <div className="flex flex-col items-center relative py-6">
                
                {/* Level Digits */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter transition-colors duration-300 ${
                      isLight
                        ? "text-slate-900 group-hover:text-orange-500"
                        : "text-white group-hover:text-orange-400"
                    }`}
                  >
                    {item.level}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-500">
                    {item.year}
                  </span>
                </div>

                {/* 12-Column Grid */}
                <div className="w-full grid grid-cols-12 items-center relative py-2">
                  
                  {/* Left Column */}
                  <div className="col-span-5 text-right pr-4 sm:pr-8 space-y-1">
                    <h4
                      className={`text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider leading-snug transition-colors duration-200 ${
                        isLight ? "text-slate-900" : "text-slate-100"
                      }`}
                    >
                      {item.leftTitle}
                    </h4>
                    {item.leftSub && (
                      <p className={`text-[11px] sm:text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        {item.leftSub}
                      </p>
                    )}
                  </div>

                  {/* Diagonal Slash */}
                  <div className="col-span-2 flex items-center justify-center h-28 sm:h-36 relative">
                    <svg
                      viewBox="0 0 50 140"
                      className="w-8 sm:w-10 md:w-12 h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
                      fill="none"
                    >
                      <line
                        x1="42"
                        y1="2"
                        x2="8"
                        y2="138"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        className={`transition-colors duration-300 ${
                          isLight
                            ? "text-slate-900 group-hover:text-orange-500"
                            : "text-slate-200 group-hover:text-orange-400"
                        }`}
                      />
                    </svg>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-5 text-left pl-4 sm:pl-8 space-y-1">
                    <h4
                      className={`text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider leading-snug transition-colors duration-200 ${
                        isLight ? "text-slate-900" : "text-slate-100"
                      }`}
                    >
                      {item.rightTitle}
                    </h4>
                    <div className="space-y-0.5 pt-0.5">
                      {item.rightItems.map((sub, sIdx) => (
                        <p
                          key={sIdx}
                          className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed"
                        >
                          {sub}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}


// ============================================================================
// MOBILE SCULPTED FLUID BOTTOM NAVIGATION BAR
// Inspired by modern curved notch / floating bubble navigation
// Featuring:
// - Dynamic sliding crest with continuous Bezier curves
// - Floating elevated active circular icon button with tactile pop animation
// - Full responsiveness across OLED mobile phone screens & safe-area insets
// - Real-time scrollspy tracking and smooth section navigation
// ============================================================================
function MobileCurvedNavBar({ activeSection, handleNavClick, isLight }) {
  const items = [
    { id: "home", label: "Home", icon: <Home size={19} />, activeIcon: <Home size={22} className="stroke-[2.4]" /> },
    {
      id: "gbgev-section",
      label: "GBG EV",
      icon: <GbgEvNavIcon isActive={false} />,
      activeIcon: <GbgEvNavIcon isActive={true} />
    },
    {
      id: "gbgx-section",
      label: "GBG X",
      icon: <GbgxNavIcon isActive={false} isLight={isLight} />,
      activeIcon: <GbgxNavIcon isActive={true} isLight={isLight} />
    },
    { id: "team", label: "Team", icon: <Users size={19} />, activeIcon: <Users size={22} className="stroke-[2.4]" /> },
    { id: "faq", label: "FAQ", icon: <HelpCircle size={19} />, activeIcon: <HelpCircle size={22} className="stroke-[2.4]" /> },
    { id: "contact", label: "Contact", icon: <Phone size={19} />, activeIcon: <Phone size={22} className="stroke-[2.4]" /> }
  ];

  const matchedIndex = items.findIndex((it) => it.id === activeSection);
  const activeIndex = matchedIndex >= 0 ? matchedIndex : 0;
  const activeItem = items[activeIndex] || items[0];
  const isGbgX = activeItem.id === "gbgx-section";

  // Dynamic center position based on actual number of items
  // Instant, GPU-accelerated: zero layout thrashing, zero getBoundingClientRect calls on scroll
  const leftPosition = `${((activeIndex + 0.5) / items.length) * 100}%`;

  return (
    <>
      <style>{`
        @keyframes scalePop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-none"
        style={{
          paddingBottom: "max(0.6rem, env(safe-area-inset-bottom, 0.6rem))"
        }}
      >
        <div className="max-w-md mx-auto px-3 pointer-events-auto">
          <div
            className={`relative rounded-[28px] border transition-all duration-300 backdrop-blur-2xl backdrop-saturate-180 ${
              isLight
                ? "bg-white/75 border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.10)] text-slate-700"
                : "bg-[#0B0F19]/75 border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.6)] text-slate-300"
            }`}
            style={{
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              backdropFilter: "blur(24px) saturate(180%)"
            }}
          >
            {/* Sliding Curved Crest & Floating Elevated Circular Active Button */}
            <div
              className="absolute -top-[30px] pointer-events-none z-20 flex flex-col items-center"
              style={{
                left: leftPosition,
                transform: "translateX(-50%) translateZ(0)",
                transition: "left 260ms cubic-bezier(0.25, 1, 0.5, 1)",
                willChange: "left"
              }}
            >
              {/* Sculpted Crest SVG: solid dome completely wraps behind the circular button */}
              <div className="relative">
                <svg
                  width="84"
                  height="34"
                  viewBox="0 0 84 34"
                  className="drop-shadow-[0_-3px_8px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_-4px_10px_rgba(0,0,0,0.5)]"
                >
                  {/* Glassy Body Fill: blends seamlessly with the navbar card */}
                  <path
                    d="M 0 32 C 18 32, 23 2, 42 2 C 61 2, 66 32, 84 32 L 84 46 L 0 46 Z"
                    className={isLight ? "fill-white/80" : "fill-[#0B0F19]/80"}
                  />
                  {/* Continuous Top Outline */}
                  <path
                    d="M 0 32 C 18 32, 23 2, 42 2 C 61 2, 66 32, 84 32"
                    fill="none"
                    className={isLight ? "stroke-slate-200/80" : "stroke-white/15"}
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              {/* Elevated Floating Circular Active Button */}
              <div
                className={`absolute top-[5px] w-[48px] h-[48px] rounded-full flex items-center justify-center border-[2.5px] backdrop-blur-xl transition-all duration-200 ${
                  isGbgX
                    ? isLight
                      ? "border-[#A855F7] bg-purple-50/95 text-[#A855F7] shadow-[0_4px_12px_rgba(168,85,247,0.25)]"
                      : "border-[#B026FF] bg-[#160B24]/95 text-[#C084FC] shadow-[0_4px_14px_rgba(176,38,255,0.35)]"
                    : isLight
                    ? "border-[#EF6C1E] bg-orange-50/90 text-[#EF6C1E] shadow-[0_6px_18px_rgba(239,108,30,0.35)]"
                    : "border-[#EF6C1E] bg-[#16100B]/90 text-[#EF6C1E] shadow-[0_6px_20px_rgba(239,108,30,0.45)]"
                }`}
                style={{
                  WebkitBackdropFilter: "blur(16px)",
                  backdropFilter: "blur(16px)"
                }}
              >
                <div key={activeSection} className="animate-[scalePop_0.26s_cubic-bezier(0.34,1.56,0.64,1)]">
                  {activeItem.activeIcon}
                </div>

                {activeItem.badge && (
                  <span
                    className={`absolute -top-1 -right-1 text-[7px] font-mono font-black uppercase px-1.5 py-[0.5px] rounded-full shadow-sm leading-none ${
                      isGbgX ? "bg-[#A855F7] text-white" : "bg-[#EF6C1E] text-white"
                    }`}
                  >
                    {activeItem.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Tab Navigation Items (Responsive grid matching items count) */}
            <div
              className="grid items-end px-1 pt-2.5 pb-1 h-[66px]"
              style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
            >
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isTabGbgX = item.id === "gbgx-section";

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-label={item.label}
                    className="relative flex flex-col items-center justify-end h-full py-1 px-0.5 select-none cursor-pointer group active:scale-95 transition-transform"
                  >
                    {/* Inactive Icon with Badge */}
                    <div
                      className={`flex flex-col items-center justify-center transition-all duration-150 ${
                        isActive
                          ? "opacity-0 scale-75 -translate-y-2 pointer-events-none"
                          : "opacity-100 scale-100 translate-y-0 group-hover:scale-105"
                      }`}
                    >
                      <div className="relative p-1">
                        <span
                          className={`transition-colors duration-150 ${
                            isLight
                              ? "text-slate-500 group-hover:text-slate-800"
                              : "text-slate-400 group-hover:text-slate-100"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.badge && (
                          <span
                            className={`absolute -top-1 -right-2 text-[7px] font-mono font-black uppercase px-1 py-[0.5px] rounded leading-none ${
                              isTabGbgX
                                ? "bg-purple-500/20 text-[#A855F7] border border-purple-500/30"
                                : "bg-[#EF6C1E]/20 text-[#EF6C1E] border border-[#EF6C1E]/30"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tab Label */}
                    <span
                      className={`text-[10px] sm:text-[10.5px] tracking-tight transition-all duration-150 leading-none mt-1 ${
                        isActive
                          ? isTabGbgX
                            ? "text-[#A855F7] dark:text-[#C084FC] font-extrabold scale-105"
                            : "text-[#EF6C1E] font-extrabold scale-105"
                          : isLight
                          ? "text-slate-500 font-medium group-hover:text-slate-700"
                          : "text-slate-400 font-medium group-hover:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* iOS-Style Home Indicator Bar */}
            <div className="w-28 h-1 rounded-full bg-slate-300 dark:bg-slate-700/80 mx-auto mt-0.5 mb-1.5 opacity-75" />
          </div>
        </div>
      </nav>
    </>
  );
}

/**
 * BRAND SOCIAL SWITCHER WITH SMOOTH SLIDING PILL EFFECT
 * Features GPU-accelerated spring slide & morph between GBG EV and GBGX
 */
function BrandSocialSwitcher({ socialTab, setSocialTab, isLight }) {
  const containerRef = useRef(null);
  const evBtnRef = useRef(null);
  const gbgxBtnRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 4, width: 48, ready: false });

  const updateSlider = useCallback(() => {
    const activeBtn = socialTab === "gbgev" ? evBtnRef.current : gbgxBtnRef.current;
    if (activeBtn && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const left = btnRect.left - containerRect.left;
      const width = btnRect.width;
      if (width > 0) {
        setSliderStyle({
          left,
          width,
          ready: true
        });
      }
    }
  }, [socialTab]);

  useIsomorphicLayoutEffect(() => {
    updateSlider();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSlider) : null;
    if (ro && containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", updateSlider);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateSlider);
    };
  }, [updateSlider]);

  const isEv = socialTab === "gbgev";

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Brand switcher for social media"
      className={`relative inline-flex items-center p-1 rounded-full text-xs font-semibold border backdrop-blur-md transition-colors duration-300 select-none ${
        isLight
          ? "bg-slate-200/80 border-slate-300/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
          : "bg-white/[0.08] border-white/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"
      }`}
    >
      {/* Sliding Active Pill Background (Electric Blue Pill for GBGX) */}
      <div
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full pointer-events-none bg-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.4)]"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
          opacity: sliderStyle.ready && !isEv ? 1 : 0,
          transform: sliderStyle.ready && !isEv ? "scale(1)" : "scale(0.92)",
          transition: sliderStyle.ready
            ? "left 320ms cubic-bezier(0.25, 1, 0.5, 1), width 320ms cubic-bezier(0.25, 1, 0.5, 1), opacity 260ms ease, transform 260ms ease"
            : "none",
          willChange: "left, width, opacity, transform"
        }}
      />

      {/* GBG EV Tab Button (Emblem only, brightens without orange pill background) */}
      <button
        ref={evBtnRef}
        type="button"
        role="tab"
        aria-selected={isEv}
        onClick={() => setSocialTab("gbgev")}
        aria-label="GBG EV Social Channels"
        title="GBG EV"
        className="relative z-10 px-3 sm:px-4 py-1 rounded-full cursor-pointer flex items-center justify-center h-8 sm:h-9 select-none"
      >
        <img
          src={gbgEvEmblemImg}
          alt="GBG EV"
          onLoad={updateSlider}
          className={`w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain rounded-full shrink-0 transition-all duration-300 ${
            isEv
              ? "opacity-100 scale-105 drop-shadow-[0_1px_4px_rgba(239,108,30,0.45)]"
              : "opacity-40 scale-95 hover:opacity-75"
          }`}
        />
      </button>

      {/* GBGX Tab Button */}
      <button
        ref={gbgxBtnRef}
        type="button"
        role="tab"
        aria-selected={!isEv}
        onClick={() => setSocialTab("gbgx")}
        aria-label="GBG X Social Channels"
        title="GBG X"
        className="relative z-10 px-3.5 sm:px-4.5 py-1 rounded-full cursor-pointer flex items-center justify-center h-8 sm:h-9 select-none"
      >
        <img
          src={!isEv ? gbgxLogoWhiteImg : isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg}
          alt="GBGX Official Logo"
          onLoad={updateSlider}
          className={`h-3 sm:h-3.5 w-auto object-contain shrink-0 transition-all duration-300 ${
            !isEv
              ? "opacity-100 scale-100"
              : "opacity-40 scale-95 hover:opacity-75"
          }`}
        />
      </button>
    </div>
  );
}


function MainApp({ onReplayIntro }) {
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
  const [hoveredFaq, setHoveredFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [socialTab, setSocialTab] = useState("gbgev");

  // Backend Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalService, setBookingModalService] = useState("scooter_subscription");
  const [bookingModalModel, setBookingModalModel] = useState("GBG EV Multi-Brand");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryModalType, setInquiryModalType] = useState("corporate_fleet");
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Active Navigation Section for Mobile Bottom Dock & Desktop Header
  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");
  const isNavClickRef = useRef(false);
  const navClickTimerRef = useRef(null);

  // Smart Top Nav Visibility: Hide on Scroll Down, Reappear on Scroll Up
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Lock background scroll when mobile menu is open to ensure zero jank and 60fps transitions
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (["home", "gbgev-section", "gbgx-section", "team", "faq", "contact"].includes(hashId)) {
        activeSectionRef.current = hashId;
        setActiveSection(hashId);
      }
    }

    const sectionIds = ["home", "gbgev-section", "gbgx-section", "team", "faq", "contact"];

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;

          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;
          const scrollDiff = currentScrollY - prevScrollY;

          // 1. Smart Top Nav Auto-Hide on Scroll Down / Reappear on Scroll Up
          if (currentScrollY <= 80) {
            setIsNavVisible(true);
          } else if (Math.abs(scrollDiff) > 8) {
            if (scrollDiff > 0) {
              // Scrolling down -> hide top nav
              setIsNavVisible(false);
            } else {
              // Scrolling up -> reveal top nav
              setIsNavVisible(true);
            }
          }
          lastScrollYRef.current = currentScrollY;

          // 2. Active Section Scrollspy (suppressed during programmatic clicks)
          if (isNavClickRef.current) return;

          // If at the very top of the page, stick to "home"
          if (currentScrollY < 120) {
            if (activeSectionRef.current !== "home") {
              activeSectionRef.current = "home";
              setActiveSection("home");
            }
            return;
          }

          // Trigger line is ~240px from top of viewport
          const triggerY = 240;
          let matched = "home";

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerY) {
                matched = sectionIds[i];
                break;
              }
            }
          }

          if (matched && activeSectionRef.current !== matched) {
            activeSectionRef.current = matched;
            setActiveSection(matched);
          }
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(navClickTimerRef.current);
    };
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    // Lock scrollspy updates while smoothly scrolling
    isNavClickRef.current = true;
    clearTimeout(navClickTimerRef.current);
    navClickTimerRef.current = setTimeout(() => {
      isNavClickRef.current = false;
    }, 850);

    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const handleOpenBooking = (service = "scooter_subscription", model = "GBG EV Multi-Brand") => {
    setBookingModalService(service);
    setBookingModalModel(model);
    setBookingModalOpen(true);
  };

  const handleOpenInquiry = (type = "corporate_fleet") => {
    setInquiryModalType(type);
    setInquiryModalOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gbg_theme", theme);
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
        root.style.backgroundColor = "#090D14";
        if (document.body) document.body.style.backgroundColor = "#090D14";
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        root.style.colorScheme = "light";
        root.style.backgroundColor = "#F8FAFC";
        if (document.body) document.body.style.backgroundColor = "#F8FAFC";
      }
    }
  }, [theme]);

  const toggleTheme = useCallback((e) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // If View Transitions API is not supported or user prefers reduced motion, update state directly
    if (
      typeof document === "undefined" ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    // Capture click position for ripple effect (or default to top-right toggle area)
    const x = e?.clientX ?? (window.innerWidth - 80);
    const y = e?.clientY ?? 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath
          },
          {
            duration: 480,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      })
      .catch(() => {
        // Graceful silent fallback
      });
  }, [theme]);

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
      className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#090D14] text-slate-100"
      }`}
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* 
        ========================================================================
        GLOBAL STICKY MNC FROSTED NAVIGATION HEADER
        ========================================================================
      */}
      <header
        onFocusCapture={() => setIsNavVisible(true)}
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-2xl backdrop-saturate-180 transition-transform duration-300 ease-in-out ${
          isNavVisible || mobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-full shadow-none pointer-events-none"
        } ${
          isLight
            ? "bg-white/65 border-slate-200/60 text-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-[#070A11]/65 border-white/[0.08] text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backdropFilter: "blur(24px) saturate(180%)",
          willChange: "transform"
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-18 sm:h-20 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3.5 bg-transparent transition-all duration-300 focus:outline-none group cursor-pointer"
            aria-label="Go Baby Go Cabs"
          >
            <GoBabyGoLogo className="h-10 sm:h-12 w-auto shrink-0" variant={isLight ? "dark" : "light"} />
            <div className="hidden sm:flex flex-col text-left">
              <span className={`text-base font-extrabold tracking-tight leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                GoBabyGo <span className="text-[#EF6C1E]">Cabs</span>
              </span>
              <span className={`text-[10px] uppercase font-mono tracking-widest mt-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Enterprise Mobility Platform
              </span>
            </div>
          </a>

          <nav className={`hidden md:flex items-center gap-7 md:gap-8 lg:gap-10 xl:gap-12 text-[13px] lg:text-[14px] tracking-[0.14em] uppercase font-semibold ${
            isLight ? "text-slate-700" : "text-white/85"
          }`}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-500 ${
                activeSection === "home" ? "text-orange-500 font-bold" : ""
              }`}
            >
              Home
            </a>
            <a
              href="#gbgev-section"
              onClick={(e) => handleNavClick(e, "gbgev-section")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-500 ${
                activeSection === "gbgev-section" ? "text-orange-500 font-bold" : ""
              }`}
            >
              GBG EV
            </a>
            <a
              href="#gbgx-section"
              onClick={(e) => handleNavClick(e, "gbgx-section")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-[#A855F7] ${
                activeSection === "gbgx-section" ? "text-[#A855F7] font-bold" : ""
              }`}
            >
              GBG X
            </a>
            <a
              href="#team"
              onClick={(e) => handleNavClick(e, "team")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-500 ${
                activeSection === "team" ? "text-orange-500 font-bold" : ""
              }`}
            >
              Team
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "faq")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-500 ${
                activeSection === "faq" ? "text-orange-500 font-bold" : ""
              }`}
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`py-2 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-500 ${
                activeSection === "contact" ? "text-orange-500 font-bold" : ""
              }`}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full active:scale-90 hover:scale-105 transition-all border flex items-center justify-center shadow-sm cursor-pointer group backdrop-blur-md ${
                isLight
                  ? "bg-white/60 hover:bg-white/90 text-slate-700 border-slate-200/80 shadow-slate-200/40"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/15"
              }`}
              style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
              aria-label={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
              title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
            >
              {isLight ? (
                <Moon size={17} strokeWidth={2} className="text-amber-500 transition-transform duration-300 group-hover:-rotate-12" />
              ) : (
                <Sun size={17} strokeWidth={2} className="text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer backdrop-blur-md ${
                isLight
                  ? "bg-white/60 hover:bg-white/90 border-slate-200/80 text-slate-800"
                  : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
              }`}
              style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-50 flex flex-col p-6 sm:p-8 pt-6 md:hidden transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        } ${
          isLight ? "bg-white/95 text-slate-900 border-b border-slate-200/80" : "bg-[#070A11]/95 text-slate-100 border-b border-white/10"
        }`}
        style={{
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          willChange: "transform, opacity"
        }}
      >
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <GoBabyGoLogo className="h-9 w-auto" variant={isLight ? "dark" : "light"} />
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold leading-none">GoBabyGo Cabs</span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#EF6C1E] mt-0.5">Mobility MNC</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer backdrop-blur-md ${
                  isLight ? "bg-white/60 hover:bg-white/90 border-slate-300/80 text-slate-800" : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                }`}
                style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
              >
                {isLight ? <Moon size={14} className="text-amber-500" /> : <Sun size={14} className="text-amber-400" />}
                <span>{isLight ? "Dark" : "Light"}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-600 dark:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-base font-bold tracking-wider uppercase mt-6 overflow-y-auto">
            <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="hover:text-orange-500 py-1 flex items-center justify-between">
              <span>Home</span>
              {activeSection === "home" && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </a>
            <a
              href="#gbgev-section"
              onClick={(e) => handleNavClick(e, "gbgev-section")}
              aria-label="GBG EV"
              title="GBG EV"
              className="hover:opacity-85 py-1.5 flex items-center justify-between"
            >
              <img
                src={gbgEvEmblemImg}
                alt="GBG EV"
                className="h-6 sm:h-7 w-auto object-contain inline-block shrink-0 rounded-full drop-shadow-sm hover:scale-105 transition-transform"
              />
              {activeSection === "gbgev-section" && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </a>
            <a
              href="#gbgx-section"
              onClick={(e) => handleNavClick(e, "gbgx-section")}
              aria-label="GBG X"
              title="GBG X"
              className="hover:opacity-85 py-1.5 flex items-center justify-between"
            >
              <img
                src={isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg}
                alt="GBGX Official Logo"
                className="h-2.5 sm:h-3 w-auto max-w-[64px] sm:max-w-[72px] object-contain inline-block shrink-0 drop-shadow-sm [filter:hue-rotate(58deg)] hover:scale-105 transition-transform"
              />
              {activeSection === "gbgx-section" && <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]" />}
            </a>
            <a href="#team" onClick={(e) => handleNavClick(e, "team")} className="hover:text-orange-500 py-1 flex items-center justify-between">
              <span>Our Team</span>
              {activeSection === "team" && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </a>
            <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className="hover:text-orange-500 py-1 flex items-center justify-between">
              <span>FAQ</span>
              {activeSection === "faq" && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-orange-500 py-1 flex items-center justify-between">
              <span>Contact</span>
              {activeSection === "contact" && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </a>

            {/* Quick Action Buttons in Drawer */}
            <div className="pt-6 mt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-[#EF6C1E] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Fleet Subscription</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenInquiry();
                }}
                className={`w-full py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <span>Corporate Inquiry</span>
              </button>
            </div>
          </div>
        </div>

      {/* 
        ========================================================================
        1. HERO SECTION & ARC CAROUSEL SHOWCASE
        ========================================================================
      */}
      <section id="home" className="relative min-h-[calc(100vh-76px)] flex flex-col justify-between overflow-hidden">
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
              className={`w-full h-full object-cover ${item.bgPosition || "object-center"}`}
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isLight 
                ? "bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-slate-900/35" 
                : "bg-gradient-to-r from-black/90 via-black/60 to-black/30"
            }`} />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isLight
                ? "bg-gradient-to-t from-[#F8FAFC] via-transparent to-black/60"
                : "bg-gradient-to-t from-[#090D14] via-transparent to-black/60"
            }`} />
          </div>
        ))}

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* HERO MAIN BODY */}
        <div className="relative z-20 flex-1 max-w-[1600px] mx-auto w-full px-6 sm:px-10 lg:px-16 flex flex-col justify-center py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <ScrollReveal variant="fade-up" delay={50} className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 max-w-2xl py-4">
              <div className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full transition-all">
                <span className="bg-white text-slate-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                  NEW
                </span>
                <span className="text-xs font-semibold text-white/90 tracking-wide">
                  {slide.tag} • {slide.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12]">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed max-w-xl">
                {slide.description}
              </p>

              {/* Interactive Fullstack CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (slide.id.includes("delivery") || slide.id.includes("commercial")) {
                      handleOpenInquiry("corporate_fleet");
                    } else if (slide.id.includes("battery")) {
                      handleOpenInquiry("corporate_fleet");
                    } else {
                      handleOpenBooking("test_ride", slide.bookingModel || slide.nodeLabel || "GBG EV Multi-Brand");
                    }
                  }}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-orange-500/30 active:scale-95 flex items-center gap-2 cursor-pointer group"
                >
                  <span>{slide.cta || "Book Test Ride"}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenInquiry("corporate_fleet")}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all backdrop-blur-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Fleet Partnership</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </ScrollReveal>

            {/* Right Curved Arc Carousel */}
            <ScrollReveal variant="fade-left" delay={200} className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-end">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[460px] sm:h-[500px] flex items-center justify-end select-none">
                <svg
                  className="absolute right-14 sm:right-16 top-4 h-[450px] w-48 pointer-events-none hidden sm:block opacity-35"
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
                      "translate-x-2",
                      "-translate-x-1 sm:-translate-x-2",
                      "-translate-x-3 sm:-translate-x-4",
                      "-translate-x-1 sm:-translate-x-2",
                      "translate-x-2"
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
                          <p className={`text-xs sm:text-sm font-bold leading-tight ${isActive ? "text-white" : "text-slate-300"}`}>
                            {item.nodeLabel}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal truncate max-w-[150px]">
                            {item.nodeCity}
                          </p>
                        </div>

                        <div
                          className={`relative rounded-full overflow-hidden transition-all duration-500 shrink-0 ${
                            isActive
                              ? "w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-white/90 shadow-2xl scale-105"
                              : "w-12 h-12 sm:w-14 sm:h-14 ring-2 ring-white/30 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:ring-white/60"
                          }`}
                        >
                          <img
                            src={item.thumb}
                            alt={item.nodeLabel}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                              item.thumbPosition || "object-center"
                            }`}
                          />
                          {isActive && <div className="absolute inset-0 bg-orange-500/15" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* BOTTOM IMPACT STRIP */}
        <div className={`relative z-20 w-full border-t transition-colors ${
          isLight
            ? "border-slate-200/80 bg-white/70 backdrop-blur-md text-slate-800"
            : "border-white/10 bg-black/40 backdrop-blur-md text-white"
        }`}>
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <ScrollReveal variant="zoom-in" delay={100}>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>10,000+</p>
              <p className={`text-[11px] uppercase tracking-wider font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Active Commercial EVs
              </p>
            </ScrollReveal>
            <ScrollReveal variant="zoom-in" delay={200}>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>75+ Hubs</p>
              <p className={`text-[11px] uppercase tracking-wider font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Charging & Swapping Centers
              </p>
            </ScrollReveal>
            <ScrollReveal variant="zoom-in" delay={300}>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>1,215,546</p>
              <p className={`text-[11px] uppercase tracking-wider font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Tree Plantation Impact
              </p>
            </ScrollReveal>
            <ScrollReveal variant="zoom-in" delay={400}>
              <p className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>2,556 Tons</p>
              <p className={`text-[11px] uppercase tracking-wider font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                CO₂ Emissions Saved
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. SUBSIDIARY PORTAL TILES (AFFILIATED COMPANIES)
        ========================================================================
      */}
      <section id="subsidiaries" className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${
            isLight
              ? "text-orange-600 bg-orange-100 border-orange-200"
              : "text-orange-400 bg-orange-950/40 border-orange-800/40"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
            <span>Corporate Divisions & Platforms</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Affiliated Companies
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Specialized corporate divisions and strategic brand platforms driving commercial fleet electrification, retail mobility, and battery infrastructure under GoBabyGo Cabs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* GBG EV Subsidiary Logo Tile */}
          <ScrollReveal variant="fade-right" delay={100} className="w-full">
            <a
              href="#gbgev-section"
              title="GBG EV — Commercial Fleet"
              className={`group relative h-48 sm:h-56 md:h-64 rounded-3xl p-6 sm:p-8 flex items-center justify-center transition-all duration-300 border hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer overflow-hidden block ${
                isLight
                  ? "bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-[#EF6C1E]/60 hover:shadow-orange-500/10"
                  : "bg-white border-[#EF6C1E]/30 shadow-2xl shadow-black/80 hover:border-[#EF6C1E]/60 hover:shadow-[0_0_35px_rgba(239,108,30,0.2)]"
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF6C1E]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
              <ExactGbgEvLogo className="h-20 sm:h-24 md:h-28 w-auto max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105" />
            </a>
          </ScrollReveal>

          {/* GBG X Subsidiary Logo Tile */}
          <ScrollReveal variant="fade-left" delay={150} className="w-full">
            <a
              href="#gbgx-section"
              title="GBG X — Curated Mobility"
              className={`group relative h-48 sm:h-56 md:h-64 rounded-3xl p-6 sm:p-8 flex items-center justify-center transition-all duration-300 border hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer overflow-hidden block ${
                isLight
                  ? "bg-slate-950 border-slate-800 shadow-xl shadow-slate-900/30 hover:border-[#A855F7]/60 hover:shadow-purple-500/20"
                  : "bg-[#090D17] border-white/10 shadow-2xl shadow-black/80 hover:border-[#B026FF]/60 hover:shadow-[0_0_35px_rgba(176,38,255,0.3)]"
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
              <ExactGbgxLogo className="h-10 sm:h-12 md:h-14 w-auto max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105" />
            </a>
          </ScrollReveal>

        </div>
      </section>

      {/* 
        ========================================================================
        3. ABOUT US & ARCHITECTURAL TIMELINE INFOGRAPHIC
        ========================================================================
      */}
      <section id="about" className={`py-16 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-[1720px] mx-auto border-t transition-colors ${
        isLight ? "border-slate-200" : "border-slate-800/80"
      }`}>
        
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className={`text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full border ${
            isLight
              ? "text-orange-600 bg-orange-100 border-orange-200"
              : "text-orange-400 bg-orange-950/40 border-orange-800/40"
          }`}>
            About GoBabyGo Cabs
          </span>
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Powering India's Green Mobility Revolution
          </h2>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Founded in <strong>2021</strong> as <strong>GoBabyGo Cabs (OPC) Private Limited</strong>, our mission has always been to redefine urban mobility with sustainable, smart, and inclusive solutions. Headquartered in Noida, we have rapidly expanded into India's premier EV fleet management and multi-brand ecosystem.
          </p>
        </ScrollReveal>

        {/* 
          ========================================================================
          STRATEGIC ECOSYSTEM MILESTONE CARDS (INSPIRED BY PICTURE 2 DESIGN)
          ========================================================================
        */}
        <div className="mb-16 sm:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {/* 1. CARD 01 - NOIDA HQ / INCEPTION */}
            <ScrollReveal variant="fade-up" delay={100} className="h-full">
              <div
                className={`relative group h-full rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isLight
                    ? "bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-300"
                    : "bg-[#0D1322] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:border-white/20"
                }`}
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[16/10] w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={gbgHqOfficeImg}
                    alt="GoBabyGo Cabs Corporate Headquarters - Sector 62 Noida"
                    className="w-full h-full object-cover object-[center_30%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-1 sm:p-1.5 pt-3.5 sm:pt-4 flex flex-col flex-1">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight line-clamp-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Corporate Inception
                  </h3>
                  <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 line-clamp-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    Founded in Noida, UP as GoBabyGo Cabs (OPC) Private Limited, pioneering sustainable last-mile delivery and smart EV transit.
                  </p>

                  {/* Specs Row with Icons */}
                  <div className={`flex items-center justify-between text-[11px] sm:text-xs mt-3 pt-3 border-t ${
                    isLight ? "border-slate-100 text-slate-500" : "border-white/5 text-slate-400"
                  }`}>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#EF6C1E]" />
                      2021 Founded
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Noida, UP
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      HQ Sector 62
                    </span>
                  </div>

                  {/* Pill Chips Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      OPC Pvt Ltd
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Last-Mile EV
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Fleet HQ
                    </span>
                  </div>

                  {/* Bottom Stat & Pill Action Button */}
                  <div className={`mt-auto pt-3.5 border-t flex items-center justify-between gap-3 ${
                    isLight ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-[#EF6C1E] tracking-tight leading-none block">
                        2021
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mt-0.5">
                        FOUNDED
                      </span>
                    </div>

                    <a
                      href="#home"
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                        isLight
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. CARD 02 - COMMERCIAL EV FLEET */}
            <ScrollReveal variant="fade-up" delay={200} className="h-full">
              <div
                className={`relative group h-full rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isLight
                    ? "bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-300"
                    : "bg-[#0D1322] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:border-white/20"
                }`}
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[16/10] w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={gbgEvFleetPartnersImg}
                    alt="GBG EV Commercial Fleet powering Zepto, Blinkit, Zomato, Swiggy"
                    className="w-full h-full object-cover object-[center_35%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-1 sm:p-1.5 pt-3.5 sm:pt-4 flex flex-col flex-1">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight line-clamp-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Commercial EV Logistics
                  </h3>
                  <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 line-clamp-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    Commercial electric two-wheelers and three-wheelers powering India's leading eCommerce & logistics delivery fleets.
                  </p>

                  {/* Specs Row with Icons */}
                  <div className={`flex items-center justify-between text-[11px] sm:text-xs mt-3 pt-3 border-t ${
                    isLight ? "border-slate-100 text-slate-500" : "border-white/5 text-slate-400"
                  }`}>
                    <span className="inline-flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#2563EB]" />
                      10,000+ EVs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-slate-400" />
                      Hyperlocal
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      Zero Emission
                    </span>
                  </div>

                  {/* Pill Chips Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Zepto
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Blinkit
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Zomato
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Swiggy
                    </span>
                  </div>

                  {/* Bottom Stat & Pill Action Button */}
                  <div className={`mt-auto pt-3.5 border-t flex items-center justify-between gap-3 ${
                    isLight ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-[#2563EB] tracking-tight leading-none block">
                        10,000+
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mt-0.5">
                        ACTIVE FLEET
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setInquiryModalType("corporate_fleet");
                        setInquiryModalOpen(true);
                      }}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
                        isLight
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. CARD 03 - BATTERY REPLACEMENT */}
            <ScrollReveal variant="fade-up" delay={300} className="h-full">
              <div
                className={`relative group h-full rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isLight
                    ? "bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-300"
                    : "bg-[#0D1322] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:border-white/20"
                }`}
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[16/10] w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={gbgBatteryReplacementImg}
                    alt="GoBabyGo Cabs EV Battery Replacement & Maintenance"
                    className="w-full h-full object-cover object-[center_52%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-1 sm:p-1.5 pt-3.5 sm:pt-4 flex flex-col flex-1">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight line-clamp-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Energy & Charging Grid
                  </h3>
                  <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 line-clamp-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    Strategic high-uptime charging & smart battery swapping stations deployed across major transit arteries.
                  </p>

                  {/* Specs Row with Icons */}
                  <div className={`flex items-center justify-between text-[11px] sm:text-xs mt-3 pt-3 border-t ${
                    isLight ? "border-slate-100 text-slate-500" : "border-white/5 text-slate-400"
                  }`}>
                    <span className="inline-flex items-center gap-1.5">
                      <BatteryCharging className="w-3.5 h-3.5 text-[#EF6C1E]" />
                      75+ Hubs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-slate-400" />
                      &lt;2 Min Swap
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      24/7 Uptime
                    </span>
                  </div>

                  {/* Pill Chips Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Smart Swap
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Fast Charge
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      High Uptime
                    </span>
                  </div>

                  {/* Bottom Stat & Pill Action Button */}
                  <div className={`mt-auto pt-3.5 border-t flex items-center justify-between gap-3 ${
                    isLight ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-[#EF6C1E] tracking-tight leading-none block">
                        75+
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mt-0.5">
                        CHARGING HUBS
                      </span>
                    </div>

                    <a
                      href="#gbgev-section"
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                        isLight
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span>Hubs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. CARD 04 - MULTI-BRAND FLEET */}
            <ScrollReveal variant="fade-up" delay={400} className="h-full">
              <div
                className={`relative group h-full rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isLight
                    ? "bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-300"
                    : "bg-[#0D1322] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:border-white/20"
                }`}
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[16/10] w-full shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={gbgMultiBrandFleetImg}
                    alt="GoBabyGo Cabs GBGX Multi-Brand EV Showroom & Fleet Lineup"
                    className="w-full h-full object-cover object-[center_45%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-1 sm:p-1.5 pt-3.5 sm:pt-4 flex flex-col flex-1">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight line-clamp-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Nationwide Footprint
                  </h3>
                  <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 line-clamp-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    Rapid nationwide footprint spanning Tier-1, Tier-2, and major metropolitan clusters across India.
                  </p>

                  {/* Specs Row with Icons */}
                  <div className={`flex items-center justify-between text-[11px] sm:text-xs mt-3 pt-3 border-t ${
                    isLight ? "border-slate-100 text-slate-500" : "border-white/5 text-slate-400"
                  }`}>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      30+ Cities
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-slate-400" />
                      GBGX Stores
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      Pan-India
                    </span>
                  </div>

                  {/* Pill Chips Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Tier 1 &amp; 2
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Retail Network
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border ${
                      isLight ? "bg-slate-100 text-slate-600 border-slate-200/60" : "bg-white/[0.06] text-slate-300 border-white/10"
                    }`}>
                      Multi-Brand
                    </span>
                  </div>

                  {/* Bottom Stat & Pill Action Button */}
                  <div className={`mt-auto pt-3.5 border-t flex items-center justify-between gap-3 ${
                    isLight ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-[#2563EB] tracking-tight leading-none block">
                        30+
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mt-0.5">
                        CITIES COVERED
                      </span>
                    </div>

                    <a
                      href="#gbgx-section"
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                        isLight
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span>Lineup</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 
          ========================================================================
          SWISS MINIMALIST ARCHITECTURAL TIMELINE
          ========================================================================
        */}
        <SwissArchitecturalTimeline isLight={isLight} />

        {/* 
          ========================================================================
          BALANCED & STRUCTURED SECTION: GBG EV (FLEET & HUB OPERATIONS)
          ========================================================================
        */}
        {/* 
          ========================================================================
          COMBINED UNIFIED SECTION: GBG EV & GBG X ECOSYSTEM
          Commercial Fleet Logistics & Multi-Brand EV Retail Platform
          ========================================================================
        */}
        <div
          className={`mb-28 rounded-3xl p-6 sm:p-10 md:p-14 lg:p-18 relative overflow-hidden border transition-colors duration-300 max-w-[1600px] mx-auto w-full ${
            isLight
              ? "bg-white/95 text-slate-900 border-slate-200/90 shadow-2xl shadow-slate-200/50"
              : "bg-[#090D17]/95 text-slate-100 border-white/10 shadow-2xl shadow-black/80 backdrop-blur-xl"
          }`}
          style={{
            boxShadow: isLight
              ? "0 20px 50px -10px rgba(239, 108, 30, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)"
              : "0 25px 60px -15px rgba(239, 108, 30, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.08)"
          }}
        >
          {/* Subtle Top Brand Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EF6C1E] via-amber-400 to-[#2563EB]" />

          {/* Ambient Glow Accents */}
          <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-[#EF6C1E]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] bg-[#2563EB]/8 rounded-full blur-3xl pointer-events-none" />

          {/* ====================================================================
              1. MASTER ENTERPRISE ECOSYSTEM HEADER & SCALE METRICS
              ==================================================================== */}
          <ScrollReveal variant="fade-up" delay={50} className={`pb-16 sm:pb-20 border-b ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}>

            {/* ── Centered Eyebrow Tag ── */}
            <div className="flex justify-center mb-7 sm:mb-9">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase border ${
                isLight
                  ? "bg-white/80 text-slate-500 border-slate-200 shadow-sm"
                  : "bg-white/[0.04] text-slate-400 border-white/10"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#EF6C1E] to-[#2563EB]" />
                Enterprise EV Ecosystem
              </span>
            </div>

            {/* ── Centered Headline + Subtitle ── */}
            <div className="text-center space-y-4 sm:space-y-5 max-w-4xl mx-auto">
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.06] ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                Two Strategic Verticals.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C1E] via-amber-400 to-[#2563EB]">
                  One Zero-Emission Horizon.
                </span>
              </h2>
              <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Fleet electrification meets premium multi-brand retail — powering India's EV future through two industry-leading verticals under one enterprise group.
              </p>
            </div>

            {/* ── Brand Stats Row ── */}
            <div className={`mt-14 sm:mt-16 rounded-2xl overflow-hidden ${
              isLight ? "shadow-xl shadow-slate-100" : "shadow-2xl shadow-black/60"
            }`}>

              {/* Brand Header Row */}
              <div className={`grid grid-cols-2 ${isLight ? "bg-slate-50 border border-slate-200" : "bg-white/[0.03] border border-white/[0.06]"}`}>
                {/* GBG EV Header */}
                <div className={`flex items-center gap-3 px-8 sm:px-10 py-4 border-r ${isLight ? "border-slate-200" : "border-white/[0.06]"}`}>
                  <ExactGbgEvLogo className="h-7 sm:h-8 w-auto object-contain shrink-0" />
                  <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Fleet &amp; Logistics
                  </span>
                </div>
                {/* GBG X Header */}
                <div className="flex items-center gap-3 px-8 sm:px-10 py-4">
                  <img
                    src={isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg}
                    alt="GBGX"
                    className={`h-4 sm:h-5 w-auto object-contain shrink-0 ${isLight ? "[filter:hue-rotate(58deg)]" : ""}`}
                  />
                  <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Multi-Brand Retail
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 ${
                isLight
                  ? "bg-white border-x border-b border-slate-200"
                  : "bg-[#0C101A] border-x border-b border-white/[0.06]"
              }`}>

                {/* Stat 1: Active Fleets */}
                <div className={`relative px-8 sm:px-10 py-8 sm:py-10 flex flex-col gap-1 border-b sm:border-b-0 border-r ${
                  isLight ? "border-slate-100" : "border-white/[0.05]"
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EF6C1E] to-amber-400" />
                  <div className={`text-5xl sm:text-6xl font-black tracking-tight leading-none tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>
                    10K<span className="text-[#EF6C1E]">+</span>
                  </div>
                  <p className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mt-3 ${isLight ? "text-[#EA580C]" : "text-[#EF6C1E]"}`}>
                    Active Fleets
                  </p>
                  <p className={`text-[11px] leading-snug ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Commercial EVs in daily operations
                  </p>
                </div>

                {/* Stat 2: Swap Hubs */}
                <div className={`relative px-8 sm:px-10 py-8 sm:py-10 flex flex-col gap-1 border-b sm:border-b-0 border-r ${
                  isLight ? "border-slate-100" : "border-white/[0.05]"
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EF6C1E] to-amber-400" />
                  <div className={`text-5xl sm:text-6xl font-black tracking-tight leading-none tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>
                    75<span className="text-[#EF6C1E]">+</span>
                  </div>
                  <p className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mt-3 ${isLight ? "text-[#EA580C]" : "text-[#EF6C1E]"}`}>
                    Swap Hubs
                  </p>
                  <p className={`text-[11px] leading-snug ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Pan-India charging network
                  </p>
                </div>

                {/* Stat 3: Asset Partners */}
                <div className={`relative px-8 sm:px-10 py-8 sm:py-10 flex flex-col gap-1 border-b sm:border-b-0 border-r ${
                  isLight ? "border-slate-100" : "border-white/[0.05]"
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A855F7] to-fuchsia-400" />
                  <div className={`text-5xl sm:text-6xl font-black tracking-tight leading-none tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>
                    300<span className="text-[#A855F7]">+</span>
                  </div>
                  <p className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mt-3 ${isLight ? "text-purple-600" : "text-[#C084FC]"}`}>
                    Asset Partners
                  </p>
                  <p className={`text-[11px] leading-snug ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Vehicle investors earning yield
                  </p>
                </div>

                {/* Stat 4: OEM Certified */}
                <div className={`relative px-8 sm:px-10 py-8 sm:py-10 flex flex-col gap-1`}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A855F7] to-fuchsia-400" />
                  <div className={`text-5xl sm:text-6xl font-black tracking-tight leading-none tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>
                    100<span className="text-[#A855F7]">%</span>
                  </div>
                  <p className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mt-3 ${isLight ? "text-purple-600" : "text-[#C084FC]"}`}>
                    OEM Certified
                  </p>
                  <p className={`text-[11px] leading-snug ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    Genuine spares &amp; warranty
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-16 sm:space-y-20 mt-12 sm:mt-16">
            {/* ====================================================================
                2. DIVISION 01: GBG EV — COMMERCIAL FLEETS & ASSET MANAGEMENT
                ==================================================================== */}
            <div id="gbgev-section" className="scroll-mt-28 space-y-12">
              
              {/* Division 01 Masthead Banner */}
              <ScrollReveal variant="fade-up" delay={80} className={`p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isLight
                  ? "bg-gradient-to-r from-orange-50/80 via-white to-amber-50/40 shadow-sm"
                  : "bg-gradient-to-r from-[#17100B] via-[#0E131F] to-[#0B0F19] shadow-lg shadow-black/40"
              }`}>
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-[#EF6C1E]/30 shadow-[0_6px_24px_rgba(239,108,30,0.15)] shrink-0 flex items-center justify-center p-3 group hover:border-[#EF6C1E] transition-all">
                    <ExactGbgEvLogo className="h-12 sm:h-14 w-auto max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none flex items-center gap-3">
                      <span className={isLight ? "text-[#1D4ED8]" : "text-[#3B82F6]"}>
                        GBG
                      </span>
                      <span className={isLight ? "text-[#EA580C]" : "text-[#FF7A1A]"}>
                        EV
                      </span>
                    </h3>
                    <p className={`text-sm sm:text-base lg:text-lg font-semibold mt-1.5 sm:mt-2 ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}>
                      Fleet Electrification & Asset Logistics
                    </p>
                  </div>
                </div>

                {/* Division Action Button */}
                <div className="shrink-0 w-full md:w-auto">
                  <a
                    href="https://gbgev.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#EF6C1E] to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <span>Visit gbgev.com</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </ScrollReveal>

              {/* Division 01 Core Content Grid: Narrative & Highlights vs Vehicle Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
                
                {/* Left 7 Cols: Executive Overview & Operational Pillars */}
                <ScrollReveal variant="fade-right" delay={100} className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <h4 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}>
                      Powering India's High-Utilization Commercial Logistics
                    </h4>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}>
                      Founded in <strong>2021</strong> as <strong>GoBabyGo Cabs (OPC) Private Limited</strong> and broadened into <strong>GoBabyGo Cabs Private Limited</strong> in 2023, GBG EV bridges institutional asset capital with commercial last-mile delivery demand. By connecting investors directly with revenue-generating EV fleets, delivery riders secure dependable, fuel-free vehicles, e-commerce giants reduce operational overhead, and investors receive predictable monthly payouts.
                    </p>
                  </div>

                  {/* 3 Strategic Operational Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className={`p-4 rounded-2xl border transition-all ${
                      isLight ? "bg-white border-slate-200 shadow-sm" : "bg-white/[0.03] border-white/10"
                    }`}>
                      <div className="w-10 h-10 rounded-xl bg-[#EF6C1E]/15 text-[#EF6C1E] flex items-center justify-center mb-3">
                        <BatteryCharging size={20} />
                      </div>
                      <h5 className={`text-sm font-bold leading-snug mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                        90-Sec Battery Swap
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        75+ charging and swapping hubs minimize turnaround for non-stop delivery uptime.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border transition-all ${
                      isLight ? "bg-white border-slate-200 shadow-sm" : "bg-white/[0.03] border-white/10"
                    }`}>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center mb-3">
                        <TrendingUp size={20} />
                      </div>
                      <h5 className={`text-sm font-bold leading-snug mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                        Fixed Asset Yields
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        Contract-backed commercial vehicle leases ensuring steady monthly returns for 300+ investors.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border transition-all ${
                      isLight ? "bg-white border-slate-200 shadow-sm" : "bg-white/[0.03] border-white/10"
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        isLight ? "bg-orange-100 text-[#EA580C]" : "bg-[#EF6C1E]/15 text-[#EF6C1E]"
                      }`}>
                        <ShieldCheck size={20} />
                      </div>
                      <h5 className={`text-sm font-bold leading-snug mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                        Real-Time IoT Telematics
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        Continuous GPS tracking, remote diagnostics, and battery health analytics across all vehicles.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right 5 Cols: Commercial Vehicle Presentation Card */}
                <ScrollReveal variant="fade-left" delay={150} className="lg:col-span-5 flex flex-col items-center">
                  <div className={`relative w-full rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden group ${
                    isLight
                      ? "bg-gradient-to-b from-orange-50/50 via-white to-slate-50 shadow-xl"
                      : "bg-gradient-to-b from-[#18110B] via-[#0E131F] to-[#0A0D15] shadow-2xl shadow-black/60"
                  }`}>

                    <div className="relative w-full max-w-[380px] my-6 flex items-center justify-center">
                      <GbgEvScooterImage className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(239,108,30,0.25)] transition-transform duration-500 group-hover:scale-105" />
                    </div>

                    {/* Vehicle Performance Specifications Ribbon */}
                    <div className={`w-full grid grid-cols-3 gap-2 pt-4 border-t text-center ${
                      isLight ? "border-slate-200" : "border-white/10"
                    }`}>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-[#EF6C1E]">120+ KM</div>
                        <div className={`text-[10px] uppercase font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>Range / Charge</div>
                      </div>
                      <div className={`border-x ${isLight ? "border-slate-200" : "border-white/10"}`}>
                        <div className="text-xs sm:text-sm font-black text-amber-500">&lt; 90 Sec</div>
                        <div className={`text-[10px] uppercase font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>Swap Turnaround</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-emerald-500">99.4%</div>
                        <div className={`text-[10px] uppercase font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>Fleet Uptime</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

              </div>
            </div>

            {/* Architectural Division Separation Bar */}
            <div className="relative py-4 flex items-center justify-center">
              <div className={`w-full border-t ${isLight ? "border-slate-200" : "border-white/10"}`} />
              <div className={`absolute px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border font-bold shadow-sm ${
                isLight ? "bg-slate-100 border-slate-200 text-slate-500" : "bg-slate-900 border-white/15 text-slate-400"
              }`}>
                Enterprise Mobility Portfolio
              </div>
            </div>

            {/* ====================================================================
                3. DIVISION 02: GBG X — MULTI-BRAND EV RETAIL & EXPERIENCE STORES
                ==================================================================== */}
            <div id="gbgx-section" className="scroll-mt-28 space-y-12">
              
              {/* Division 02 Masthead Banner */}
              <ScrollReveal variant="fade-up" delay={80} className={`p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border ${
                isLight
                  ? "bg-gradient-to-r from-purple-50/90 via-white to-fuchsia-50/40 border-purple-100 shadow-sm"
                  : "bg-gradient-to-r from-[#120721] via-[#160B28] to-[#0D0817] border-purple-500/20 shadow-lg shadow-black/40"
              }`}>
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950 border border-[#A855F7]/40 shadow-[0_0_25px_rgba(168,85,247,0.28)] shrink-0 flex items-center justify-center p-3 group hover:border-[#A855F7] transition-all">
                    <ExactGbgxLogo className="h-7 sm:h-8 w-auto max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none flex items-center gap-3">
                      <span className={isLight ? "text-[#6B21A8]" : "text-[#D8B4FE]"}>
                        GBG
                      </span>
                      <span className={isLight ? "text-[#A855F7]" : "text-[#B026FF] drop-shadow-[0_0_14px_rgba(176,38,255,0.7)]"}>
                        X
                      </span>
                    </h3>
                    <p className={`text-sm sm:text-base lg:text-lg font-semibold mt-1.5 sm:mt-2 ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}>
                      Multi-Brand EV Experience & Retail Platform
                    </p>
                  </div>
                </div>

                {/* Division Action Button */}
                <div className="shrink-0 w-full md:w-auto">
                  <a
                    href="https://gbgx.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#B026FF] hover:from-[#7E22CE] hover:to-[#9333EA] shadow-md shadow-purple-500/35 hover:shadow-purple-500/55 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <span>Visit gbgx.in</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </ScrollReveal>

              {/* Division 02 Core Content Grid: Narrative & Highlights vs Showroom Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
                
                {/* Left 7 Cols: Executive Overview & Retail Pillars */}
                <ScrollReveal variant="fade-right" delay={100} className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <h4 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}>
                      Curating India's Premier Electric Two-Wheeler Experience
                    </h4>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}>
                      GBG X was established to transform how riders discover, evaluate, and acquire electric two-wheelers. By convening India’s foremost EV manufacturers under a unified retail umbrella, we replace single-brand bias with certified comparative insights, transparent on-road pricing, low-interest financing, and factory-authorized warranty protection.
                    </p>
                  </div>

                  {/* 3 Strategic Retail Pillars (Theme: Neon Purple & Orange) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      isLight
                        ? "bg-white border-purple-200/80 shadow-sm hover:border-[#A855F7] hover:shadow-md"
                        : "bg-[#0D0917] border-white/10 hover:border-[#A855F7]/50 shadow-lg"
                    }`}>
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm ${
                        isLight
                          ? "bg-purple-50 text-[#7E22CE] border border-purple-200/80"
                          : "bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/30"
                      }`}>
                        <Store size={20} />
                      </div>
                      <h5 className={`text-sm sm:text-base font-bold leading-snug mb-1.5 ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        Multi-Brand Catalog
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        Handpicked, rigorously evaluated electric scooters and motorcycles across premier OEM brands.
                      </p>
                    </div>

                    <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      isLight
                        ? "bg-white border-orange-200/80 shadow-sm hover:border-[#EF6C1E] hover:shadow-md"
                        : "bg-[#0D0917] border-white/10 hover:border-[#EF6C1E]/50 shadow-lg"
                    }`}>
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm ${
                        isLight
                          ? "bg-orange-100 text-[#EA580C] border border-orange-200/80"
                          : "bg-[#EF6C1E]/15 text-[#EF6C1E] border border-[#EF6C1E]/30"
                      }`}>
                        <Award size={20} />
                      </div>
                      <h5 className={`text-sm sm:text-base font-bold leading-snug mb-1.5 ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        Transparent Pricing
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        Zero hidden markups with seamless state and central subsidy processing and low-EMI loans.
                      </p>
                    </div>

                    <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      isLight
                        ? "bg-white border-purple-200/80 shadow-sm hover:border-[#A855F7] hover:shadow-md"
                        : "bg-[#0D0917] border-white/10 hover:border-[#A855F7]/50 shadow-lg"
                    }`}>
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm ${
                        isLight
                          ? "bg-purple-50 text-[#7E22CE] border border-purple-200/80"
                          : "bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/30"
                      }`}>
                        <Wrench size={20} />
                      </div>
                      <h5 className={`text-sm sm:text-base font-bold leading-snug mb-1.5 ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        Genuine Spares & Care
                      </h5>
                      <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        100% genuine factory components and certified technicians maintaining manufacturer warranty.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right 5 Cols: Showroom Experience Showcase */}
                <ScrollReveal variant="fade-left" delay={150} className="lg:col-span-5 flex flex-col items-center">
                  <div className={`relative w-full rounded-3xl overflow-hidden border shadow-xl group ${
                    isLight ? "border-slate-200 shadow-slate-200/60" : "border-white/15 shadow-[0_0_35px_rgba(168,85,247,0.22)]"
                  }`}>
                    <GbgxShowroomImage className="w-full h-[260px] sm:h-[320px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#A855F7] text-white shadow-sm shadow-purple-500/40">
                        Flagship Retail Experience
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white font-medium">
                      <span className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
                        GBGX Experience Hub • Assam Flagship
                      </span>
                      <span className="text-orange-400 font-bold tracking-wide">
                        Verified Multi-Brand Center
                      </span>
                    </div>
                  </div>
                </ScrollReveal>

              </div>


            </div>

            {/* ====================================================================
                4. UNIFIED ENTERPRISE STRATEGIC INTENT (SINGLE GROUP MISSION & VISION)
                NO DUPLICATES — CORPORATE GOVERNANCE STANDARD
                ==================================================================== */}
            <div className={`pt-12 sm:pt-14 border-t ${isLight ? "border-slate-200" : "border-white/10"} space-y-8 sm:space-y-10`}>
              <ScrollReveal variant="fade-up" className="max-w-5xl mx-auto space-y-8 sm:space-y-10 antialiased">
                <div className="text-center space-y-3">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                    isLight
                      ? "bg-slate-100 border-slate-300 text-slate-800"
                      : "bg-white/10 border-white/15 text-slate-200"
                  }`}>
                    <Sparkles size={15} className="text-[#EF6C1E]" />
                    <span>Corporate Strategic Intent • Group Governance</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}>
                    Guiding Principles Driving National Scale
                  </h3>
                  <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal ${
                    isLight ? "text-slate-600" : "text-slate-300"
                  }`}>
                    A unified strategic compass ensuring long-term shareholder value, operational excellence, and measurable environmental impact.
                  </p>
                </div>

                {/* Symmetrical Dual Strategic Intent Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* GROUP MISSION CARD */}
                  <div className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 p-8 sm:p-10 flex flex-col justify-between ${
                    isLight
                      ? "bg-white border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-orange-500/15 hover:border-orange-300"
                      : "bg-slate-900/90 border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-[#EF6C1E]/40 hover:shadow-[0_8px_48px_rgba(239,108,30,0.18)]"
                  }`}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EF6C1E] to-amber-400" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#EF6C1E]/15 text-[#EF6C1E] flex items-center justify-center shadow-md">
                          <Target size={28} strokeWidth={2} />
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EF6C1E]/10 text-orange-600 dark:text-orange-400 border border-[#EF6C1E]/30">
                          ENTERPRISE MISSION
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          Democratizing Green Fleet & Mobility Wealth
                        </h4>
                        <p className={`text-sm sm:text-base leading-relaxed ${
                          isLight ? "text-slate-700" : "text-slate-300"
                        }`}>
                          To accelerate India's transition to sustainable, zero-emission transportation by deploying high-uptime commercial EV fleets that create predictable investor wealth, while empowering everyday consumers with an uncompromisingly transparent EV retail journey.
                        </p>
                      </div>

                      {/* Strategic Commitments Checklist */}
                      <div className={`pt-5 border-t space-y-3 text-sm font-semibold ${
                        isLight ? "border-slate-100 text-slate-800" : "border-white/10 text-slate-200"
                      }`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#EF6C1E] shrink-0" />
                          <span>Guaranteed asset-backed returns for 300+ fleet investors</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#EF6C1E] shrink-0" />
                          <span>Turnkey high-uptime electric delivery scooters for gig riders</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#EF6C1E] shrink-0" />
                          <span>Rapid expansion across metro and tier-2 logistics corridors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GROUP VISION CARD */}
                  <div className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 p-8 sm:p-10 flex flex-col justify-between ${
                    isLight
                      ? "bg-white border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-blue-500/15 hover:border-blue-300"
                      : "bg-slate-900/90 border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-[#2563EB]/40 hover:shadow-[0_8px_48px_rgba(37,99,235,0.18)]"
                  }`}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2563EB] to-cyan-400" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shadow-md">
                          <Lightbulb size={28} strokeWidth={2} />
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#2563EB]/10 text-blue-600 dark:text-blue-400 border border-[#2563EB]/30">
                          ENTERPRISE VISION
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          Pioneering India's Electric Transit Conglomerate
                        </h4>
                        <p className={`text-sm sm:text-base leading-relaxed ${
                          isLight ? "text-slate-700" : "text-slate-300"
                        }`}>
                          To establish GoBabyGo as the benchmark multinational mobility group in clean transportation — seamlessly uniting high-density commercial last-mile logistics, extensive battery swapping networks, and multi-brand consumer retail showrooms under an unyielding standard of integrity.
                        </p>
                      </div>

                      {/* Strategic Commitments Checklist */}
                      <div className={`pt-5 border-t space-y-3 text-sm font-semibold ${
                        isLight ? "border-slate-100 text-slate-800" : "border-white/10 text-slate-200"
                      }`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#2563EB] shrink-0" />
                          <span>100% zero-tailpipe emission transit across all verticals</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#2563EB] shrink-0" />
                          <span>Pan-India network of 200+ battery swapping & experience hubs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={17} className="text-[#2563EB] shrink-0" />
                          <span>Highest customer satisfaction & OEM component authenticity</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* ====================================================================
                  5. EXECUTIVE LEADERSHIP STATEMENT (MNC BOARD STANDARD)
                  ==================================================================== */}
              <ScrollReveal variant="fade-up" delay={80}>
                <div className={`max-w-4xl mx-auto rounded-3xl border shadow-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden transition-all duration-300 ${
                  isLight
                    ? "bg-gradient-to-br from-white via-slate-50/80 to-orange-50/30 border-slate-200/90 shadow-slate-200/60"
                    : "bg-gradient-to-br from-[#0B0F19] via-[#080C14] to-[#120F16] border-white/10 shadow-black/80 backdrop-blur-xl"
                }`}>
                  {/* Modern Brand Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EF6C1E] via-amber-400 to-[#2563EB]" />

                  {/* Subtle Ambient Radial Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF6C1E]/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    {/* Executive Eyebrow */}
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                      isLight
                        ? "bg-orange-50 border-orange-200 text-[#EF6C1E]"
                        : "bg-[#EF6C1E]/15 border-[#EF6C1E]/30 text-[#EF6C1E]"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                      <span>Executive Leadership Statement</span>
                    </div>

                    {/* Modern Sans-Serif High-Contrast Quote */}
                    <blockquote className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl ${
                      isLight ? "text-slate-800" : "text-slate-200"
                    }`}>
                      “At GoBabyGo, whether powering high-uptime commercial delivery fleets through <span className="font-semibold text-[#EF6C1E]">GBG EV</span> or fulfilling personal clean mobility dreams through <span className="font-semibold text-[#2563EB]">GBG X</span>, our commitment is absolute: uncompromising vehicle reliability, transparent unit economics, and driving India's zero-emission transit future forward together.”
                    </blockquote>

                    {/* Leader Signoff Box */}
                    <div className="pt-4 flex flex-col items-center space-y-2">
                      <span className={`text-lg sm:text-xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                        Akash Ali
                      </span>

                      <p className="text-xs sm:text-sm font-semibold text-[#EF6C1E] tracking-wide uppercase">
                        Founder & Chief Executive Officer
                      </p>

                      <p className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        GoBabyGo Cabs (OPC) Private Limited • Corporate Headquarters, Sector 62, Noida
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

      </section>

      {/* 
        ========================================================================
        4. OUR TEAM & EXECUTIVE LEADERSHIP SECTION
        ========================================================================
      */}
      <section
        id="team"
        className={`py-20 sm:py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t transition-colors scroll-mt-24 ${
          isLight ? "border-slate-200" : "border-slate-800/80"
        }`}
      >
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${
              isLight
                ? "text-orange-600 bg-orange-100 border-orange-200"
                : "text-orange-400 bg-orange-950/40 border-orange-800/40"
            }`}
          >
            <Users size={14} />
            <span>Leadership & Culture</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            OUR LEADERSHIP <span className="text-[#EF6C1E]">TEAM</span>
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Visionary leaders and collaborative minds building extraordinary clean mobility and retail experiences across India.
          </p>
        </ScrollReveal>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {TEAM_PILLARS.map((pillar, index) => {
            const icons = [
              <Sparkles size={22} className="text-[#EF6C1E]" />,
              <Zap size={22} className="text-[#2563EB]" />,
              <Users size={22} className="text-[#EF6C1E]" />
            ];
            return (
              <ScrollReveal key={pillar.number} variant="fade-up" delay={index * 80}>
                <div
                  className={`group relative rounded-3xl p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl h-full flex flex-col justify-between overflow-hidden ${
                    isLight
                      ? "bg-white border-slate-200/90 shadow-md shadow-slate-200/50 hover:border-orange-500/50 hover:shadow-orange-500/10"
                      : "bg-[#0E1422] border-white/10 shadow-xl shadow-black/40 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(239,108,30,0.15)]"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-[#EF6C1E]">
                        {pillar.number}
                      </span>
                      <div
                        className={`p-2.5 rounded-2xl border ${
                          isLight
                            ? "bg-orange-50 border-orange-200/80"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        {icons[index]}
                      </div>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-extrabold uppercase tracking-wider mb-2.5 ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Leadership Team Showcase - Circular Headshots & Editorial Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <ScrollReveal key={member.name} variant="fade-up" delay={150 + index * 100}>
              <div className="group flex flex-col items-center text-center">
                {/* Circular Portrait with Soft Studio Shadow & Frame */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-xl ring-4 ring-slate-200/80 dark:ring-slate-800/80 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:ring-[#EF6C1E]/50 bg-slate-200 dark:bg-slate-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center filter grayscale-[25%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/team/akash_ali.png";
                    }}
                  />
                </div>

                {/* Name: Elegant Italic Serif */}
                <h3
                  className={`font-serif italic text-2xl sm:text-[26px] lg:text-[28px] font-normal tracking-normal mt-7 mb-2 transition-colors duration-300 ${
                    isLight ? "text-slate-900 group-hover:text-[#EF6C1E]" : "text-white group-hover:text-[#EF6C1E]"
                  }`}
                >
                  {member.name}
                </h3>

                {/* Title: All-Caps High-Authority Sans-Serif in Refined Deep Navy / Blue */}
                <p
                  className={`text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                    isLight ? "text-[#173753]" : "text-blue-400 group-hover:text-orange-400"
                  }`}
                >
                  {member.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        5. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION (HOVER REVEAL & ACCORDION)
        ========================================================================
      */}
      <section id="faq" className={`py-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t transition-colors ${
        isLight ? "border-slate-200" : "border-slate-800/80"
      }`}>
        <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
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
            Hover over any question to preview the answer, or click to pin it open. Everything you need to know about GoBabyGo Cabs, GBG EV, and GBGX.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = hoveredFaq !== null ? hoveredFaq === index : openFaq === index;
            return (
              <ScrollReveal key={index} variant="fade-up" delay={index * 60}>
                <div
                  onMouseEnter={() => setHoveredFaq(index)}
                  onMouseLeave={() => setHoveredFaq(null)}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isOpen
                      ? isLight
                        ? "bg-white border-orange-500 shadow-md ring-1 ring-orange-500/20"
                        : "bg-[#121824] border-orange-500/80 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/30"
                      : isLight
                      ? "bg-white border-slate-200 hover:border-orange-400 shadow-sm"
                      : "bg-[#121824] border-slate-800 hover:border-orange-500/30"
                  }`}
                >
                  <div className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors">
                    <div className="space-y-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isOpen ? "text-orange-500" : "text-orange-500/80"
                      }`}>
                        {faq.category}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold leading-snug transition-colors duration-200 ${
                        isOpen 
                          ? isLight ? "text-orange-600" : "text-orange-400"
                          : isLight ? "text-slate-900" : "text-white"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-2.5 rounded-full transition-all duration-300 shrink-0 ${
                        isOpen 
                          ? "rotate-180 bg-orange-500/20 text-orange-500 scale-105" 
                          : isLight ? "bg-slate-100 text-slate-500" : "bg-white/5 text-slate-300"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>

                  {/* Smooth CSS Grid Animation for Height Reveal */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`px-6 pb-6 pt-2 text-sm leading-relaxed border-t transition-colors duration-200 ${
                        isLight 
                          ? "text-slate-600 border-slate-100 bg-slate-50/60" 
                          : "text-slate-300 border-slate-800/60 bg-black/25"
                      }`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================================================
        5. BRAND PARTNERS BANNER & DYNAMIC MARQUEE ECOSYSTEM
        ========================================================================
      */}
      <section id="network" className={`scroll-mt-20 py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-t overflow-hidden relative transition-colors ${
        isLight ? "border-slate-200 bg-[#F8FAFC]" : "border-slate-800/60 bg-[#090D14]"
      }`}>
        <style>{`
          @keyframes gbgMarqueeTrack1 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes gbgMarqueeTrack2 {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .gbg-marquee-row-1 {
            display: flex;
            width: max-content;
            animation: gbgMarqueeTrack1 38s linear infinite;
          }
          .gbg-marquee-row-2 {
            display: flex;
            width: max-content;
            animation: gbgMarqueeTrack2 40s linear infinite;
          }
          .gbg-marquee-row-1:hover,
          .gbg-marquee-row-2:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Section Header */}
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto text-center mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-[#EF6C1E]/10 border-[#EF6C1E]/25 text-[#EF6C1E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
            <span>Trusted Enterprise Network</span>
          </div>

          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Deployed Across India's Premier Last-Mile Logistics & Top EV Brands
          </h3>

          <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Powering mission-critical electric fleets for India's leading eCommerce & logistics giants, while partnering with premier electric two-wheeler manufacturers.
          </p>
        </ScrollReveal>

                {/* Marquee Container with Gradient Edge Fades */}
        <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden py-3">
          {/* Edge Fade Overlays */}
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r ${
            isLight ? "from-[#F8FAFC] to-transparent" : "from-[#090D14] to-transparent"
          }`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l ${
            isLight ? "from-[#F8FAFC] to-transparent" : "from-[#090D14] to-transparent"
          }`} />

          <div className="space-y-4">
            {/* ROW 1: Premier Last-Mile Logistics Leaders */}
            <div className="overflow-hidden">
                <div className="gbg-marquee-row-1 gap-4 sm:gap-6 py-1">
                  {[...Array(2)].flatMap((_, repIdx) => [
                    // Zomato
                    <div key={`zomato-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-[#E23744] font-sans">
                          zomato
                        </span>
                      </div>
                    </div>,
                    // Zepto
                    <div key={`zepto-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <span className="text-xl sm:text-2xl font-black tracking-tight text-[#8800EC] font-sans">
                          zepto
                        </span>
                      </div>
                    </div>,
                    // Swiggy
                    <div key={`swiggy-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <svg viewBox="0 0 24 32" className="w-4 sm:w-5 h-6 sm:h-7 fill-[#FC8019] shrink-0">
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12zm2.2 16.2c-.8.8-2.1.8-2.9 0l-3.3-3.3c-.8-.8-.8-2.1 0-2.9.8-.8 2.1-.8 2.9 0l.5.5V5.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v6.5c0 .4-.2.8-.4 1.1l.2.1z" />
                        </svg>
                        <span className="text-sm sm:text-base font-black tracking-wider text-[#FC8019] font-sans uppercase">
                          SWIGGY
                        </span>
                      </div>
                    </div>,
                    // Blinkit
                    <div key={`blinkit-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="bg-[#F8CB46] px-3.5 sm:px-4 py-1.5 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-sm sm:text-base font-black tracking-tight text-slate-950 font-sans">
                          blink<span className="text-[#0E7A3D]">it</span>
                        </span>
                      </div>
                    </div>,
                    // Instamart
                    <div key={`instamart-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="bg-[#1D4ED8] px-3.5 sm:px-4 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                        <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-[#FC8019] rounded-full flex items-center justify-center p-0.5">
                          <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-black tracking-tight text-white font-sans lowercase">
                          instamart
                        </span>
                      </div>
                    </div>,
                    // Blue Dart
                    <div key={`bluedart-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1 bg-white px-3.5 py-1.5 rounded-lg shadow-sm font-black text-sm sm:text-base tracking-wider font-sans">
                        <span className="text-[#003893]">BLUE</span>
                        <span className="text-[#00A859]">DART</span>
                      </div>
                    </div>,
                    // BigBasket
                    <div key={`bigbasket-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg shadow-sm font-sans">
                        <div className="flex items-center text-[11px] sm:text-xs font-black leading-none bg-[#78A22F] text-white px-1.5 py-1 rounded">
                          <span className="text-[#E23744] mr-0.5">b</span>b
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                          bigbasket
                        </span>
                      </div>
                    </div>,
                    // Shadowfax
                    <div key={`shadowfax-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-4 sm:w-5 h-4 sm:h-5 fill-[#84CC16] shrink-0">
                          <path d="M2 12l20-9-9 20-3-8z" />
                        </svg>
                        <div className="flex flex-col text-left leading-none">
                          <span className="text-xs sm:text-sm font-black tracking-tight text-[#006838] uppercase font-sans">
                            SHADOWFAX
                          </span>
                          <span className="text-[7.5px] sm:text-[8px] italic font-semibold text-[#006838]/80 mt-0.5">
                            Think ahead!
                          </span>
                        </div>
                      </div>
                    </div>,
                    // Rapido
                    <div key={`rapido-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="bg-[#FFCE00] px-3.5 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-black tracking-tight text-slate-950 font-sans lowercase">
                          rapido
                        </span>
                      </div>
                    </div>,
                    // Porter
                    <div key={`porter-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg shadow-sm font-sans">
                        <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-black text-[10px]">
                          P
                        </div>
                        <span className="text-xs sm:text-sm font-black tracking-tight text-[#0066FF]">
                          Porter
                        </span>
                      </div>
                    </div>
                  ])}
                </div>
              </div>

            {/* ROW 2: Top EV Brands & OEM Partners (Exact Official Logos matching reference) */}
            <div className="overflow-hidden">
                <div className="gbg-marquee-row-2 gap-4 sm:gap-6 py-1">
                  {[...Array(2)].flatMap((_, repIdx) => [
                    // ZELIO (Real Official Logo: Yellow circle with lightning bolt + ZELIO + FUTURE IS ELECTRIC)
                    <div key={`zelio-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <img
                          src={zelioLogoImg}
                          alt="Zelio Official Logo - Future is Electric"
                          className="h-7 sm:h-8 w-auto max-w-[125px] sm:max-w-[140px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>,

                    // YObykes (Cyan YO bykes® + Rooted in Bharat Since 2006)
                    <div key={`yobykes-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex flex-col items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <div className="flex items-baseline gap-0.5 leading-none">
                          <span className="text-lg sm:text-xl font-black italic tracking-tighter text-[#0072CE] font-sans">
                            YO
                          </span>
                          <span className="text-sm sm:text-base font-bold italic tracking-tight text-[#0072CE] font-sans ml-0.5">
                            bykes
                          </span>
                          <span className="text-[7.5px] font-bold text-[#0072CE] ml-0.5">®</span>
                        </div>
                        <span className="text-[6.5px] sm:text-[7px] font-bold tracking-tight text-[#0072CE] font-sans mt-0.5">
                          Rooted in Bharat Since 2006
                        </span>
                      </div>
                    </div>,

                    // GOEEN (Real Official Logo: Ring with square notch + GOEEN italic bold)
                    <div key={`goeen-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <img
                          src={goeenDarkImg}
                          alt="GOEEN Motors Official Logo"
                          className="h-6 sm:h-7 w-auto max-w-[120px] sm:max-w-[135px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>,

                    // BGAUSS (Real Official Logo: Shield with BG + BGAUSS Wordmark)
                    <div key={`bgauss-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <img
                          src={bgaussLogoImg}
                          alt="BGAUSS Electric Mobility Official Logo"
                          className="h-7 sm:h-8 w-auto max-w-[125px] sm:max-w-[140px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>,

                    // GRAVTON (Real Official Logo: Orbital Ring Planet + Wide GRAVTON)
                    <div key={`gravton-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <img
                          src={gravtonLogoImg}
                          alt="GRAVTON Motors Official Logo"
                          className="h-5 sm:h-6 w-auto max-w-[125px] sm:max-w-[140px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>,

                    // MOTOVOLT (Real Official Logo: Orange Shield Crest + MOTOVOLT)
                    <div key={`motovolt-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <img
                          src={motovoltLogoImg}
                          alt="MOTOVOLT Mobility Official Logo"
                          className="h-8 sm:h-9 w-auto max-w-[120px] sm:max-w-[135px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>,

                    // e-SPRINTO (Red Triangular Shield with Lightning Bolt)
                    <div key={`esprinto-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <svg viewBox="0 0 32 36" className="w-4 sm:w-5 h-5 sm:h-6 drop-shadow-sm shrink-0">
                          <polygon points="16,34 2,6 30,6" fill="#DC2626" stroke="#94A3B8" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M18 10L11 20h6l-2 8 8-10h-6l2-8z" fill="#FFFFFF"/>
                        </svg>
                        <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 font-sans">
                          e<span className="text-red-600">-</span>SPRINTO
                        </span>
                      </div>
                    </div>,

                    // GBG EV (Orange & Blue Fleet Emblem)
                    <div key={`gbgev-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-[#EF6C1E] flex items-center justify-center text-white shadow-sm shrink-0">
                          <Zap size={14} className="fill-white" />
                        </div>
                        <div className="flex items-center font-black text-sm sm:text-base tracking-wide">
                          <span className="text-[#EF6C1E]">GBG</span>
                          <span className="text-[#2563EB] ml-1">EV</span>
                        </div>
                      </div>
                    </div>,

                    // Quantum EV
                    <div key={`quantum-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="bg-black text-white px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-inner border border-white/10">
                        <span className="text-xs font-bold tracking-tight text-white">Quantum</span>
                        <span className="text-[8.5px] sm:text-[9px] font-extrabold text-[#FACC15] border border-[#FACC15] rounded-full px-1 py-0.2">
                          ev
                        </span>
                      </div>
                    </div>
                  ])}
                </div>
              </div>
          </div>
        </div>

      </section>

      {/* 
        ========================================================================
        6. CONTACT US SECTION (CITY SKYLINE BANNER & 3-COLUMN CARDS)
        ========================================================================
      */}
      <section id="contact" className="relative w-full overflow-hidden">
        <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] flex flex-col items-center justify-center text-center px-6 sm:px-10 overflow-hidden bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=85"
            alt="City Skyline Backdrop"
            className="absolute inset-0 w-full h-full object-cover object-bottom filter grayscale contrast-125 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141B26]/85 via-[#1E293B]/75 to-[#0F172A]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#1e293b]/40 backdrop-blur-[1px]" />

          <ScrollReveal variant="zoom-in" className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-[#EF6C1E] drop-shadow-md">
              CONTACT US
            </h2>

            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-100 font-light max-w-xl mx-auto leading-relaxed drop-shadow">
              Need an expert? You are more than welcome to reach out to our corporate headquarters or commercial fleet team and we will be in touch shortly.
            </p>
          </ScrollReveal>
        </div>

        <div className={`relative z-20 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-20 border-b transition-colors duration-300 ${
          isLight
            ? "bg-white text-slate-800 border-slate-200 shadow-sm"
            : "bg-[#090D17] text-white border-white/10 shadow-2xl"
        }`}>
          <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x items-stretch ${
            isLight ? "divide-slate-200" : "divide-white/10"
          }`}>
            
            {/* Column 1: Visit Us */}
            <ScrollReveal variant="fade-up" delay={50} className="flex flex-col items-center text-center px-6 py-8 md:py-4 space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                <Home size={34} strokeWidth={2} />
              </div>

              <h3 className={`text-sm sm:text-base font-extrabold uppercase tracking-wider ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                VISIT US
              </h3>

              <p className={`text-xs sm:text-[13px] font-normal leading-relaxed max-w-xs ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Visit our central fleet command and corporate headquarters in Noida.
              </p>

              <div className="pt-2">
                <span className={`text-xs sm:text-sm font-semibold leading-relaxed block ${
                  isLight ? "text-[#EF6C1E]" : "text-orange-400"
                }`}>
                  Tower B, The Corenthum, Sector 62, Noida, UP, India
                </span>
              </div>
            </ScrollReveal>

            {/* Column 2: Call Us */}
            <ScrollReveal variant="fade-up" delay={150} className="flex flex-col items-center text-center px-6 py-8 md:py-4 space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                <Phone size={34} strokeWidth={2} />
              </div>

              <h3 className={`text-sm sm:text-base font-extrabold uppercase tracking-wider ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                CALL US
              </h3>

              <p className={`text-xs sm:text-[13px] font-normal leading-relaxed max-w-xs ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Speak directly with our partner support, fleet leasing, and rider assistance desks.
              </p>

              <div className="pt-2">
                <a
                  href="tel:+918800023546"
                  className={`text-xs sm:text-sm font-semibold hover:underline transition-colors block ${
                    isLight ? "text-[#EF6C1E]" : "text-orange-400"
                  }`}
                >
                  +91 88000 23546
                </a>
              </div>
            </ScrollReveal>

            {/* Column 3: Contact Us */}
            <ScrollReveal variant="fade-up" delay={250} className="flex flex-col items-center text-center px-6 py-8 md:py-4 space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                <Mail size={34} strokeWidth={2} />
              </div>

              <h3 className={`text-sm sm:text-base font-extrabold uppercase tracking-wider ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                CONTACT US
              </h3>

              <p className={`text-xs sm:text-[13px] font-normal leading-relaxed max-w-xs ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Drop us an email for corporate fleet partnerships, hub inquiries, and EV retail questions.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:contact@gbgev.com"
                  className={`text-xs sm:text-sm font-semibold hover:underline transition-colors block ${
                    isLight ? "text-[#EF6C1E]" : "text-orange-400"
                  }`}
                >
                  contact@gbgev.com
                </a>
              </div>
            </ScrollReveal>

          </div>

          {/* Quick Online Action Banner */}
          <ScrollReveal variant="fade-up" delay={300} className={`max-w-4xl mx-auto mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                Prefer to submit your fleet or partnership proposal online?
              </h4>
              <p className={`text-xs sm:text-sm ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Submit an inquiry and our corporate fleet desk in Noida will get back to you with custom terms within 24 hours.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenInquiry("corporate_fleet")}
                className="px-6 py-3 rounded-full bg-[#EF6C1E] hover:bg-orange-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Partner Proposal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 
        ========================================================================
        8. FOOTER SECTION (MINIMALIST LUXURY STUDIO AESTHETIC)
        ========================================================================
      */}
      <footer className={`relative overflow-hidden border-t transition-colors duration-300 pt-16 sm:pt-20 pb-28 sm:pb-32 md:pb-16 px-6 sm:px-12 lg:px-16 ${
        isLight
          ? "bg-slate-50 text-slate-800 border-slate-200"
          : "bg-[#06080D] text-slate-200 border-white/10"
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] h-48 bg-gradient-to-b rounded-full blur-3xl pointer-events-none ${
          isLight
            ? "from-orange-500/10 via-blue-500/5 to-transparent"
            : "from-orange-500/10 via-cyan-500/5 to-transparent"
        }`} />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Top Brand Tier: Logo */}
          <ScrollReveal variant="fade-up" delay={50} className="flex flex-col items-center">
            {/* Logo with Ambient Halo */}
            <div className="relative group flex flex-col items-center">
              <div className="absolute -inset-6 bg-gradient-to-b from-[#EF6C1E]/20 via-[#2563EB]/10 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <a
                href="#home"
                className="relative inline-block bg-transparent focus:outline-none transition-transform duration-300 hover:scale-105"
                aria-label="Go Baby Go Cabs"
              >
                <GoBabyGoLogo className="h-24 sm:h-28 md:h-32 w-auto drop-shadow-[0_8px_20px_rgba(239,108,30,0.2)]" variant={isLight ? "dark" : "light"} />
              </a>

              <p className={`mt-3 text-xs sm:text-sm font-medium tracking-wide ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}>
                Powering India's Green Mobility Revolution
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Backend Newsletter Subscription */}
          <ScrollReveal variant="fade-up" delay={80} className="w-full">
            <FooterNewsletter isLight={isLight} />
          </ScrollReveal>

          {/* Clean Thin Divider */}
          <div className={`w-full border-t my-9 sm:my-11 ${
            isLight ? "border-slate-200" : "border-white/10"
          }`} />

          {/* Navigation Links Row */}
          <ScrollReveal variant="fade-up" delay={100} className="w-full">
            <nav className={`flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3.5 text-sm sm:text-[15px] font-medium ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              <a href="#home" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Home
              </a>
              <a
                href="#gbgev-section"
                className="hover:opacity-80 transition-all duration-200 flex items-center justify-center p-1"
                aria-label="GBG EV"
                title="GBG EV"
              >
                <img
                  src={gbgEvEmblemImg}
                  alt="GBG EV"
                  className="h-5 sm:h-6 w-auto object-contain shrink-0 rounded-full hover:scale-105 transition-transform"
                />
              </a>
              <a
                href="#gbgx-section"
                className="hover:opacity-80 transition-all duration-200 flex items-center justify-center p-1"
                aria-label="GBG X"
                title="GBG X"
              >
                <img
                  src={isLight ? gbgxLogoBlueImg : gbgxLogoWhiteImg}
                  alt="GBGX Official Logo"
                  className="h-3.5 sm:h-4 w-auto object-contain shrink-0 hover:scale-105 transition-transform"
                />
              </a>
              <a href="#about" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Ecosystem
              </a>
              <a href="#network" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Network
              </a>
              <a href="#faq" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                FAQ
              </a>
              <a href="#contact" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Contact Us
              </a>
            </nav>
          </ScrollReveal>

          {/* Social Media Links Section */}
          <ScrollReveal variant="fade-up" delay={150} className="w-full my-8 sm:my-10 flex flex-col items-center text-center space-y-4">
            <h4 className={`text-base sm:text-lg font-semibold tracking-wide ${
              isLight ? "text-slate-900" : "text-white"
            }`}>
              Social Media Links
            </h4>

            {/* Sliding Brand Switcher (GBG EV <-> GBGX) */}
            <BrandSocialSwitcher
              socialTab={socialTab}
              setSocialTab={setSocialTab}
              isLight={isLight}
            />

            {socialTab === "gbgev" ? (
              <div className="flex items-center justify-center gap-6 sm:gap-7 pt-2">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Gbgev.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on Facebook"
                  title="GBG EV Facebook"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#EF6C1E] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="fb-mask-footer">
                      <rect width="24" height="24" fill="white" />
                      <path d="M14.2 19v-6.5h2.2l.33-2.6h-2.53V8.25c0-.75.21-1.26 1.28-1.26h1.37V4.65c-.24-.03-1.05-.1-2-.1-1.98 0-3.33 1.21-3.33 3.43V9.9H9.2v2.6h2.15V19h2.85z" fill="black" />
                    </mask>
                    <circle cx="12" cy="12" r="11" fill="currentColor" mask="url(#fb-mask-footer)" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@GBGEV"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on YouTube"
                  title="GBG EV YouTube"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#EF6C1E] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="yt-mask-footer-ev">
                      <rect width="24" height="24" fill="white" />
                      <polygon points="10,8 16,12 10,16" fill="black" />
                    </mask>
                    <circle cx="12" cy="12" r="11" fill="currentColor" mask="url(#yt-mask-footer-ev)" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/gbgev.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on Instagram"
                  title="GBG EV Instagram"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#EF6C1E] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/gobabygoev/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on LinkedIn"
                  title="GBG EV LinkedIn"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#EF6C1E] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="li-mask-footer-ev">
                      <rect width="24" height="24" fill="white" />
                      <circle cx="6.8" cy="7.2" r="1.6" fill="black" />
                      <rect x="5.4" y="10.2" width="2.8" height="8" rx="0.4" fill="black" />
                      <path d="M10.8 10.2h2.7v1.1c.4-.7 1.3-1.3 2.5-1.3 2.5 0 3.4 1.5 3.4 3.8v4.4h-2.8v-3.8c0-1.1-.4-1.8-1.5-1.8-1.1 0-1.5.7-1.5 1.8v3.8h-2.8v-8z" fill="black" />
                    </mask>
                    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" mask="url(#li-mask-footer-ev)" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/GBG_EV_?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on X"
                  title="GBG EV X"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#EF6C1E] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="x-mask-footer">
                      <rect width="24" height="24" fill="white" />
                      <path d="M15.5 6.5h2l-4.4 5 5.2 6.5h-4l-3.2-4.1-3.6 4.1h-2l4.7-5.4L5.3 6.5h4.1l2.9 3.8 3.2-3.8zm-.7 10.2h1.1L8.3 7.8H7.1l7.7 8.9z" fill="black" />
                    </mask>
                    <circle cx="12" cy="12" r="11" fill="currentColor" mask="url(#x-mask-footer)" />
                  </svg>
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-6 sm:gap-7 pt-2">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@gbgxev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG X on YouTube"
                  title="GBG X YouTube"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#2563EB] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="yt-mask-footer-gx">
                      <rect width="24" height="24" fill="white" />
                      <polygon points="10,8 16,12 10,16" fill="black" />
                    </mask>
                    <circle cx="12" cy="12" r="11" fill="currentColor" mask="url(#yt-mask-footer-gx)" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/gbgx.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG X on Instagram"
                  title="GBG X Instagram"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#2563EB] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/showcase/gbg-x/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG X on LinkedIn"
                  title="GBG X LinkedIn"
                  className={`transition-all duration-200 ${
                    isLight ? "text-slate-600 hover:text-[#2563EB] hover:scale-110" : "text-white hover:opacity-80 hover:scale-110"
                  }`}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <mask id="li-mask-footer-gx">
                      <rect width="24" height="24" fill="white" />
                      <circle cx="6.8" cy="7.2" r="1.6" fill="black" />
                      <rect x="5.4" y="10.2" width="2.8" height="8" rx="0.4" fill="black" />
                      <path d="M10.8 10.2h2.7v1.1c.4-.7 1.3-1.3 2.5-1.3 2.5 0 3.4 1.5 3.4 3.8v4.4h-2.8v-3.8c0-1.1-.4-1.8-1.5-1.8-1.1 0-1.5.7-1.5 1.8v3.8h-2.8v-8z" fill="black" />
                    </mask>
                    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" mask="url(#li-mask-footer-gx)" />
                  </svg>
                </a>
              </div>
            )}
          </ScrollReveal>

          {/* Legal Links & Copyright Tier */}
          <ScrollReveal variant="fade-up" delay={200} className="space-y-4 pt-2">
            <div className={`flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-xs font-normal ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              <a href="#faq" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Terms & Conditions
              </a>
              <span className={isLight ? "text-slate-300" : "text-white/20"}>|</span>
              <a href="#faq" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Privacy Policy
              </a>
              <span className={isLight ? "text-slate-300" : "text-white/20"}>|</span>
              <a href="#faq" className={`transition-colors duration-200 ${isLight ? "hover:text-slate-900" : "hover:text-white"}`}>
                Regulatory Disclosures
              </a>
              <span className={isLight ? "text-slate-300" : "text-white/20"}>|</span>
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className={`transition-colors duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
                  isLight ? "text-slate-600 hover:text-[#EF6C1E]" : "text-slate-400 hover:text-white"
                }`}
                title="Fleet Command Center & Lead Administration"
              >
                <Lock size={12} className="text-[#EF6C1E]" />
                <span>Fleet Command Admin</span>
              </button>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] font-mono pt-1 ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              <span>CIN: U60200UP2021OPC144565</span>
              <span className={`hidden sm:inline ${isLight ? "text-slate-300" : "text-white/20"}`}>•</span>
              <span>Corporate HQ: Tower B, The Corenthum, Sector 62, Noida, UP</span>
            </div>

            <p className={`text-[11px] sm:text-xs font-light tracking-wide ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              © 2026 GoBabyGo Cabs (OPC) Private Limited. All Rights Reserved. Powering India's Green Mobility Ecosystem.
            </p>
          </ScrollReveal>

        </div>
      </footer>

      {/* 
        ========================================================================
        MOBILE BOTTOM DOCK NAVIGATION BAR
        - Docked at bottom exclusively on mobile viewports (md:hidden)
        - Native app-like ergonomics for comfortable one-handed thumb navigation
        - Dual-brand dynamic styling with frosted glass backdrop blur
        - Active section detection & animated glowing indicators
        - Safe-area inset accommodation for borderless OLED phone screens
        ========================================================================
      */}
      {/* 
        ========================================================================
        MOBILE SCULPTED FLUID BOTTOM NAVIGATION BAR
        - Modern fluid curve / raised bubble design matching mobile reference
        - Smooth animated crest & elevated floating circle
        - Full touch & scrollspy navigation support
        ========================================================================
      */}
      <MobileCurvedNavBar
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        isLight={isLight}
      />

      {/* 
        ========================================================================
        BACKEND FULLSTACK MODALS (BOOKING, INQUIRY, FLEET ADMIN CONTROL CENTER)
        Status: Verified & Operational
        ========================================================================
      */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={bookingModalService}
        initialModel={bookingModalModel}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialType={inquiryModalType}
      />

      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}

/**
 * OFFICIAL GBG EV COMMERCIAL FLEET DELIVERY SCOOTER
 * Premium Automotive Showroom Presentation:
 * - High-resolution official GBG EV Delivery Scooter with rider
 * - Silhouette-masked specular clear-coat studio light sweep
 * - Soft 60 FPS conical motion blur rim shimmers on front & rear wheels
 * - Diffused ground contact shadows anchoring tires to the turntable floor
 * - Xenon projector headlight flare with soft ambient forward illumination
 * - Ruby red LED taillight safety glow
 * - Silky harmonic suspension breathing & pitch dynamics
 */
/**
 * OFFICIAL GBG EV COMMERCIAL FLEET DELIVERY SCOOTER
 * Dynamic High-Speed EV Cruising Experience:
 * - Authentic GBG EV Delivery Scooter with rider cruising at high speed
 * - Perspective digital highway track with streaming dashed lane markers & neon edge guide
 * - Diffused ground contact shadows anchored directly to the road pavement
 * - Volumetric LED projector headlight beam & road illumination pool
 * - Pulsing ruby red rear safety taillight
 * - Harmonic chassis suspension bounce & road dynamics
 * - Aerodynamic wind speed streaks
 */
function AnimatedEvScooter({ className = "w-auto h-48 sm:h-60" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <style>{`
        /* Smooth Showroom Turntable 3D Sweep */
        @keyframes gbgScooterShowroom3D {
          0% {
            transform: perspective(1200px) rotateY(-18deg) rotateX(2deg) translateY(0px);
          }
          50% {
            transform: perspective(1200px) rotateY(18deg) rotateX(-1deg) translateY(-4px);
          }
          100% {
            transform: perspective(1200px) rotateY(-18deg) rotateX(2deg) translateY(0px);
          }
        }

        /* Xenon Lens Flare Glow */
        @keyframes gbgXenonPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }

        /* Taillight Ruby Pulse */
        @keyframes gbgRubyPulse {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>

      {/* 3D Turntable Capsule */}
      <div
        className="relative flex flex-col items-center justify-center will-change-transform"
        style={{
          animation: "gbgScooterShowroom3D 4s ease-in-out infinite alternate",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Dynamic Scooter Chassis */}
        <div className="relative inline-block z-10">
          <img
            src={gbgDeliveryScooterImg}
            alt="Official GBG EV Commercial Delivery Scooter"
            className="relative z-10 h-36 sm:h-48 w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
          />

          {/* Xenon Projector Lens Flare */}
          <div
            className="absolute w-5 h-5 rounded-full pointer-events-none z-30"
            style={{
              top: "52%",
              left: "83.2%",
              background: "radial-gradient(circle, #FFFFFF 0%, #00E5FF 60%, transparent 75%)",
              boxShadow: "0 0 16px 4px #00E5FF, 0 0 32px 6px rgba(0,229,255,0.4)",
              animation: "gbgXenonPulse 2s ease-in-out infinite"
            }}
          />

          {/* Rear Ruby Red Safety Taillight */}
          <div
            className="absolute w-3.5 h-3.5 rounded-full pointer-events-none z-30"
            style={{
              top: "71.5%",
              left: "14.4%",
              background: "radial-gradient(circle, #FF2222 0%, #EF4444 60%, transparent 80%)",
              boxShadow: "0 0 12px 3px #EF4444, 0 0 20px 4px rgba(239,68,68,0.4)",
              animation: "gbgRubyPulse 1.6s ease-in-out infinite"
            }}
          />
        </div>

        {/* Realistic Floor Shadow & Specular Turntable Halo */}
        <div className="relative -mt-4 w-64 sm:w-80 h-7 rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[8px] pointer-events-none" />
        <div className="absolute -bottom-2 w-52 sm:w-68 h-4 rounded-[100%] bg-black/90 blur-sm pointer-events-none" />
      </div>
    </div>
  );
}

/**
 * GBG CABS OFFICIAL EMBLEM FORMATION ANIMATION
 * Silky-Smooth 60/120fps Choreography (2.7s total duration):
 * - 0.0s - 0.75s: Pointer smoothly descends and cushions onto the car chassis
 * - 0.75s - 1.05s: Smooth impact absorption, elastic rebound & contact flare settle
 * - 1.05s - 1.62s: THE FORMED LOGO GLORY HOLD (0.6s) - Pure official emblem with luxury specular sheen wipe
 * - 1.62s - 2.70s: SILKY UNBROKEN ZOOM-IN FLYTHROUGH - 100% continuous cubic-bezier acceleration (ZERO stutter, ZERO steps)
 * - 2.15s - 2.70s: Backdrop dissolves seamlessly into main website with pre-painted zero-lag handoff
 */
function GbgCabsDeconstructLogo({ className = "w-64 sm:w-80 md:w-96 h-auto" }) {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none`}>
      {/* Silky Zoom-In Master Container (Smoothly accelerates towards camera into fly-through) */}
      <div
        className="relative flex items-center justify-center w-full aspect-square"
        style={{
          animation: "gbgSilkyZoomScale 2.7s forwards, gbgSilkyZoomFade 2.7s forwards",
          transformOrigin: "50% 50%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform, opacity"
        }}
      >
        {/* Warm Ambient Backlight Aura & Zoom Bloom */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239, 108, 30, 0.28) 0%, rgba(255, 122, 26, 0.12) 40%, transparent 70%)",
            animation: "gbgSmoothGlow 2.7s ease-in-out forwards",
            transformOrigin: "50% 50%",
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        />

        {/* Diagonal Specular Sheen Sweep on Logo */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-30"
          style={{
            animation: "gbgSmoothSheenContainer 2.7s ease-out forwards"
          }}
        >
          <div
            className="w-1/3 h-[250%] -translate-y-1/4 will-change-transform"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
              animation: "gbgSmoothSheenBeam 2.7s cubic-bezier(0.4, 0, 0.2, 1) forwards"
            }}
          />
        </div>

        {/* Contact Point Impact Shockwave (Dead-center on pointer tip at 77%) */}
        <div
          className="absolute rounded-full border-2 border-[#EF6C1E] pointer-events-none will-change-transform z-20"
          style={{
            top: "77%",
            left: "50%",
            width: "80px",
            height: "80px",
            boxShadow: "0 0 16px rgba(239, 108, 30, 0.6)",
            animation: "gbgSmoothShockwave 2.7s forwards"
          }}
        />

        {/* Contact Point Radial Flare Flash (Zero-lag pure radial gradient) */}
        <div
          className="absolute rounded-full pointer-events-none will-change-transform z-20"
          style={{
            top: "77%",
            left: "50%",
            width: "60px",
            height: "60px",
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,180,100,0.8) 40%, rgba(239,108,30,0) 70%)",
            animation: "gbgSmoothFlare 2.7s forwards"
          }}
        />

        {/* Dynamic Bloom Core on Contact */}
        <div
          className="absolute rounded-full pointer-events-none will-change-transform z-18"
          style={{
            top: "77%",
            left: "50%",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(239, 108, 30, 0.45) 0%, transparent 70%)",
            animation: "gbgSmoothGlow 2.7s forwards"
          }}
        />

        {/* LAYER 1: THE VEHICLE (Geometric Electric Scooter Body) */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform z-10"
          style={{
            animation: "gbgCarNaturalSuspension 2.7s forwards",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            {/* Chassis Body */}
            <path
              d="M48 106 C44 122 44 136 45 152 C45 156 50 158 54 158 H70 C74 158 76 154 76 150 V142 H124 V150 C124 154 126 158 130 158 H146 C150 158 155 156 155 152 C156 136 156 122 152 106 C148 94 136 88 124 86 H76 C64 88 52 94 48 106 Z"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left & Right Cowl Fairings */}
            <path d="M54 116 C54 105 65 102 74 108 C70 120 61 122 54 116 Z" fill="#FFFFFF" />
            <path d="M146 116 C146 105 135 102 126 108 C130 120 139 122 146 116 Z" fill="#FFFFFF" />
            {/* Steering Bridge Bar */}
            <path d="M74 74 C82 66 118 66 126 74" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
            {/* Left Handlebar & Mirror */}
            <path d="M42 96 C30 96 28 84 39 80 C46 79 48 86 46 93" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Handlebar & Mirror */}
            <path d="M158 96 C170 96 172 84 161 80 C154 79 152 86 154 93" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

            {/* "GO BABY GO" Typography Base */}
            <g transform="translate(0, 184)">
              <text
                x="22"
                y="0"
                fill="#EF6C1E"
                fontSize="20"
                fontWeight="900"
                fontFamily="'Inter', system-ui, sans-serif"
                letterSpacing="0.05em"
              >
                GO
              </text>
              <text
                x="66"
                y="0"
                fill="#FFFFFF"
                fontSize="20"
                fontStyle="italic"
                fontWeight="900"
                fontFamily="'Inter', system-ui, sans-serif"
                letterSpacing="0.06em"
              >
                BABY
              </text>
              <text
                x="142"
                y="0"
                fill="#EF6C1E"
                fontSize="20"
                fontWeight="900"
                fontFamily="'Inter', system-ui, sans-serif"
                letterSpacing="0.05em"
              >
                GO
              </text>
            </g>
          </svg>
        </div>

        {/* LAYER 2: THE LOCATION POINTER (Falling Orange Pin - Dedicated GPU Layer) */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform z-15"
          style={{
            animation: "gbgPointerNaturalDrop 2.7s forwards",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id="gbgOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7A1A" />
                <stop offset="100%" stopColor="#EF6C1E" />
              </linearGradient>
            </defs>
            {/* Outer Location Pin */}
            <path
              d="M100 12 C60 12 36 42 36 78 C36 110 88 142 100 154 C112 142 164 110 164 78 C164 42 140 12 100 12 Z"
              stroke="url(#gbgOrangeGrad)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Rider Head Orb */}
            <circle cx="100" cy="56" r="21" fill="url(#gbgOrangeGrad)" />
          </svg>
        </div>

        {/* Floor Shadow Under Car Design (Pure radial gradient, zero blur cost) */}
        <div
          className="absolute -bottom-6 w-56 sm:w-72 h-4 rounded-[100%] pointer-events-none will-change-transform"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)",
            animation: "gbgSmoothFloorShadow 2.7s ease-out forwards"
          }}
        />
      </div>
    </div>
  );
}

/**
 * GBG INTRO LOADER
 * Pure, well-paced, distraction-free logo experience:
 * Silky-smooth 60/120fps zoom and seamless dissolve handoff.
 */
function GbgIntroLoader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fade out backdrop smoothly as the zoom acceleration takes flight (~2.15s)
    const timer1 = setTimeout(() => setIsFadingOut(true), 2150);
    // Unmount and hand off seamlessly to the main website (~2.70s)
    const timer2 = setTimeout(() => onComplete(), 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => onComplete(), 50);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#070A10] text-white select-none overflow-hidden transition-opacity duration-550 ease-out will-change-[opacity] ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style>{`
        /* 1. MASTER SILKY ZOOM-IN (SCALE & FADE SEPARATED FOR UNINTERRUPTED SMOOTHNESS) */
        /* Holds 0.6s in formed glory, then accelerates forward towards viewer with ONE pure cubic curve */
        @keyframes gbgSilkyZoomScale {
          0%, 60% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            animation-timing-function: cubic-bezier(0.35, 0, 0.15, 1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale3d(9, 9, 1);
          }
        }

        @keyframes gbgSilkyZoomFade {
          0%, 74% {
            opacity: 1;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          100% {
            opacity: 0;
          }
        }

        /* 2. DEDICATED GPU-LAYER SILKY POINTER DROP (0.0s to 1.0s) */
        @keyframes gbgPointerNaturalDrop {
          0% {
            transform: translate3d(0, -135%, 0);
            animation-timing-function: cubic-bezier(0.2, 0.95, 0.3, 1);
          }
          24% {
            transform: translate3d(0, 0, 0);
            animation-timing-function: cubic-bezier(0.25, 0, 0.25, 1);
          }
          27% {
            transform: translate3d(0, 3.5px, 0);
            animation-timing-function: cubic-bezier(0.25, 1, 0.4, 1);
          }
          31% {
            transform: translate3d(0, -1px, 0);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          35%, 100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* 3. SILKY RESPONSIVE CAR SUSPENSION */
        @keyframes gbgCarNaturalSuspension {
          0%, 24% {
            transform: translate3d(0, 0, 0);
            animation-timing-function: cubic-bezier(0.25, 0, 0.25, 1);
          }
          27% {
            transform: translate3d(0, 3.5px, 0);
            animation-timing-function: cubic-bezier(0.25, 1, 0.4, 1);
          }
          31% {
            transform: translate3d(0, -1px, 0);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          35%, 100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* 4. SILKY CONTACT SHOCKWAVE */
        @keyframes gbgSmoothShockwave {
          0%, 23% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }
          24% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.95;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          35% {
            transform: translate(-50%, -50%) scale(2.0);
            opacity: 0.4;
          }
          44%, 100% {
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
          }
        }

        /* 5. CONTACT FLARE */
        @keyframes gbgSmoothFlare {
          0%, 23% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }
          24% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          33% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0.4;
          }
          40%, 100% {
            transform: translate(-50%, -50%) scale(2.4);
            opacity: 0;
          }
        }



        /* 6. FLOOR SHADOW */
        @keyframes gbgSmoothFloorShadow {
          0%, 23% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 0.5;
          }
          27% {
            transform: translate3d(0, 0, 0) scale3d(1.12, 1.12, 1);
            opacity: 0.75;
          }
          35%, 60% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 0.5;
            animation-timing-function: cubic-bezier(0.35, 0, 0.15, 1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale3d(3.5, 3.5, 1);
            opacity: 0;
          }
        }

        /* 7. AMBIENT GLOW & ZOOM BLOOM */
        @keyframes gbgSmoothGlow {
          0%, 23% {
            opacity: 0.3;
            transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
          }
          27% {
            opacity: 0.8;
            transform: translate3d(-50%, -50%, 0) scale3d(1.18, 1.18, 1);
          }
          35%, 60% {
            opacity: 0.45;
            transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
            animation-timing-function: cubic-bezier(0.35, 0, 0.15, 1);
          }
          100% {
            opacity: 0;
            transform: translate3d(-50%, -50%, 0) scale3d(4, 4, 1);
          }
        }

        /* 8. LUXURY LIGHT SHEEN WIPE (Runs during the 0.6s formed logo hold) */
        @keyframes gbgSmoothSheenContainer {
          0%, 38% { opacity: 0; }
          40% { opacity: 1; }
          57% { opacity: 1; }
          60%, 100% { opacity: 0; }
        }

        @keyframes gbgSmoothSheenBeam {
          0%, 38% {
            transform: translate3d(-160%, 0, 0) skewX(-25deg);
          }
          57% {
            transform: translate3d(240%, 0, 0) skewX(-25deg);
          }
          100% {
            transform: translate3d(240%, 0, 0) skewX(-25deg);
          }
        }
      `}</style>

      {/* Quiet, Minimal Skip Option in Top-Right */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-8 right-8 z-30 text-[11px] font-medium tracking-[0.2em] text-white/30 hover:text-white/90 uppercase transition-colors duration-300"
      >
        Skip
      </button>

      {/* Floor Ambient Specular Reflection Pool (Pure radial gradient, zero blur) */}
      <div
        className="absolute bottom-16 sm:bottom-20 w-64 sm:w-96 h-12 rounded-[100%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(239, 108, 30, 0.25) 0%, transparent 70%)"
        }}
      />

      {/* Centered Pure Logo Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        <GbgCabsDeconstructLogo />
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  return (
    <AppErrorBoundary>
      {showIntro && (
        <GbgIntroLoader onComplete={handleIntroComplete} />
      )}
      <MainApp onReplayIntro={handleReplayIntro} />
    </AppErrorBoundary>
  );
}