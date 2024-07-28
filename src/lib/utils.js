import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export async function connectDB() {
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) return;
        const { connection } = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to ${connection.host}`);
    } catch (err) {
        throw new Error(err);
    }
}
