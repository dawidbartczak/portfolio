"use client";

import Image from "next/image";
import Link from "next/link";
import {
    type LucideIcon,
    AppWindow,
    Bot,
    Boxes,
    BrainCircuit,
    ChevronDown,
    Compass,
    Code2,
    GitBranch,
    Layers3,
    Rocket,
    Server,
    Sparkles,
} from "lucide-react";
import {Fragment, type MouseEvent, useEffect, useMemo, useRef, useState} from "react";
import {
    Code,
    Github,
    Mail,
    Moon,
    Play,
    Sun,
} from "@/icons";
import {contact, localeNames, siteCopy, text} from "@/content/site";
import {featuredProjects, withoutAiProjects} from "@/content/projects";
import {useReveal} from "@/hooks/useReveal";
import {useThemePreference, type ThemePreference} from "@/hooks/useThemePreference";
import type {Locale, Project, ProjectLink} from "@/types/project";
import styles from "./PortfolioLanding.module.scss";

const linkIcons = {
    demo: Play,
    source: Code,
    "case-study": Code,
};

const themeIcons = {
    dark: Moon,
    light: Sun,
};

const offerIcons = [Rocket, Bot, BrainCircuit];
const aiIcons = [Compass, Boxes, Sparkles];
const processIcons = [Compass, Layers3, Code2, GitBranch, Rocket];
const proofIcons = [Compass, Github, Boxes, Sparkles];
const techIcons = [AppWindow, Layers3, Server, BrainCircuit];

const capabilityItems = [
    {label: "Full-stack", Icon: Layers3},
    {label: "ML/NLP", Icon: BrainCircuit},
    {label: "Desktop", Icon: AppWindow},
    {label: "Automation", Icon: Bot},
];

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type IconComponent = LucideIcon | typeof Code | typeof Github;

function IconGlyph({Icon, className}: { Icon: IconComponent; className: string }) {
    return <Icon className={className}/>;
}

function ProjectGlyph({project, className}: { project: Project; className: string }) {
    if (project.tags.some((tag) => ["OCR", "NER", "LLM", "NLP", "Tokenizer"].includes(tag))) {
        return <BrainCircuit className={className}/>;
    }

    if (project.tags.some((tag) => ["Mobile", "React Native", "Desktop", "Tauri"].includes(tag))) {
        return <AppWindow className={className}/>;
    }

    if (project.tags.some((tag) => ["Canvas", "Graphics", "Regression"].includes(tag))) {
        return <Boxes className={className}/>;
    }

    return <Code2 className={className}/>;
}

function ProjectLinks({links, locale}: { links: ProjectLink[]; locale: Locale }) {
    return (
        <div className={styles.links}>
            {links.map((link) => {
                const Icon = linkIcons[link.type];

                return (
                    <a className={styles.inlineLink} href={link.href} key={`${link.type}-${link.href}`} rel="noreferrer" target="_blank">
                        <Icon className={styles.inlineIcon}/>
                        <span>{text(link.label, locale)}</span>
                    </a>
                );
            })}
        </div>
    );
}

function FeaturedCard({project, locale}: { project: Project; locale: Locale }) {
    const cardLinks = project.id === "paragon-pipeline" ? project.links : project.links.slice(0, 2);

    return (
        <article className={cx(styles.glassPanel, styles.featuredCard, styles.interactiveCard)} data-reveal>
            <div className={styles.panelContent}>
                <div className={styles.featuredMedia}>
                    {project.thumbnailPath && (
                        <Image
                            alt=""
                            className={styles.projectImage}
                            height={400}
                            src={project.thumbnailPath}
                            unoptimized
                            width={640}
                        />
                    )}
                </div>

                <div className={styles.featuredBody}>
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>
                            <ProjectGlyph className={styles.metaIcon} project={project}/>
                            <span>{project.featuredLabel ? text(project.featuredLabel, locale) : text(project.category, locale)}</span>
                        </span>
                        <span>{project.year}</span>
                    </div>

                    <h3>{project.title}</h3>
                    <p>{text(project.description, locale)}</p>

                    <ul className={styles.proofList}>
                        {project.proofPoints.slice(0, 3).map((point) => (
                            <li key={text(point, locale)}>{text(point, locale)}</li>
                        ))}
                    </ul>

                    <div className={styles.cardFooter}>
                        <Link className={styles.caseStudyLink} href={`/projects/${project.id}`}>
                            <span>{locale === "pl" ? "Case study" : "Case study"}</span>
                        </Link>
                        <ProjectLinks links={cardLinks} locale={locale}/>
                    </div>
                </div>
            </div>
        </article>
    );
}

