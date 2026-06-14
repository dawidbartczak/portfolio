import type { Project } from "@/types/project";

const withoutAiNote = {
    pl: "Projekt zbudowany ręcznie przed erą powszechnego AI-assisted codingu. Pokazuje samodzielne rozumienie problemu, debugowanie i dowożenie bez gotowych odpowiedzi z narzędzi AI.",
    en: "Hand-built before AI-assisted coding became mainstream. It shows independent problem solving, debugging and delivery without relying on AI-generated answers.",
};

export const projects = [
    {
        id: "byteflow",
        title: "Byteflow",
        year: "2024",
        category: {pl: "Aplikacja desktopowa", en: "Desktop application"},
        era: "without-ai",
        featured: true,
        featuredLabel: {pl: "Produkt desktopowy", en: "Desktop product"},
        description: {
            pl: "Lekka, wieloplatformowa aplikacja do komunikacji szeregowej zbudowana w Tauri.",
            en: "A lightweight cross-platform serial communication app built with Tauri.",
        },
        thumbnailPath: "/images/thumbnails/byteflow.png",
        tags: ["Desktop", "Tauri", "Serial I/O", "UX"],
        stack: ["TypeScript", "React", "Tauri", "Rust ecosystem"],
        role: {
            pl: "Projektowanie interfejsu, logika aplikacji, integracja komunikacji szeregowej, build desktopowy.",
            en: "Interface design, application logic, serial communication integration and desktop build setup.",
        },
        proofPoints: [
            {
                pl: "Łączy praktyczny problem sprzętowy z czytelnym UI.",
                en: "Connects a practical hardware-facing problem with a readable UI.",
            },
            {
                pl: "Pokazuje umiejętność budowania narzędzi użytkowych, nie tylko stron.",
                en: "Shows the ability to build useful tools, not only websites.",
            },
            {
                pl: "Dobrze nadaje się jako dowód myślenia produktowego.",
                en: "Works well as proof of product-minded engineering.",
            },
        ],
        caseStudy: {
            problem: {
                pl: "Komunikacja z urządzeniami przez port szeregowy często wymaga surowych, nieprzyjaznych narzędzi. Celem było stworzenie lżejszego, bardziej dopracowanego interfejsu dla pracy z danymi szeregowymi.",
                en: "Working with serial devices often requires raw, unfriendly tools. The goal was to build a lighter, more polished interface for reading and sending serial data.",
            },
            built: {
                pl: "Zbudowałem aplikację desktopową z czytelnym interfejsem, obsługą danych w różnych formatach i fundamentem pod dalszą rozbudowę narzędzia.",
                en: "I built a desktop app with a readable interface, support for multiple data formats and a foundation for future expansion.",
            },
            role: {
                pl: "End-to-end: UI, logika, integracja aplikacji desktopowej i przygotowanie projektu jako realnego narzędzia.",
                en: "End-to-end: UI, logic, desktop integration and shaping the project as a real tool.",
            },
            architecture: {
                pl: "Frontend odpowiada za szybkie operacje użytkownika i wizualizację danych, a warstwa Tauri daje dostęp do możliwości aplikacji desktopowej bez ciężkiego runtime'u.",
                en: "The frontend handles user operations and data display, while Tauri provides desktop capabilities without a heavy runtime.",
            },
            systemMap: {
                eyebrow: {pl: "Mapa systemu", en: "System map"},
                title: {
                    pl: "Od portu szeregowego do czytelnego workflow.",
                    en: "From serial port to readable workflow.",
                },
                lead: {
                    pl: "Byteflow pokazuje umiejętność przełożenia niskopoziomowej pracy technicznej na narzędzie, z którego da się korzystać wielokrotnie.",
                    en: "Byteflow shows the ability to turn low-level technical work into a repeatable tool people can actually use.",
                },
                steps: [
                    {
                        label: {pl: "Wejście", en: "Input"},
                        title: {pl: "Port szeregowy", en: "Serial port"},
                        text: {
                            pl: "Aplikacja zakłada pracę z danymi przychodzącymi i wychodzącymi z urządzenia, nie tylko statyczny widok.",
                            en: "The app is built around incoming and outgoing device data, not just a static screen.",
                        },
                    },
                    {
                        label: {pl: "Warstwa pracy", en: "Work layer"},
                        title: {pl: "Formaty i operacje", en: "Formats and actions"},
                        text: {
                            pl: "UI porządkuje format, odbiór, transmisję i podstawowe operacje potrzebne w technicznym workflow.",
                            en: "The UI structures format selection, receiving, transmitting and the basic actions needed in a technical workflow.",
                        },
                    },
                    {
                        label: {pl: "Produkt", en: "Product"},
                        title: {pl: "Desktop bez ciężaru", en: "Lightweight desktop"},
                        text: {
                            pl: "Tauri daje aplikacji desktopowy zakres, ale bez poczucia ciężkiego, przypadkowego narzędzia.",
                            en: "Tauri gives the app desktop reach without making it feel like a heavy, accidental tool.",
                        },
                    },
                ],
            },
            clientValue: {
                eyebrow: {pl: "Dlaczego to ma znaczenie", en: "Why it matters"},
                title: {
                    pl: "Dowód, że umiem budować narzędzia użytkowe, nie tylko efektowne UI.",
                    en: "Proof that I can build practical tools, not only polished UI.",
                },
                items: [
                    {
                        pl: "Przekładam techniczny problem na interface, który zmniejsza tarcie w codziennej pracy.",
                        en: "I translate a technical problem into an interface that reduces friction in day-to-day work.",
                    },
                    {
                        pl: "Myślę o narzędziu jako o produkcie: workflow, powtarzalność, czytelność i build.",
                        en: "I think about the tool as a product: workflow, repeatability, readability and build.",
                    },
                    {
                        pl: "To dobry sygnał dla zleceń, gdzie trzeba połączyć frontend z nietypową integracją.",
                        en: "It is a strong signal for projects that combine frontend work with uncommon integrations.",
                    },
                ],
            },
            hardParts: [
                {pl: "Projektowanie UI pod powtarzalną pracę techniczną.", en: "Designing UI for repeated technical work."},
                {pl: "Utrzymanie aplikacji lekkiej mimo desktopowego zakresu.", en: "Keeping the app lightweight despite desktop scope."},
                {pl: "Porządkowanie danych wejścia/wyjścia w czytelny workflow.", en: "Structuring input/output data into a readable workflow."},
            ],
            proves: [
                {pl: "Potrafię dowieźć narzędzie użytkowe od pomysłu do działającej aplikacji.", en: "I can ship a practical tool from idea to working app."},
                {pl: "Nie jestem ograniczony do jednej platformy.", en: "I am not limited to one platform."},
            ],
            note: withoutAiNote,
        },
        links: [
            {
                type: "source",
                label: {pl: "Kod źródłowy", en: "Source code"},
                value: "github.com/dawidbartczak/byteflow",
                href: "https://github.com/dawidbartczak/byteflow",
            },
        ],
    },
    {
        id: "paragon-pipeline",
        title: "Paragon Pipeline",
        year: "2025",
        category: {pl: "ML / OCR / NLP", en: "ML / OCR / NLP"},
        era: "without-ai",
        featured: true,
        featuredLabel: {pl: "Pipeline ML", en: "ML pipeline"},
        description: {
            pl: "Seria modeli i algorytmów do odczytu, klasyfikacji oraz ekstrakcji informacji z polskich paragonów.",
            en: "A series of models and algorithms for reading, classifying and extracting information from Polish receipts.",
        },
        thumbnailPath: "/images/thumbnails/paragon.png",
        tags: ["OCR", "NER", "Transformers", "Receipts"],
        stack: ["Python", "Jupyter", "PyTorch ecosystem", "NLP"],
        role: {
            pl: "Projekt pipeline'u, eksperymenty modelowe, przygotowanie danych, klasyfikacja i ekstrakcja informacji.",
            en: "Pipeline design, model experiments, data preparation, classification and information extraction.",
        },
        proofPoints: [
            {
                pl: "Łączy kilka wyspecjalizowanych modeli w jeden proces.",
                en: "Connects several specialised models into one process.",
            },
            {
                pl: "Pokazuje pracę z nieidealnymi danymi i polskim kontekstem językowym.",
                en: "Shows work with imperfect data and Polish-language context.",
            },
            {
                pl: "To najmocniejszy dowód samodzielnego ML/NLP problem solvingu.",
                en: "This is the strongest proof of independent ML/NLP problem solving.",
            },
        ],
        caseStudy: {
            problem: {
                pl: "Paragon to trudny dokument: ma nieregularne formatowanie, skróty, szumy OCR i dane, których nie da się wygodnie parsować prostymi regexami.",
                en: "A receipt is a difficult document: irregular formatting, abbreviations, OCR noise and data that cannot be reliably parsed with simple regexes.",
            },
            built: {
                pl: "Zbudowałem koncepcję pipeline'u: ParagonOCR odczytuje linie, ParagonNER klasyfikuje je, a ParagonPIE wydobywa informacje produktowe.",
                en: "I built a pipeline concept: ParagonOCR reads lines, ParagonNER classifies them and ParagonPIE extracts product information.",
            },
            role: {
                pl: "Samodzielne badanie problemu, eksperymenty z modelami, projekt etapów pipeline'u i dokumentowanie zależności między repozytoriami.",
                en: "Independent problem research, model experiments, pipeline stage design and documenting how the repositories connect.",
            },
            architecture: {
                pl: "Pipeline rozbija problem na mniejsze etapy: obraz → linie tekstu → klasyfikacja linii → filtrowanie → ekstrakcja informacji.",
                en: "The pipeline decomposes the problem into smaller stages: image → text lines → line classification → filtering → information extraction.",
            },
            systemMap: {
                eyebrow: {pl: "Mapa pipeline'u", en: "Pipeline map"},
                title: {
                    pl: "Nie jeden model, tylko seria decyzji technicznych.",
                    en: "Not one model, but a chain of technical decisions.",
                },
                lead: {
                    pl: "Paragon Pipeline pokazuje, że umiem rozłożyć niejasny problem ML na etapy, które da się testować, wymieniać i rozwijać osobno.",
                    en: "Paragon Pipeline shows that I can split an ambiguous ML problem into stages that can be tested, replaced and improved separately.",
                },
                steps: [
                    {
                        label: {pl: "OCR", en: "OCR"},
                        title: {pl: "Obraz → linie", en: "Image → lines"},
                        text: {
                            pl: "Pierwszy etap skupia się na odczycie tekstu i przygotowaniu danych wejściowych z dokumentu o nieregularnym formacie.",
                            en: "The first stage focuses on reading text and preparing input data from an irregular document format.",
                        },
                    },
                    {
                        label: {pl: "NER", en: "NER"},
                        title: {pl: "Linie → klasy", en: "Lines → classes"},
                        text: {
                            pl: "Drugi etap klasyfikuje fragmenty paragonu, żeby system wiedział, które linie mogą zawierać istotne informacje.",
                            en: "The second stage classifies receipt fragments so the system knows which lines may contain useful information.",
                        },
                    },
                    {
                        label: {pl: "PIE", en: "PIE"},
                        title: {pl: "Klasy → informacje", en: "Classes → information"},
                        text: {
                            pl: "Ostatni etap skupia się na ekstrakcji informacji produktowych i zamianie szumu dokumentu w strukturę.",
                            en: "The final stage focuses on product information extraction and turning document noise into structure.",
                        },
                    },
                ],
            },
            clientValue: {
                eyebrow: {pl: "Dlaczego to ma znaczenie", en: "Why it matters"},
                title: {
                    pl: "To case pokazuje myślenie architektoniczne w ML, nie tylko odpalenie notebooka.",
                    en: "This case shows ML architecture thinking, not just running a notebook.",
                },
                items: [
                    {
                        pl: "Dzielę niepewny problem na etapy, które można mierzyć i poprawiać bez przepisywania całości.",
                        en: "I split uncertain problems into stages that can be measured and improved without rewriting everything.",
                    },
                    {
                        pl: "Potrafię połączyć research, dane i praktyczny pipeline, nawet gdy wejście jest nieidealne.",
                        en: "I can connect research, data and a practical pipeline even when the input is messy.",
                    },
                    {
                        pl: "To mocny dowód dla zleceń z OCR, NLP, klasyfikacją, ekstrakcją danych i automatyzacją dokumentów.",
                        en: "It is strong proof for OCR, NLP, classification, data extraction and document automation work.",
                    },
                ],
            },
            hardParts: [
                {pl: "Podział złożonego problemu ML na mierzalne etapy.", en: "Splitting a complex ML problem into measurable stages."},
                {pl: "Praca z polskim językiem, skrótami i formatem paragonów.", en: "Handling Polish language, abbreviations and receipt formats."},
                {pl: "Myślenie o całym systemie, nie tylko pojedynczym notebooku.", en: "Thinking about the full system, not just a single notebook."},
            ],
            proves: [
                {pl: "Potrafię projektować pipeline'y ML od pierwszych zasad.", en: "I can design ML pipelines from first principles."},
                {pl: "Umiem rozłożyć niejasny problem na architekturę techniczną.", en: "I can turn an ambiguous problem into technical architecture."},
            ],
            note: withoutAiNote,
        },
        links: [
            {
                type: "source",
                label: {pl: "ParagonOCR", en: "ParagonOCR"},
                value: "OCR repo",
                href: "https://github.com/dawidbartczak/paragonocr",
            },
            {
                type: "source",
                label: {pl: "ParagonNER", en: "ParagonNER"},
                value: "NER repo",
                href: "https://github.com/dawidbartczak/paragonner",
            },
            {
                type: "source",
                label: {pl: "ParagonPIE", en: "ParagonPIE"},
                value: "PIE repo",
                href: "https://github.com/dawidbartczak/paragonpie",
            },
        ],
    },
    {
        id: "crimsongpt",
        title: "CrimsonGPT",
        year: "2024",
        category: {pl: "Full-stack / NLP", en: "Full-stack / NLP"},
        era: "without-ai",
        featured: true,
        featuredLabel: {pl: "Full-stack NLP", en: "Full-stack NLP"},
        description: {
            pl: "Full-stackowy eksperyment z małym modelem językowym przed fazą fine-tuningu.",
            en: "A full-stack experiment around a small language model before the fine-tuning phase.",
        },
        thumbnailPath: "/images/thumbnails/crimsongpt.png",
        tags: ["Full-stack", "LLM", "NLP", "Product UI"],
        stack: ["TypeScript", "React", "Next.js", "NLP concepts"],
        role: {
            pl: "Interfejs, integracja doświadczenia użytkownika, eksperyment językowy i przygotowanie projektu end-to-end.",
            en: "Interface, user experience integration, language-model experiment and end-to-end project setup.",
        },
        proofPoints: [
            {pl: "Łączy frontend produktu z eksperymentem ML.", en: "Connects product frontend with an ML experiment."},
            {pl: "Pokazuje ciekawość wokół modeli językowych jeszcze przed boomem AI toolingowym.", en: "Shows curiosity around language models before AI tooling became standard."},
            {pl: "Ma działające demo i publiczny kod.", en: "Has a working demo and public source code."},
        ],
        caseStudy: {
            problem: {
                pl: "Chciałem zrozumieć, jak wygląda zbudowanie produktu wokół małego modelu językowego, zamiast tylko używać gotowego API.",
                en: "I wanted to understand what it means to build a product around a small language model instead of only calling a ready-made API.",
            },
            built: {
                pl: "Zbudowałem aplikację full-stack z interfejsem czatu i fundamentem pod dalszy eksperyment z modelem.",
                en: "I built a full-stack app with a chat interface and a foundation for further model experimentation.",
            },
            role: {
                pl: "Samodzielne połączenie części produktowej, UI i eksperymentalnego zaplecza NLP.",
                en: "Independently connecting product UI with an experimental NLP backend direction.",
            },
            architecture: {
                pl: "Projekt traktuje model jako część produktu: użytkownik widzi prosty interfejs, a pod spodem projekt może ewoluować wraz z treningiem i fine-tuningiem.",
                en: "The project treats the model as part of a product: the user sees a simple interface while the underlying system can evolve through training and fine-tuning.",
            },
            systemMap: {
                eyebrow: {pl: "Mapa produktu", en: "Product map"},
                title: {
                    pl: "Model językowy opakowany w produkt, nie w samotny eksperyment.",
                    en: "A language model wrapped as a product, not an isolated experiment.",
                },
                lead: {
                    pl: "CrimsonGPT pokazuje połączenie researchu NLP z produktem, w którym użytkownik widzi prostą rozmowę, a architektura zostawia miejsce na dalszą pracę z modelem.",
                    en: "CrimsonGPT connects NLP research with a product surface where the user sees a simple chat while the architecture leaves room for further model work.",
                },
                steps: [
                    {
                        label: {pl: "UI", en: "UI"},
                        title: {pl: "Interfejs rozmowy", en: "Conversation interface"},
                        text: {
                            pl: "Warstwa produktu ukrywa eksperymentalność modelu i daje użytkownikowi prosty, znajomy sposób interakcji.",
                            en: "The product layer hides model experimentation behind a simple, familiar interaction pattern.",
                        },
                    },
                    {
                        label: {pl: "Logika", en: "Logic"},
                        title: {pl: "Przepływ prompt/response", en: "Prompt/response flow"},
                        text: {
                            pl: "Aplikacja porządkuje ścieżkę od wiadomości użytkownika do odpowiedzi, z miejscem na dalsze rozszerzanie zachowania modelu.",
                            en: "The app structures the path from user message to response, with room to extend model behaviour later.",
                        },
                    },
                    {
                        label: {pl: "Model", en: "Model"},
                        title: {pl: "Fundament pod tuning", en: "Foundation for tuning"},
                        text: {
                            pl: "Projekt traktuje model jako komponent systemu, który można rozwijać przez trening, dane i ewaluację.",
                            en: "The project treats the model as a system component that can evolve through training, data and evaluation.",
                        },
                    },
                ],
            },
            clientValue: {
                eyebrow: {pl: "Dlaczego to ma znaczenie", en: "Why it matters"},
                title: {
                    pl: "To pokazuje, że umiem zamieniać research w używalny product surface.",
                    en: "It shows that I can turn research into a usable product surface.",
                },
                items: [
                    {
                        pl: "Nie zatrzymuję się na modelu lub bibliotece; projektuję doświadczenie, które ktoś może sprawdzić.",
                        en: "I do not stop at a model or library; I design an experience someone can actually try.",
                    },
                    {
                        pl: "Łączę frontend, myślenie produktowe i eksperymentalne NLP w jednym kierunku technicznym.",
                        en: "I connect frontend, product thinking and experimental NLP into one technical direction.",
                    },
                    {
                        pl: "To dobry fundament pod prototypy AI, gdzie trzeba szybko pokazać działającą pierwszą wersję.",
                        en: "It is a good foundation for AI prototypes where a working first version matters quickly.",
                    },
                ],
            },
            hardParts: [
                {pl: "Połączenie eksperymentu ML z produktem webowym.", en: "Connecting an ML experiment with a web product."},
                {pl: "Projektowanie UI dla rozmowy z modelem.", en: "Designing UI for model interaction."},
                {pl: "Praca z niepełnym, eksperymentalnym zakresem projektu.", en: "Working with an incomplete experimental project scope."},
            ],
            proves: [
                {pl: "Potrafię budować produkt wokół technologii, której dopiero się uczę.", en: "I can build a product around technology I am actively learning."},
                {pl: "Umiem łączyć research, UI i wdrażalny kod.", en: "I can connect research, UI and shippable code."},
            ],
            note: withoutAiNote,
        },
        links: [
            {
                type: "demo",
                label: {pl: "Demo", en: "Demo"},
                value: "crimsongpt.dawidbartczak.dev",
                href: "https://crimsongpt.dawidbartczak.dev",
            },
            {
                type: "source",
                label: {pl: "Kod źródłowy", en: "Source code"},
                value: "github.com/dawidbartczak/crimson-gpt",
                href: "https://github.com/dawidbartczak/crimson-gpt",
            },
        ],
    },
    {
        id: "canvasgl",
        title: "CanvasGL",
        year: "2025",
        category: {pl: "Grafika / algorytmy", en: "Graphics / algorithms"},
        era: "without-ai",
        description: {
            pl: "Rasteryzacja trójkątów z interpolacją barycentryczną w HTML Canvas.",
            en: "Triangle rasterisation with barycentric interpolation in HTML Canvas.",
        },
        thumbnailPath: "/images/thumbnails/canvasgl.png",
        tags: ["Canvas", "Graphics", "Math"],
        stack: ["JavaScript", "HTML Canvas"],
        role: {
            pl: "Implementacja koncepcji grafiki komputerowej od podstaw.",
            en: "Implementing computer graphics concepts from scratch.",
        },
        proofPoints: [
            {pl: "Dowód algorytmicznego myślenia i matematyki w praktyce.", en: "Proof of algorithmic thinking and practical math."},
            {pl: "Implementacja bez gotowego silnika graficznego.", en: "Implementation without a ready-made graphics engine."},
        ],
        caseStudy: {
            problem: {
                pl: "Zrozumieć rasteryzację nie jako API, ale jako algorytm działający piksel po pikselu.",
                en: "Understand rasterisation not as an API, but as an algorithm working pixel by pixel.",
            },
            built: {
                pl: "Demo losujące punkty, tworzące trójkąt i wypełniające go interpolacją barycentryczną.",
                en: "A demo that generates points, creates a triangle and fills it using barycentric interpolation.",
            },
            role: {
                pl: "Samodzielna implementacja algorytmu i wizualizacji w Canvas.",
                en: "Independent implementation of the algorithm and Canvas visualisation.",
            },
            architecture: {
                pl: "Logika generuje geometrię, wyznacza obszar trójkąta i oblicza kolor przez współrzędne barycentryczne.",
                en: "The logic generates geometry, determines the triangle area and computes colour through barycentric coordinates.",
            },
            hardParts: [
                {pl: "Myślenie w układzie pikseli i współrzędnych.", en: "Thinking in pixels and coordinate systems."},
                {pl: "Interpolacja wartości wewnątrz geometrii.", en: "Interpolating values inside geometry."},
            ],
            proves: [
                {pl: "Potrafię zejść niżej niż framework i zrozumieć mechanikę.", en: "I can go below the framework and understand the mechanics."},
            ],
            note: withoutAiNote,
        },
        links: [
            {type: "demo", label: {pl: "Demo", en: "Demo"}, value: "canvasgl.dawidbartczak.dev", href: "https://canvasgl.dawidbartczak.dev"},
            {type: "source", label: {pl: "Kod źródłowy", en: "Source code"}, value: "github.com/dawidbartczak/canvasgl", href: "https://github.com/dawidbartczak/canvasgl"},
        ],
    },
    {
        id: "parametricregression",
        title: "Parametric Regression",
        year: "2025",
        category: {pl: "Matematyka / wizualizacja", en: "Math / visualisation"},
        era: "without-ai",
        description: {
            pl: "Dopasowywanie funkcji do zbioru punktów metodą regresji parametrycznej z wizualizacją w Canvas.",
            en: "Fitting a function to points with parametric regression and Canvas visualisation.",
        },
        thumbnailPath: "/images/thumbnails/parametricregression.png",
        tags: ["Regression", "Canvas", "Math"],
        stack: ["JavaScript", "HTML Canvas"],
        role: {
            pl: "Algorytm regresji, interaktywna wizualizacja i UI demo.",
            en: "Regression algorithm, interactive visualisation and demo UI.",
        },
        proofPoints: [
            {pl: "Łączy matematykę, wizualizację i interakcję.", en: "Connects math, visualisation and interaction."},
            {pl: "Pokazuje cierpliwość do eksperymentów algorytmicznych.", en: "Shows patience for algorithmic experiments."},
        ],
        caseStudy: {
            problem: {
                pl: "Zobaczyć, jak funkcja może dopasowywać się do losowo generowanych punktów w interaktywnym środowisku.",
                en: "See how a function can fit randomly generated points in an interactive environment.",
            },
            built: {
                pl: "Demo z generowaniem punktów, dopasowywaniem funkcji oraz przesuwaniem i zoomowaniem układu.",
                en: "A demo with point generation, function fitting, panning and zooming.",
            },
            role: {
                pl: "Implementacja matematyki, renderingu i obsługi interakcji.",
                en: "Implementation of the math, rendering and interaction handling.",
            },
            architecture: {
                pl: "Canvas renderuje układ i wynik regresji, a logika dopasowania aktualizuje parametry funkcji.",
                en: "Canvas renders the coordinate system and regression result while fitting logic updates function parameters.",
            },
            hardParts: [
                {pl: "Stabilizacja wizualizacji podczas interakcji.", en: "Keeping the visualisation stable during interaction."},
                {pl: "Przekładanie abstrakcyjnej matematyki na czytelne demo.", en: "Turning abstract math into a readable demo."},
            ],
            proves: [
                {pl: "Potrafię budować narzędzia edukacyjne i eksperymentalne.", en: "I can build educational and experimental tools."},
            ],
            note: withoutAiNote,
        },
        links: [
            {type: "demo", label: {pl: "Demo", en: "Demo"}, value: "parametricregression.dawidbartczak.dev", href: "https://parametricregression.dawidbartczak.dev"},
            {type: "source", label: {pl: "Kod źródłowy", en: "Source code"}, value: "github.com/dawidbartczak/parametric-regression", href: "https://github.com/dawidbartczak/parametric-regression"},
        ],
    },
    {
        id: "biteback",
        title: "BiteBack",
        year: "2026",
        category: {pl: "Aplikacja mobilna", en: "Mobile app"},
        era: "without-ai",
        description: {
            pl: "Aplikacja mobilna z konkursu programistycznego wspierająca ograniczanie marnowania jedzenia.",
            en: "A coding-competition mobile app helping reduce food waste.",
        },
        thumbnailPath: "/images/thumbnails/biteback.png",
        tags: ["Mobile", "React Native", "Product"],
        stack: ["TypeScript", "React Native"],
        role: {
            pl: "Współtworzenie aplikacji mobilnej i flow użytkownika.",
            en: "Co-building the mobile app and user flow.",
        },
        proofPoints: [
            {pl: "Pokazuje pracę nad produktem z realnym problemem społecznym.", en: "Shows work on a product with a real-world social problem."},
            {pl: "Dodaje do portfolio zakres mobile.", en: "Adds mobile scope to the portfolio."},
        ],
        caseStudy: {
            problem: {
                pl: "Marnowanie jedzenia często zaczyna się od braku kontroli nad tym, co jest w lodówce i kiedy traci ważność.",
                en: "Food waste often starts with losing track of what is in the fridge and when it expires.",
            },
            built: {
                pl: "Aplikacja mobilna pomagająca rozsądniej zarządzać produktami spożywczymi.",
                en: "A mobile app that helps manage food products more intentionally.",
            },
            role: {
                pl: "Praca nad produktem konkursowym, UI i funkcjami aplikacji.",
                en: "Work on the competition product, UI and application features.",
            },
            architecture: {
                pl: "Aplikacja skupia się na szybkim flow użytkownika i praktycznym zastosowaniu na telefonie.",
                en: "The app focuses on a fast user flow and practical mobile use.",
            },
            hardParts: [
                {pl: "Zamiana problemu konkursowego na zrozumiały produkt.", en: "Turning a competition problem into a clear product."},
                {pl: "Projektowanie pod mobile constraints.", en: "Designing for mobile constraints."},
            ],
            proves: [
                {pl: "Potrafię pracować poza webem i myśleć produktowo.", en: "I can work beyond the web and think product-first."},
            ],
            note: withoutAiNote,
        },
        links: [
            {type: "source", label: {pl: "Kod źródłowy", en: "Source code"}, value: "github.com/qczer/biteback", href: "https://github.com/qczer/biteback"},
        ],
    },
    {
        id: "crimsontokenizer",
        title: "Crimson Tokenizer",
        year: "2025",
        category: {pl: "NLP tooling", en: "NLP tooling"},
        era: "without-ai",
        description: {
            pl: "Tokenizator BPE trenowany na korpusie polskich tekstów datasetu SpeakLeash.",
            en: "A BPE tokenizer trained on a Polish text corpus from SpeakLeash.",
        },
        thumbnailPath: "/images/thumbnails/crimsontokenizer.png",
        tags: ["BPE", "Tokenizer", "Polish NLP"],
        stack: ["Python", "NLP"],
        role: {
            pl: "Eksperyment z tokenizacją i przygotowaniem danych językowych.",
            en: "Experimenting with tokenisation and language data preparation.",
        },
        proofPoints: [
            {pl: "Pokazuje zainteresowanie fundamentami modeli językowych.", en: "Shows interest in language-model foundations."},
            {pl: "Dotyka problemu polskiego języka w NLP.", en: "Touches the problem of Polish-language NLP."},
        ],
        caseStudy: {
            problem: {
                pl: "Modele językowe zaczynają się od danych i tokenizacji. Chciałem zrozumieć ten etap praktycznie.",
                en: "Language models start with data and tokenisation. I wanted to understand this stage practically.",
            },
            built: {
                pl: "Tokenizator BPE trenowany na polskim korpusie tekstowym.",
                en: "A BPE tokenizer trained on a Polish text corpus.",
            },
            role: {
                pl: "Przygotowanie eksperymentu i praca z mechaniką tokenizacji.",
                en: "Preparing the experiment and working with tokenisation mechanics.",
            },
            architecture: {
                pl: "Projekt skupia się na etapie przygotowania reprezentacji tekstu, który poprzedza trening modeli.",
                en: "The project focuses on text representation preparation before model training.",
            },
            hardParts: [
                {pl: "Praca z korpusem tekstowym i polskim językiem.", en: "Working with a text corpus and Polish language."},
                {pl: "Zrozumienie BPE jako mechanizmu, nie buzzwordu.", en: "Understanding BPE as a mechanism, not a buzzword."},
            ],
            proves: [
                {pl: "Rozumiem, że AI/ML to nie tylko gotowe API.", en: "I understand that AI/ML is not only a ready-made API."},
            ],
            note: withoutAiNote,
        },
        links: [
            {type: "source", label: {pl: "Kod źródłowy", en: "Source code"}, value: "github.com/dawidbartczak/crimson-tokenizer", href: "https://github.com/dawidbartczak/crimson-tokenizer"},
        ],
    },
] satisfies Project[];

export const featuredProjects = projects.filter((project) => project.featured);
export const withoutAiProjects = projects.filter((project) => project.era === "without-ai");

export function getProject(id: string) {
    return projects.find((project) => project.id === id);
}
