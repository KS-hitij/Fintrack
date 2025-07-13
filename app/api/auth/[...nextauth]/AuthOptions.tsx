import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userRegisterSchema from "@/app/lib/validation/user";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuid } from 'uuid';
import prisma from "@/app/lib/database/db";

function generateUsername(email: string): string {
    const prefix = email.split('@')[0]
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase()
        .slice(0, 15);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomSuffix}`;
}

const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email", placeholder: "John12@gmail.com" }
            },
            async authorize(credentials) {
                try {
                    const validated = userRegisterSchema.partial().safeParse(credentials);
                    if (!validated.success) {
                        return null;
                    }
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            OR: [{ email: validated.data.email }, { username: validated.data.username }]
                        }
                    });
                    if (!existingUser) {
                        throw new Error("User not found");
                    }
                    const user = {
                        email: validated.data.email,
                        id: uuid()
                    };
                    if (user) {
                        return user;
                    } else {
                        return null
                    }
                } catch (err) {
                    console.log(err);
                    throw new Error("validation Failed");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            profile(profile) {
                return {
                    id: profile.sub,
                    email: profile.email,
                    firstName: profile.given_name || profile.name?.split(' ')[0] || 'User',
                    lastName: profile.family_name || profile.name?.split(' ').slice(1).join(' ') || '',
                    image: profile.picture
                };
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                const email = profile?.email;
                if (!email) {
                    return false;
                }
                const existingUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { googleId: profile?.sub }, { email: email }
                        ]
                    }
                });
                if (existingUser) {
                    if (!existingUser.googleId) {
                        await prisma.user.update({
                            where: { email },
                            data: { googleId: profile?.sub }
                        });
                    }
                    return true;
                }
                const nameParts = profile?.name?.split(' ') || [];
                const firstName = nameParts[0] || 'User';
                const lastName = nameParts.slice(1).join(' ') || '';
                const username = generateUsername((email || ""));
                await prisma.user.create({
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        googleId: profile?.sub,
                        username: username
                    }
                })
                return true;
            }
            return true;
        }
    },
    pages: {
        error: "/auth/error",
    }

}

export default AuthOptions;