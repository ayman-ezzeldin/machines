// app/api/auth/signup/route.js
import clientPromise from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({
      name: name ?? null,
      email,
      password: hash,
      role: "user", 
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ ok: true, id: result.insertedId.toString() }), { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
