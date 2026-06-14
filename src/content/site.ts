import type { LocalizedText } from "@/types/project";

export const contact = {
    github: "https://github.com/dawidbartczak",
    githubLabel: "github.com/dawidbartczak",
    email: "pluton.radiated378@passfwd.com",
    mailto: "mailto:pluton.radiated378@passfwd.com",
};

export const localeNames = {
    pl: "PL",
    en: "EN",
};

export const siteCopy = {
    nav: {
        offer: {pl: "Oferta", en: "Offer"},
        work: {pl: "Projekty", en: "Work"},
        process: {pl: "Proces", en: "Process"},
        contact: {pl: "Kontakt", en: "Contact"},
    },
    hero: {
        eyebrow: {
            pl: "Freelance / contract software delivery",
            en: "Freelance / contract software delivery",
        },
        title: {
            pl: "Dawid Bartczak. End‑to‑end MVP builder.",
            en: "Dawid Bartczak. End‑to‑end MVP builder.",
        },
        lead: {
            pl: "Jestem Dawid Bartczak. Łączę full-stack, aplikacje desktop/mobile, automatyzacje oraz ML/NLP, żeby zamieniać niejasne problemy w działające systemy. Moje starsze projekty powstały ręcznie, przed powszechnym AI-assisted codingiem. Dziś używam AI jako mnożnika produktywności, bez oddawania mu decyzji inżynierskich.",
            en: "I am Dawid Bartczak. I combine full-stack, desktop/mobile apps, automation and ML/NLP to turn ambiguous problems into working systems. My older projects were hand-built before AI-assisted coding became common. Today I use AI as a productivity multiplier without outsourcing engineering judgement.",
        },
        primaryCta: {pl: "Zobacz projekty", en: "View work"},
        secondaryCta: {pl: "Napisz do mnie", en: "Contact me"},
        status: {pl: "Dostępny na projekty freelance/contract", en: "Available for freelance/contract projects"},
        asideTitle: {pl: "Brief → MVP → deploy", en: "Brief → MVP → deploy"},
        asideLead: {
            pl: "Jeden wykonawca do produktu, kodu i technicznego dowiezienia pierwszej wersji.",
            en: "One builder for product, code and technical delivery of the first working version.",
        },
        asideSteps: [
            {pl: "Brief", en: "Brief"},
            {pl: "MVP", en: "MVP"},
            {pl: "Deploy", en: "Deploy"},
        ],
    },
    proof: [
        {value: "6+", label: {pl: "lat samodzielnego budowania projektów", en: "years building projects independently"}},
        {value: "9", label: {pl: "publicznych repozytoriów jako dowód pracy", en: "public repositories as work proof"}},
        {value: "4", label: {pl: "obszary: web, desktop, mobile, ML/NLP", en: "areas: web, desktop, mobile, ML/NLP"}},
        {value: "AI+", label: {pl: "AI jako mnożnik, nie zamiennik myślenia", en: "AI as multiplier, not a thinking replacement"}},
    ],
    offer: {
        eyebrow: {pl: "Co możesz mi zlecić", en: "What you can hire me for"},
        title: {pl: "End-to-end MVP bez przerzucania odpowiedzialności między ludźmi.", en: "End-to-end MVP work without bouncing responsibility between people."},
        lead: {
            pl: "Najlepiej działam tam, gdzie trzeba szybko zrozumieć problem, zaprojektować sensowną architekturę i zbudować działającą wersję produktu.",
            en: "I work best where someone needs to quickly understand the problem, design a sensible architecture and build a working product version.",
        },
        items: [
            {
                title: {pl: "MVP i aplikacje webowe", en: "MVPs and web apps"},
                text: {pl: "Landing, panel, dashboard, backend, integracje, prototyp produktu i pierwsza wersja gotowa do testów.", en: "Landing pages, panels, dashboards, backend, integrations, product prototypes and first testable versions."},
            },
            {
                title: {pl: "Narzędzia i automatyzacje", en: "Tools and automation"},
                text: {pl: "Skrypty, boty, workflow, narzędzia wewnętrzne i małe systemy, które oszczędzają czas zespołu.", en: "Scripts, bots, workflows, internal tools and small systems that save team time."},
            },
            {
                title: {pl: "Prototypy ML / NLP", en: "ML / NLP prototypes"},
                text: {pl: "Eksperymenty z tekstem, OCR, klasyfikacją, modelami i pipeline'ami, gdy klasyczny CRUD nie wystarcza.", en: "Experiments with text, OCR, classification, models and pipelines when classic CRUD is not enough."},
            },
        ],
    },
    featured: {
        eyebrow: {pl: "Wybrane case studies", en: "Featured case studies"},
        title: {pl: "Dowody, nie deklaracje.", en: "Proof, not declarations."},
        lead: {
            pl: "Te projekty pokazują trzy różne rodzaje dowożenia: produkt desktopowy, pipeline ML i full-stackowy eksperyment NLP.",
            en: "These projects show three different delivery modes: a desktop product, an ML pipeline and a full-stack NLP experiment.",
        },
    },
    withoutAi: {
        eyebrow: {pl: "Projekty bez AI", en: "Projects built without AI"},
        title: {pl: "Ręcznie zbudowany fundament problem solvingu.", en: "A hand-built foundation of problem solving."},
        lead: {
            pl: "Obecne projekty traktuję jako dowód samodzielnego rozumienia technologii. AI nie pisało ich za mnie. To ważne, bo dziś mogę używać AI szybciej, mając własny fundament.",
            en: "I treat the current projects as proof of independent technical understanding. AI did not build them for me. That matters because I can now use AI faster on top of my own foundation.",
        },
    },
    aiWorkflow: {
        eyebrow: {pl: "Wspierane AI", en: "AI-assisted workflow"},
        title: {pl: "AI przyspiesza proces, ale decyzje zostają po stronie inżyniera.", en: "AI speeds up the process, but engineering decisions stay human."},
        lead: {
            pl: "Nie sprzedaję AI jako magii. Używam go jak senior używa dobrych narzędzi: do researchu, wariantów architektury, refaktoru, testów, dokumentacji i szybszego sprawdzania hipotez.",
            en: "I do not sell AI as magic. I use it like a strong engineer uses strong tools: for research, architecture variants, refactors, tests, documentation and faster hypothesis checking.",
        },
        items: [
            {title: {pl: "Szybszy research", en: "Faster research"}, text: {pl: "Porównanie bibliotek, API, ograniczeń hostingu i edge-case'ów przed implementacją.", en: "Comparing libraries, APIs, hosting constraints and edge cases before implementation."}},
            {title: {pl: "Lepszy refactor", en: "Better refactors"}, text: {pl: "Używam AI do generowania wariantów, ale finalny wybór opieram o czytelność, ryzyko i testy.", en: "I use AI to generate options, but final choices are based on readability, risk and tests."}},
            {title: {pl: "Więcej testów i dokumentacji", en: "More tests and docs"}, text: {pl: "AI pomaga szybciej opisać scenariusze, przypadki brzegowe i instrukcje wdrożenia.", en: "AI helps describe scenarios, edge cases and deployment instructions faster."}},
        ],
    },
    process: {
        eyebrow: {pl: "Proces", en: "Process"},
        title: {pl: "Od chaosu do działającej wersji.", en: "From chaos to a working version."},
        steps: [
            {name: {pl: "Discovery", en: "Discovery"}, text: {pl: "Ustalam problem, użytkownika, ograniczenia i minimalny zakres MVP.", en: "I define the problem, user, constraints and minimum MVP scope."}},
            {name: {pl: "Architektura", en: "Architecture"}, text: {pl: "Rozbijam system na moduły, dane, interfejsy i ryzyka techniczne.", en: "I split the system into modules, data, interfaces and technical risks."}},
            {name: {pl: "Build", en: "Build"}, text: {pl: "Buduję pionowy slice produktu, potem dokładam funkcje według wartości.", en: "I build a vertical slice first, then add features by value."}},
            {name: {pl: "Iteracja", en: "Iteration"}, text: {pl: "Testuję, upraszczam, poprawiam UX i usuwam kruche fragmenty.", en: "I test, simplify, improve UX and remove fragile parts."}},
            {name: {pl: "Deploy", en: "Deploy"}, text: {pl: "Przygotowuję build, Docker/hosting i instrukcje dalszego utrzymania.", en: "I prepare the build, Docker/hosting and maintainability notes."}},
        ],
    },
    collaboration: {
        eyebrow: {pl: "Start współpracy", en: "Working together"},
        title: {pl: "Nie potrzebuję idealnej specyfikacji. Potrzebuję jasnego problemu do dowiezienia.", en: "I do not need a perfect spec. I need a clear problem to ship."},
        lead: {
            pl: "Najlepsze zlecenia zaczynają się od krótkiego briefu, szybkiego uporządkowania ryzyk i pierwszego pionowego slice'u produktu. Dzięki temu szybko widać, czy rozwiązanie ma sens techniczny i biznesowy.",
            en: "The best projects start with a short brief, fast risk mapping and the first vertical slice of the product. That makes technical and business fit visible quickly.",
        },
        tracks: [
            {
                title: {pl: "Sprint prototypowy", en: "Prototype sprint"},
                label: {pl: "1-2 tygodnie", en: "1-2 weeks"},
                text: {
                    pl: "Szybko sprawdzamy najtrudniejszą część: integrację, workflow, model, OCR, UX albo automatyzację.",
                    en: "We quickly validate the hardest part: integration, workflow, model, OCR, UX or automation.",
                },
            },
            {
                title: {pl: "MVP od zera", en: "MVP from zero"},
                label: {pl: "produkt + kod", en: "product + code"},
                text: {
                    pl: "Buduję pierwszy działający zakres: UI, logikę, backend, deployment i podstawową dokumentację.",
                    en: "I build the first working scope: UI, logic, backend, deployment and basic documentation.",
                },
            },
            {
                title: {pl: "Techniczne uporządkowanie", en: "Technical rescue"},
                label: {pl: "refactor / deploy", en: "refactor / deploy"},
                text: {
                    pl: "Pomagam zamienić eksperyment albo chaotyczny kod w stabilniejszą wersję gotową do testów i dalszego rozwoju.",
                    en: "I help turn an experiment or chaotic codebase into a more stable version ready for testing and further work.",
                },
            },
        ],
        deliverablesTitle: {pl: "Co dostajesz po drodze", en: "What you get along the way"},
        deliverables: [
            {title: {pl: "Repozytorium i decyzje", en: "Repository and decisions"}, text: {pl: "Kod, struktura projektu i krótkie wyjaśnienia najważniejszych wyborów technicznych.", en: "Code, project structure and short explanations of the most important technical choices."}},
            {title: {pl: "Działający deploy", en: "Working deploy"}, text: {pl: "Build, środowisko, hosting/Docker tam, gdzie ma to sens, oraz instrukcje utrzymania.", en: "Build, environment, hosting/Docker where it makes sense, plus maintainability notes."}},
            {title: {pl: "Następne kroki", en: "Next steps"}, text: {pl: "Lista ryzyk, uproszczeń i funkcji, które warto dodać po pierwszej wersji.", en: "A list of risks, trade-offs and features worth adding after the first version."}},
        ],
    },
    tech: {
        eyebrow: {pl: "Zakres techniczny", en: "Technical range"},
        title: {pl: "Szeroko, ale spięte jednym celem: dowieźć produkt.", en: "Broad, but tied to one goal: ship the product."},
        groups: [
            {name: "Frontend", items: ["Next.js", "React", "TypeScript", "SCSS", "UX systems"]},
            {name: "Apps", items: ["Tauri", "React Native", "Desktop tools", "Mobile prototypes"]},
            {name: "Backend / DevOps", items: ["Node.js", "APIs", "Docker", "Linux hosting", "GitHub"]},
            {name: "ML / CS", items: ["NLP", "OCR", "NER", "Tokenization", "Canvas", "Regression"]},
        ],
    },
    contact: {
        eyebrow: {pl: "Kontakt", en: "Contact"},
        title: {pl: "Masz problem, który trzeba zamienić w działający produkt?", en: "Have a problem that needs to become a working product?"},
        lead: {
            pl: "Napisz krótko, co chcesz zbudować, jaki jest cel biznesowy i czy potrzebujesz MVP, prototypu, automatyzacji czy konsultacji technicznej.",
            en: "Send a short note about what you want to build, the business goal and whether you need an MVP, prototype, automation or technical consultation.",
        },
        emailLabel: {pl: "Napisz email", en: "Email me"},
        githubLabel: {pl: "Zobacz GitHub", en: "View GitHub"},
        metaItems: [
            {
                label: {pl: "Dostępność", en: "Availability"},
                value: {pl: "freelance / contract", en: "freelance / contract"},
            },
            {
                label: {pl: "Zakres", en: "Scope"},
                value: {pl: "MVP, prototyp, automatyzacja", en: "MVP, prototype, automation"},
            },
            {
                label: {pl: "Start", en: "Start"},
                value: {pl: "brief → plan → pierwszy zakres", en: "brief → plan → first slice"},
            },
        ],
        briefTitle: {pl: "W pierwszej wiadomości wystarczy:", en: "For the first message, send:"},
        briefItems: [
            {pl: "co chcesz zbudować lub usprawnić", en: "what you want to build or improve"},
            {pl: "jaki problem biznesowy ma to rozwiązać", en: "what business problem it should solve"},
            {pl: "czy ważniejszy jest szybki MVP, prototyp czy konsultacja", en: "whether you need a fast MVP, prototype or consultation"},
        ],
    },
} satisfies Record<string, unknown>;

export function text(value: LocalizedText, locale: "pl" | "en") {
    return value[locale];
}
