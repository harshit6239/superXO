import Link from "next/link";
import Image from "next/image";
import { GiCrossMark } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";

export default function HomeLayout({ children }) {
    return (
        <div className="flex w-screen h-screen">
            <div className="h-screen flex flex-col justify-start items-start p-8 w-fit bg-gray-800 text-white text-lg ">
                <div className="mt-8 ">
                    <Image
                        src="/logo.svg"
                        width={70}
                        height={70}
                        alt="logo"
                        priority={true}
                    />
                </div>
                <ul className="mt-8 flex flex-col gap-4">
                    <li>
                        <Link
                            href="/play"
                            className="menu-item"
                        >
                            <GiCrossMark />
                            Play
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/social"
                            className="menu-item"
                        >
                            <FaUserFriends />
                            Social
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/messages"
                            className="menu-item"
                        >
                            <AiFillMessage />
                            Messages
                        </Link>
                    </li>
                </ul>
            </div>
            {children}
        </div>
    );
}
