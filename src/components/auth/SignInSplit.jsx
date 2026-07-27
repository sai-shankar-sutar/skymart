import { useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SignInSplit() {
  const { signIn, setRoute } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    const result = signIn(email, password);
    setError(result.success ? "" : result.error);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Left: brand panel */}
      <div className="relative flex-1 flex flex-col justify-center px-8 md:px-16 py-16 overflow-hidden">
        <div
          className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full blur-3xl opacity-20"
          style={{ background: "#d9f99d" }}
        />
        <div className="relative flex items-center gap-2 mb-16">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-300">
            <Zap size={18} className="fill-zinc-900 text-zinc-900" />
          </span>
          <span className="text-xl font-extrabold text-white">
            Sky<span className="text-lime-300">Mart</span>
          </span>
        </div>

        <div className="relative">
          <p className="text-xs font-bold tracking-[0.2em] text-lime-300 mb-4">WELCOME BACK</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6">
            Shop the future.
            <br />
            <span className="text-lime-300">Today.</span>
          </h1>
          <p className="text-zinc-400 max-w-sm mb-10">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              ["20K+", "Products"],
              ["50K+", "Users"],
              ["4.9★", "Rating"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-zinc-800 px-6 py-4 text-center min-w-[110px]"
              >
                <p className="text-xl font-extrabold text-lime-300">{n}</p>
                <p className="text-xs text-zinc-500 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: sign in card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-0">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <h2 className="text-2xl font-extrabold text-white mb-1">Sign in</h2>
          <p className="text-sm text-zinc-500 mb-1">Enter your credentials to continue</p>
          <p className="text-xs text-zinc-600 mb-6">Don't have an account yet? Sign up first.</p>

          {error && (
            <p className="mb-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <label className="block mb-4">
            <span className="sr-only">Email address</span>
            <div className="flex items-center gap-2 rounded-xl bg-zinc-800/70 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
              <Mail size={15} className="text-zinc-500 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Email address"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block mb-5">
            <span className="sr-only">Password</span>
            <div className="flex items-center gap-2 rounded-xl bg-zinc-800/70 border border-zinc-700 px-4 py-3 focus-within:border-lime-300/60">
              <Lock size={15} className="text-zinc-500 shrink-0" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Password"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPw((s) => !s)} className="text-zinc-500 hover:text-zinc-300 shrink-0">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-lime-300 text-zinc-900 font-bold py-3 text-sm hover:bg-lime-200 transition-colors"
          >
            Sign in <ArrowRight size={15} />
          </button>

          <p className="text-center text-sm text-zinc-500 mt-5">
            Don't have an account?{" "}
            <button type="button" onClick={() => setRoute("signup")} className="text-lime-300 font-semibold">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
