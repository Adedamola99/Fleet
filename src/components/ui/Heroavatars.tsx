import { useState } from "react";
import { MapPin, TrendingUp, Star } from "lucide-react";

/* ── Driver personas scattered around the hero ── */
const DRIVERS = [
  {
    id: "eo",
    initials: "EO",
    name: "Emeka O.",
    city: "Lagos",
    role: "Uber Driver",
    weeks: 47,
    metric: "₦71k",
    score: 94,
    accent: "#3b82f6",
    // position as percentage of the container (top, left)
    top: "8%",
    left: "4%",
    size: 68,
    floatDur: 5.2,
    floatDelay: 0,
  },
  {
    id: "fs",
    initials: "FS",
    name: "Fatima S.",
    city: "Abuja",
    role: "Bolt Driver",
    weeks: 31,
    metric: "₦64k",
    score: 88,
    accent: "#10b981",
    top: "6%",
    left: "82%",
    size: 60,
    floatDur: 6.0,
    floatDelay: -1.4,
  },
  {
    id: "co",
    initials: "CO",
    name: "Chidi O.",
    city: "Port Harcourt",
    role: "Elite Driver",
    weeks: 62,
    metric: "₦88k",
    score: 97,
    accent: "#f59e0b",
    top: "72%",
    left: "6%",
    size: 72,
    floatDur: 4.8,
    floatDelay: -2.1,
  },
  {
    id: "ba",
    initials: "BA",
    name: "Bisi A.",
    city: "Lagos",
    role: "InDriver",
    weeks: 22,
    metric: "₦58k",
    score: 82,
    accent: "#a78bfa",
    top: "74%",
    left: "79%",
    size: 62,
    floatDur: 5.6,
    floatDelay: -0.8,
  },
  {
    id: "hm",
    initials: "HM",
    name: "Hassan M.",
    city: "Kano",
    role: "Uber Driver",
    weeks: 38,
    metric: "₦67k",
    score: 91,
    accent: "#fb923c",
    top: "40%",
    left: "1%",
    size: 56,
    floatDur: 7.0,
    floatDelay: -3.5,
  },
  {
    id: "ni",
    initials: "NI",
    name: "Ngozi I.",
    city: "Enugu",
    role: "Bolt Driver",
    weeks: 19,
    metric: "₦54k",
    score: 79,
    accent: "#34d399",
    top: "38%",
    left: "88%",
    size: 56,
    floatDur: 5.8,
    floatDelay: -1.9,
  },
  {
    id: "ak",
    initials: "AK",
    name: "Adaeze K.",
    city: "Ibadan",
    role: "Private Hire",
    weeks: 28,
    metric: "₦61k",
    score: 85,
    accent: "#f472b6",
    top: "18%",
    left: "92%",
    size: 50,
    floatDur: 6.4,
    floatDelay: -4.0,
  },
  {
    id: "sk",
    initials: "SK",
    name: "Seun K.",
    city: "Lagos",
    role: "Uber Driver",
    weeks: 54,
    metric: "₦79k",
    score: 93,
    accent: "#38bdf8",
    top: "84%",
    left: "44%",
    size: 50,
    floatDur: 5.0,
    floatDelay: -2.7,
  },
];

/* ── Tiny floating pill badges ── */
const PILLS = [
  { text: "✅ No collateral needed", top: "14%", left: "68%", delay: 0 },
  { text: "⚡ On the road in 7 days", top: "88%", left: "18%", delay: -2.2 },
  { text: "📍 6 cities nationwide", top: "58%", left: "92%", delay: -1.1 },
  { text: "🚗 120+ cars in fleet", top: "92%", left: "60%", delay: -3.0 },
  { text: "💵 Keep all excess earnings", top: "26%", left: "2%", delay: -1.7 },
];

interface AvatarProps {
  d: (typeof DRIVERS)[0];
}

