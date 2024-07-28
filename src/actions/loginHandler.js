"use server";
import { signIn } from "@/auth";
import { connectDB } from "@/lib/utils";
import { z } from "zod";

export default async function loginHandler(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
        throw new Error("Enter all fields");
    }
    try {
        z.string().email().parse(email).error;
    } catch (error) {
        throw new Error("Invalid email");
    }
    try {
        await connectDB();
    } catch (error) {
        throw new Error("Database connection error");
    }
    try {
        const user = await signIn("Credentials", email, password);
        return user;
    } catch (error) {
        throw new Error("Invalid email or password");
    }
}
