"use client";

import Link from "next/link";
import {useMemo, useState} from "react";
import {Code, Moon, Play, Sun} from "@/icons";
import {localeNames, text} from "@/content/site";
import {useReveal} from "@/hooks/useReveal";
import {useThemePreference, type ThemePreference} from "@/hooks/useThemePreference";
import type {Locale, Project, ProjectLink} from "@/types/project";
import styles from "./ProjectPage.module.scss";

type ProjectPageProps = {
    project: Project;
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

function ProjectLinks({links, locale}: { links: ProjectLink[]; locale: Locale }) {
    return (
        <div className={styles.links}>
            {links.map((link) => {
                const Icon = linkIcons[link.type];

                return (
                    <a href={link.href} key={`${link.type}-${link.href}`} rel="noreferrer" target="_blank">
                        <Icon className={styles.icon}/>
                        <span>{text(link.label, locale)}</span>
                    </a>
                );
            })}
        </div>
    );
}

export default function ProjectPage({ project }: ProjectPageProps) {
    const [locale, setLocale] = useState<Locale>("pl");
    const [theme, setTheme] = useThemePreference();
    const t = useMemo(() => (value: {pl: string; en: string}) => text(value, locale), [locale]);

    useReveal();

    return (
        <main className={cx(styles.page, styles.revealReady)}>
            <nav className={styles.nav}>
                <Link href={`/#project-${project.id}`}>{locale === "pl" ? "← Strona główna" : "← Home"}</Link>
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

            <section className={styles.hero}>
                <div className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <p className={styles.eyebrow}>{t(project.category)} · {project.year}</p>
                        <h1>{project.title}</h1>
                        <p className={styles.lead}>{t(project.description)}</p>
                        <div className={styles.tags}>
                            {project.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                        <ProjectLinks links={project.links} locale={locale}/>
                    </div>
                </div>
            </section>

            <section className={styles.caseGrid}>
                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Problem" : "Problem"}</h2>
                        <p>{t(project.caseStudy.problem)}</p>
                    </div>
                </article>

                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Co zbudowałem" : "What I built"}</h2>
                        <p>{t(project.caseStudy.built)}</p>
                    </div>
                </article>

                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Moja rola" : "My role"}</h2>
                        <p>{t(project.caseStudy.role)}</p>
                    </div>
                </article>

                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Architektura" : "Architecture"}</h2>
                        <p>{t(project.caseStudy.architecture)}</p>
                    </div>
                </article>
            </section>

            <section className={styles.twoColumns}>
                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Najtrudniejsze fragmenty" : "Hard parts"}</h2>
                        <ul>
                            {project.caseStudy.hardParts.map((item) => (
                                <li key={t(item)}>{t(item)}</li>
                            ))}
                        </ul>
                    </div>
                </article>

                <article className={cx(styles.glassPanel, styles.interactiveCard)} data-reveal>
                    <div className={styles.panelContent}>
                        <h2>{locale === "pl" ? "Co to udowadnia" : "What this proves"}</h2>
                        <ul>
                            {project.caseStudy.proves.map((item) => (
                                <li key={t(item)}>{t(item)}</li>
                            ))}
                        </ul>
                    </div>
                </article>
            </section>

            {project.caseStudy.note && (
                <section className={styles.note} data-reveal>
                    <div className={cx(styles.glassPanel, styles.notePanel)}>
                        <div className={styles.panelContent}>
                            <p>{t(project.caseStudy.note)}</p>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
