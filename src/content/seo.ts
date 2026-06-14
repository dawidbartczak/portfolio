export const siteUrl = "https://dawidbartczak.dev";

export const siteName = "Dawid Bartczak";

export const defaultTitle = "Dawid Bartczak | End-to-end MVP builder";

export const defaultDescription = "Freelance portfolio Dawida Bartczaka: end-to-end MVP, custom software, full-stack, ML/NLP, desktop and automation projects.";

export const defaultOgImage = "/images/thumbnails/byteflow.png";

export const seoKeywords = [
    "Dawid Bartczak",
    "freelance developer",
    "MVP builder",
    "full-stack developer",
    "custom software",
    "Next.js",
    "React",
    "Tauri",
    "ML/NLP",
    "automation",
];

export function absoluteUrl(path = "/") {
    return new URL(path, siteUrl).toString();
}
