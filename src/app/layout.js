import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "superXO",
    description:
        "Multiplayer super tic-tac-toe game, take tic-tac-toe to the next level",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + " h-screen w-screen"}>
                {children}
            </body>
        </html>
    );
}
