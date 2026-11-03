import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {NextAuthOptions} from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import {db} from "@/lib/db"
import process from "process";
import MagicLinkEmail from "@/components/emails/magicLink";
import {Resend} from "resend";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM_EMAIL;
        if (!apiKey || !from) throw new Error("Verification email is not configured");
        const resend = new Resend(apiKey);

        const { error } = await resend.emails.send({
          from,
          to: identifier,
          subject: "Login Plan My Event",
          react: MagicLinkEmail({magicLink: url}),
        })
        if (error) throw new Error("Unable to send verification email")

      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      if (typeof token.email !== "string" || !token.email) {
        if (user?.id) token.id = user.id
        return token
      }
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
