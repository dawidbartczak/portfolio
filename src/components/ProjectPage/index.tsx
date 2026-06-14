"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    AppWindow,
    BrainCircuit,
    ExternalLink,
    FileText,
    GitBranch,
    Layers3,
    Lightbulb,
    Rocket,
    ShieldCheck,
    Sparkles,
    Target,
    Trophy,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import {useMemo, useState} from "react";
import {Code, Mail, Moon, Play, Sun} from "@/icons";
import {contact, localeNames, text} from "@/content/site";
import {useReveal} from "@/hooks/useReveal";
import {useThemePreference, type ThemePreference} from "@/hooks/useThemePreference";
import type {Locale, LocalizedText, Project, ProjectLink} from "@/types/project";
import styles from "./ProjectPage.module.scss";

type ProjectPageProps = {
    project: Project;
};

type StoryItem = {
    eyebrow: LocalizedText;
    icon: LucideIcon;
    id: string;
    text: LocalizedText;
    title: LocalizedText;
};

const linkIcons = {
    demo: Play,
    source: Code,
    "case-study": Code,
};

const themeIcons = {
    dark: Moon,
    light: Sun,
};

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function eraLabel(project: Project, locale: Locale) {
    if (project.era === "without-ai") {
        return locale === "pl" ? "Bez AI" : "Without AI";
    }

    return locale === "pl" ? "Wspierane AI" : "AI-assisted";
}

function repoLabel(project: Project, locale: Locale) {
    const sourceCount = project.links.filter((link) => link.type === "source").length;
    const demoCount = project.links.filter((link) => link.type === "demo").length;

    if (sourceCount > 0 && demoCount > 0) {
        return locale === "pl" ? "Kod + demo" : "Code + demo";
    }

    if (sourceCount > 1) {
        return locale === "pl" ? `${sourceCount} repo` : `${sourceCount} repos`;
    }

    if (sourceCount === 1) {
        return locale === "pl" ? "Publiczny kod" : "Public code";
    }

    return locale === "pl" ? "Demo" : "Demo";
}

function ProjectLinks({links, locale}: { links: ProjectLink[]; locale: Locale }) {
    return (
        <div className={styles.links}>
            {links.map((link) => {
                const Icon = linkIcons[link.type];

                return (
                    <a href={link.href} key={`${link.type}-${link.href}`} rel="noreferrer" target="_blank">
                        <Icon className={styles.icon}/>
                        <span>{text(link.label, locale)}</span>
                        <ExternalLink className={styles.externalIcon}/>
                    </a>
                );
            })}
        </div>
    );
}

