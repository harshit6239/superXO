"use client";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import signUpHandler from "@/actions/signUpHandler";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900 bg-[url('/bg-pattern.webp')] bg-repeat bg-contain">
            <div className="bg-gray-800 flex flex-col rounded-md shadow-lg w-96 max-w-[85%] ">
                <form
                    action={async (formData) => {
                        signUpHandler(formData)
                            .then(() => {
                                toast.success(
                                    "User created, login to continue",
                                    {
                                        duration: 3000,
                                        style: {
                                            backgroundColor: "#333",
                                            color: "#fff",
                                        },
                                        position: "top-right",
                                    }
                                );
                                router.push("/login");
                            })
                            .catch((error) => {
                                toast.error(
                                    error.message.split(":")[1].trim(),
                                    {
                                        duration: 3000,
                                        style: {
                                            backgroundColor: "#333",
                                            color: "#fff",
                                        },
                                        position: "top-right",
                                    }
                                );
                            });
                    }}
                    className=" p-10 pb-4 flex flex-col gap-4 "
                >
                    <div className="relative ">
                        <FaUser className="text-white absolute top-1/2 translate-y-[-50%] left-3" />
                        <input
                            name="email"
                            type="text"
                            placeholder="email"
                            className="bg-gray-700 text-white rounded-md p-4 pl-9 w-full"
                        />
                    </div>
                    <div className="relative ">
                        <FaLock className="text-white absolute top-1/2 translate-y-[-50%] left-3" />
                        <input
                            name="password"
                            type={showPass ? "text" : "password"}
                            placeholder="password"
                            className="bg-gray-700 text-white rounded-md p-4 pl-9 pr-9 w-full"
                        />
                        <div
                            className="text-white absolute top-1/2 translate-y-[-50%] right-3
                                    hover:text-opacity-70 hover:cursor-pointer"
                            onClick={() => setShowPass((showPass) => !showPass)}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="relative ">
                        <FaLock className="text-white absolute top-1/2 translate-y-[-50%] left-3" />
                        <input
                            name="confirmPassword"
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="confirm password"
                            className="bg-gray-700 text-white rounded-md p-4 pl-9 w-full"
                        />
                        <div
                            className="text-white absolute top-1/2 translate-y-[-50%] right-3
                                    hover:text-opacity-70 hover:cursor-pointer"
                            onClick={() =>
                                setShowConfirmPass(
                                    (showConfirmPass) => !showConfirmPass
                                )
                            }
                        >
                            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white p-4 rounded-md transition-all ease-in-out
                                        hover:bg-blue-600 hover:rounded-3xl"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-white text-center text-opacity-50 pb-4">
                    or
                </div>
                <form
                    action=""
                    className=" p-10 pt-0 pb-4 flex flex-col gap-4 "
                >
                    <button
                        className="bg-white text-black p-4 rounded-md flex justify-center items-center gap-2 transition-all ease-in-out 
                                    hover:bg-slate-200 hover:rounded-3xl"
                    >
                        Continue with Google
                        <span>
                            <FcGoogle className="size-6 " />
                        </span>
                    </button>
                    <hr />
                </form>
                <footer
                    className="text-white text-center text-opacity-50 pb-4 transition-opacity ease-in-out
                                    hover:text-opacity-70 "
                >
                    <Link href="/login">Already have an Account, Login</Link>
                </footer>
            </div>
            <Toaster />
        </div>
    );
}
