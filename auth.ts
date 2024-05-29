import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./lib/db"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter : PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    
    ],

    callbacks: {
        session: ({ session, token }) => ({
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        }
      ),
      },


})