"use server";
import { connectDB } from "@/lib/utils";
import User from "@/models/user.model";
import { z } from "zod";

export default async function signUpHandler(formData) {
    try {
        await connectDB();
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();
        const confirmPassword = formData.get("confirmPassword").trim();
        if (!email || !password || !confirmPassword) {
            throw new Error("Enter all fields");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        try {
            z.string().email().parse(email).error;
        } catch (error) {
            throw new Error("Invalid email");
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }
        const user = await User.create({ email, password });
        return;
    } catch (error) {
        throw new Error(error);
    }
}
