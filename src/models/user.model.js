import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: [true, "Username is required"],
    //     unique: [true, "Username already taken"],
    //     trim: true,
    // },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
    },
    password: {
        type: String,
        select: false,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