export default function ProjectPage({project}: ProjectPageProps) {
    const [locale, setLocale] = useState<Locale>("pl");
    const [theme, setTheme] = useThemePreference();
    const t = useMemo(() => (value: LocalizedText) => text(value, locale), [locale]);

    useReveal();

    const projectMode = project.featuredLabel ? t(project.featuredLabel) : t(project.category);
    const hireFit = project.caseStudy.hireFit;
    const primaryProof = project.caseStudy.proves[0] ?? project.proofPoints[0] ?? project.role;
    const clientSignal = hireFit?.items[0];
    const storyItems: StoryItem[] = [
        {
            eyebrow: {pl: "01 / Kontekst", en: "01 / Context"},
            icon: Target,
            id: "problem",
            text: project.caseStudy.problem,
            title: {pl: "Problem do rozwiązania", en: "Problem to solve"},
        },
        {
            eyebrow: {pl: "02 / Rozwiązanie", en: "02 / Solution"},
            icon: Rocket,
            id: "built",
            text: project.caseStudy.built,
            title: {pl: "Co zbudowałem", en: "What I built"},
        },
        {
            eyebrow: {pl: "03 / Podejście", en: "03 / Approach"},
            icon: Layers3,
            id: "architecture",
            text: project.caseStudy.architecture,
            title: {pl: "Architektura", en: "Architecture"},
        },
        {
            eyebrow: {pl: "04 / Odpowiedzialność", en: "04 / Ownership"},
            icon: GitBranch,
            id: "role",
            text: project.caseStudy.role,
            title: {pl: "Moja rola", en: "My role"},
        },
    ];

    const proofStats = [
        {
            icon: ShieldCheck,
            label: locale === "pl" ? "Era" : "Era",
            value: eraLabel(project, locale),
        },
        {
            icon: AppWindow,
            label: locale === "pl" ? "Zakres" : "Scope",
            value: projectMode,
        },
        {
            icon: Target,
            label: locale === "pl" ? "Sygnał" : "Signal",
            tone: "signal",
            value: clientSignal ? t(clientSignal) : primaryProof ? t(primaryProof) : projectMode,
        },
        {
            icon: FileText,
            label: locale === "pl" ? "Dowód" : "Proof",
            value: repoLabel(project, locale),
        },
    ];
    const deliveryLensItems: StoryItem[] = [
        {
            eyebrow: {pl: "01", en: "01"},
            icon: Target,
            id: "lens-problem",
            title: {pl: "Problem", en: "Problem"},
            text: project.caseStudy.problem,
        },
        {
            eyebrow: {pl: "02", en: "02"},
            icon: Rocket,
            id: "lens-artifact",
            title: {pl: "Artefakt", en: "Artifact"},
            text: project.caseStudy.built,
        },
        {
            eyebrow: {pl: "03", en: "03"},
            icon: GitBranch,
            id: "lens-decisions",
            title: {pl: "Decyzje", en: "Decisions"},
            text: project.caseStudy.architecture,
        },
        {
            eyebrow: {pl: "04", en: "04"},
            icon: Trophy,
            id: "lens-proof",
            title: {pl: "Dowód", en: "Proof"},
            text: primaryProof,
        },
    ];
    const clientBridgeSteps: StoryItem[] = [
        {
            eyebrow: {pl: "01 / Scope", en: "01 / Scope"},
            icon: Target,
            id: "client-scope",
            title: {pl: "Najpierw zawężam ryzyko", en: "First, narrow the risk"},
            text: {
                pl: "Wyciągam z projektu najmniejszy fragment, który naprawdę sprawdza techniczną i biznesową hipotezę.",
                en: "I extract the smallest slice that actually validates the technical and business hypothesis.",
            },
        },
        {
            eyebrow: {pl: "02 / Build", en: "02 / Build"},
            icon: Rocket,
            id: "client-build",
            title: {pl: "Potem buduję pionowy slice", en: "Then I build a vertical slice"},
            text: {
                pl: "Zamiast rozlewać pracę na dziesiątki funkcji, dowożę działającą ścieżkę od UI do danych i deploya.",
                en: "Instead of spreading work across dozens of features, I ship one working path from UI to data and deploy.",
            },
        },
        {
            eyebrow: {pl: "03 / Handoff", en: "03 / Handoff"},
            icon: GitBranch,
            id: "client-handoff",
            title: {pl: "Na końcu zostawiam dalszą drogę", en: "Finally, I leave the next path"},
            text: {
                pl: "Dostarczam kod, decyzje techniczne, ograniczenia i listę następnych kroków, żeby projekt nie kończył się na demo.",
                en: "I deliver code, technical decisions, constraints and next steps so the project does not end as a demo.",
            },
        },
    ];

    return (
        <main className={cx(styles.page, styles.revealReady)}>
            <nav className={styles.nav}>
                <div className={styles.navLinks}>
                    <Link href={`/#project-${project.id}`}>
                        <ArrowLeft className={styles.navIcon}/>
                        <span>{locale === "pl" ? "Karta projektu" : "Project card"}</span>
                    </Link>
                    <Link href="/#top">{locale === "pl" ? "Start strony" : "Page top"}</Link>
                </div>

                <div className={styles.navControls}>
                    <div className={styles.themeToggle} aria-label={locale === "pl" ? "Przełącznik motywu" : "Theme switcher"}>
                        {(["dark", "light"] as ThemePreference[]).map((item) => {
                            const Icon = themeIcons[item];
                            const label = item === "dark"
                                ? (locale === "pl" ? "Włącz ciemny motyw" : "Use dark theme")
                                : (locale === "pl" ? "Włącz jasny motyw" : "Use light theme");

                            return (
                                <button
                                    aria-label={label}
                                    aria-pressed={theme === item}
                                    className={theme === item ? styles.themeActive : undefined}
                                    key={item}
                                    onClick={() => setTheme(item)}
                                    title={label}
                                    type="button"
                                >
                                    <Icon className={styles.themeIcon}/>
                                </button>
                            );
                        })}
                    </div>
                    <div className={styles.localeToggle} aria-label="Language switcher">
                        {(["pl", "en"] as Locale[]).map((item) => (
                            <button
                                aria-pressed={locale === item}
                                className={locale === item ? styles.localeActive : undefined}
                                key={item}
                                onClick={() => setLocale(item)}
                                type="button"
                            >
                                {localeNames[item]}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <section className={cx(styles.hero, styles.glassPanel)}>
                <div className={styles.panelContent}>
                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>{projectMode} / {project.year}</p>
                        <h1>{project.title}</h1>
                        <p className={styles.lead}>{t(project.description)}</p>

                        <div className={styles.heroBadges}>
                            <span><ShieldCheck className={styles.badgeIcon}/>{eraLabel(project, locale)}</span>
                            <span><Sparkles className={styles.badgeIcon}/>{locale === "pl" ? "End-to-end delivery" : "End-to-end delivery"}</span>
                        </div>

                        <div className={styles.tags}>
                            {project.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>

                        <ProjectLinks links={project.links} locale={locale}/>
                    </div>

                    <aside className={styles.heroVisual}>
                        <div className={styles.mediaFrame}>
                            {project.thumbnailPath ? (
                                <Image
                                    alt={project.title}
                                    className={styles.projectImage}
                                    height={540}
                                    src={project.thumbnailPath}
                                    unoptimized
                                    width={860}
                                />
                            ) : (
                                <div className={styles.mediaFallback}>
                                    <BrainCircuit className={styles.fallbackIcon}/>
                                </div>
                            )}
                        </div>

                        <div className={styles.stackPanel}>
                            <div>
                                <span>{locale === "pl" ? "Rola" : "Role"}</span>
                                <strong>{projectMode}</strong>
                            </div>
                            <div>
                                <span>{locale === "pl" ? "Stack" : "Stack"}</span>
                                <strong>{project.stack.slice(0, 3).join(" / ")}</strong>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className={styles.proofStrip} aria-label={locale === "pl" ? "Szybkie fakty" : "Quick facts"}>
                {proofStats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <article className={cx(styles.glassPanel, styles.proofItem, item.tone === "signal" && styles.proofItemSignal, styles.interactiveCard)} data-reveal key={item.label}>
                            <div className={styles.panelContent}>
                                <Icon className={styles.proofIcon}/>
                                <span>{item.label}</span>
                                <strong>{item.value}</strong>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section className={cx(styles.deliveryLens, styles.glassPanel)} data-reveal>
                <div className={styles.panelContent}>
                    <div className={styles.lensHeader}>
                        <div>
                            <div className={styles.sectionKicker}>
                                <Layers3 className={styles.kickerIcon}/>
                                <span>{locale === "pl" ? "Jak czytać ten projekt" : "How to read this project"}</span>
                            </div>
                            <h2>{locale === "pl"
                                ? "Nie chodzi o sam screenshot. Chodzi o decyzje pod spodem."
                                : "It is not just the screenshot. It is the decisions underneath."}</h2>
                        </div>
                        <p>{locale === "pl"
                            ? "Ten pasek porządkuje case study pod kątem klienta: jaki był problem, co zostało dowiezione, gdzie było ryzyko i jaki sygnał daje to przy podobnym zleceniu."
                            : "This rail frames the case study for a client: the problem, the shipped artifact, the risk area and the signal it gives for similar work."}</p>
                    </div>

                    <div className={styles.lensRail}>
                        {deliveryLensItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <article className={styles.lensStep} key={item.id}>
                                    <div className={styles.lensNode}>
                                        <span>{t(item.eyebrow)}</span>
                                        <Icon className={styles.lensIcon}/>
                                    </div>
                                    <h3>{t(item.title)}</h3>
                                    <p>{t(item.text)}</p>
                                    {index < deliveryLensItems.length - 1 && <span className={styles.lensConnector} aria-hidden="true"/>}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.storySection}>
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{locale === "pl" ? "Case study" : "Case study"}</p>
                    <h2>{locale === "pl" ? "Od problemu do działającego systemu." : "From problem to working system."}</h2>
                </div>

                <div className={styles.storyGrid}>
                    {storyItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article className={cx(styles.glassPanel, styles.storyCard, styles.interactiveCard)} data-reveal key={item.id}>
                                <div className={styles.panelContent}>
                                    <div className={styles.cardTopline}>
                                        <span>{t(item.eyebrow)}</span>
                                        <Icon className={styles.cardIcon}/>
                                    </div>
                                    <h3>{t(item.title)}</h3>
                                    <p>{t(item.text)}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {(project.caseStudy.systemMap || project.caseStudy.clientValue) && (
                <section className={styles.deliveryProof}>
                    {project.caseStudy.systemMap && (
                        <article className={cx(styles.glassPanel, styles.systemMapPanel, styles.interactiveCard)} data-reveal>
                            <div className={styles.panelContent}>
                                <div className={styles.sectionKicker}>
                                    <Layers3 className={styles.kickerIcon}/>
                                    <span>{t(project.caseStudy.systemMap.eyebrow)}</span>
                                </div>
                                <h2>{t(project.caseStudy.systemMap.title)}</h2>
                                <p>{t(project.caseStudy.systemMap.lead)}</p>

                                <ol className={styles.systemSteps}>
                                    {project.caseStudy.systemMap.steps.map((step, index) => (
                                        <li key={`system-step-${index}`}>
                                            <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                                            <div>
                                                <span className={styles.stepLabel}>{t(step.label)}</span>
                                                <strong>{t(step.title)}</strong>
                                                <p>{t(step.text)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </article>
                    )}

                    {project.caseStudy.clientValue && (
                        <article className={cx(styles.glassPanel, styles.valuePanel, styles.interactiveCard)} data-reveal>
                            <div className={styles.panelContent}>
                                <div className={styles.sectionKicker}>
                                    <Sparkles className={styles.kickerIcon}/>
                                    <span>{t(project.caseStudy.clientValue.eyebrow)}</span>
                                </div>
                                <h2>{t(project.caseStudy.clientValue.title)}</h2>

                                <div className={styles.valueList}>
                                    {project.caseStudy.clientValue.items.map((item, index) => (
                                        <div className={styles.valueItem} key={`client-value-${index}`}>
                                            <ShieldCheck className={styles.valueIcon}/>
                                            <p>{t(item)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    )}
                </section>
            )}

            <section className={styles.clientBridge}>
                <article className={cx(styles.glassPanel, styles.bridgePanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <div className={styles.bridgeCopy}>
                            <div className={styles.sectionKicker}>
                                <Sparkles className={styles.kickerIcon}/>
                                <span>{locale === "pl" ? "Jak przekładam to na zlecenie" : "How this translates to client work"}</span>
                            </div>
                            <h2>{locale === "pl"
                                ? `Podobny problem dowiózłbym jako konkretny projekt, nie jako eksperyment bez końca.`
                                : `I would ship a similar problem as a concrete project, not an endless experiment.`}</h2>
                            <p>{locale === "pl"
                                ? `${project.title} jest dowodem technicznego kierunku. Dla klienta zaczynam od zakresu, który można szybko sprawdzić, wdrożyć i świadomie rozwijać.`
                                : `${project.title} is proof of technical direction. For a client, I start with a scope that can be validated, deployed and developed deliberately.`}</p>
                        </div>

                        <ol className={styles.bridgeSteps}>
                            {clientBridgeSteps.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <li key={item.id}>
                                        <div className={styles.bridgeStepMeta}>
                                            <span>{t(item.eyebrow)}</span>
                                            <Icon className={styles.bridgeStepIcon}/>
                                        </div>
                                        <div>
                                            <h3>{t(item.title)}</h3>
                                            <p>{t(item.text)}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </article>
            </section>

            <section className={styles.deepDive}>
                <article className={cx(styles.glassPanel, styles.timelinePanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <div className={styles.sectionKicker}>
                            <Wrench className={styles.kickerIcon}/>
                            <span>{locale === "pl" ? "Najtrudniejsze fragmenty" : "Hard parts"}</span>
                        </div>
                        <h2>{locale === "pl" ? "To są miejsca, gdzie projekt naprawdę testował myślenie." : "Where the project actually tested engineering judgement."}</h2>

                        <ol className={styles.timeline}>
                            {project.caseStudy.hardParts.map((item, index) => (
                                <li key={`hard-part-${index}`}>
                                    <span>{String(index + 1).padStart(2, "0")}</span>
                                    <p>{t(item)}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </article>

                <article className={cx(styles.glassPanel, styles.provesPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <div className={styles.sectionKicker}>
                            <Trophy className={styles.kickerIcon}/>
                            <span>{locale === "pl" ? "Co to udowadnia" : "What this proves"}</span>
                        </div>
                        <div className={styles.provesList}>
                            {project.caseStudy.proves.map((item, index) => (
                                <div className={styles.proveCard} key={`proves-${index}`}>
                                    <Lightbulb className={styles.proveIcon}/>
                                    <p>{t(item)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </section>

            {project.caseStudy.note && (
                <section className={styles.note} data-reveal>
                    <div className={styles.notePanel}>
                        <ShieldCheck className={styles.noteIcon}/>
                        <p>{t(project.caseStudy.note)}</p>
                    </div>
                </section>
            )}

            <section className={cx(styles.cta, styles.glassPanel, styles.interactiveCard)} data-reveal>
                <div className={styles.panelContent}>
                    <div className={styles.ctaCopy}>
                        <p className={styles.eyebrow}>{locale === "pl" ? "Następny krok" : "Next step"}</p>
                        <h2>{locale === "pl" ? "Masz podobny problem do dowiezienia?" : "Have a similar problem to ship?"}</h2>
                        <p>{locale === "pl"
                            ? "Napisz krótko, co chcesz zbudować. Najpierw uporządkuję problem, potem zaproponuję sensowną architekturę i pierwszy działający zakres."
                            : "Send a short note about what you want to build. I will first clarify the problem, then propose the architecture and the first shippable scope."}</p>
                    </div>
                    <aside className={styles.ctaFit}>
                        {hireFit && (
                            <>
                                <div className={styles.sectionKicker}>
                                    <Target className={styles.kickerIcon}/>
                                    <span>{t(hireFit.title)}</span>
                                </div>
                                <ul>
                                    {hireFit.items.map((item, index) => (
                                        <li key={`hire-fit-${index}`}>
                                            <ShieldCheck className={styles.fitIcon}/>
                                            <span>{t(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <a className={styles.mailLink} href={contact.mailto}>
                            <Mail className={styles.icon}/>
                            <span>{locale === "pl" ? "Napisz email" : "Send email"}</span>
                        </a>
                    </aside>
                </div>
            </section>
        </main>
    );
}
