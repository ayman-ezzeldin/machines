import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  secret: process.env.AUTH_SECRET,
}