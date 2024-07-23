import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/utils/api";
import Cookies from "js-cookie";

export const authOptions = {
  secret: "process.env.AUTH_SECRET",
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        token: { label: "token" },
      },
      async authorize(credentials, req) {
        try {
          const res = await api.get("/auth", {
            headers: {
              Authorization: `Bearer ${credentials.token}`,
            },
          });
          const data = res.data;

          if (data) {
            // Any object returned will be saved in `user` property of the JWT

            return { ...data.data, token: credentials.token };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      return { user: token.user, accessToken: token.accessToken };
    },
  },
};
const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
