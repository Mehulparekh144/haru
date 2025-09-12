import { betterAuth } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import { db } from "@/server/db";
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql"
    }),
    plugins: [
        username()
    ],
    emailAndPassword: {
        enabled: true
    },
})
