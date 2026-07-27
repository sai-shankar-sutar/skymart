import { useState } from "react";
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import AuthShell from "./AuthShell";

export default function SignUpCentered() {
  const { signUp, setRoute } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.password) {
      setError("Fill in all fields to create your account.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    const result = signUp(form.name, form.email, form.password);
    setError(result.success ? "" : result.error);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <AuthShell>
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-300">
            <Zap size={18} className="fill-zinc-900 text-zinc-900" />
          </span>
          <span className="text-xl font-extrabold text-white">
            Sky<span className="text-lime-300">Mart</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <h2 className="text-2xl font-extrabold text-white mb-1">Create account</h2>
        <p className="text-sm text-zinc-500 mb-1">Join SkyMart and start shopping</p>
        <p className="text-xs text-zinc-600 mb-6">Your email must be unique — one account per email.</p>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="sr-only">Full name</span>
          <div className="flex items-center gap-2 rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
            <User size={15} className="text-zinc-500 shrink-0" />
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Full name"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              autoComplete="name"
            />
          </div>
        </label>

        <label className="block mb-4">
          <span className="sr-only">Email address</span>
          <div className="flex items-center gap-2 rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
            <Mail size={15} className="text-zinc-500 shrink-0" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Email address"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              autoComplete="email"
            />
          </div>
        </label>

        <label className="block mb-4">
          <span className="sr-only">Password</span>
          <div className="flex items-center gap-2 rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
            <Lock size={15} className="text-zinc-500 shrink-0" />
            <input
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Password (min 6 chars)"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPw((s) => !s)} className="text-zinc-500 hover:text-zinc-300 shrink-0">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </label>

        <label className="block mb-5">
          <span className="sr-only">Confirm password</span>
          <div className="flex items-center gap-2 rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
            <Lock size={15} className="text-zinc-500 shrink-0" />
            <input
              type={showPw ? "text" : "password"}
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Confirm password"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              autoComplete="new-password"
            />
          </div>
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-lime-300 text-zinc-900 font-bold py-3 text-sm hover:bg-lime-200 transition-colors"
        >
          Create Account <ArrowRight size={15} />
        </button>

        <p className="text-center text-sm text-zinc-500 mt-5">
          Already have an account?{" "}
          <button type="button" onClick={() => setRoute("signin")} className="text-lime-300 font-semibold">
            Sign in
          </button>
        </p>
      </div>
    </AuthShell>
  );
}
