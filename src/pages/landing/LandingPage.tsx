import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import HeroAvatars from "../../components/ui/Heroavatars";
import {
  Zap,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Car,
  CreditCard,
  TrendingUp,
  Shield,
  Clock,
  Wrench,
  Award,
  MapPin,
  Star,
  Phone,
  ChevronDown,
  Linkedin,
  Twitter,
  Instagram,
  Users,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why FahrVerse", href: "#benefits" },
  { label: "Our Story", href: "#founders" },
  { label: "Partners", href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
];

const TICKER_A = [
  "No car? No problem — we provide one.",
  "Apply online in 5 minutes. No office visit.",
  "Keep every naira above your weekly payment.",
  "Full maintenance and insurance on us.",
  "Consistent drivers earn vehicle upgrades.",
  "Lagos · Abuja · Port Harcourt · Kano · Ibadan · Enugu",
  "No collateral required to join.",
  "Be on the road within 7 days of approval.",
];

const CARS = [
  "Toyota Corolla 2022",
  "Honda Accord 2021",
  "Toyota Camry 2023",
  "Hyundai Elantra 2022",
  "Honda Civic 2022",
  "Kia Cerato 2023",
  "Toyota Camry 2022",
  "Honda Accord 2023",
  "Toyota Corolla 2023",
  "Hyundai Sonata 2022",
];

const STATS = [
  {
    val: "340+",
    label: "Active Drivers",
    note: "earning daily across 6 cities",
  },
  { val: "820M+", label: "Driver Earnings", note: "tracked on platform (₦)" },
  {
    val: "120+",
    label: "Fleet Vehicles",
    note: "serviced and insured monthly",
  },
  {
    val: "94%",
    label: "Driver Retention",
    note: "still driving after 3 months",
  },
];

const STEPS = [
  {
    num: "01",
    Icon: Users,
    title: "Apply in 5 Minutes",
    desc: "Complete our form online — name, phone, city, driver's licence. No office visit, no long queues. We review within 48 hours.",
  },
  {
    num: "02",
    Icon: Car,
    title: "Get Your Vehicle",
    desc: "Once approved, we assign you a clean, roadworthy, fully insured car from our fleet. GPS-tracked and freshly serviced.",
  },
  {
    num: "03",
    Icon: CreditCard,
    title: "Drive. Earn. Pay Weekly.",
    desc: "Work Uber, Bolt, InDriver, or private hire. Everything you earn above the weekly payment goes directly to you. No percentage cuts.",
  },
  {
    num: "04",
    Icon: Award,
    title: "Build Your Score & Grow",
    desc: "Consistent payments earn score upgrades, vehicle upgrades, reduced weekly rates, and eventually a path to fleet ownership.",
  },
];

const BENEFITS = [
  {
    Icon: Car,
    title: "Vehicle from Day One",
    desc: "No need to own a car or rent one. We provide a fully insured vehicle. You bring your licence and your work ethic.",
  },
  {
    Icon: CreditCard,
    title: "One Fixed Weekly Payment",
    desc: "Pay a flat weekly amount. No percentage cuts. No hidden fees. Every kobo above that is yours.",
  },
  {
    Icon: TrendingUp,
    title: "Unlimited Earning Potential",
    desc: "The more trips you complete, the more you keep. There is no ceiling on your income — only your schedule.",
  },
  {
    Icon: Shield,
    title: "Full Maintenance on Us",
    desc: "Every car follows a scheduled service plan. Breakdowns and repairs cost you nothing — that is entirely our responsibility.",
  },
  {
    Icon: Clock,
    title: "Your Hours, Your Rules",
    desc: "Morning, afternoon, evening — drive whenever suits you. The only requirement is meeting your flat weekly payment.",
  },
  {
    Icon: Wrench,
    title: "24/7 Driver Support",
    desc: "Every city we operate has a dedicated support agent. If you are stuck on the road, we pick up — day or night.",
  },
];

const FOUNDERS = [
  {
    initials: "TA",
    accent: "#3b82f6",
    name: "Tunde Adeyemi",
    role: "CEO & Co-Founder",
    exp: "12 yrs · Logistics & Supply Chain",
    bio: "Former logistics director who built transport infrastructure for NGOs and private firms across West Africa. He founded FahrVerse after watching hundreds of skilled drivers lose income simply because they had no access to a vehicle.",
  },
  {
    initials: "AO",
    accent: "#10b981",
    name: "Amara Osei",
    role: "COO & Co-Founder",
    exp: "400+ vehicles scaled across 8 cities",
    bio: "Scaled a 50-vehicle Lagos fleet to over 400 before joining FahrVerse. She designed the weekly payment model, the driver scoring system, and every field operation. If FahrVerse runs smoothly, it is because of her.",
  },
  {
    initials: "KN",
    accent: "#f59e0b",
    name: "Kelechi Nwosu",
    role: "CTO & Co-Founder",
    exp: "8 yrs · Fintech & Platform Engineering",
    bio: "Spent eight years building payment systems at Nigerian fintech companies. He wrote the first line of FahrVerse code and still reviews every major release. The platform drivers use every day — that is his work.",
  },
];

const SPONSORS = [
  { name: "Uber Nigeria", initial: "U", hex: "#000000" },
  { name: "Bolt Africa", initial: "B", hex: "#34d186" },
  { name: "Access Bank", initial: "A", hex: "#e30613" },
  { name: "InDriver", initial: "I", hex: "#ff6900" },
  { name: "Flutterwave", initial: "F", hex: "#f5a623" },
  { name: "Sterling Bank", initial: "S", hex: "#6b46c1" },
  { name: "Cowrywise", initial: "C", hex: "#3b82f6" },
  { name: "Rida", initial: "R", hex: "#ef4444" },
  { name: "Carbon Finance", initial: "C", hex: "#0f4c81" },
  { name: "LAPO Microfinance", initial: "L", hex: "#10b981" },
];

const TESTIMONIALS = [
  {
    name: "Emeka Eze",
    city: "Lagos",
    weeks: 47,
    score: 94,
    earnings: "71k",
    quote:
      "I had nothing — no car, no money to rent one. FahrVerse gave me a Camry. I cleared my first weekly payment in three days. I now earn more than I did at my office job.",
  },
  {
    name: "Fatima Sule",
    city: "Abuja",
    weeks: 31,
    score: 88,
    earnings: "64k",
    quote:
      "The payment is fair and the car is always serviced. I never worry about breakdowns. My family is more comfortable now than we have been in years.",
  },
  {
    name: "Chidi Okafor",
    city: "Port Harcourt",
    weeks: 62,
    score: 97,
    earnings: "88k",
    quote:
      "Six months of consistent payments and they upgraded me to a newer model and reduced my weekly rate. I have not seen any other company reward loyalty like this.",
  },
  {
    name: "Bisi Adewale",
    city: "Lagos",
    weeks: 22,
    score: 82,
    earnings: "58k",
    quote:
      "Everything is transparent on the dashboard. I see exactly what I owe and what I have paid. No confusion, no arguments — just clarity.",
  },
  {
    name: "Hassan Musa",
    city: "Kano",
    weeks: 38,
    score: 91,
    earnings: "67k",
    quote:
      "I was sceptical at first. The car arrived when they said it would. The weekly amount was exactly as agreed. FahrVerse does what they promise.",
  },
  {
    name: "Ngozi Ike",
    city: "Enugu",
    weeks: 19,
    score: 79,
    earnings: "54k",
    quote:
      "As a woman driving on Bolt, I needed a company I could trust. FahrVerse gave me the car, the support, and the confidence to build my own income.",
  },
];

const VIDEO_PROMPT = `FLEEETOS EXPLAINER VIDEO — PRODUCTION BRIEF
Platform: Sora, Runway ML Gen-3, or professional production crew
Runtime: 90 seconds
Tone: Confident. Human. Real Nigeria — not stock-photo Africa.

STRUCTURE
─────────────────────────────────────────────────────────────
0:00–0:10
  Scene: Lagos traffic at dusk — yellow danfos, okadas, real chaos.
  VO (calm Nigerian male, mid-30s):
  "Millions of Nigerians can drive. Most of them just don't have a car."

0:10–0:25
  Scene: Driver staring at Uber app. No vehicle listed. Frustrated.
  Cut: FahrVerse agent handing over car keys in a clean yard.
  Driver's expression changes — relief, real possibility.

0:25–0:40
  Scene: Driver on the road. Trip counter climbing fast.
  Morning, afternoon, night. Fast cuts. Real Lagos streets.
  VO: "We give you the car. You drive it on Uber or Bolt."

0:40–0:55
  Scene: Screen-recording style — driver opens FahrVerse app.
  Sees payment history, rising score, vehicle milestone tracker.
  VO: "Pay us one flat amount every week. That is the entire deal."

0:55–1:10
  Scene: Driver buying groceries. Calling family. Smiling genuinely.
  VO: "Everything above that weekly payment is yours to keep."

1:10–1:25
  Scene: Three drivers. Three cities. Lagos, Abuja, Port Harcourt.
  Each says one word directly to camera:
  "Simple." / "Fair." / "Life-changing."

1:25–1:32
  Scene: FahrVerse logo on clean dark background.
  Text animates in: "Apply in 5 minutes. Be on the road in 7 days."
  URL: fleeetos.com/apply

─────────────────────────────────────────────────────────────
MUSIC:
  Amapiano-influenced, mid-tempo, forward-moving energy.
  Uplifting but not naive. No generic corporate background tracks.

COLOUR GRADE:
  Warm high-contrast. Deep navy and amber tones throughout.
  Rich blacks, no washed-out or desaturated looks.

VOICEOVER:
  Nigerian male, mid-30s. Calm authority. Conversational, not salesy.
  No rushing. Let scenes breathe.

B-ROLL NOTES:
  — Real Lagos, Abuja, Port Harcourt streets (not generic African city footage)
  — Actual Toyota Camrys and Corollas, not luxury SUVs
  — Real Uber or Bolt app screens showing climbing trip counts
  — Drivers should look like real working Nigerians, not models

AVOID:
  Generic international stock footage
  American or British accents of any kind
  Artificial office scenes or forced corporate smiles
  Anything that looks like a bank or telecom advertisement
─────────────────────────────────────────────────────────────`;

/* ── Marquee ──────────────────────────────────────────────────── */
function Marquee({
  items,
  speed = 40,
  reverse = false,
  sep = "—",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  sep?: string;
}) {
  const list = [...items, ...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitMaskImage:
          "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          animation: `${reverse ? "mqRev" : "mqFwd"} ${speed}s linear infinite`,
        }}
      >
        {list.map((item, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: ".01em",
                color: "rgba(148,163,184,0.68)",
                padding: "0 26px",
              }}
            >
              {item}
            </span>
            <span
              style={{
                fontSize: 9,
                color: "rgba(59,130,246,0.28)",
                fontWeight: 900,
              }}
            >
              {sep}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

/* ── Reveal on scroll ─────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.06 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated stat counter ────────────────────────────────────── */
function Stat({
  val,
  label,
  note,
}: {
  val: string;
  label: string;
  note: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ borderLeft: "3px solid rgba(59,130,246,0.32)", paddingLeft: 22 }}
    >
      <div
        style={{
          fontSize: "clamp(2rem,4.5vw,3.2rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1,
          marginBottom: 6,
          opacity: on ? 1 : 0,
          transform: on ? "none" : "translateY(14px)",
          transition: "all .8s cubic-bezier(.16,1,.3,1) .12s",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {val}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(203,213,225,0.72)",
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 11, color: "rgba(71,85,105,1)" }}>{note}</div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeT, setActiveT] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setActiveT((p) => (p + 1) % TESTIMONIALS.length),
      5200,
    );
    return () => clearInterval(t);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(VIDEO_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const bg = "#060b1a";
  const surf = "#0c1429";
  const bdr = "rgba(255,255,255,0.07)";
  const bdrS = "rgba(255,255,255,0.13)";
  const mut = "rgba(100,116,139,1)";
  const dim = "rgba(71,85,105,1)";
  const acc = "#3b82f6";
  const grn = "#10b981";

  const card = {
    backgroundColor: surf,
    border: `1px solid ${bdr}`,
    borderRadius: 16,
  };

  return (
    <div
      style={{
        backgroundColor: bg,
        color: "#f1f5f9",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes mqFwd { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes mqRev { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
        @keyframes pulsR { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.42)} 60%{box-shadow:0 0 0 16px rgba(59,130,246,0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.12} }
        @keyframes scan  { from{top:0} to{top:calc(100% - 1px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fBdr  { 0%,100%{border-color:rgba(59,130,246,0.12)} 50%{border-color:rgba(59,130,246,0.5)} }
        @keyframes fadeU { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .lift  { transition: transform .24s cubic-bezier(.22,1,.36,1), box-shadow .24s; }
        .lift:hover { transform:translateY(-6px); box-shadow:0 24px 64px rgba(0,0,0,.55); }
        .pulsR { animation: pulsR 2.8s ease infinite; }
        .blink { animation: blink 2.2s ease infinite; }
        .scanL { position:absolute;left:0;right:0;height:1px;background:rgba(59,130,246,.2);animation:scan 4s linear infinite;top:0;pointer-events:none; }
        .float { animation: float 5.5s ease-in-out infinite; }
        .fBdr  { animation: fBdr 3.5s ease infinite; }
        .eye   { font-size:10px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;display:block;margin-bottom:12px; }
        .hd    { font-size:clamp(2rem,4.8vw,3.2rem);font-weight:900;color:#fff;line-height:1.1;letter-spacing:-.028em; }
        .spad  { padding:108px 0; }
        .wrap  { max-width:1240px;margin:0 auto;padding:0 1.5rem; }
        .lnk   { text-decoration:none;transition:color .14s; }
        .lnk:hover { color:#fff; }
        /* dot grid */
        .dg { background-image:radial-gradient(rgba(255,255,255,0.055) 1px,transparent 1px);background-size:28px 28px; }
        /* line grid */
        .lg { background-image:linear-gradient(rgba(255,255,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.032) 1px,transparent 1px);background-size:52px 52px; }
        /* h lines */
        .hl { background-image:repeating-linear-gradient(0deg,transparent,transparent 56px,rgba(255,255,255,0.038) 56px,rgba(255,255,255,0.038) 57px); }
        @media(max-width:768px){
          .spad{padding:56px 0;}
          .nomob{display:none!important;}
          .wrap{padding:0 1rem;}
          .hd{font-size:clamp(1.9rem,7vw,3.5rem) !important;}
          .eye{font-size:10px !important;}
        }
        @media(max-width:480px){
          .spad{padding:40px 0;}
          .wrap{padding:0 .85rem;}
        }
      `}</style>

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 68,
          display: "flex",
          alignItems: "center",
          backgroundColor: scrolled ? "rgba(6,11,26,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${bdr}` : "none",
          transition: "all .3s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                backgroundColor: acc,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 18px rgba(59,130,246,.38)",
              }}
            >
              <Zap size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                }}
              >
                FahrVerse
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 9,
                  color: dim,
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                Nigeria
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="nomob" style={{ display: "flex", gap: 4 }}>
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="lnk"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "7px 12px",
                  borderRadius: 8,
                  color: mut,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = mut;
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                {n.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div
            className="nomob"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: mut,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 8,
                transition: "color .14s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = mut)}
            >
              Fleet Login
            </button>
            <button
              onClick={() => navigate("/apply")}
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#fff",
                backgroundColor: acc,
                border: "none",
                cursor: "pointer",
                padding: "9px 20px",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all .18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2563eb";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = acc;
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              Apply to Drive <ArrowRight size={14} />
            </button>
          </div>

          {/* Mob burger */}
          <button
            onClick={() => setMob(!mob)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: mut,
              padding: 6,
            }}
          >
            {mob ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {mob && (
          <div
            style={{
              position: "absolute",
              top: 68,
              left: 0,
              right: 0,
              backgroundColor: surf,
              borderBottom: `1px solid ${bdr}`,
              padding: "1.25rem 1.5rem",
            }}
          >
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setMob(false)}
                style={{
                  display: "block",
                  padding: "11px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: mut,
                  textDecoration: "none",
                  borderBottom: `1px solid ${bdr}`,
                }}
              >
                {n.label}
              </a>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 18,
              }}
            >
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "12px",
                  borderRadius: 10,
                  border: `1px solid ${bdr}`,
                  background: "transparent",
                  color: mut,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Fleet Login
              </button>
              <button
                onClick={() => navigate("/apply")}
                style={{
                  padding: "12px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: acc,
                  color: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Apply as Driver →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="lg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "clamp(72px,10vw,88px)",
          paddingBottom: "clamp(48px,8vw,64px)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Top accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: acc,
            opacity: 0.5,
          }}
        />

        {/* Giant ghost wordmark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "clamp(10rem,22vw,22rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.013)",
            letterSpacing: "-.08em",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          FAHR
        </div>

        {/* Scattered driver avatars & pill badges — hidden on small screens */}
        <div
          className="nomob"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <HeroAvatars />
        </div>

        {/* Centred content */}
        <div className="wrap" style={{ position: "relative", zIndex: 5 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            {/* Live badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(16,185,129,0.09)",
                border: "1px solid rgba(16,185,129,0.24)",
                marginBottom: 30,
              }}
            >
              <span
                className="blink"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: grn,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: grn,
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                }}
              >
                Accepting Applications — 6 Cities
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.6rem,8vw,7rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-.04em",
                color: "#fff",
                marginBottom: 22,
              }}
            >
              No Car?
              <br />
              <span style={{ color: acc }}>We Give</span>
              <br />
              <span style={{ color: "#fff" }}>You One.</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(14px,2.2vw,18px)",
                lineHeight: 1.76,
                color: "rgba(148,163,184,0.82)",
                marginBottom: 38,
                maxWidth: 520,
                margin: "0 auto 38px",
              }}
            >
              FahrVerse provides vehicles to qualified drivers across Nigeria.
              Drive on Uber or Bolt, earn freely, pay us one flat weekly amount
              — every naira above that belongs to you.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginBottom: 42,
              }}
            >
              <button
                onClick={() => navigate("/apply")}
                className="pulsR"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: acc,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  padding: "14px 34px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  transition: "all .18s",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#2563eb";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = acc;
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Apply to Drive Now <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/login")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: mut,
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 26px",
                  borderRadius: 12,
                  border: `1px solid ${bdr}`,
                  cursor: "pointer",
                  transition: "all .18s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor = bdrS;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = mut;
                  (e.currentTarget as HTMLElement).style.borderColor = bdr;
                }}
              >
                Fleet Owner Login
              </button>
            </div>

            {/* Trust tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 18px",
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              {[
                "No vehicle needed",
                "Flat weekly payment",
                "5 min application",
                "No collateral",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: dim,
                  }}
                >
                  <CheckCircle size={12} color={grn} />
                  {t}
                </div>
              ))}
            </div>

            {/* Stat strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0,
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${bdr}`,
                backgroundColor: "rgba(12,20,41,0.7)",
                backdropFilter: "blur(16px)",
                width: "100%",
              }}
            >
              {[
                { val: "340+", lbl: "Active Drivers", clr: acc },
                { val: "94%", lbl: "Retention Rate", clr: grn },
                { val: "6", lbl: "Cities", clr: "#f59e0b" },
                { val: "7d", lbl: "To First Drive", clr: "#a78bfa" },
              ].map((s, i) => (
                <div
                  key={s.lbl}
                  style={{
                    padding: "14px 16px",
                    borderRight: i < 3 ? `1px solid ${bdr}` : "none",
                    textAlign: "center",
                    flex: "1 1 0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(1.5rem,2.5vw,2.1rem)",
                      fontWeight: 900,
                      color: s.clr,
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: dim,
                      marginTop: 4,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: dim,
            }}
          >
            Scroll
          </span>
          <ChevronDown
            size={13}
            color={dim}
            style={{ animation: "heroFloat 2s ease-in-out infinite" }}
          />
        </div>
      </section>

      {/* ── MARQUEE A ─────────────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid rgba(59,130,246,0.2)`,
          borderBottom: `1px solid rgba(59,130,246,0.2)`,
          backgroundColor: "rgba(59,130,246,0.05)",
          padding: "13px 0",
        }}
      >
        <Marquee items={TICKER_A} speed={42} />
      </div>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="spad hl" style={{ borderBottom: `1px solid ${bdr}` }}>
        <div className="wrap">
          <Reveal>
            <p className="eye" style={{ color: dim, marginBottom: 52 }}>
              By the numbers
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "48px 36px",
            }}
          >
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Stat val={s.val} label={s.label} note={s.note} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="spad"
        style={{
          borderBottom: `1px solid ${bdr}`,
          backgroundColor: "rgba(12,20,41,0.65)",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: 64 }}>
              <span className="eye" style={{ color: acc }}>
                How It Works
              </span>
              <h2 className="hd" style={{ marginBottom: 14 }}>
                From zero to earning
                <br />
                in under 7 days.
              </h2>
              <p style={{ fontSize: 17, color: mut, maxWidth: 480 }}>
                No collateral. No complicated process. Apply, get approved,
                collect your car, start driving.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(100%,245px),1fr))",
              gap: 12,
            }}
          >
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div
                  className="lift"
                  style={{
                    ...card,
                    padding: "30px 26px",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="scanL" />
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 16,
                      fontSize: 68,
                      fontWeight: 900,
                      color: "rgba(59,130,246,0.06)",
                      lineHeight: 1,
                      letterSpacing: "-.04em",
                      userSelect: "none",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <step.Icon size={19} color={acc} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: 10,
                      letterSpacing: "-.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.68, color: mut }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} style={{ marginTop: 44, textAlign: "center" }}>
            <button
              onClick={() => navigate("/apply")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: acc,
                color: "#fff",
                fontWeight: 800,
                fontSize: 15,
                padding: "13px 32px",
                borderRadius: 11,
                border: "none",
                cursor: "pointer",
                transition: "all .18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2563eb";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = acc;
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              Start Your Application <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE B — Cars ──────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid rgba(16,185,129,0.18)`,
          borderBottom: `1px solid rgba(16,185,129,0.18)`,
          backgroundColor: "rgba(16,185,129,0.05)",
          padding: "13px 0",
        }}
      >
        <Marquee items={CARS} speed={28} reverse sep="★" />
      </div>

      {/* ── WHY FLEEETOS ──────────────────────────────────────── */}
      <section
        id="benefits"
        className="spad dg"
        style={{ borderBottom: `1px solid ${bdr}` }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="eye" style={{ color: grn }}>
                Why FahrVerse
              </span>
              <h2 className="hd" style={{ marginBottom: 14 }}>
                Everything handled.
                <br />
                You just drive.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: mut,
                  maxWidth: 460,
                  margin: "0 auto",
                }}
              >
                We removed every barrier that stops a skilled driver from
                earning well.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: 12,
            }}
          >
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  className="lift"
                  style={{
                    ...card,
                    padding: "26px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      backgroundColor: "rgba(16,185,129,0.09)",
                      border: "1px solid rgba(16,185,129,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <b.Icon size={19} color={grn} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#fff",
                        marginBottom: 7,
                      }}
                    >
                      {b.title}
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.68, color: mut }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} style={{ marginTop: 44 }}>
            <div
              style={{
                ...card,
                padding: "28px 36px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                borderColor: "rgba(16,185,129,0.2)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  Ready to start earning?
                </p>
                <p style={{ fontSize: 13, color: mut }}>
                  No application fee. No commitment until your vehicle is
                  assigned.
                </p>
              </div>
              <button
                onClick={() => navigate("/apply")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: grn,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all .18s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#059669";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = grn;
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Apply — It's Free <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section
        id="testimonials"
        className="spad"
        style={{
          borderBottom: `1px solid ${bdr}`,
          backgroundColor: "rgba(12,20,41,0.55)",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 52,
              }}
            >
              <div>
                <span className="eye" style={{ color: acc }}>
                  Driver Stories
                </span>
                <h2 className="hd">
                  Real drivers.
                  <br />
                  Real results.
                </h2>
              </div>
              <div style={{ display: "flex", gap: 6, paddingBottom: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveT(i)}
                    style={{
                      width: i === activeT ? 24 : 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor:
                        i === activeT ? acc : "rgba(255,255,255,0.12)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all .32s",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Featured */}
          <Reveal>
            <div
              className="fBdr"
              style={{
                ...card,
                padding: "clamp(18px,4vw,34px) clamp(16px,4vw,38px)",
                marginBottom: 14,
                position: "relative",
                overflow: "hidden",
                borderColor: "rgba(59,130,246,0.12)",
              }}
            >
              <div className="scanL" />
              <div
                style={{
                  position: "absolute",
                  top: 22,
                  right: 26,
                  fontSize: 88,
                  color: "rgba(59,130,246,0.07)",
                  fontWeight: 900,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                "
              </div>
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.7,
                  color: "#e2e8f0",
                  fontWeight: 500,
                  maxWidth: 680,
                  marginBottom: 26,
                }}
              >
                "{TESTIMONIALS[activeT].quote}"
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "rgba(59,130,246,0.15)",
                      border: "2px solid rgba(59,130,246,0.32)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 900,
                      color: acc,
                    }}
                  >
                    {TESTIMONIALS[activeT].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}
                    >
                      {TESTIMONIALS[activeT].name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: dim,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <MapPin size={9} />
                      {TESTIMONIALS[activeT].city}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 28 }}>
                  {[
                    {
                      l: "Avg/Week",
                      v: `₦${TESTIMONIALS[activeT].earnings}`,
                      c: grn,
                    },
                    {
                      l: "Weeks Active",
                      v: `${TESTIMONIALS[activeT].weeks}`,
                      c: acc,
                    },
                    {
                      l: "Driver Score",
                      v: `${TESTIMONIALS[activeT].score}`,
                      c: "#f59e0b",
                    },
                  ].map((m) => (
                    <div key={m.l} style={{ textAlign: "right" }}>
                      <div
                        style={{ fontSize: 20, fontWeight: 900, color: m.c }}
                      >
                        {m.v}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: dim,
                          textTransform: "uppercase",
                          letterSpacing: ".1em",
                        }}
                      >
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Compact grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
              gap: 12,
            }}
          >
            {TESTIMONIALS.filter((_, i) => i !== activeT)
              .slice(0, 3)
              .map((t, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div
                    className="lift"
                    onClick={() => setActiveT(TESTIMONIALS.indexOf(t))}
                    style={{ ...card, padding: "22px 24px", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={10}
                          fill="#f59e0b"
                          color="#f59e0b"
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.65,
                        color: "rgba(203,213,225,0.78)",
                        marginBottom: 16,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      "{t.quote}"
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: "rgba(59,130,246,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 900,
                          color: acc,
                        }}
                      >
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {t.name}
                        </div>
                        <div style={{ fontSize: 10, color: dim }}>
                          {t.city} · {t.weeks}wk
                        </div>
                      </div>
                      <ChevronRight
                        size={14}
                        color={dim}
                        style={{ marginLeft: "auto" }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ──────────────────────────────────────────── */}
      <section
        id="founders"
        className="spad hl"
        style={{ borderBottom: `1px solid ${bdr}` }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="eye" style={{ color: acc }}>
                The Founders
              </span>
              <h2 className="hd" style={{ marginBottom: 14 }}>
                Built by people who've
                <br />
                been on the ground.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: mut,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                FahrVerse was not built in a boardroom. It was built after years
                watching skilled drivers miss income simply because they had no
                access to a vehicle.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))",
              gap: 16,
            }}
          >
            {FOUNDERS.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="lift" style={{ ...card, overflow: "hidden" }}>
                  {/* Header — no images, pure geometric brand */}
                  <div
                    style={{
                      height: 136,
                      backgroundColor: `${f.accent}0c`,
                      borderBottom: `1px solid ${f.accent}18`,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="scanL" />
                    {/* Left accent bar */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        backgroundColor: f.accent,
                      }}
                    />
                    {/* Horizontal rule lines */}
                    {[22, 44, 66, 88].map((p) => (
                      <div
                        key={p}
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          height: 1,
                          top: `${p}%`,
                          backgroundColor: `${f.accent}09`,
                        }}
                      />
                    ))}
                    {/* Monogram */}
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        backgroundColor: f.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#fff",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: `0 0 0 12px ${f.accent}16,0 8px 32px ${f.accent}2e`,
                      }}
                    >
                      {f.initials}
                    </div>
                    {/* Tag */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 14,
                        fontSize: 9.5,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 999,
                        backgroundColor: `${f.accent}12`,
                        border: `1px solid ${f.accent}26`,
                        color: f.accent,
                        letterSpacing: ".05em",
                      }}
                    >
                      {f.exp}
                    </div>
                  </div>

                  <div style={{ padding: "24px 26px" }}>
                    <h3
                      style={{
                        fontSize: 19,
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "-.02em",
                        marginBottom: 2,
                      }}
                    >
                      {f.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".16em",
                        color: f.accent,
                        marginBottom: 14,
                      }}
                    >
                      {f.role}
                    </p>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.72,
                        color: mut,
                        marginBottom: 20,
                      }}
                    >
                      {f.bio}
                    </p>
                    <div style={{ display: "flex", gap: 7 }}>
                      {[Linkedin, Twitter].map((Icon, j) => (
                        <a
                          key={j}
                          href="#"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: `1px solid ${bdr}`,
                            color: dim,
                            textDecoration: "none",
                            transition: "all .18s",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = `${f.accent}18`;
                            (e.currentTarget as HTMLElement).style.color =
                              f.accent;
                            (e.currentTarget as HTMLElement).style.borderColor =
                              `${f.accent}32`;
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = "rgba(255,255,255,0.05)";
                            (e.currentTarget as HTMLElement).style.color = dim;
                            (e.currentTarget as HTMLElement).style.borderColor =
                              bdr;
                          }}
                        >
                          <Icon size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Company values */}
          <Reveal delay={0.22} style={{ marginTop: 44 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 1,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${bdr}`,
              }}
            >
              {[
                {
                  ico: "🎯",
                  label: "Driver-First",
                  desc: "Every decision starts with the driver.",
                },
                {
                  ico: "🔒",
                  label: "Transparent",
                  desc: "Fixed payments. No hidden fees. Ever.",
                },
                {
                  ico: "🚀",
                  label: "Growth-Focused",
                  desc: "We track progress and reward consistency.",
                },
                {
                  ico: "🤝",
                  label: "Long-Term",
                  desc: "Fleet ownership is the final destination.",
                },
              ].map((v, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: surf,
                    padding: "24px",
                    borderRight: i < 3 ? `1px solid ${bdr}` : "none",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 9 }}>{v.ico}</div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {v.label}
                  </div>
                  <div style={{ fontSize: 12, color: dim, lineHeight: 1.55 }}>
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SPONSORS — double marquee ──────────────────────────── */}
      <section
        id="partners"
        className="spad"
        style={{
          borderBottom: `1px solid ${bdr}`,
          backgroundColor: "rgba(12,20,41,0.55)",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="eye" style={{ color: dim }}>
                Partners & Sponsors
              </span>
              <h2 className="hd" style={{ marginBottom: 14 }}>
                The organisations
                <br />
                backing our drivers.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: mut,
                  maxWidth: 420,
                  margin: "0 auto",
                }}
              >
                Ride platforms, banks, and fintech companies partnering with
                FahrVerse to give our drivers the best tools and earning
                opportunities.
              </p>
            </div>
          </Reveal>

          {/* Row 1 */}
          <div
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                animation: "mqFwd 24s linear infinite",
              }}
            >
              {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((s, i) => (
                <div
                  key={i}
                  className="lift"
                  style={{
                    ...card,
                    width: 162,
                    padding: "20px 22px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 13,
                      backgroundColor: `${s.hex}14`,
                      border: `1px solid ${s.hex}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 900,
                      color: s.hex,
                    }}
                  >
                    {s.initial}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: mut,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — reverse */}
          <div
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
              overflow: "hidden",
              marginBottom: 44,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                animation: "mqRev 32s linear infinite",
              }}
            >
              {[
                ...SPONSORS.slice().reverse(),
                ...SPONSORS.slice().reverse(),
                ...SPONSORS.slice().reverse(),
              ].map((s, i) => (
                <div
                  key={i}
                  className="lift"
                  style={{
                    ...card,
                    width: 162,
                    padding: "20px 22px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 13,
                      backgroundColor: `${s.hex}14`,
                      border: `1px solid ${s.hex}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 900,
                      color: s.hex,
                    }}
                  >
                    {s.initial}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: mut,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Reveal>
            <p
              style={{
                fontSize: 11,
                color: "rgba(51,65,85,1)",
                textAlign: "center",
              }}
            >
              Brand marks are property of their respective owners. Partnership
              terms available on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── VIDEO BRIEF ───────────────────────────────────────── */}
      <section className="spad lg" style={{ borderBottom: `1px solid ${bdr}` }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 1.5rem" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="eye" style={{ color: acc }}>
                See It in Action
              </span>
              <h2 className="hd" style={{ marginBottom: 10 }}>
                Understand FahrVerse
                <br />
                in 90 seconds.
              </h2>
              <p style={{ fontSize: 15, color: mut }}>
                Explainer video coming soon. Click the player to view the full
                production brief and AI video prompt.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              onClick={() => setPromptOpen(true)}
              style={{
                ...card,
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                transition: "border-color .22s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(59,130,246,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = bdr)
              }
            >
              <div
                className="dg"
                style={{ position: "absolute", inset: 0, opacity: 0.75 }}
              />
              <div className="scanL" />
              {[25, 50, 75].map((p) => (
                <div
                  key={p}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    top: `${p}%`,
                    backgroundColor: "rgba(59,130,246,0.05)",
                  }}
                />
              ))}
              {/* Corner markers */}
              {[
                [{ top: 16, left: 16 }, true, false],
                [{ top: 16, right: 16 }, true, true],
                [{ bottom: 16, left: 16 }, false, false],
                [{ bottom: 16, right: 16 }, false, true],
              ].map(([pos, isTop, isRight], i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    ...(pos as object),
                    borderTop: isTop
                      ? "2px solid rgba(59,130,246,0.38)"
                      : "none",
                    borderBottom: !isTop
                      ? "2px solid rgba(59,130,246,0.38)"
                      : "none",
                    borderLeft: !isRight
                      ? "2px solid rgba(59,130,246,0.38)"
                      : "none",
                    borderRight: isRight
                      ? "2px solid rgba(59,130,246,0.38)"
                      : "none",
                  }}
                />
              ))}
              <div
                style={{ position: "relative", zIndex: 2, textAlign: "center" }}
              >
                <div
                  className="pulsR"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    backgroundColor: acc,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      marginLeft: 5,
                      borderTop: "12px solid transparent",
                      borderBottom: "12px solid transparent",
                      borderLeft: "20px solid #fff",
                    }}
                  />
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                  FahrVerse — How It Works
                </p>
                <p style={{ fontSize: 12, color: mut, marginTop: 5 }}>
                  1 min 32 sec · Click to view the AI video brief
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {promptOpen && (
          <div
            onClick={() => setPromptOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.86)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                ...card,
                maxWidth: 740,
                width: "100%",
                maxHeight: "88vh",
                overflow: "auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "22px 28px",
                  borderBottom: `1px solid ${bdr}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  position: "sticky",
                  top: 0,
                  backgroundColor: surf,
                  zIndex: 1,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      color: "#fff",
                      marginBottom: 3,
                    }}
                  >
                    Video Production Brief
                  </h3>
                  <p style={{ fontSize: 12, color: mut }}>
                    Copy into Sora, Runway ML Gen-3, or share with your video
                    team
                  </p>
                </div>
                <button
                  onClick={() => setPromptOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: mut,
                    padding: 4,
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <pre
                  style={{
                    fontSize: 12,
                    lineHeight: 1.84,
                    color: "rgba(203,213,225,0.82)",
                    whiteSpace: "pre-wrap",
                    fontFamily: "'JetBrains Mono',monospace",
                    backgroundColor: "rgba(0,0,0,0.32)",
                    borderRadius: 12,
                    padding: "20px 22px",
                    border: `1px solid ${bdr}`,
                    margin: 0,
                    overflowX: "auto",
                  }}
                >
                  {VIDEO_PROMPT}
                </pre>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button
                    onClick={copy}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: copied ? grn : acc,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      padding: "10px 22px",
                      borderRadius: 9,
                      border: "none",
                      cursor: "pointer",
                      transition: "background .24s",
                    }}
                  >
                    {copied ? "✓ Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={() => setPromptOpen(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: mut,
                      fontWeight: 600,
                      fontSize: 13,
                      padding: "10px 20px",
                      borderRadius: 9,
                      border: `1px solid ${bdr}`,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="spad dg" style={{ borderBottom: `1px solid ${bdr}` }}>
        <div
          style={{
            maxWidth: 660,
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.22)",
                marginBottom: 28,
              }}
            >
              <span
                className="blink"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: grn,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: grn,
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                }}
              >
                Spots Open — Apply Today
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(3rem,7.5vw,5.8rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.04,
                letterSpacing: "-.035em",
                marginBottom: 18,
              }}
            >
              Your car is
              <br />
              waiting.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: mut,
                lineHeight: 1.7,
                maxWidth: 460,
                margin: "0 auto 40px",
              }}
            >
              Stop waiting. Stop renting. Stop missing income. Apply in 5
              minutes and be on the road this week.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              <button
                onClick={() => navigate("/apply")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: acc,
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 17,
                  padding: "15px 42px",
                  borderRadius: 13,
                  border: "none",
                  cursor: "pointer",
                  transition: "all .18s",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.28)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#2563eb";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = acc;
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Apply as Driver <ArrowRight size={19} />
              </button>
              <a
                href="tel:+2348000000000"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: mut,
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "15px 26px",
                  borderRadius: 13,
                  border: `1px solid ${bdr}`,
                  textDecoration: "none",
                  transition: "all .18s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.09)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = mut;
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.05)";
                }}
              >
                <Phone size={15} /> Call Us Now
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 18,
                justifyContent: "center",
              }}
            >
              {[
                "No application fee",
                "No commitment upfront",
                "Decision in 48 hours",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: dim,
                  }}
                >
                  <CheckCircle size={12} color={grn} />
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: surf,
          borderTop: `1px solid ${bdr}`,
          padding: "64px 0 28px",
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
              gap: 40,
              marginBottom: 56,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    backgroundColor: acc,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap size={15} color="#fff" strokeWidth={2.5} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#fff",
                      letterSpacing: "-.02em",
                    }}
                  >
                    FahrVerse
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 8,
                      color: dim,
                      fontWeight: 700,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Nigeria
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: dim,
                  maxWidth: 200,
                }}
              >
                Nigeria's driver-first fleet platform. We provide the vehicle.
                You provide the drive.
              </p>
              <div style={{ display: "flex", gap: 7, marginTop: 16 }}>
                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: `1px solid ${bdr}`,
                      color: dim,
                      textDecoration: "none",
                      transition: "all .18s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(59,130,246,0.12)";
                      (e.currentTarget as HTMLElement).style.color = acc;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(59,130,246,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.color = dim;
                      (e.currentTarget as HTMLElement).style.borderColor = bdr;
                    }}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                h: "Drivers",
                l: [
                  "Apply to Drive",
                  "How It Works",
                  "Driver Benefits",
                  "Driver Login",
                  "Driver FAQ",
                ],
              },
              {
                h: "Company",
                l: ["About Us", "Our Founders", "Careers", "Press", "Blog"],
              },
              {
                h: "Legal",
                l: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Compliance",
                ],
              },
              {
                h: "Contact",
                l: [
                  "WhatsApp Support",
                  "Call Us",
                  "Email Team",
                  "Report an Issue",
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    color: dim,
                    marginBottom: 16,
                  }}
                >
                  {col.h}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {col.l.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="lnk"
                        style={{
                          fontSize: 13,
                          color: dim,
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "color .14s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#fff")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = dim)
                        }
                      >
                        {l}
                        {l === "Apply to Drive" && (
                          <ArrowUpRight size={11} style={{ opacity: 0.45 }} />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <p style={{ fontSize: 11, color: "rgba(51,65,85,1)" }}>
              © {new Date().getFullYear()} FahrVerse Technologies Ltd · RC
              1234567 · Lagos, Nigeria
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  className="blink"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: grn,
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: 11, color: "rgba(51,65,85,1)" }}>
                  All systems operational
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(51,65,85,1)",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Fleet Owner Portal ↗
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
