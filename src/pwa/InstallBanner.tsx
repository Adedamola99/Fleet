import { useState } from "react";
import { Download, X, Share, Plus } from "lucide-react";
import { usePWA } from "./Usepwa";

export default function InstallBanner() {
  const {
    canInstall,
    install,
    isInstalled,
    isIOS,
    showIOSPrompt,
    setShowIOSPrompt,
  } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed || !canInstall) return null;

  return (
    <>
      {/* Install banner — bottom of screen on mobile */}
      {!showIOSPrompt && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            backgroundColor: "#0c1429",
            borderTop: "1px solid rgba(59,130,246,0.3)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
            animation: "slideUp .4s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <style>{`@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}`}</style>

          {/* App icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 1,
              }}
            >
              Add FahrVerse to Home Screen
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(71,85,105,1)",
                lineHeight: 1.3,
              }}
            >
              Instant access. Works offline. No App Store needed.
            </p>
          </div>

          <button
            onClick={install}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              padding: "9px 16px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <Download size={14} /> Install
          </button>

          <button
            onClick={() => setDismissed(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(71,85,105,1)",
              padding: 4,
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* iOS install instructions modal */}
      {isIOS && showIOSPrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 300,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setShowIOSPrompt(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#0c1429",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "20px 20px 0 0",
              padding: "24px",
              width: "100%",
              maxWidth: 480,
              animation: "slideUp .35s cubic-bezier(.16,1,.3,1) both",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                Install FahrVerse
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(100,116,139,1)",
                  lineHeight: 1.6,
                }}
              >
                Add FahrVerse to your home screen for instant access — even
                offline.
              </p>
            </div>

            {[
              {
                icon: <Share size={18} />,
                step: "1",
                text: "Tap the Share button in your browser toolbar",
              },
              {
                icon: <Plus size={18} />,
                step: "2",
                text: 'Scroll down and tap "Add to Home Screen"',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                step: "3",
                text: 'Tap "Add" — FahrVerse will appear on your home screen',
              },
            ].map(({ icon, step, text }) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3b82f6",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#3b82f6",
                      textTransform: "uppercase",
                      letterSpacing: ".14em",
                    }}
                  >
                    Step {step}
                  </span>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(148,163,184,0.85)",
                      lineHeight: 1.5,
                      marginTop: 2,
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowIOSPrompt(false)}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(100,116,139,1)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
