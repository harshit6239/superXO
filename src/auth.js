import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials?.email;
                const password = credentials?.password;
                console.log(email, password);
                if (!email || !password) {
                    throw new CredentialsSignin({ error: "Enter all fields" });
                }
                const user = await User.findOne({ email }).select("+password");
                if (!user) {
                    throw new CredentialsSignin({
                        error: "Invalid email or password",
                    });
                }
                if (!user.password) {
                    throw new CredentialsSignin({
                        error: "Invalid email or password",
                    });
                }
                const isValid = await compare(password, user.password);
                if (!isValid) {
                    throw new CredentialsSignin({
                        error: "Invalid email or password",
                    });
                }
                return { id: user._id, email: user.email };
            },
        }),
    ],
});
