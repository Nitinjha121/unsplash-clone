import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const option = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  database: process.env.DATABASE_URL,
  // debug: true,
  callbacks: {
    async signIn(user, account, profile) {
      if (
        (account.provider === "google" || account.providerId === "google") &&
        profile.verified_email === true &&
        profile.email.endsWith("@gmail.com")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(option);
