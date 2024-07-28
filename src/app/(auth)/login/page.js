"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import loginHandler from "@/actions/loginHandler";
import Image from "next/image";

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900 bg-[url('/bg-pattern.webp')] bg-repeat bg-contain">
            <form
                action={async (FormData) => {
                    setLoading(true);
                    loginHandler(FormData)
                        .then(() => {})
                        .catch((err) => {
                            toast.error(err.message, {
                                duration: 3000,
                                style: {
                                    backgroundColor: "#333",
                                    color: "#fff",
                                },
                                position: "top-right",
                            });
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }}
                className="bg-gray-800 p-10 pt-4 rounded-md shadow-lg flex flex-col items-center w-96 max-w-[85%] gap-4"
            >
                <Image
                    src={"/logo.svg"}
                    height={100}
                    width={100}
                    alt="logo"
                    className="mb-6"
                />
                <div className="relative w-full ">
                    <FaUser className="text-white absolute top-1/2 translate-y-[-50%] left-3" />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        className="bg-gray-700 text-white rounded-md p-4 pl-9 w-full"
                    />
                </div>
                <div className="relative w-full ">
                    <FaLock
                        className="text-white absolute top-1/2 translate-y-[-50%] left-3
                                        hover:text-opacity-70 hover:cursor-pointer"
                    />
                    <input
                        name="password"
                        type={showPass ? "text" : "password"}
                        placeholder="password"
                        className="bg-gray-700 text-white rounded-md p-4 pl-9 pr-9 w-full"
                    />
                    <div
                        className="text-white absolute top-1/2 translate-y-[-50%] right-3"
                        onClick={() => setShowPass((showPass) => !showPass)}
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
                <button
                    disabled={loading}
                    className="bg-blue-500 text-white p-4 rounded-md transition-all ease-in-out w-full
                                        hover:bg-blue-600 hover:rounded-3xl"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-white text-center text-opacity-50">or</div>
                <button
                    className="bg-white text-black p-4 rounded-md w-full flex justify-center items-center gap-2 transition-all ease-in-out 
                                    hover:bg-slate-200 hover:rounded-3xl"
                >
                    Login with Google
                    <span>
                        <FcGoogle className="size-6 " />
                    </span>
                </button>
                <hr />
                <footer
                    className="text-white text-center text-opacity-50 transition-opacity ease-in-out
                                    hover:text-opacity-70 "
                >
                    <Link href="/signup">
                        Don&apos;t have an Account, Sign Up
                    </Link>
                </footer>
            </form>
            <Toaster />
        </div>
    );
}
