import "./globals.scss";
import type { Metadata } from "next";
import { Jost, Krona_One } from "next/font/google";

import Background from "@/components/Background";

const kronaOne = Krona_One({
    weight: "400",
    variable: "--font-krona-one",
    subsets: ["latin"],
});

const jost = Jost({
    weight: "400",
    variable: "--font-jost",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dawid Bartczak",
    description: "Portfolio Dawida Bartczaka - projekty full-stack, deep learning i aplikacje użytkowe.",
    icons: ["favicon.svg"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
        <body className={`${jost.variable} ${kronaOne.variable}`}>

        {children}

        <Background />

        </body>
        </html>
    );
}