function ArchiveCard({project, locale}: { project: Project; locale: Locale }) {
    const cardLinks = project.id === "paragon-pipeline"
        ? project.links.filter((link) => text(link.label, locale) === "ParagonPIE")
        : project.links.slice(0, 1);

    return (
        <article className={cx(styles.glassPanel, styles.archiveCard, styles.interactiveCard)} data-reveal id={`project-${project.id}`}>
            <div className={styles.panelContent}>
                <div className={styles.archiveHeader}>
                    <div>
                        <span className={styles.archiveCategory}>
                            <ProjectGlyph className={styles.badgeIcon} project={project}/>
                            <span>{text(project.category, locale)}</span>
                        </span>
                        <h3>{project.title}</h3>
                    </div>
                    <span className={styles.eraBadge}>{locale === "pl" ? "Bez AI" : "Without AI"}</span>
                </div>

                <p>{text(project.description, locale)}</p>

                <div className={styles.tagList}>
                    {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>

                <div className={styles.archiveActions}>
                    <Link className={styles.textLink} href={`/projects/${project.id}`}>
                        {locale === "pl" ? "Zobacz szczegóły" : "View details"}
                    </Link>
                    <ProjectLinks links={cardLinks} locale={locale}/>
                </div>
            </div>
        </article>
    );
}

export default function PortfolioLanding() {
    const [locale, setLocale] = useState<Locale>("pl");
    const [theme, setTheme] = useThemePreference();
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollFrameRef = useRef<number | null>(null);
    const t = useMemo(() => (value: {pl: string; en: string}) => text(value, locale), [locale]);

    useReveal();

    useEffect(() => {
        const updateScrollState = () => {
            scrollFrameRef.current = null;
            setIsScrolled(window.scrollY > 12);
        };

        const handleScroll = () => {
            if (scrollFrameRef.current !== null) {
                return;
            }

            scrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
        };

        updateScrollState();
        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (scrollFrameRef.current !== null) {
                window.cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    const handleScrollCue = (event: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById("proof");

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <main className={cx(styles.page, styles.revealReady)}>
            <nav className={cx(styles.nav, isScrolled && styles.navScrolled)} aria-label="Primary">
                <a href="#top" className={styles.brand}>Dawid Bartczak</a>
                <div className={styles.navLinks}>
                    <a href="#offer">{t(siteCopy.nav.offer)}</a>
                    <a href="#work">{t(siteCopy.nav.work)}</a>
                    <a href="#process">{t(siteCopy.nav.process)}</a>
                    <a href="#contact">{t(siteCopy.nav.contact)}</a>
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

            <section className={cx(styles.hero, styles.glassPanel)} id="top" data-reveal>
                <div className={styles.panelContent}>
                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>{t(siteCopy.hero.eyebrow)}</p>
                        <h1>{t(siteCopy.hero.title)}</h1>
                        <p className={styles.heroLead}>{t(siteCopy.hero.lead)}</p>
                        <div className={styles.heroActions}>
                            <a className={styles.primaryButton} href="#work">{t(siteCopy.hero.primaryCta)}</a>
                            <a className={styles.secondaryButton} href={contact.mailto}>
                                <Mail className={styles.buttonIcon}/>
                                <span>{t(siteCopy.hero.secondaryCta)}</span>
                            </a>
                        </div>
                    </div>

                    <aside className={cx(styles.heroAside, styles.interactiveCard)}>
                        <div className={styles.heroStatusRow}>
                            <span className={styles.statusDot}/>
                            <span>{t(siteCopy.hero.status)}</span>
                        </div>
                        <div className={styles.deliveryMap} aria-label={locale === "pl" ? "Proces dostarczania" : "Delivery process"}>
                            {siteCopy.hero.asideSteps.map((step, index) => (
                                <Fragment key={t(step)}>
                                    <div className={styles.deliveryStep}>
                                        <span className={styles.deliveryIndex}>{String(index + 1).padStart(2, "0")}</span>
                                        <strong>{t(step)}</strong>
                                    </div>
                                    {index < siteCopy.hero.asideSteps.length - 1 && (
                                        <span className={styles.deliveryArrow} aria-hidden="true">→</span>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        <p className={styles.heroAsideLead}>{t(siteCopy.hero.asideLead)}</p>
                        <div className={styles.heroStack}>
                            {capabilityItems.map(({label, Icon}) => (
                                <span key={label}>
                                    <IconGlyph Icon={Icon} className={styles.stackIcon}/>
                                    <em>{label}</em>
                                </span>
                            ))}
                        </div>
                    </aside>
                </div>

                <a
                    aria-label={locale === "pl" ? "Przewiń do kolejnej sekcji" : "Scroll to the next section"}
                    className={styles.scrollCue}
                    href="#proof"
                    onClick={handleScrollCue}
                >
                    <ChevronDown aria-hidden="true" className={styles.scrollCueIcon}/>
                </a>
            </section>

            <section className={styles.proofStrip} id="proof" aria-label="Proof points">
                {siteCopy.proof.map((item, index) => {
                    return (
                    <div className={cx(styles.glassPanel, styles.proofItem, styles.interactiveCard)} data-reveal key={item.value}>
                        <div className={styles.panelContent}>
                            <span className={styles.proofIcon}>
                                <IconGlyph Icon={proofIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                            </span>
                            <strong>{item.value}</strong>
                            <span>{t(item.label)}</span>
                        </div>
                    </div>
                    );
                })}
            </section>

            <section className={styles.section} id="offer">
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.offer.eyebrow)}</p>
                    <h2>{t(siteCopy.offer.title)}</h2>
                    <p>{t(siteCopy.offer.lead)}</p>
                </div>
                <div className={styles.offerGrid}>
                    {siteCopy.offer.items.map((item, index) => {
                        return (
                        <article className={cx(styles.glassPanel, styles.offerCard, styles.interactiveCard)} data-reveal key={t(item.title)}>
                            <div className={styles.panelContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.iconBadge}>
                                        <IconGlyph Icon={offerIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                    </span>
                                    <h3>{t(item.title)}</h3>
                                </div>
                                <p>{t(item.text)}</p>
                            </div>
                        </article>
                        );
                    })}
                </div>
            </section>

            <section className={styles.section} id="work">
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.featured.eyebrow)}</p>
                    <h2>{t(siteCopy.featured.title)}</h2>
                    <p>{t(siteCopy.featured.lead)}</p>
                </div>
                <div className={styles.featuredGrid}>
                    {featuredProjects.map((project) => (
                        <FeaturedCard key={project.id} locale={locale} project={project}/>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.withoutAi.eyebrow)}</p>
                    <h2>{t(siteCopy.withoutAi.title)}</h2>
                    <p>{t(siteCopy.withoutAi.lead)}</p>
                </div>
                <div className={styles.archiveGrid}>
                    {withoutAiProjects.map((project) => (
                        <ArchiveCard key={project.id} locale={locale} project={project}/>
                    ))}
                </div>
            </section>

            <section className={cx(styles.section, styles.aiSection)}>
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.aiWorkflow.eyebrow)}</p>
                    <h2>{t(siteCopy.aiWorkflow.title)}</h2>
                    <p>{t(siteCopy.aiWorkflow.lead)}</p>
                </div>
                <div className={styles.aiGrid}>
                    {siteCopy.aiWorkflow.items.map((item, index) => {
                        return (
                        <article className={cx(styles.glassPanel, styles.aiCard, styles.interactiveCard)} data-reveal key={t(item.title)}>
                            <div className={styles.panelContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.iconBadge}>
                                        <IconGlyph Icon={aiIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                    </span>
                                    <h3>{t(item.title)}</h3>
                                </div>
                                <p>{t(item.text)}</p>
                            </div>
                        </article>
                        );
                    })}
                </div>
            </section>

            <section className={styles.section} id="process">
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.process.eyebrow)}</p>
                    <h2>{t(siteCopy.process.title)}</h2>
                </div>
                <div className={styles.processGrid}>
                    {siteCopy.process.steps.map((step, index) => {
                        return (
                        <article className={cx(styles.glassPanel, styles.processCard, styles.interactiveCard)} data-reveal key={t(step.name)}>
                            <div className={styles.panelContent}>
                                <div className={styles.processMeta}>
                                    <span className={styles.processNumber}>{String(index + 1).padStart(2, "0")}</span>
                                    <span className={styles.iconBadge}>
                                        <IconGlyph Icon={processIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                    </span>
                                </div>
                                <h3>{t(step.name)}</h3>
                                <p>{t(step.text)}</p>
                            </div>
                        </article>
                        );
                    })}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.tech.eyebrow)}</p>
                    <h2>{t(siteCopy.tech.title)}</h2>
                </div>
                <div className={styles.techGrid}>
                    {siteCopy.tech.groups.map((group, index) => {
                        return (
                        <article className={cx(styles.glassPanel, styles.techCard, styles.interactiveCard)} data-reveal key={group.name}>
                            <div className={styles.panelContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.iconBadge}>
                                        <IconGlyph Icon={techIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                    </span>
                                    <h3>{group.name}</h3>
                                </div>
                                <div className={styles.tagList}>
                                    {group.items.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                        );
                    })}
                </div>
            </section>

            <section className={cx(styles.contactSection, styles.glassPanel, styles.interactiveCard)} data-reveal id="contact">
                <div className={styles.panelContent}>
                    <p className={styles.eyebrow}>{t(siteCopy.contact.eyebrow)}</p>
                    <h2>{t(siteCopy.contact.title)}</h2>
                    <p>{t(siteCopy.contact.lead)}</p>
                    <div className={styles.contactActions}>
                        <a className={styles.primaryButton} href={contact.mailto}>
                            <Mail className={styles.buttonIcon}/>
                            <span>{t(siteCopy.contact.emailLabel)}</span>
                        </a>
                        <a className={styles.secondaryButton} href={contact.github} rel="noreferrer" target="_blank">
                            <Github className={styles.buttonIcon}/>
                            <span>{t(siteCopy.contact.githubLabel)}</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
