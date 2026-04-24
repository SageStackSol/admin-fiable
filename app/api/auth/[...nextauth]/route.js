import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const admin = await Admin.findOne({ email: user.email });

      // allow only if email exists in DB
      return !!admin;
    },
  },

  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };