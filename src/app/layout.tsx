import "./globals.scss";
import type { Metadata } from "next";
import { Jost, Krona_One } from "next/font/google";
import Script from "next/script";

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
    title: "Dawid Bartczak | End-to-end MVP builder",
    description: "Freelance portfolio Dawida Bartczaka: end-to-end MVP, custom software, full-stack, ML/NLP, desktop and automation projects.",
    icons: ["favicon.svg"],
};

const themeScript = `
(() => {
    try {
        const theme = localStorage.getItem("portfolio-theme");
        document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
    } catch {
        document.documentElement.dataset.theme = "dark";
    }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl" data-theme="dark" suppressHydrationWarning>
        <body className={`${jost.variable} ${kronaOne.variable}`}>
        <Script id="portfolio-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{__html: themeScript}} />

        {children}

        <Background />

        </body>
        </html>
    );
}
