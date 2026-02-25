import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  User,
  Car,
  FileText,
  Shield,
} from "lucide-react";

const STEPS = [
  "Personal Info",
  "Driving Experience",
  "Documents",
  "Review & Submit",
];

const VEHICLE_PREFS = [
  "Sedan (Toyota Corolla, Honda Civic)",
  "Saloon (Toyota Camry, Honda Accord)",
  "SUV (Hyundai Tucson)",
  "Any available vehicle",
];
const CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Benin City",
  "Enugu",
  "Kaduna",
];
const PLATFORMS = ["Uber", "Bolt", "InDriver", "Rida", "Private Hire", "Other"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;
  address: string;
  nin: string;
  yearsExperience: string;
  currentlyDriving: string;
  platforms: string[];
  vehiclePref: string;
  weeklyTarget: string;
  startDate: string;
  whyJoin: string;
  hasLicense: boolean;
  licenseExpiry: string;
  hasInsurance: boolean;
  agreedToTerms: boolean;
  agreedToBackground: boolean;
}

const EMPTY: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  city: "",
  address: "",
  nin: "",
  yearsExperience: "",
  currentlyDriving: "",
  platforms: [],
  vehiclePref: "",
  weeklyTarget: "",
  startDate: "",
  whyJoin: "",
  hasLicense: false,
  licenseExpiry: "",
  hasInsurance: false,
  agreedToTerms: false,
  agreedToBackground: false,
};

