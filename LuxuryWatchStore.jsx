import React, { useState, useEffect, Component, useRef } from "react";
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
  MapPin
} from "lucide-react";

import gbgEvLogoImg from "./assets/images.jpg";
import gbgxLogoImg from "./assets/Screenshot 2026-08-31 150402.png";
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
      className={`transition-all will-change-transform ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}

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
      src={gbgEvLogoImg}
      alt="GBG EV Official Logo"
      className={`${className} object-contain`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/images.jpg";
      }}
    />
  );
};

export const ExactGbgxLogo = ({ className = "h-14 sm:h-18 md:h-20 w-auto" }) => {
  return (
    <img
      src={gbgxLogoImg}
      alt="GBGX Official Logo"
      className={`${className} object-contain mix-blend-screen filter contrast-150 brightness-110`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/Screenshot 2026-08-31 150402.png";
      }}
    />
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
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
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

/**
 * GBGX OUR JOURNEY - COMPANY TIMELINE
 * clean typography, responsive mobile flow, and light/dark theme support.
 */
const GBGX_JOURNEY_MILESTONES = [
  {
    year: "2023",
    eyebrow: "The Beginning",
    title: "One-Stop EV Platform",
    desc: "GBGX launched with a vision to create a comprehensive platform for electric scooters. Started with focus on convenience, reliability, and variety.",
    isTop: false, // Text below year (stem going down)
    accent: "orange",
  },
  {
    year: "2023",
    eyebrow: "Building Ecosystem",
    title: "Complete EV Solutions",
    desc: "Expanded beyond scooters to include genuine spare parts, batteries, tires, brakes, and essential rider accessories.",
    isTop: true, // Text above year (stem going down to year)
    accent: "blue",
  },
  {
    year: "2024",
    eyebrow: "Nationwide Reach",
    title: "Pan India Presence",
    desc: "Serving riders across India with verified quality products. Platform enables easy comparison and seamless buying experience.",
    isTop: false, // Text below year (stem going down)
    accent: "orange",
  },
  {
    year: "2024",
    eyebrow: "Rider Community",
    title: "Trust & Convenience",
    desc: "Built a thriving community of EV riders. Offering high-quality verified products and dedicated support for sustainable mobility.",
    isTop: true, // Text above year (stem going down to year)
    accent: "blue",
  },
  {
    year: "2025",
    eyebrow: "Future Ready",
    title: "Innovation Focused",
    desc: "Continuously expanding offerings with future-ready solutions. AI-powered recommendations and limitless possibilities ahead.",
    isTop: false, // Text below year (stem going down)
    accent: "orange",
  },
];

function GbgxJourneyTimeline() {
  return (
    <div className="pt-14 pb-4">
      <ScrollReveal variant="fade-up" delay={80}>
        <div className="rounded-3xl relative overflow-hidden bg-[#0A0E17] text-white border border-[#EF6C1E]/30 shadow-[0_0_50px_rgba(239,108,30,0.12),0_0_80px_rgba(37,99,235,0.08)] p-6 sm:p-10 lg:p-14">
          {/* Subtle Ambient Glow Accents (Orange & Royal Blue) */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#EF6C1E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 mb-6 border-b border-white/10 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/15 border border-[#EF6C1E]/35 text-[#EF6C1E] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                <span>Strategic Roadmap</span>
              </div>
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                The Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C1E] via-orange-400 to-[#2563EB]">GBGX</span>
              </h4>

              <p className="text-xs sm:text-sm font-medium text-slate-400">
                From 2023 to the Future • Pioneering Multi-Brand Electric Mobility
              </p>
            </div>
          </div>

          {/* 
            ========================================================================
            DESKTOP VIEW: STAGGERED HORIZONTAL TIMELINE (INSPIRED BY REFERENCE SLIDE)
            All 5 years aligned on the exact same horizontal axis!
            ========================================================================
          */}
          <div className="hidden lg:block relative pt-4 pb-8">
            {/* Continuous Horizontal Baseline Axis passing right behind the years */}
            <div className="absolute top-[204px] left-2 right-10 h-[1.5px] z-0 pointer-events-none bg-gradient-to-r from-white/20 via-[#2563EB]/40 to-[#EF6C1E]" />

            {/* Glowing Infinity Symbol Terminating the Timeline Axis */}
            <div
              className="absolute top-[204px] -right-1 -translate-y-1/2 z-20 flex items-center justify-center bg-[#0A0E17] pl-2.5 py-0.5"
              title="Beyond 2025 • Limitless Future"
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#EF6C1E] drop-shadow-[0_0_20px_rgba(239,108,30,0.85)] select-none hover:scale-110 transition-transform duration-300 cursor-default">
                ∞
              </span>
            </div>

            <div className="grid grid-cols-5 gap-6 xl:gap-8 relative z-10 items-stretch">
              {GBGX_JOURNEY_MILESTONES.map((item, idx) => {
                const isOrange = item.accent === "orange";
                return (
                  <div key={idx} className="flex flex-col justify-between group">
                    {/* Row 1: Top Content Slot */}
                    <div className="h-[140px] flex flex-col justify-end">
                      {item.isTop ? (
                        <div className="space-y-1.5 text-left pb-1">
                          <p className={`text-[11px] font-bold uppercase tracking-wider ${isOrange ? "text-[#EF6C1E]" : "text-blue-400"}`}>
                            {item.eyebrow}
                          </p>
                          <h5 className="text-sm sm:text-[15px] font-bold leading-snug text-white">
                            {item.title}
                          </h5>
                          <p className="text-xs leading-relaxed font-normal text-slate-300">
                            {item.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="h-[140px]" />
                      )}
                    </div>

                    {/* Row 2: Top Stem Slot (Points down from top content to year) */}
                    <div className="h-9 flex items-end">
                      {item.isTop ? (
                        <div className={`w-[1.5px] h-8 ml-1 ${isOrange ? "bg-[#EF6C1E]" : "bg-[#2563EB]"}`} />
                      ) : (
                        <div className="h-9" />
                      )}
                    </div>

                    {/* Row 3: Year on the Continuous Center Axis */}
                    <div className="h-14 flex items-center relative">
                      <div className="relative z-10 inline-block pr-4 bg-[#0A0E17]">
                        <span className={`text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block text-white ${isOrange ? "group-hover:text-[#EF6C1E]" : "group-hover:text-blue-400"}`}>
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Row 4: Bottom Stem Slot (Points down from year to bottom content) */}
                    <div className="h-9 flex items-start">
                      {!item.isTop ? (
                        <div className={`w-[1.5px] h-8 ml-1 ${isOrange ? "bg-[#EF6C1E]" : "bg-[#2563EB]"}`} />
                      ) : (
                        <div className="h-9" />
                      )}
                    </div>

                    {/* Row 5: Bottom Content Slot */}
                    <div className="h-[140px] flex flex-col justify-start">
                      {!item.isTop ? (
                        <div className="space-y-1.5 text-left pt-1">
                          <p className={`text-[11px] font-bold uppercase tracking-wider ${isOrange ? "text-[#EF6C1E]" : "text-blue-400"}`}>
                            {item.eyebrow}
                          </p>
                          <h5 className="text-sm sm:text-[15px] font-bold leading-snug text-white">
                            {item.title}
                          </h5>
                          <p className="text-xs leading-relaxed font-normal text-slate-300">
                            {item.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="h-[140px]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 
            ========================================================================
            MOBILE / TABLET VIEW: ELEGANT VERTICAL CONNECTED TIMELINE
            ========================================================================
          */}
          <div className="lg:hidden space-y-10 relative pl-8 border-l-2 ml-3 my-4 border-white/15">
            {GBGX_JOURNEY_MILESTONES.map((item, idx) => {
              const isOrange = item.accent === "orange";
              return (
                <div key={idx} className="relative group">
                  {/* Node Dot on the Vertical Line */}
                  <span className={`absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0A0E17] ring-4 ${isOrange ? "bg-[#EF6C1E] ring-[#EF6C1E]/25" : "bg-[#2563EB] ring-[#2563EB]/25"}`} />

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {item.year}
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isOrange ? "text-[#EF6C1E]" : "text-blue-400"}`}>
                        {item.eyebrow}
                      </span>
                    </div>

                    <h5 className="text-base font-bold leading-snug text-white">
                      {item.title}
                    </h5>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Mobile Terminating Infinity Node */}
            <div className="relative pt-2">
              <span className="absolute -left-[43px] -top-0.5 w-6 h-6 rounded-full border-2 bg-[#0A0E17] border-[#EF6C1E] flex items-center justify-center text-xs font-black text-[#EF6C1E] shadow-[0_0_15px_rgba(239,108,30,0.6)]">
                ∞
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400/90">
                Beyond • Limitless Future
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
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
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
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

        {/* FLOATING GLASS NAVIGATION HEADER */}
        <header className="relative z-30 w-full pt-6 px-6 sm:px-10 lg:px-16">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <a
              href="#home"
              className="flex items-center bg-transparent transition-all duration-300 focus:outline-none"
              aria-label="Go Baby Go Cabs"
            >
              <GoBabyGoLogo className="h-12 sm:h-14 w-auto" variant="light" />
            </a>

            <nav className="hidden md:flex items-center space-x-10 text-[13px] tracking-[0.16em] uppercase font-semibold text-white/90">
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
            <div className="flex flex-col gap-6 text-lg font-semibold tracking-wider uppercase mt-4">
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
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <span className={`text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full border ${
            isLight
              ? "text-orange-600 bg-orange-100 border-orange-200"
              : "text-orange-400 bg-orange-950/40 border-orange-800/40"
          }`}>
            Our Ecosystem
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight capitalize ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Affiliated Companies
          </h2>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Discover the specialized corporate verticals and brand platforms driving clean last-mile logistics, retail mobility, and energy innovation under GoBabyGo Cabs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          <ScrollReveal variant="fade-right" delay={100} className="w-full">
            <a
              href="#gbgev-section"
              className="group relative w-full h-[260px] md:h-[300px] bg-[#FFFFFF] rounded-3xl px-8 py-6 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-slate-200 cursor-pointer overflow-hidden"
              title="Explore GBG EV Ecosystem"
            >
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                <ExactGbgEvLogo className="max-h-[140px] md:max-h-[160px] w-auto max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={150} className="w-full">
            <a
              href="#gbgx-section"
              className="group relative w-full h-[260px] md:h-[300px] bg-[#000000] rounded-3xl px-8 py-6 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-neutral-800 cursor-pointer overflow-hidden"
              title="Explore GBG X Multi-Brand Platform"
            >
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                <ExactGbgxLogo className="max-h-[70px] md:max-h-[85px] w-auto max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
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
          STRATEGIC ECOSYSTEM INFOGRAPHIC (CHECKERBOARD ARCHITECTURE - GBG BRAND THEME)
          ========================================================================
        */}
        <div className="mb-16 sm:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* 1. BLOCK 01 (Col 1, Row 1 on Desktop | Col 1, Row 1 on Mobile) - GBG ORANGE */}
            <ScrollReveal variant="zoom-in" delay={100} className="col-start-1 row-start-1 lg:col-start-1 lg:row-start-1 h-full">
              <div
                className={`relative group p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border flex flex-col justify-between overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full ${
                  isLight
                    ? "bg-gradient-to-br from-orange-50/90 via-white to-slate-50 border-orange-200/90 shadow-md hover:border-orange-400"
                    : "bg-gradient-to-br from-[#1c1410]/95 via-[#111624]/95 to-[#090d17]/95 border-orange-500/30 hover:border-orange-500/60 shadow-[0_15px_35px_-10px_rgba(239,108,30,0.18)]"
                }`}
              >
                {/* Glowing Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#EF6C1E] to-transparent opacity-90" />

                {/* Ambient Radial Backlight */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-all duration-500"
                  style={{ background: "rgba(239, 108, 30, 0.25)" }}
                />

                {/* Desktop Right Arrow into Image A */}
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[16px] border-y-transparent border-l-[16px] border-l-[#EF6C1E] drop-shadow-[0_2px_8px_rgba(239,108,30,0.35)]" />
                {/* Desktop Down Pointer into Image C */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-3 z-20 w-0 h-0 border-x-[12px] border-x-transparent border-t-[12px] border-t-[#EF6C1E] drop-shadow-[0_2px_8px_rgba(239,108,30,0.35)]" />
                {/* Mobile Right Arrow into Image A */}
                <div className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#EF6C1E]" />

                {/* Top: Icon Left, Step Number Right */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                    isLight
                      ? "bg-orange-100 border-orange-300 text-orange-600"
                      : "bg-orange-500/15 border-orange-500/30 text-orange-400"
                  }`}>
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                      01
                    </span>
                    <div className="w-8 sm:w-10 h-1 bg-[#EF6C1E] rounded-full mt-1.5 shadow-[0_0_8px_rgba(239,108,30,0.5)]" />
                  </div>
                </div>

                {/* Middle: Description */}
                <p className={`text-xs sm:text-[13px] lg:text-sm leading-relaxed font-medium my-auto py-2.5 sm:py-3 relative z-10 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>
                  Founded in Noida, UP as GoBabyGo Cabs (OPC) Private Limited, pioneering sustainable last-mile delivery and smart EV transit.
                </p>

                {/* Bottom: Hero Stat & Title */}
                <div className={`mt-auto pt-2 border-t relative z-10 ${isLight ? "border-orange-200" : "border-white/10"}`}>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(239,108,30,0.3)]">
                    2021
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase mt-1 text-[#EF6C1E]">
                    FOUNDED
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. FEATURE TILE A (Col 2, Row 1 on Desktop | Col 2, Row 1 on Mobile) - NOIDA HQ */}
            <ScrollReveal variant="zoom-in" delay={150} className="col-start-2 row-start-1 lg:col-start-2 lg:row-start-1 h-full">
              <div className={`relative group overflow-hidden rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full flex flex-col justify-between ${
                isLight ? "border-orange-200 bg-white" : "border-slate-800/80 hover:border-orange-500/50 bg-[#0B0F19]"
              }`}>
                {/* Background HQ Photo with Smooth Zoom & Cinematic Lighting */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={gbgHqOfficeImg}
                    alt="GoBabyGo Cabs Corporate Headquarters - Sector 62 Noida"
                    className="w-full h-full object-cover object-[center_30%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Ambient Vignette for depth and badge contrast */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isLight
                      ? "bg-gradient-to-t from-black/35 via-transparent to-black/25"
                      : "bg-gradient-to-t from-[#090d16]/70 via-transparent to-black/40"
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 w-full p-3 sm:p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-md whitespace-nowrap ${
                    isLight ? "bg-white/90 text-orange-700 border-orange-200" : "bg-black/60 text-orange-400 border-orange-500/30"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    NOIDA HQ • INCEPTION
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. FEATURE TILE C (Col 1, Row 2 on Desktop | Col 1, Row 2 on Mobile) - COMMERCIAL EV FLEET */}
            <ScrollReveal variant="zoom-in" delay={250} className="col-start-1 row-start-2 lg:col-start-1 lg:row-start-2 h-full">
              <div className={`relative group overflow-visible rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full flex flex-col justify-between ${
                isLight ? "border-blue-200 bg-white" : "border-slate-800/80 hover:border-blue-500/50 bg-[#0B0F19]"
              }`}>
                {/* Desktop Right Arrow into Card 02 */}
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[16px] border-y-transparent border-l-[16px] border-l-[#2563EB] drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]" />
                {/* Mobile Right Arrow into Card 02 */}
                <div className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#2563EB]" />

                {/* Background EV Fleet Photo with Smooth Zoom & Cinematic Lighting */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={gbgEvFleetPartnersImg}
                    alt="GBG EV Commercial Fleet powering Zepto, Blinkit, Zomato, Swiggy"
                    className="w-full h-full object-cover object-[center_35%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Ambient Vignette for depth and badge contrast */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isLight
                      ? "bg-gradient-to-t from-black/35 via-transparent to-black/25"
                      : "bg-gradient-to-t from-[#090d16]/70 via-transparent to-black/40"
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 w-full p-3 sm:p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-md whitespace-nowrap ${
                    isLight ? "bg-white/90 text-blue-700 border-blue-200" : "bg-black/60 text-blue-400 border-blue-500/30"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    COMMERCIAL EV FLEET
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. BLOCK 02 (Col 2, Row 2 on Desktop | Col 2, Row 2 on Mobile) - GBG ROYAL BLUE */}
            <ScrollReveal variant="zoom-in" delay={200} className="col-start-2 row-start-2 lg:col-start-2 lg:row-start-2 h-full">
              <div
                className={`relative group p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border flex flex-col justify-between overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full ${
                  isLight
                    ? "bg-gradient-to-br from-blue-50/90 via-white to-slate-50 border-blue-200/90 shadow-md hover:border-blue-400"
                    : "bg-gradient-to-br from-[#10172e]/95 via-[#0e1426]/95 to-[#090d17]/95 border-blue-500/30 hover:border-blue-500/60 shadow-[0_15px_35px_-10px_rgba(37,99,235,0.18)]"
                }`}
              >
                {/* Glowing Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-90" />

                {/* Ambient Radial Backlight */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-all duration-500"
                  style={{ background: "rgba(37, 99, 235, 0.25)" }}
                />

                {/* Desktop Up Pointer into Image A */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-3 z-20 w-0 h-0 border-x-[12px] border-x-transparent border-b-[12px] border-b-[#2563EB] drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]" />

                {/* Top: Icon Left, Step Number Right */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                    isLight
                      ? "bg-blue-100 border-blue-300 text-blue-600"
                      : "bg-blue-500/15 border-blue-500/30 text-blue-400"
                  }`}>
                    <Car className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                      02
                    </span>
                    <div className="w-8 sm:w-10 h-1 bg-[#2563EB] rounded-full mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                  </div>
                </div>

                {/* Middle: Description */}
                <p className={`text-xs sm:text-[13px] lg:text-sm leading-relaxed font-medium my-auto py-2.5 sm:py-3 relative z-10 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>
                  Commercial electric two-wheelers and three-wheelers powering India's leading eCommerce & logistics fleet.
                </p>

                {/* Bottom: Hero Stat & Title */}
                <div className={`mt-auto pt-2 border-t relative z-10 ${isLight ? "border-blue-200" : "border-white/10"}`}>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(37,99,235,0.3)]">
                    10,000+
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase mt-1 text-[#2563EB]">
                    ACTIVE VEHICLES
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. BLOCK 03 (Col 3, Row 1 on Desktop | Col 1, Row 3 on Mobile) - GBG ORANGE */}
            <ScrollReveal variant="zoom-in" delay={300} className="col-start-1 row-start-3 lg:col-start-3 lg:row-start-1 h-full">
              <div
                className={`relative group p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border flex flex-col justify-between overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full ${
                  isLight
                    ? "bg-gradient-to-br from-orange-50/90 via-white to-slate-50 border-orange-200/90 shadow-md hover:border-orange-400"
                    : "bg-gradient-to-br from-[#1c1410]/95 via-[#111624]/95 to-[#090d17]/95 border-orange-500/30 hover:border-orange-500/60 shadow-[0_15px_35px_-10px_rgba(239,108,30,0.18)]"
                }`}
              >
                {/* Glowing Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#EF6C1E] to-transparent opacity-90" />

                {/* Ambient Radial Backlight */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-all duration-500"
                  style={{ background: "rgba(239, 108, 30, 0.25)" }}
                />

                {/* Desktop Right Arrow into Image B */}
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[16px] border-y-transparent border-l-[16px] border-l-[#EF6C1E] drop-shadow-[0_2px_8px_rgba(239,108,30,0.35)]" />
                {/* Desktop Down Pointer into Image D */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-3 z-20 w-0 h-0 border-x-[12px] border-x-transparent border-t-[12px] border-t-[#EF6C1E] drop-shadow-[0_2px_8px_rgba(239,108,30,0.35)]" />
                {/* Mobile Right Arrow into Image B */}
                <div className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#EF6C1E]" />

                {/* Top: Icon Left, Step Number Right */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                    isLight
                      ? "bg-orange-100 border-orange-300 text-orange-600"
                      : "bg-orange-500/15 border-orange-500/30 text-orange-400"
                  }`}>
                    <BatteryCharging className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                      03
                    </span>
                    <div className="w-8 sm:w-10 h-1 bg-[#EF6C1E] rounded-full mt-1.5 shadow-[0_0_8px_rgba(239,108,30,0.5)]" />
                  </div>
                </div>

                {/* Middle: Description */}
                <p className={`text-xs sm:text-[13px] lg:text-sm leading-relaxed font-medium my-auto py-2.5 sm:py-3 relative z-10 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>
                  Strategic high-uptime charging & smart battery swapping stations deployed across major transit arteries.
                </p>

                {/* Bottom: Hero Stat & Title */}
                <div className={`mt-auto pt-2 border-t relative z-10 ${isLight ? "border-orange-200" : "border-white/10"}`}>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(239,108,30,0.3)]">
                    75+
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase mt-1 text-[#EF6C1E]">
                    CHARGING HUBS
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 6. FEATURE TILE B (Col 4, Row 1 on Desktop | Col 2, Row 3 on Mobile) - BATTERY REPLACEMENT */}
            <ScrollReveal variant="zoom-in" delay={350} className="col-start-2 row-start-3 lg:col-start-4 lg:row-start-1 h-full">
              <div className={`relative group overflow-hidden rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full flex flex-col justify-between ${
                isLight ? "border-orange-200 bg-white" : "border-slate-800/80 hover:border-orange-500/50 bg-[#0B0F19]"
              }`}>
                {/* Background Battery Swap Photo with Smooth Zoom & Cinematic Lighting */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={gbgBatteryReplacementImg}
                    alt="GoBabyGo Cabs EV Battery Replacement & Maintenance"
                    className="w-full h-full object-cover object-[center_52%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Ambient Vignette for depth and badge contrast */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isLight
                      ? "bg-gradient-to-t from-black/35 via-transparent to-black/25"
                      : "bg-gradient-to-t from-[#090d16]/70 via-transparent to-black/40"
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 w-full p-3 sm:p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-md whitespace-nowrap ${
                    isLight ? "bg-white/90 text-orange-700 border-orange-200" : "bg-black/60 text-orange-400 border-orange-500/30"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    BATTERY REPLACEMENT
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 7. FEATURE TILE D (Col 3, Row 2 on Desktop | Col 1, Row 4 on Mobile) - MULTI-BRAND FLEET */}
            <ScrollReveal variant="zoom-in" delay={450} className="col-start-1 row-start-4 lg:col-start-3 lg:row-start-2 h-full">
              <div className={`relative group overflow-visible rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full flex flex-col justify-between ${
                isLight ? "border-blue-200 bg-white" : "border-slate-800/80 hover:border-blue-500/50 bg-[#0B0F19]"
              }`}>
                {/* Desktop Right Arrow into Card 04 */}
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[16px] border-y-transparent border-l-[16px] border-l-[#2563EB] drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]" />
                {/* Mobile Right Arrow into Card 04 */}
                <div className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#2563EB]" />

                {/* Background Multi-Brand EV Fleet Showroom Photo with Smooth Zoom & Cinematic Lighting */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={gbgMultiBrandFleetImg}
                    alt="GoBabyGo Cabs GBGX Multi-Brand EV Showroom & Fleet Lineup"
                    className="w-full h-full object-cover object-[center_45%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Ambient Vignette for depth and badge contrast */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isLight
                      ? "bg-gradient-to-t from-black/35 via-transparent to-black/25"
                      : "bg-gradient-to-t from-[#090d16]/70 via-transparent to-black/40"
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 w-full p-3 sm:p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-md whitespace-nowrap ${
                    isLight ? "bg-white/90 text-blue-700 border-blue-200" : "bg-black/60 text-blue-400 border-blue-500/30"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    MULTI-BRAND FLEET
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 8. BLOCK 04 (Col 4, Row 2 on Desktop | Col 2, Row 4 on Mobile) - GBG ROYAL BLUE */}
            <ScrollReveal variant="zoom-in" delay={400} className="col-start-2 row-start-4 lg:col-start-4 lg:row-start-2 h-full">
              <div
                className={`relative group p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border flex flex-col justify-between overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] h-full w-full ${
                  isLight
                    ? "bg-gradient-to-br from-blue-50/90 via-white to-slate-50 border-blue-200/90 shadow-md hover:border-blue-400"
                    : "bg-gradient-to-br from-[#10172e]/95 via-[#0e1426]/95 to-[#090d17]/95 border-blue-500/30 hover:border-blue-500/60 shadow-[0_15px_35px_-10px_rgba(37,99,235,0.18)]"
                }`}
              >
                {/* Glowing Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-90" />

                {/* Ambient Radial Backlight */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-all duration-500"
                  style={{ background: "rgba(37, 99, 235, 0.25)" }}
                />

                {/* Desktop Up Pointer into Image B */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-3 z-20 w-0 h-0 border-x-[12px] border-x-transparent border-b-[12px] border-b-[#2563EB] drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]" />

                {/* Top: Icon Left, Step Number Right */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`p-2 sm:p-2.5 rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                    isLight
                      ? "bg-blue-100 border-blue-300 text-blue-600"
                      : "bg-blue-500/15 border-blue-500/30 text-blue-400"
                  }`}>
                    <Globe2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                      04
                    </span>
                    <div className="w-8 sm:w-10 h-1 bg-[#2563EB] rounded-full mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                  </div>
                </div>

                {/* Middle: Description */}
                <p className={`text-xs sm:text-[13px] lg:text-sm leading-relaxed font-medium my-auto py-2.5 sm:py-3 relative z-10 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>
                  Rapid nationwide footprint spanning Tier-1, Tier-2, and major metropolitan clusters across India.
                </p>

                {/* Bottom: Hero Stat & Title */}
                <div className={`mt-auto pt-2 border-t relative z-10 ${isLight ? "border-blue-200" : "border-white/10"}`}>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(37,99,235,0.3)]">
                    30+
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold tracking-wider uppercase mt-1 text-[#2563EB]">
                    CITIES COVERED
                  </p>
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
        <div
          id="gbgev-section"
          className="mb-28 rounded-3xl bg-white text-slate-900 p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden border-t-8 border-l-4 border-r-4 border-b-8 border-t-[#EF6C1E] border-l-[#EF6C1E] border-r-[#2563EB] border-b-[#2563EB] max-w-[1600px] mx-auto w-full"
          style={{
            boxShadow: "0 25px 60px -15px rgba(239, 108, 30, 0.14), 0 0 0 1px rgba(37, 99, 235, 0.1)"
          }}
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#EF6C1E]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <ScrollReveal variant="fade-up" delay={50} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="flex items-center gap-6">
              <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-[#EF6C1E]/20 shadow-[0_4px_20px_rgba(239,108,30,0.12)] shrink-0 flex items-center justify-center min-w-[95px] overflow-hidden group hover:border-[#EF6C1E]/50 transition-all">
                <ExactGbgEvLogo className="h-16 sm:h-20 md:h-22 w-auto" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/10 border border-[#EF6C1E]/30 text-[#EF6C1E] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                  <span>Commercial EV Fleet & Hubs</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  GBG <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C1E] via-orange-500 to-[#2563EB]">EV Ecosystem</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>Powering India's electric future with smart fleets, battery hubs, and sustainable transit</span>
                </p>
              </div>
            </div>

            <a
              href="https://gbgev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EF6C1E] to-[#2563EB] hover:opacity-95 shadow-lg shadow-orange-500/25 transition-all hover:scale-105 shrink-0"
            >
              <span>Visit gbgev.com</span>
              <ExternalLink size={16} />
            </a>
          </ScrollReveal>

          <div className="space-y-16 mt-14">
            
            {/* WHO WE ARE & SCOOTER SHOWCASE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
              
              {/* Left Column: Who We Are Structured Content Block */}
              <ScrollReveal
                variant="fade-right"
                delay={100}
                className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/10 border border-[#EF6C1E]/30 text-[#EF6C1E] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    <span>Who We Are?</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight tracking-tight">
                    Powering India's Green Mobility Revolution
                  </h3>
                </div>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
                  <p>
                    Founded in <strong>2021</strong> as <strong>GoBabyGo Cabs (OPC) Private Limited</strong>, our mission has always been to redefine urban mobility with sustainable and inclusive solutions.
                  </p>
                  <p>
                    By <strong>2023</strong>, we expanded into <strong>GoBabyGo Cabs Private Limited</strong> to serve the passenger transport market, while also launching <a href="https://gbgev.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-bold underline hover:text-[#EF6C1E]">GBG EV</a> as a dedicated platform for EV rentals and investments.
                  </p>
                  <p>
                    GBG EV is a fast-growing EV investment and fleet management company transforming last-mile delivery with clean, cost-efficient electric vehicles. By connecting investors with real EV assets, we create a <strong>win-win model</strong> where delivery riders get access to reliable scooters, businesses reduce costs, and investors enjoy steady monthly income.
                  </p>
                  <p>
                    Headquartered in <strong>Noida</strong> with <strong>75+ operational hubs</strong> across India, GBG EV manages a rapidly growing fleet of <strong>10,000+ electric vehicles</strong> backed by the trust of <strong>300+ investors</strong>.
                  </p>
                  <div className="p-3.5 bg-blue-50/80 border-l-4 border-[#2563EB] rounded-r-xl">
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold italic">
                      As a proud subsidiary of GoBabyGo Cabs Private Limited, GBG EV is not just building a business - we're powering India's transition to a greener, smarter, and more sustainable future.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Column: Commercial EV Scooter Image */}
              <ScrollReveal
                variant="fade-left"
                delay={150}
                className="lg:col-span-5 xl:col-span-4 flex items-center justify-center"
              >
                <div className="relative w-full max-w-[440px] flex items-center justify-center p-4">
                  <GbgEvScooterImage />
                </div>
              </ScrollReveal>

            </div>

            {/* 
              ========================================================================
              HOW IT WORKS: MINIMAL HORIZONTAL STEP PROCESS
              ========================================================================
            */}
            <ScrollReveal variant="fade-up" delay={100} className="pt-10 border-t border-slate-200">
              <div className="text-center max-w-xl mx-auto mb-14">
                <div className="flex justify-center mb-3">
                  <svg viewBox="0 0 60 40" className="w-8 h-auto text-[#EF6C1E] opacity-90 fill-current" aria-hidden="true">
                    <path d="M 28 6 L 30 10 L 26 10 Z M 36 8 L 38 12 L 34 12 Z M 22 14 L 24 18 L 20 18 Z M 32 16 L 35 21 L 29 21 Z M 40 20 L 42 24 L 38 24 Z M 18 24 L 20 28 L 16 28 Z M 26 26 L 29 31 L 23 31 Z M 36 28 L 38 32 L 34 32 Z M 30 34 L 32 38 L 28 38 Z" />
                  </svg>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  How It Works
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
                  Your journey to electric mobility in 4 simple steps
                </p>
              </div>

              {/* Horizontal Steps Grid with Alternating Wavy Dashed Connectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative items-start">
                
                {/* STEP 1 */}
                <div className="flex flex-col items-center text-center relative px-2">
                  <div className="relative mb-5 flex items-center justify-center">
                    <span className="absolute -top-2 -left-2 text-xs font-semibold text-slate-400 select-none">
                      1
                    </span>
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white border border-slate-200 shadow-xl shadow-slate-200/70 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-105">
                      <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                        <Smartphone size={22} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Download the Partner App
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                    Get started by downloading the GBG EV app from the Play Store or App Store.
                  </p>

                  <div className="hidden lg:block absolute top-9 left-[70%] w-[60%] pointer-events-none z-0">
                    <svg viewBox="0 0 100 36" className="w-full h-8 overflow-visible" fill="none">
                      <path d="M 0 8 Q 50 32 100 8" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 4" />
                    </svg>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex flex-col items-center text-center relative px-2">
                  <div className="relative mb-5 flex items-center justify-center">
                    <span className="absolute -top-2 -left-2 text-xs font-semibold text-slate-400 select-none">
                      2
                    </span>
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-orange-400/80 p-1 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center text-[#EF6C1E]">
                        <Compass size={22} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Choose your GBG EV
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                    Browse through our wide range of electric vehicles and find the perfect one for you.
                  </p>

                  <div className="hidden lg:block absolute top-7 left-[70%] w-[60%] pointer-events-none z-0">
                    <svg viewBox="0 0 100 36" className="w-full h-8 overflow-visible" fill="none">
                      <path d="M 0 28 Q 50 4 100 28" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 4" />
                    </svg>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex flex-col items-center text-center relative px-2">
                  <div className="relative mb-5 flex items-center justify-center">
                    <span className="absolute -top-2 -left-2 text-xs font-semibold text-slate-400 select-none">
                      3
                    </span>
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dotted border-blue-400/90 p-1 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB]">
                        <CalendarCheck size={22} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Book your EV
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                    Complete your booking with easy financing options and exclusive offers.
                  </p>

                  <div className="hidden lg:block absolute top-9 left-[70%] w-[60%] pointer-events-none z-0">
                    <svg viewBox="0 0 100 36" className="w-full h-8 overflow-visible" fill="none">
                      <path d="M 0 8 Q 50 32 100 8" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 4" />
                    </svg>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="flex flex-col items-center text-center relative px-2">
                  <div className="relative mb-5 flex items-center justify-center">
                    <span className="absolute -top-2 -left-2 text-xs font-semibold text-slate-400 select-none">
                      4
                    </span>
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 ring-2 ring-[#EF6C1E]/20 p-1 flex items-center justify-center shadow-lg shadow-orange-500/10 transition-transform duration-300 hover:scale-105">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center text-[#EF6C1E]">
                        <KeyRound size={22} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Pickup & Ride
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                    Pick up your EV from the nearest centre or get it delivered to your doorstep.
                  </p>
                </div>

              </div>
            </ScrollReveal>

            {/* 
              ========================================================================
              MISSION & VISION CARDS (STAGGERED OUTLINE CARDS)
              ========================================================================
            */}
            <div className="pt-16 pb-8 border-t border-slate-200">
              <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12 items-start pt-6">
                  
                  {/* LEFT CARD: MISSION (Elevated Position) */}
                  <div className="relative flex flex-col items-center">
                    <div className="relative -mb-6 z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-[#EF6C1E] shadow-xl flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                        <Target size={28} strokeWidth={2.2} />
                      </div>
                      <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#EF6C1E]/30 blur-[0.5px]" />
                    </div>

                    <div className="w-full rounded-[2.8rem] border-2 border-[#EF6C1E] bg-white/70 backdrop-blur-sm pt-14 pb-14 px-8 sm:px-10 text-center flex flex-col items-center justify-center min-h-[350px] shadow-lg shadow-orange-500/5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-orange-500 group">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-white flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black uppercase tracking-[0.25em] text-[#EF6C1E]">
                          MISSION
                        </span>
                      </div>

                      <span className="absolute bottom-7 -left-2 w-5 h-5 rounded-full bg-[#EF6C1E]/35" />

                      <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed max-w-xs mx-auto">
                        Helping investors earn monthly income while giving riders and businesses affordable, clean EV rides, and moving India towards a zero-emission future.
                      </p>

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                        <span className="w-20 h-1.5 bg-[#EF6C1E] rounded-full" />
                        <span className="w-2 h-2 bg-[#EF6C1E] rounded-full" />
                        <span className="w-2 h-2 bg-[#EF6C1E]/60 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CARD: VISION (Staggered Downwards Position) */}
                  <div className="relative flex flex-col items-center md:mt-20">
                    <div className="relative -mb-6 z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-[#2563EB] shadow-xl flex items-center justify-center text-[#2563EB] transition-transform duration-300 hover:scale-110">
                        <Lightbulb size={28} strokeWidth={2.2} />
                      </div>
                      <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#2563EB]/30 blur-[0.5px]" />
                    </div>

                    <div className="w-full rounded-[2.8rem] border-2 border-[#2563EB] bg-white/70 backdrop-blur-sm pt-14 pb-14 px-8 sm:px-10 text-center flex flex-col items-center justify-center min-h-[350px] shadow-lg shadow-blue-500/5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-500 group">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-white flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black uppercase tracking-[0.25em] text-[#2563EB]">
                          VISION
                        </span>
                      </div>

                      <span className="absolute bottom-7 -right-2 w-5 h-5 rounded-full bg-[#2563EB]/35" />

                      <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed max-w-xs mx-auto">
                        Making city travel and deliveries simple, affordable, and eco-friendly with EVs, while building a trusted investment platform.
                      </p>

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                        <span className="w-20 h-1.5 bg-[#2563EB] rounded-full" />
                        <span className="w-2 h-2 bg-[#2563EB] rounded-full" />
                        <span className="w-2 h-2 bg-[#2563EB]/60 rounded-full" />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="text-center md:text-right pt-10 pr-6">
                  <p className="text-xs sm:text-[13px] font-medium italic text-slate-400 tracking-wider">
                    ...clean mobility our commitment
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* The Journey of GBGEV: Staggered Horizontal Timeline Design */}
            <div className="space-y-12 pt-16 border-t border-slate-200">
              <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/10 border border-[#EF6C1E]/30 text-[#EF6C1E] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                  <span>Our Story</span>
                </div>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Our Story: The Journey of GBGEV
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Company timeline and major evolutionary milestones from inception to pan-India leadership.
                </p>
              </ScrollReveal>

              {/* Staggered Company Timeline (Inspired by reference presentation pack) */}
              <ScrollReveal variant="fade-up" delay={100} className="relative pt-12 pb-16 px-4">
                <div className="hidden xl:block absolute top-[52%] left-12 right-12 h-[2px] bg-slate-200 z-0 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative z-10">
                  
                  {/* Milestone 1: 2021 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        The first concept and foundation setup.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <span className="w-3 h-3 rounded-full bg-[#EF6C1E] ring-4 ring-orange-100 mb-3 group-hover:scale-125 transition-transform" />
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        2021
                      </h5>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-orange-500 hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">Founded GoBabyGo Cabs</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Established GoBabyGo Cabs, laying the foundation for our journey in the Corporate mobility sector.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 2: 2022 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group xl:mt-[-4rem]">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-blue-500 hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">Explored the EV Industry</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Ventured into the electric vehicle industry, researching sustainable and green mobility solutions for the future.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        2022
                      </h5>
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-blue-100 group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Initial research & green pilot testing.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 3: 2023 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Official incorporation of GBG EV vertical.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <span className="w-3 h-3 rounded-full bg-[#EF6C1E] ring-4 ring-orange-100 mb-3 group-hover:scale-125 transition-transform" />
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        2023
                      </h5>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-orange-500 hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">Launched GBG EV</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Officially launched GBG EV as a dedicated platform for electric vehicle rentals and sustainable transportation.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 4: 2024 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group xl:mt-[-4rem]">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-blue-500 hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">Reached 200 Vehicles</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Successfully expanded our active fleet to 200 electric vehicles, marking a significant milestone in our growth.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        2024
                      </h5>
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-blue-100 group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Rapid scaling across delivery hubs.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 5: 2025 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Fintech asset leasing expansion.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <span className="w-3 h-3 rounded-full bg-[#EF6C1E] ring-4 ring-orange-100 mb-3 group-hover:scale-125 transition-transform" />
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        2025
                      </h5>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-orange-500 hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">Scaled to 5,000 Vehicles</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Rapidly accelerating our mission for eco-friendly transit by scaling our fleet to 5,000 electric vehicles on the road.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 6: 2026 */}
                  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 group xl:mt-[-4rem]">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:border-[#2563EB] hover:shadow-md">
                      <p className="text-xs font-bold text-slate-900 mb-1">10,000+ EV Fleet</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Achieving a massive milestone of over 10,000 active vehicles, establishing ourselves as a leader in India's EV fleet revolution.
                      </p>
                    </div>

                    <div className="flex flex-col items-center xl:items-start relative py-2">
                      <h5 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        2026
                      </h5>
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-blue-100 group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Pan-India clean transit market leadership.
                      </p>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Leader's Message (Positioned right after Our Story) */}
            <ScrollReveal variant="zoom-in" delay={100} className="mt-12">
              <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-6xl font-serif text-[#EF6C1E]/20 select-none pointer-events-none">
                  “
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/10 border border-[#EF6C1E]/30 text-[#EF6C1E] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    <span>Leader's Message</span>
                  </div>

                  <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed max-w-2xl">
                    "Every solution we develop and every EV initiative we deliver is focused on driving innovation, sustainability, and measurable value for communities and businesses."
                  </p>

                  <div className="pt-2">
                    <p className="text-sm font-bold text-slate-900">— Akash Ali</p>
                    <p className="text-xs text-[#EF6C1E] font-bold uppercase tracking-wider mt-0.5">
                      Founder & CEO, GBG EV
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* 
          ========================================================================
          BALANCED & STRUCTURED SECTION: GBG X (MULTI-BRAND EV PLATFORM)
          ========================================================================
        */}
        <div
          id="gbgx-section"
          className="mb-28 rounded-3xl bg-[#05070B] text-slate-100 p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden border-t-8 border-l-4 border-r-4 border-b-8 border-t-[#EF6C1E] border-l-[#EF6C1E] border-r-[#2563EB] border-b-[#2563EB] max-w-[1600px] mx-auto w-full shadow-2xl"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(239, 108, 30, 0.2), 0 0 0 1px rgba(37, 99, 235, 0.15), inset 0 0 35px rgba(239, 108, 30, 0.05)"
          }}
        >
          {/* Dual Brand Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#EF6C1E]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <ScrollReveal variant="fade-up" delay={50} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-white/10">
            <div className="flex items-center gap-6">
              <div className="p-3.5 sm:p-4 bg-black/90 rounded-2xl border border-[#EF6C1E]/30 shadow-[0_0_20px_rgba(239,108,30,0.18)] shrink-0 flex items-center justify-center min-w-[95px] overflow-hidden group hover:border-[#EF6C1E]/60 transition-all">
                <ExactGbgxLogo className="h-10 sm:h-12 w-auto" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/15 border border-[#EF6C1E]/35 text-[#EF6C1E] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                  <span>Multi-Brand EV Platform</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  GBG <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C1E] via-orange-400 to-[#2563EB]">X Platform</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>India's leading multi-brand EV marketplace & spare parts ecosystem</span>
                </p>
              </div>
            </div>

            <a
              href="https://gbgx.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EF6C1E] to-[#2563EB] hover:opacity-95 shadow-lg shadow-orange-500/25 transition-all hover:scale-105 shrink-0"
            >
              <span>Visit gbgx.in</span>
              <ExternalLink size={16} />
            </a>
          </ScrollReveal>

          <div className="space-y-16 mt-14">
            
            {/* OUR JOURNEY & SHOWROOM SHOWCASE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Our Journey */}
              <ScrollReveal variant="fade-right" delay={100} className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/15 border border-[#EF6C1E]/30 text-[#EF6C1E] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    <span>Our Journey</span>
                  </div>
                </div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Curated Electric Mobility & Certified Spare Parts
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
                  GBG X was founded to transform how India discovers, compares, and acquires premium electric two-wheelers.
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
                  Every vehicle in our multi-brand inventory is handpicked, rigorously inspected, and supported by authentic OEM components, warranty backing, and fair on-road pricing.
                </p>
              </ScrollReveal>

              {/* Right Column: GBGX Showroom Showcase Image */}
              <ScrollReveal variant="fade-left" delay={150} className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 shadow-[0_0_35px_rgba(239,108,30,0.15)] group">
                  <GbgxShowroomImage className="w-full h-[300px] sm:h-[350px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-medium">
                    <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
                      GBGX Experience Store
                    </span>
                    <span className="text-[#EF6C1E] font-bold tracking-wide">
                      The New Era of Mobility
                    </span>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* 
              ========================================================================
              OUR JOURNEY: THE LEGACY OF GBGX (FAITHFUL TO PROVIDED DESIGN)
              Positioned between Leader's Message (GBG EV) and Leader's Message (GBG X)
              ========================================================================
            */}
            <GbgxJourneyTimeline />

            {/* 
              ========================================================================
              LEADER'S MESSAGE: GBG X (BLACK BACKGROUND DESIGN INSPIRED BY REFERENCE)
              ========================================================================
            */}
            <ScrollReveal variant="zoom-in" delay={100} className="my-8">
              <div className="max-w-3xl mx-auto bg-black rounded-3xl border border-[#EF6C1E]/30 shadow-[0_0_40px_rgba(239,108,30,0.12)] p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-6xl font-serif text-[#EF6C1E]/20 select-none pointer-events-none">
                  “
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF6C1E]/15 border border-[#EF6C1E]/35 text-[#EF6C1E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                    <span>Leader's Message</span>
                  </div>

                  <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed max-w-2xl">
                    "GBG X, we don't just sell Scooters – we fulfil dreams. Every vehicle that leaves our showroom carries with it a promise: a promise of quality, transparency, and a relationship that lasts well beyond the purchase. Our journey has been incredible, but what excites me most is what lies ahead. Together, we're not just driving scooters; we're driving India's automotive future."
                  </p>

                  <div className="pt-2">
                    <p className="text-sm font-bold text-white">Akash Ali</p>
                    <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                      Founder & CEO, GBG X ( GoBabyGo Private Limited)
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Purpose: Mission & Vision */}
            <div className="space-y-8 pt-8 border-t border-white/10">
              <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#EF6C1E]/15 border border-[#EF6C1E]/40 text-[#EF6C1E] shadow-[0_0_15px_rgba(239,108,30,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF6C1E] animate-pulse" />
                  <span>Who We Are</span>
                </div>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Shaping the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C1E] via-orange-400 to-[#2563EB]">Future of Mobility</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Empowering riders across India through verified EV intelligence, transparent pricing, and guaranteed manufacturer support.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Our Vision Card - GBG Orange Theme */}
                <ScrollReveal variant="fade-right" delay={100}>
                  <div className="group bg-white/[0.03] p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#EF6C1E]/50 hover:shadow-[0_0_30px_rgba(239,108,30,0.15)] transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#EF6C1E]/15 border border-[#EF6C1E]/30 text-[#EF6C1E] flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Sparkles size={24} />
                      </div>
                      <h5 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        Our Vision
                        <span className="w-2 h-2 rounded-full bg-[#EF6C1E]" />
                      </h5>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                        To become India’s most trusted automotive retail platform — where every rider finds their ideal electric vehicle through verified data, transparent pricing, and quality assurance.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Our Mission Card - Royal Blue Theme */}
                <ScrollReveal variant="fade-left" delay={150}>
                  <div className="group bg-white/[0.03] p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Target size={24} />
                      </div>
                      <h5 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        Our Mission
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      </h5>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                        To democratize sustainable EV ownership by offering wide multi-brand selection, honest on-road costs, and genuine replacement spare parts under one roof.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Brand Partners */}
            <div className="space-y-8 pt-6 border-t border-white/10">
              <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                  <span>Brand Network</span>
                </div>
                <h4 className="text-3xl font-extrabold text-white">Trusted Brand Partners</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Partnering with leading manufacturers across India for certified scooters and spares.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={100} className="pt-2">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  {["E-Sprinto", "GBG EV", "YoBykes", "Goeen", "Bgauss", "Zelio", "Gravton"].map((brand) => (
                    <span
                      key={brand}
                      className="px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/15 text-xs sm:text-sm font-bold text-white tracking-wider hover:border-[#EF6C1E] hover:text-[#EF6C1E] transition-all cursor-default shadow-sm"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

      </section>

      {/* 
        ========================================================================
        4. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION (HOVER REVEAL & ACCORDION)
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
      <section className={`py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-t overflow-hidden relative transition-colors ${
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
                    // ZELIO (Yellow circle with black lightning bolt Z + ZELIO® + FUTURE IS ELECTRIC)
                    <div key={`zelio-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <svg viewBox="0 0 44 44" className="w-7 sm:w-8 h-7 sm:h-8 shrink-0">
                          {/* Yellow Circle */}
                          <circle cx="22" cy="22" r="16" fill="#FACC15" />
                          {/* Black Sharp Z Lightning Bolt piercing the circle */}
                          <path
                            d="M12 13 L31 13 L21 23 L29 23 L13 35 L17 25 L11 25 Z"
                            fill="#000000"
                          />
                        </svg>
                        <div className="flex flex-col text-left leading-none">
                          <div className="flex items-baseline font-black tracking-wide text-black text-sm sm:text-base font-sans">
                            <span>ZELIO</span>
                            <span className="text-[8px] font-bold ml-0.5">®</span>
                          </div>
                          <span className="text-[6.5px] sm:text-[7px] font-bold tracking-[0.18em] text-black uppercase font-sans mt-0.5">
                            FUTURE IS ELECTRIC
                          </span>
                        </div>
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

                    // GOEEN (Thick Ring with 10 o'clock Square Notch + Bold Geometric GOEEN)
                    <div key={`goeen-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                        <svg viewBox="0 0 40 40" className="w-6 sm:w-7 h-6 sm:h-7 shrink-0">
                          {/* Circle ring */}
                          <circle cx="21" cy="22" r="13" fill="none" stroke={isLight ? "#0F172A" : "#FFFFFF"} strokeWidth="5.5" />
                          {/* Square notch at 10 o'clock */}
                          <rect x="7" y="8" width="6.5" height="6.5" rx="1.5" fill={isLight ? "#0F172A" : "#FFFFFF"} />
                        </svg>
                        <span className={`text-base sm:text-lg font-black tracking-widest uppercase italic font-sans ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          GOEEN
                        </span>
                      </div>
                    </div>,

                    // BGAUSS (Shield with BG + BGAUSS Wordmark)
                    <div key={`bgauss-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <div className="relative flex items-center justify-center px-1.5 py-0.5 border-[2px] border-black rounded-t-sm rounded-b-md">
                          <span className="text-[11px] sm:text-xs font-black tracking-wider text-black font-sans leading-none">
                            BG
                          </span>
                        </div>
                        <span className="text-sm sm:text-base font-black tracking-wider text-black font-sans uppercase">
                          BGAUSS
                        </span>
                      </div>
                    </div>,

                    // GRAVTON (Orbital Ring Planet + Wide GRAVTON)
                    <div key={`gravton-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                        <svg viewBox="0 0 36 20" className="w-6 h-3.5 shrink-0">
                          <ellipse cx="18" cy="10" rx="15" ry="3" fill="none" stroke="#000000" strokeWidth="1.4" />
                          <circle cx="18" cy="10" r="4.5" fill="#000000" />
                          <path d="M2 10 h32" stroke="#000000" strokeWidth="1.2" />
                        </svg>
                        <span className="text-xs sm:text-sm font-black tracking-[0.22em] text-black font-sans uppercase">
                          GRAVTON
                        </span>
                      </div>
                    </div>,

                    // MOTOVOLT (Orange Shield with Crest + MOTOVOLT)
                    <div key={`motovolt-${repIdx}`} className={`flex-shrink-0 w-40 sm:w-48 h-20 sm:h-22 rounded-2xl border transition-all duration-300 flex items-center justify-center p-3 select-none hover:shadow-lg hover:border-orange-500/50 hover:-translate-y-1 ${
                      isLight ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "bg-[#0B1019] border-slate-800/80 shadow-md"
                    }`}>
                      <div className="flex items-center justify-center gap-2">
                        <svg viewBox="0 0 36 36" className="w-6 sm:w-7 h-6 sm:h-7 shrink-0 drop-shadow-sm">
                          <path
                            d="M18 2 L6 7 v11 c0 8 5 13 12 16 c7 -3 12 -8 12 -16 V7 L18 2 Z"
                            fill="#F97316"
                          />
                          <path
                            d="M18 8 L11 12 v7 c0 5 3 9 7 11 c4 -2 7 -6 7 -11 V12 L18 8 Z"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <path d="M18 12 v8 M14 15 l4 4 l4 -4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className={`text-xs sm:text-sm font-black tracking-widest uppercase font-sans ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          MOTOVOLT
                        </span>
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

        <div className="relative z-20 w-full bg-white text-slate-800 py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-20 border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 items-stretch">
            
            {/* Column 1: Visit Us */}
            <ScrollReveal variant="fade-up" delay={50} className="flex flex-col items-center text-center px-6 py-8 md:py-4 space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                <Home size={34} strokeWidth={2} />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-800">
                VISIT US
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-400 font-light leading-relaxed max-w-xs">
                Visit our central fleet command and corporate headquarters in Noida.
              </p>

              <div className="pt-2">
                <span className="text-xs sm:text-sm font-semibold text-[#EF6C1E] leading-relaxed block">
                  Tower B, The Corenthum, Sector 62, Noida, UP, India
                </span>
              </div>
            </ScrollReveal>

            {/* Column 2: Call Us */}
            <ScrollReveal variant="fade-up" delay={150} className="flex flex-col items-center text-center px-6 py-8 md:py-4 space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#EF6C1E] transition-transform duration-300 hover:scale-110">
                <Phone size={34} strokeWidth={2} />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-800">
                CALL US
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-400 font-light leading-relaxed max-w-xs">
                Speak directly with our partner support, fleet leasing, and rider assistance desks.
              </p>

              <div className="pt-2">
                <a
                  href="tel:+918800023546"
                  className="text-xs sm:text-sm font-semibold text-[#EF6C1E] hover:underline transition-colors block"
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

              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-800">
                CONTACT US
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-400 font-light leading-relaxed max-w-xs">
                Drop us an email for corporate fleet partnerships, hub inquiries, and EV retail questions.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:contact@gbgev.com"
                  className="text-xs sm:text-sm font-semibold text-[#EF6C1E] hover:underline transition-colors block"
                >
                  contact@gbgev.com
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        8. FOOTER SECTION (MINIMALIST LUXURY STUDIO AESTHETIC)
        ========================================================================
      */}
      <footer className="relative overflow-hidden border-t border-white/10 bg-[#06080D] text-slate-200 pt-16 sm:pt-20 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] h-48 bg-gradient-to-b from-orange-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

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
                <GoBabyGoLogo className="h-24 sm:h-28 md:h-32 w-auto drop-shadow-[0_8px_20px_rgba(239,108,30,0.2)]" variant="light" />
              </a>

              <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-slate-400">
                Powering India's Green Mobility Revolution
              </p>
            </div>
          </ScrollReveal>

          {/* Clean Thin Divider */}
          <div className="w-full border-t border-white/10 my-9 sm:my-11" />

          {/* Navigation Links Row */}
          <ScrollReveal variant="fade-up" delay={100} className="w-full">
            <nav className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3.5 text-sm sm:text-[15px] font-medium text-slate-300">
              <a href="#home" className="hover:text-white transition-colors duration-200">
                Home
              </a>
              <a href="#subsidiaries" className="hover:text-white transition-colors duration-200">
                GBG EV
              </a>
              <a href="#subsidiaries" className="hover:text-white transition-colors duration-200">
                GBG X
              </a>
              <a href="#about" className="hover:text-white transition-colors duration-200">
                About
              </a>
              <a href="#faq" className="hover:text-white transition-colors duration-200">
                FAQ
              </a>
              <a href="#contact" className="hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </nav>
          </ScrollReveal>

          {/* Social Media Links Section */}
          <ScrollReveal variant="fade-up" delay={150} className="w-full my-8 sm:my-10 flex flex-col items-center text-center space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white tracking-wide">
              Social Media Links
            </h4>

            {/* Subtle Brand Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSocialTab("gbgev")}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                  socialTab === "gbgev"
                    ? "bg-[#EF6C1E] text-white shadow-md shadow-orange-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                GBG EV
              </button>
              <button
                type="button"
                onClick={() => setSocialTab("gbgx")}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                  socialTab === "gbgx"
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                GBG X
              </button>
            </div>

            {socialTab === "gbgev" ? (
              <div className="flex items-center justify-center gap-6 sm:gap-7 pt-2">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Gbgev.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GBG EV on Facebook"
                  title="GBG EV Facebook"
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
                  className="text-white hover:opacity-80 hover:scale-110 transition-all duration-200"
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
          <ScrollReveal variant="fade-up" delay={200} className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-xs text-slate-400 font-normal">
              <a href="#faq" className="hover:text-white transition-colors duration-200">
                Terms & Conditions
              </a>
              <span className="text-white/20">|</span>
              <a href="#faq" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#faq" className="hover:text-white transition-colors duration-200">
                Disclosures
              </a>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 font-light tracking-wide">
              © 2026 GoBabyGo Cabs (OPC) Private Limited. All Rights Reserved.
            </p>
          </ScrollReveal>

        </div>
      </footer>
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
            width: "90px",
            height: "90px",
            background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 130, 35, 0.95) 30%, rgba(239, 108, 30, 0.4) 60%, transparent 75%)",
            animation: "gbgSmoothFlare 2.7s forwards"
          }}
        />

        {/* Warm Ambient Backlight Aura & Zoom Bloom (Zero-lag pure radial gradient) */}
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

        {/* Diagonal Specular Sheen Sweep on Formed Logo */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-30"
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

        {/* LAYER 1: CAR DESIGN (Base Vehicle on Stage - GPU Compositor Layer) */}
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

  return (
    <AppErrorBoundary>
      {showIntro && (
        <GbgIntroLoader onComplete={() => setShowIntro(false)} />
      )}
      <MainApp onReplayIntro={() => setShowIntro(true)} />
    </AppErrorBoundary>
  );
}