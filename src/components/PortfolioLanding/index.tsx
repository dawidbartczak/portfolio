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
    Maximize2,
    Rocket,
    Server,
    Sparkles,
    X,
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

const paragonRepositorySummaryLink: ProjectLink = {
    type: "source",
    label: {pl: "Repozytoria", en: "Repositories"},
    value: "3 repo",
    href: "/projects/paragon-pipeline#project-links",
};

const themeIcons = {
    dark: Moon,
    light: Sun,
};

const offerIcons = [Rocket, Bot, BrainCircuit];
const aiIcons = [Compass, Boxes, Sparkles];
const processIcons = [Compass, Layers3, Code2, GitBranch, Rocket];
const proofIcons = [Compass, Github, Boxes, Sparkles];
const collaborationIcons = [Compass, Rocket, GitBranch];
const deliverableIcons = [Github, Server, Code2];
const techIcons = [AppWindow, Layers3, Server, BrainCircuit];
const briefIcons = [Compass, Rocket, GitBranch];
const contactMetaIcons = [Rocket, Layers3, Compass];

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
                const content = (
                    <>
                        <Icon className={styles.inlineIcon}/>
                        <span>{text(link.label, locale)}</span>
                    </>
                );

                if (link.href.startsWith("/")) {
                    return (
                        <Link className={styles.inlineLink} href={link.href} key={`${link.type}-${link.href}`}>
                            {content}
                        </Link>
                    );
                }

                return (
                    <a className={styles.inlineLink} href={link.href} key={`${link.type}-${link.href}`} rel="noreferrer" target="_blank">
                        {content}
                    </a>
                );
            })}
        </div>
    );
}

function landingProjectLinks(project: Project, limit: number) {
    if (project.id === "paragon-pipeline") {
        return [paragonRepositorySummaryLink];
    }

    return project.links.slice(0, limit);
}

