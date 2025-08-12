"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setErr(res.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // success, redirect to home (or use res.url)
      router.push("/");
    } catch (error) {
      console.error(error);
      setErr("Unexpected error");
      setLoading(false);
    }
  }

  function handleGoogle() {
    // this will redirect to Google sign-in and back to the app
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign in</h1>

        {err && <div className="text-red-600 mb-3 text-sm text-center">{err}</div>}

        <button
          onClick={handleGoogle}
          className="w-full mb-4 flex items-center justify-center gap-2 cursor-pointer border rounded-md py-2 text-sm"
        >
          <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 20H24v8h11.9C34.6 33 30 36 24 36c-7 0-12.7-5.7-12.7-12.7S17 10.6 24 10.6c3.1 0 5.9 1 8.1 2.8l5.7-5.7C35 4.4 29.8 2 24 2 12.4 2 3 11.4 3 23s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.3-4z" fill="currentColor"/>
          </svg>
          Sign in with Google
        </button>

        <div className="mb-4 text-center text-sm text-slate-400">or sign in with email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Your password"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-lg cursor-pointer font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-sky-600 font-medium hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
