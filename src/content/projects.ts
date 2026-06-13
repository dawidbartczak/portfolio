import type { Project } from "@/types/project";

export const projects = [
    {
        id: "crimsongpt",
        title: "CrimsonGPT",
        description: "Projekt full-stack, mały eksperymentalny model językowy przed fazą fine-tuningu",
        paragraphs: [
            "Projekt full-stack, mały eksperymentalny model językowy przed fazą fine-tuningu",
        ],
        thumbnailPath: "/images/thumbnails/crimsongpt.webp",
        actions: [
            {
                type: "demo",
                value: "crimsongpt.dawidbartczak.dev",
                href: "https://crimsongpt.dawidbartczak.dev",
            },
            {
                type: "source",
                value: "https://github.com/dawidbartczak/crimson-gpt",
                href: "https://github.com/dawidbartczak/crimson-gpt",
            },
        ],
    },
    {
        id: "byteflow",
        title: "Byteflow",
        description: "Lekka, wieloplatformowa aplikacja do komunikacji szeregowej, zbudowana w Tauri",
        paragraphs: [
            "Lekka, wieloplatformowa aplikacja do komunikacji szeregowej, zbudowana w Tauri",
        ],
        thumbnailPath: "/images/thumbnails/byteflow.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/dawidbartczak/byteflow",
                href: "https://github.com/dawidbartczak/byteflow",
            },
        ],
    },
    {
        id: "canvasgl",
        title: "CanvasGL",
        description: "Rasteryzacja trójkątów z interpolacją barycentryczną w HTML Canvas",
        paragraphs: [
            "Rasteryzacja trójkątów z interpolacją barycentryczną w HTML Canvas",
            "Demo losuje 3 punkty, z których powstaje rasteryzowany trójkąt. Kliknięcie powoduje odświerzenie demo.",
        ],
        thumbnailPath: "/images/thumbnails/canvasgl.webp",
        actions: [
            {
                type: "demo",
                value: "canvasgl.dawidbartczak.dev",
                href: "https://canvasgl.dawidbartczak.dev",
            },
            {
                type: "source",
                value: "https://github.com/dawidbartczak/canvasgl",
                href: "https://github.com/dawidbartczak/canvasgl",
            },
        ],
    },
    {
        id: "parametricregression",
        title: "Parametric regression",
        description: "Dopasowywanie funkcji do zbioru punktów metodą regresji parametrycznej z wizualizacją w HTML Canvas",
        paragraphs: [
            "Dopasowywanie funkcji do zbioru punktów metodą regresji parametrycznej z wizualizacją w HTML Canvas",
            "Demo losowo generuje punkty, a następnie dopasowuje do nich funkcję. Układ można przeglądać, przesuwając go myszką i powiększając/zmniejszając za pomocą scrolla.",
        ],
        thumbnailPath: "/images/thumbnails/parametricregression.webp",
        actions: [
            {
                type: "demo",
                value: "parametricregression.dawidbartczak.dev",
                href: "https://parametricregression.dawidbartczak.dev",
            },
            {
                type: "source",
                value: "https://github.com/dawidbartczak/parametric-regression",
                href: "https://github.com/dawidbartczak/parametric-regression",
            },
        ],
    },
    {
        id: "biteback",
        title: "BiteBack",
        description: "Aplikacja mobilna wspierająca rozsądne zarządanie lodówką w celu zapobiegania marnowania jedzenia",
        paragraphs: [
            "Aplikacja mobilna wspierająca rozsądne zarządanie lodówką w celu zapobiegania marnowania jedzenia",
        ],
        thumbnailPath: "/images/thumbnails/biteback.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/qczer/biteback",
                href: "https://github.com/qczer/biteback",
            },
        ],
    },
    {
        id: "paragonpie",
        title: "ParagonPIE",
        description: "Sieć neuronowa do ekstrakcji informacji z wierszy polskich paragonów",
        paragraphs: [
            "Sieć neuronowa do ekstrakcji informacji z wierszy polskich paragonów",
        ],
        thumbnailPath: "/images/thumbnails/paragon.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/dawidbartczak/paragonpie",
                href: "https://github.com/dawidbartczak/paragonpie",
            },
        ],
    },
    {
        id: "paragonocr",
        title: "ParagonOCR",
        description: "Sieć neuronowa do odczytu wierszy polskich paragonów",
        paragraphs: [
            "Sieć neuronowa do odczytu wierszy polskich paragonów",
        ],
        thumbnailPath: "/images/thumbnails/paragon.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/dawidbartczak/paragonocr",
                href: "https://github.com/dawidbartczak/paragonocr",
            },
        ],
    },
    {
        id: "paragonner",
        title: "ParagonNER",
        description: "Sieć neuronowa do klasyfikacji wierszy polskich paragonów",
        paragraphs: [
            "Sieć neuronowa do klasyfikacji wierszy polskich paragonów",
        ],
        thumbnailPath: "/images/thumbnails/paragon.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/dawidbartczak/paragonner",
                href: "https://github.com/dawidbartczak/paragonner",
            },
        ],
    },
    {
        id: "crimsontokenizer",
        title: "Crimson Tokenizer",
        description: "Tokenizator BPE trenowany na korpusie polskich tekstów datasetu SpeakLeash",
        paragraphs: [
            "Tokenizator BPE trenowany na korpusie polskich tekstów datasetu SpeakLeash",
        ],
        thumbnailPath: "/images/thumbnails/crimsontokenizer.webp",
        actions: [
            {
                type: "source",
                value: "https://github.com/dawidbartczak/crimson-tokenizer",
                href: "https://github.com/dawidbartczak/crimson-tokenizer",
            },
        ],
    },
] satisfies Project[];

export function getProject(id: string) {
    return projects.find((project) => project.id === id);
}
