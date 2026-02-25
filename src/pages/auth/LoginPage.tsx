import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Users,
  Shield,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"admin" | "driver">("admin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login(
      email ||
        (mode === "admin" ? "admin@fleeetos.com" : "driver@fleeetos.com"),
      password,
      mode,
    );
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-accent"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} /> Back to site
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-4 shadow-xl shadow-accent/30">
            <Zap size={22} className="text-white" />
          </div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome to FahrVerse
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Sign in to your dashboard
          </p>
        </div>

        {/* Role selector */}
        <div
          className="flex gap-2 p-1 rounded-xl mb-6"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          {(
            [
              { key: "admin", label: "Fleet Owner / Admin", icon: Shield },
              { key: "driver", label: "I'm a Driver", icon: Users },
            ] as const
          ).map((r) => (
            <button
              key={r.key}
              onClick={() => setMode(r.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === r.key
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : ""
              }`}
              style={mode !== r.key ? { color: "var(--text-secondary)" } : {}}
            >
              <r.icon size={15} /> {r.label}
            </button>
          ))}
        </div>

        <div className="card p-7">
          <h2
            className="text-base font-bold mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            {mode === "admin"
              ? "🏢 Admin Dashboard Access"
              : "🚗 Driver Portal Access"}
          </h2>

          {/* Demo hint */}
          <div
            className="rounded-xl px-4 py-3 mb-5 text-xs"
            style={{
              backgroundColor: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.15)",
              color: "var(--text-secondary)",
            }}
          >
            <strong className="text-accent">Demo mode:</strong> Leave fields
            empty and click Sign In.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1.5">Email Address</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  mode === "admin"
                    ? "admin@fleeetos.com"
                    : "driver@fleeetos.com"
                }
              />
            </div>
            <div>
              <label className="label mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="flex items-center gap-2 text-xs cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                <input type="checkbox" className="rounded accent-accent" />{" "}
                Remember me
              </label>
              <button
                type="button"
                className="text-accent hover:text-accent-dark transition-colors text-xs font-medium"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center py-3 text-base font-bold mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div
            className="mt-5 pt-5 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Want to drive with us?{" "}
              <button
                onClick={() => navigate("/apply")}
                className="text-accent hover:text-accent-dark font-semibold transition-colors"
              >
                Apply as a driver →
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
