"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Signup failed");
        setLoading(false);
        return;
      }

      // auto sign-in using Credentials provider
      const sign = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (sign?.error) {
        // sign-in failed (shouldn't usually happen directly after signup)
        setErr(sign.error || "Sign-in failed");
        setLoading(false);
        return;
      }

      // success -> redirect (change path as you want)
      router.push("/");
    } catch (error) {
      console.error(error);
      setErr("Unexpected error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create an account</h1>

        {err && <div className="text-red-600 mb-3 text-sm text-center">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name (optional)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </div>

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
              minLength={6}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Choose a strong password"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-slate-800 cursor-pointer text-white py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <a href="/auth/signin" className="text-sky-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