function FeaturedCard({
    locale,
    onPreview,
    project,
}: {
    locale: Locale;
    onPreview: (project: Project) => void;
    project: Project;
}) {
    const cardLinks = landingProjectLinks(project, 2);

    return (
        <article className={cx(styles.glassPanel, styles.featuredCard, styles.interactiveCard)} data-reveal>
            <div className={styles.panelContent}>
                <button
                    aria-label={locale === "pl" ? `Powiększ zdjęcie projektu ${project.title}` : `Enlarge ${project.title} project image`}
                    className={styles.featuredMedia}
                    onClick={() => onPreview(project)}
                    type="button"
                >
                    {project.thumbnailPath && (
                        <Image
                            alt={project.title}
                            className={styles.projectImage}
                            height={400}
                            src={project.thumbnailPath}
                            unoptimized
                            width={640}
                        />
                    )}
                    <span className={styles.mediaHint} aria-hidden="true">
                        <Maximize2 className={styles.mediaHintIcon}/>
                    </span>
                </button>

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
                        {project.proofPoints.slice(0, 3).map((point, index) => (
                            <li key={`${project.id}-proof-${index}`}>{text(point, locale)}</li>
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
    const cardLinks = landingProjectLinks(project, 1);

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
    const [previewProject, setPreviewProject] = useState<Project | null>(null);
    const heroAsideRef = useRef<HTMLElement | null>(null);
    const scrollFrameRef = useRef<number | null>(null);
    const t = useMemo(() => (value: {pl: string; en: string}) => text(value, locale), [locale]);

    useReveal();

    useEffect(() => {
        const element = heroAsideRef.current;
        const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!element || !supportsFinePointer.matches || prefersReducedMotion.matches) {
            return undefined;
        }

        let rect = element.getBoundingClientRect();
        let frame: number | null = null;
        let nextX = "0deg";
        let nextY = "0deg";
        let glowX = "50%";
        let glowY = "50%";
        let isTiltActive = false;

        const commitTilt = () => {
            frame = null;
            element.style.setProperty("--tilt-x", nextX);
            element.style.setProperty("--tilt-y", nextY);
            element.style.setProperty("--tilt-glow-x", glowX);
            element.style.setProperty("--tilt-glow-y", glowY);
            element.style.transform = isTiltActive
                ? `perspective(920px) rotateX(${nextX}) rotateY(${nextY}) translate3d(0, -2px, 0)`
                : "perspective(920px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
        };

        const queueTilt = () => {
            if (frame !== null) {
                return;
            }

            frame = window.requestAnimationFrame(commitTilt);
        };

        const handlePointerEnter = () => {
            isTiltActive = true;
            rect = element.getBoundingClientRect();
        };

        const handlePointerMove = (event: PointerEvent) => {
            isTiltActive = true;
            const relativeX = (event.clientX - rect.left) / rect.width;
            const relativeY = (event.clientY - rect.top) / rect.height;
            const centeredX = Math.max(-1, Math.min(1, (relativeX - 0.5) * 2));
            const centeredY = Math.max(-1, Math.min(1, (relativeY - 0.5) * 2));

            nextX = `${(-centeredY * 4).toFixed(2)}deg`;
            nextY = `${(centeredX * 5).toFixed(2)}deg`;
            glowX = `${Math.round(relativeX * 100)}%`;
            glowY = `${Math.round(relativeY * 100)}%`;
            queueTilt();
        };

        const resetTilt = () => {
            isTiltActive = false;
            nextX = "0deg";
            nextY = "0deg";
            glowX = "50%";
            glowY = "50%";
            queueTilt();
        };

        element.addEventListener("pointerenter", handlePointerEnter);
        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", resetTilt);

        return () => {
            element.removeEventListener("pointerenter", handlePointerEnter);
            element.removeEventListener("pointermove", handlePointerMove);
            element.removeEventListener("pointerleave", resetTilt);

            if (frame !== null) {
                window.cancelAnimationFrame(frame);
            }

            element.style.removeProperty("transform");
        };
    }, []);

    useEffect(() => {
        if (!previewProject) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPreviewProject(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [previewProject]);

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

                    <aside className={cx(styles.heroAside, styles.interactiveCard)} ref={heroAsideRef}>
                        <div className={styles.heroStatusRow}>
                            <span className={styles.statusDot}/>
                            <span>{t(siteCopy.hero.status)}</span>
                        </div>
                        <div className={styles.deliveryMap} aria-label={locale === "pl" ? "Proces dostarczania" : "Delivery process"}>
                            {siteCopy.hero.asideSteps.map((step, index) => (
                                <Fragment key={`delivery-${index}`}>
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
                        <article className={cx(styles.glassPanel, styles.offerCard, styles.interactiveCard)} data-reveal key={`offer-${index}`}>
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
                        <FeaturedCard
                            key={project.id}
                            locale={locale}
                            onPreview={setPreviewProject}
                            project={project}
                        />
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
                        <article className={cx(styles.glassPanel, styles.aiCard, styles.interactiveCard)} data-reveal key={`ai-workflow-${index}`}>
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
                        <article className={cx(styles.glassPanel, styles.processCard, styles.interactiveCard)} data-reveal key={`process-${index}`}>
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

            <section className={cx(styles.section, styles.collaborationSection)}>
                <div className={styles.sectionHeader} data-reveal>
                    <p className={styles.eyebrow}>{t(siteCopy.collaboration.eyebrow)}</p>
                    <h2>{t(siteCopy.collaboration.title)}</h2>
                    <p>{t(siteCopy.collaboration.lead)}</p>
                </div>

                <div className={styles.collaborationLayout}>
                    <div className={styles.collaborationTracks}>
                        {siteCopy.collaboration.tracks.map((track, index) => {
                            return (
                            <article className={cx(styles.glassPanel, styles.collaborationCard, styles.interactiveCard)} data-reveal key={`collaboration-${index}`}>
                                <div className={styles.panelContent}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.iconBadge}>
                                            <IconGlyph Icon={collaborationIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                        </span>
                                        <div>
                                            <span className={styles.cardLabel}>{t(track.label)}</span>
                                            <h3>{t(track.title)}</h3>
                                        </div>
                                    </div>
                                    <p>{t(track.text)}</p>
                                </div>
                            </article>
                            );
                        })}
                    </div>

                    <aside className={cx(styles.glassPanel, styles.deliverablesPanel, styles.interactiveCard)} data-reveal>
                        <div className={styles.panelContent}>
                            <h3>{t(siteCopy.collaboration.deliverablesTitle)}</h3>
                            <div className={styles.deliverablesList}>
                                {siteCopy.collaboration.deliverables.map((item, index) => (
                                    <div className={styles.deliverableItem} key={`deliverable-${index}`}>
                                        <span className={styles.iconBadge}>
                                            <IconGlyph Icon={deliverableIcons[index] ?? Sparkles} className={styles.sectionIcon}/>
                                        </span>
                                        <div>
                                            <strong>{t(item.title)}</strong>
                                            <p>{t(item.text)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
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
                    <div className={styles.contactBody}>
                        <div className={styles.contactCopy}>
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
                            <div className={styles.contactMeta}>
                                {siteCopy.contact.metaItems.map((item, index) => {
                                    const Icon = contactMetaIcons[index] ?? Sparkles;

                                    return (
                                        <div className={styles.contactMetaItem} key={`contact-meta-${index}`}>
                                            <IconGlyph Icon={Icon} className={styles.contactMetaIcon}/>
                                            <span>{t(item.label)}</span>
                                            <strong>{t(item.value)}</strong>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <aside className={styles.briefStarter}>
                            <span>{t(siteCopy.contact.briefTitle)}</span>
                            <ul>
                                {siteCopy.contact.briefItems.map((item, index) => {
                                    const Icon = briefIcons[index] ?? Sparkles;

                                    return (
                                        <li key={`brief-${index}`}>
                                            <IconGlyph Icon={Icon} className={styles.briefIcon}/>
                                            <span>{t(item)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>
                    </div>
                </div>
            </section>

            {previewProject?.thumbnailPath && (
                <div
                    aria-label={locale === "pl" ? "Podgląd zdjęcia projektu" : "Project image preview"}
                    aria-modal="true"
                    className={styles.imageModal}
                    onClick={() => setPreviewProject(null)}
                    role="dialog"
                >
                    <div className={styles.imageModalPanel} onClick={(event) => event.stopPropagation()}>
                        <button
                            aria-label={locale === "pl" ? "Zamknij podgląd" : "Close preview"}
                            className={styles.imageModalClose}
                            onClick={() => setPreviewProject(null)}
                            type="button"
                        >
                            <X className={styles.imageModalCloseIcon}/>
                        </button>
                        <Image
                            alt={previewProject.title}
                            className={styles.imageModalImage}
                            height={900}
                            src={previewProject.thumbnailPath}
                            unoptimized
                            width={1440}
                        />
                        <div className={styles.imageModalCaption}>
                            <strong>{previewProject.title}</strong>
                            <span>{text(previewProject.description, locale)}</span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
