import "./globals.scss";
import type { Metadata } from "next";
import { Jost, Krona_One } from "next/font/google";
import Script from "next/script";

import Background from "@/components/Background";
import {contact} from "@/content/site";
import {absoluteUrl, defaultDescription, defaultOgImage, defaultTitle, seoKeywords, siteName, siteUrl} from "@/content/seo";

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
    metadataBase: new URL(siteUrl),
    title: {
        default: defaultTitle,
        template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: seoKeywords,
    authors: [{name: siteName, url: siteUrl}],
    creator: siteName,
    publisher: siteName,
    applicationName: defaultTitle,
    category: "technology",
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: "/",
        siteName,
        locale: "pl_PL",
        type: "website",
        images: [
            {
                url: defaultOgImage,
                width: 1200,
                height: 630,
                alt: `${siteName} portfolio preview`,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDescription,
        images: [defaultOgImage],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": absoluteUrl("/#person"),
            name: siteName,
            url: siteUrl,
            email: contact.email,
            sameAs: [contact.github],
            jobTitle: "End-to-end MVP builder",
            knowsAbout: ["Full-stack development", "MVP delivery", "Automation", "Desktop apps", "ML/NLP prototypes", "Docker deployment"],
        },
        {
            "@type": "ProfessionalService",
            "@id": absoluteUrl("/#software-delivery"),
            name: `${siteName} Software Delivery`,
            url: siteUrl,
            founder: {"@id": absoluteUrl("/#person")},
            areaServed: "Worldwide",
            serviceType: ["End-to-end MVP delivery", "Custom software development", "Automation", "ML/NLP prototypes"],
        },
    ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />

        {children}

        <Background />

        </body>
        </html>
    );
}