export default function DriverApplyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, val: unknown) =>
    setForm((f) => ({ ...f, [field]: val }));
  const togglePlatform = (p: string) =>
    set(
      "platforms",
      form.platforms.includes(p)
        ? form.platforms.filter((x) => x !== p)
        : [...form.platforms, p],
    );

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-4">
            Application Submitted!
          </h1>
          <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
            Thank you,{" "}
            <strong className="text-[var(--text-primary)]">
              {form.firstName}
            </strong>
            ! Your application has been received. Our team will review it within{" "}
            <strong className="text-accent">2–3 business days</strong> and reach
            out via email and phone.
          </p>
          <div className="card rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">
              What happens next?
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  text: "Application review by our team (2–3 days)",
                },
                {
                  step: "2",
                  text: "Document verification and background check",
                },
                { step: "3", text: "Vehicle assignment and onboarding call" },
                { step: "4", text: "Start earning with FahrVerse!" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">
                    {s.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary flex-1 justify-center py-3"
            >
              ← Back to Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary flex-1 justify-center py-3"
            >
              Sign In to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* Top nav */}
      <nav
        className="px-6 py-4 flex items-center justify-between"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap size={15} className="text-[var(--text-primary)]" />
          </div>
          <span className="font-black text-[var(--text-primary)]">
            FahrVerse
          </span>
          <span className="text-[var(--text-muted)] text-sm ml-1">
            · Driver Application
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={14} /> Back to site
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center gap-2 flex-shrink-0 ${i <= step ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i < step
                        ? "bg-emerald-500 text-white"
                        : i === step
                          ? "bg-accent text-white"
                          : "bg-[var(--hover-bg)] text-slate-500"
                    }`}
                  >
                    {i < step ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <span className="text-xs font-semibold hidden sm:block">
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 transition-all ${i < step ? "bg-emerald-500" : "bg-[var(--hover-bg)]"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>

        {/* Card */}
        <div className="card rounded-2xl p-8">
          {/* Step 1: Personal Info */}
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <User size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Personal Information
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Tell us about yourself
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name *</label>
                  <input
                    className="input mt-1"
                    placeholder="James"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input
                    className="input mt-1"
                    placeholder="Okafor"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    className="input mt-1"
                    placeholder="james@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="tel"
                    className="input mt-1"
                    placeholder="+234 801 234 5678"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Date of Birth *</label>
                  <input
                    type="date"
                    className="input mt-1"
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Gender *</label>
                  <select
                    className="input mt-1"
                    value={form.gender}
                    onChange={(e) => set("gender", e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="label">City *</label>
                  <select
                    className="input mt-1"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                  >
                    <option value="">Select city</option>
                    {CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">NIN (National ID Number) *</label>
                  <input
                    className="input mt-1"
                    placeholder="12345678901"
                    value={form.nin}
                    onChange={(e) => set("nin", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Home Address *</label>
                <textarea
                  className="input mt-1 min-h-[80px]"
                  placeholder="25 Marina Street, Lagos Island"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Driving Experience */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Car size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Driving Experience
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Your experience on the road
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Years of Driving Experience *</label>
                  <select
                    className="input mt-1"
                    value={form.yearsExperience}
                    onChange={(e) => set("yearsExperience", e.target.value)}
                  >
                    <option value="">Select experience</option>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    Currently Driving for a Platform?
                  </label>
                  <select
                    className="input mt-1"
                    value={form.currentlyDriving}
                    onChange={(e) => set("currentlyDriving", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">
                  Which platforms have you worked with?
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        form.platforms.includes(p)
                          ? "bg-accent/20 border-accent/50 text-accent"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:border-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Preferred Vehicle Type</label>
                <div className="space-y-2 mt-2">
                  {VEHICLE_PREFS.map((v) => (
                    <label
                      key={v}
                      className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:border-accent/30 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="vehiclePref"
                        value={v}
                        checked={form.vehiclePref === v}
                        onChange={() => set("vehiclePref", v)}
                        className="accent-accent"
                      />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {v}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    Expected Weekly Earning Target (₦)
                  </label>
                  <input
                    className="input mt-1"
                    placeholder="e.g. 50,000"
                    value={form.weeklyTarget}
                    onChange={(e) => set("weeklyTarget", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Preferred Start Date</label>
                  <input
                    type="date"
                    className="input mt-1"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">
                  Why do you want to join FahrVerse? *
                </label>
                <textarea
                  className="input mt-1 min-h-[100px]"
                  placeholder="Tell us what motivates you and your goals as a driver..."
                  value={form.whyJoin}
                  onChange={(e) => set("whyJoin", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400">
                  <FileText size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Documents & Verification
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Required documents for onboarding
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "Driver's License",
                    key: "hasLicense",
                    desc: "Valid Nigerian driver's license",
                  },
                  {
                    label: "Vehicle Insurance",
                    key: "hasInsurance",
                    desc: "Any current vehicle insurance (optional if no current vehicle)",
                  },
                ].map((doc) => (
                  <label
                    key={doc.key}
                    className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                      form[doc.key as keyof FormData]
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-[var(--border)] hover:border-[var(--border)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-emerald-500"
                      checked={form[doc.key as keyof FormData] as boolean}
                      onChange={(e) =>
                        set(doc.key as keyof FormData, e.target.checked)
                      }
                    />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">
                        {doc.label}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {doc.desc}
                      </p>
                    </div>
                    {form[doc.key as keyof FormData] && (
                      <CheckCircle
                        size={16}
                        className="text-emerald-400 ml-auto flex-shrink-0 mt-0.5"
                      />
                    )}
                  </label>
                ))}
                {form.hasLicense && (
                  <div className="animate-fade-in">
                    <label className="label">License Expiry Date</label>
                    <input
                      type="date"
                      className="input mt-1"
                      value={form.licenseExpiry}
                      onChange={(e) => set("licenseExpiry", e.target.value)}
                    />
                  </div>
                )}
              </div>
              {/* Upload areas */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Upload Documents
                </p>
                {[
                  "Driver's License (Front & Back)",
                  "National ID / NIN slip",
                  "Passport Photo",
                  "Proof of Address",
                ].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between p-4 border border-dashed border-[var(--border)] rounded-xl hover:border-accent/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--hover-bg)] flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <Upload
                          size={16}
                          className="text-[var(--text-muted)] group-hover:text-accent transition-colors"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          {doc}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          PDF, JPG, PNG — max 5MB
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Choose file →
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
                <Shield
                  size={16}
                  className="text-accent flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Your documents are encrypted and stored securely. They will
                  only be accessed by our verification team and deleted after 90
                  days if your application is declined.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Review & Submit
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Review your application before submitting
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Personal Info",
                    items: [
                      {
                        label: "Name",
                        val: `${form.firstName} ${form.lastName}`,
                      },
                      { label: "Email", val: form.email },
                      { label: "Phone", val: form.phone },
                      { label: "City", val: form.city },
                    ],
                  },
                  {
                    title: "Driving Experience",
                    items: [
                      { label: "Experience", val: form.yearsExperience },
                      {
                        label: "Platforms",
                        val: form.platforms.join(", ") || "None specified",
                      },
                      {
                        label: "Vehicle Preference",
                        val: form.vehiclePref || "Not specified",
                      },
                      {
                        label: "Start Date",
                        val: form.startDate || "Flexible",
                      },
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="bg-[var(--hover-bg)] border border-[var(--border)] rounded-xl p-5"
                  >
                    <h3 className="font-bold text-[var(--text-primary)] text-sm mb-3">
                      {section.title}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {section.items.map((item) => (
                        <div key={item.label}>
                          <span className="text-xs text-[var(--text-muted)]">
                            {item.label}:{" "}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] font-medium">
                            {item.val || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                {[
                  {
                    key: "agreedToTerms",
                    label:
                      "I agree to the FahrVerse Terms of Service and Privacy Policy",
                  },
                  {
                    key: "agreedToBackground",
                    label:
                      "I consent to a background check as part of the verification process",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-accent"
                      checked={form[item.key as keyof FormData] as boolean}
                      onChange={(e) =>
                        set(item.key as keyof FormData, e.target.checked)
                      }
                    />
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
            <button
              onClick={() =>
                step === 0 ? navigate("/") : setStep((s) => s - 1)
              }
              className="btn btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={15} /> {step === 0 ? "Back to site" : "Previous"}
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="btn btn-primary flex items-center gap-2"
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!form.agreedToTerms || !form.agreedToBackground}
                className="btn btn-primary flex items-center gap-2 px-8"
              >
                Submit Application <CheckCircle size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
