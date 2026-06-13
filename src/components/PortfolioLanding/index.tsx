"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {Code, Github, Mail, Play} from "@/icons";
import {contact, localeNames, siteCopy, text} from "@/content/site";
import {featuredProjects, withoutAiProjects} from "@/content/projects";
import {useThemePreference, type ThemePreference} from "@/hooks/useThemePreference";
import type {Locale, Project, ProjectLink} from "@/types/project";
import styles from "./PortfolioLanding.module.scss";

const linkIcons = {
    demo: Play,
    source: Code,
    "case-study": Code,
};

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
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
    return (
        <article className={cx(styles.glassPanel, styles.featuredCard)}>
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
                        <span>{project.featuredLabel ? text(project.featuredLabel, locale) : text(project.category, locale)}</span>
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
                        <ProjectLinks links={project.links.slice(0, 2)} locale={locale}/>
                    </div>
                </div>
            </div>
        </article>
    );
}

function ArchiveCard({project, locale}: { project: Project; locale: Locale }) {
    return (
        <article className={cx(styles.glassPanel, styles.archiveCard)}>
            <div className={styles.panelContent}>
                <div className={styles.archiveHeader}>
                    <div>
                        <span className={styles.archiveCategory}>{text(project.category, locale)}</span>
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
                    <ProjectLinks links={project.links.slice(0, 1)} locale={locale}/>
                </div>
            </div>
        </article>
    );
}

export default function PortfolioLanding() {
    const [locale, setLocale] = useState<Locale>("pl");
    const [theme, setTheme] = useThemePreference();
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useMemo(() => (value: {pl: string; en: string}) => text(value, locale), [locale]);

    useEffect(() => {
        const updateScrollState = () => setIsScrolled(window.scrollY > 12);

        updateScrollState();
        window.addEventListener("scroll", updateScrollState, {passive: true});

        return () => window.removeEventListener("scroll", updateScrollState);
    }, []);

    return (
        <main className={styles.page}>
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
                        {(["dark", "light"] as ThemePreference[]).map((item) => (
                            <button
                                aria-pressed={theme === item}
                                className={theme === item ? styles.themeActive : undefined}
                                key={item}
                                onClick={() => setTheme(item)}
                                type="button"
                            >
                                {item === "dark" ? "Dark" : "Light"}
                            </button>
                        ))}
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

            <section className={cx(styles.hero, styles.glassPanel)} id="top">
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

                    <aside className={styles.heroAside}>
                        <span className={styles.statusDot}/>
                        <p>{t(siteCopy.hero.status)}</p>
                        <div className={styles.heroStack}>
                            <span>Full-stack</span>
                            <span>ML/NLP</span>
                            <span>Desktop</span>
                            <span>Automation</span>
                        </div>
                    </aside>
                </div>
            </section>

            <section className={styles.proofStrip} aria-label="Proof points">
                {siteCopy.proof.map((item) => (
                    <div className={cx(styles.glassPanel, styles.proofItem)} key={item.value}>
                        <div className={styles.panelContent}>
                            <strong>{item.value}</strong>
                            <span>{t(item.label)}</span>
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.section} id="offer">
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow}>{t(siteCopy.offer.eyebrow)}</p>
                    <h2>{t(siteCopy.offer.title)}</h2>
                    <p>{t(siteCopy.offer.lead)}</p>
                </div>
                <div className={styles.offerGrid}>
                    {siteCopy.offer.items.map((item) => (
                        <article className={cx(styles.glassPanel, styles.offerCard)} key={t(item.title)}>
                            <div className={styles.panelContent}>
                                <h3>{t(item.title)}</h3>
                                <p>{t(item.text)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section} id="work">
                <div className={styles.sectionHeader}>
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
                <div className={styles.sectionHeader}>
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
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow}>{t(siteCopy.aiWorkflow.eyebrow)}</p>
                    <h2>{t(siteCopy.aiWorkflow.title)}</h2>
                    <p>{t(siteCopy.aiWorkflow.lead)}</p>
                </div>
                <div className={styles.aiGrid}>
                    {siteCopy.aiWorkflow.items.map((item) => (
                        <article className={cx(styles.glassPanel, styles.aiCard)} key={t(item.title)}>
                            <div className={styles.panelContent}>
                                <h3>{t(item.title)}</h3>
                                <p>{t(item.text)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section} id="process">
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow}>{t(siteCopy.process.eyebrow)}</p>
                    <h2>{t(siteCopy.process.title)}</h2>
                </div>
                <div className={styles.processGrid}>
                    {siteCopy.process.steps.map((step, index) => (
                        <article className={cx(styles.glassPanel, styles.processCard)} key={t(step.name)}>
                            <div className={styles.panelContent}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <h3>{t(step.name)}</h3>
                                <p>{t(step.text)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow}>{t(siteCopy.tech.eyebrow)}</p>
                    <h2>{t(siteCopy.tech.title)}</h2>
                </div>
                <div className={styles.techGrid}>
                    {siteCopy.tech.groups.map((group) => (
                        <article className={cx(styles.glassPanel, styles.techCard)} key={group.name}>
                            <div className={styles.panelContent}>
                                <h3>{group.name}</h3>
                                <div className={styles.tagList}>
                                    {group.items.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={cx(styles.contactSection, styles.glassPanel)} id="contact">
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