function DriverAvatar({ d }: AvatarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: d.top,
        left: d.left,
        zIndex: hovered ? 20 : 10,
        animation: `heroFloat ${d.floatDur}s ease-in-out infinite ${d.floatDelay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar ring + circle */}
      <div
        style={{
          width: d.size,
          height: d.size,
          borderRadius: "50%",
          backgroundColor: `${d.accent}1a`,
          border: `2.5px solid ${hovered ? d.accent : `${d.accent}55`}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: d.size * 0.28,
          fontWeight: 900,
          color: "#fff",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: hovered
            ? `0 0 0 6px ${d.accent}22, 0 8px 40px ${d.accent}35, inset 0 0 0 1px ${d.accent}40`
            : `0 4px 20px rgba(0,0,0,0.3), inset 0 0 0 1px ${d.accent}22`,
          transition: "all .28s cubic-bezier(.16,1,.3,1)",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          position: "relative",
        }}
      >
        {d.initials}

        {/* Pulse ring that appears on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: `1.5px solid ${d.accent}40`,
              animation: "ripple .7s ease-out forwards",
            }}
          />
        )}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: -16,
              borderRadius: "50%",
              border: `1px solid ${d.accent}22`,
              animation: "ripple .7s ease-out .12s forwards",
            }}
          />
        )}

        {/* Online dot */}
        <div
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: Math.max(10, d.size * 0.16),
            height: Math.max(10, d.size * 0.16),
            borderRadius: "50%",
            backgroundColor: "#10b981",
            border: "2px solid #060b1a",
            animation: "dotBlink 2.5s ease infinite",
          }}
        />
      </div>

      {/* Hover card — pops up above the avatar */}
      <div
        style={{
          position: "absolute",
          bottom: `calc(100% + 14px)`,
          left: "50%",
          transform: hovered
            ? "translateX(-50%) translateY(0) scale(1)"
            : "translateX(-50%) translateY(8px) scale(.93)",
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          transition: "all .26s cubic-bezier(.16,1,.3,1)",
          zIndex: 30,
          minWidth: 162,
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: "rgba(8,14,34,0.97)",
            border: `1px solid ${d.accent}45`,
            borderRadius: 14,
            padding: "14px 16px",
            boxShadow: `0 16px 56px rgba(0,0,0,0.7), 0 0 0 1px ${d.accent}18`,
            whiteSpace: "nowrap",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 11,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: `${d.accent}22`,
                border: `1.5px solid ${d.accent}60`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
                color: d.accent,
              }}
            >
              {d.initials}
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(71,85,105,1)",
                  marginTop: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <MapPin size={8} color="rgba(71,85,105,1)" /> {d.city}
              </div>
            </div>
          </div>

          {/* Role tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".12em",
              color: d.accent,
              backgroundColor: `${d.accent}14`,
              padding: "3px 8px",
              borderRadius: 999,
              marginBottom: 11,
            }}
          >
            🚗 {d.role}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: d.accent,
                  lineHeight: 1,
                }}
              >
                {d.metric}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(71,85,105,1)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginTop: 2,
                }}
              >
                avg/week
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {d.weeks}wk
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(71,85,105,1)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginTop: 2,
                }}
              >
                on fleet
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {d.score}
                </span>
                <Star size={10} fill="#f59e0b" color="#f59e0b" />
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(71,85,105,1)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginTop: 2,
                }}
              >
                score
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div
            style={{
              height: 4,
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${d.score}%`,
                backgroundColor: d.accent,
                borderRadius: 99,
                transition: "width .6s ease",
              }}
            />
          </div>

          {/* Earning trend */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 10,
            }}
          >
            <TrendingUp size={10} color="#10b981" />
            <span style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>
              Earning above target
            </span>
          </div>
        </div>

        {/* Arrow tip */}
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: `7px solid ${d.accent}45`,
          }}
        />
      </div>
    </div>
  );
}

export default function HeroAvatars() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-9px) rotate(.4deg); }
          66%      { transform: translateY(-4px) rotate(-.3deg); }
        }
        @keyframes ripple {
          from { transform: scale(1); opacity: 1; }
          to   { transform: scale(1.6); opacity: 0; }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .5; transform: scale(.8); }
        }
        @keyframes pillFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      {/* Scattered driver avatars — pointer-events re-enabled per avatar */}
      {DRIVERS.map((d) => (
        <div key={d.id} style={{ pointerEvents: "auto" }}>
          <DriverAvatar d={d} />
        </div>
      ))}

      {/* Floating pill badges */}
      {PILLS.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 12px",
            borderRadius: 999,
            backgroundColor: "rgba(8,14,34,0.82)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(12px)",
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(148,163,184,0.75)",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 18px rgba(0,0,0,0.28)",
            animation: `pillFloat ${4.5 + i * 0.7}s ease-in-out infinite ${p.delay}s`,
            pointerEvents: "none",
          }}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
