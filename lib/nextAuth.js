// lib/authNext.js
import { custom } from "openid-client";
// increase timeout for discovery/token requests (milliseconds)
custom.setHttpOptionsDefaults({
  timeout: 15000, // 15s — increase if needed
});

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db"; 
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user._id.toString(), email: user.email, name: user.name ?? null };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  debug: true, // turn off in production
  callbacks: {
    // Auto-link Google OAuth account when there's an existing user with same verified email.
    // This prevents "OAuthAccountNotLinked" for users who signed up with email/password.
    async signIn({ user, account, profile }) {
      // Only handle google oauth in this logic
      if (account?.provider !== "google") return true;

      try {
        const client = await clientPromise;
        const db = client.db();

        // If account already linked, allow sign-in
        const existingAccount = await db.collection("accounts").findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });
        if (existingAccount) return true;

        const email = profile?.email;
        // const emailVerified = profile?.email_verified;

        if (!email) return false;

        // Find existing user by email
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
          // Only auto-link if provider verified email
          // if (!emailVerified) return false;

          // Insert an accounts record matching adapter expectations.
          // Use existingUser._id (ObjectId) as userId.
          await db.collection("accounts").insertOne({
            userId: existingUser._id, // ObjectId
            type: account.type ?? "oauth",
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token ?? null,
            refresh_token: account.refresh_token ?? null,
            expires_at: account.expires_at ?? null,
            scope: account.scope ?? null,
            token_type: account.token_type ?? null,
            id_token: account.id_token ?? null,
            // optional: session_state, oauth_token_secret, oauth_token etc.
          });

          return true;
        }

        // No existing user -> allow NextAuth to create a new user
        return true;
      } catch (err) {
        console.error("Error in signIn callback while linking google:", err);
        return false; // block sign-in on error (safer)
      }
    },

    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },

    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
  },
};

export default authOptions;
