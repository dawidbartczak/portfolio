"use client";

import styles from "./ContactEntry.module.scss";
import { ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";

type ContactEntryProps = {
    title: string;
    value: string;
    icon: ReactNode;
    mode: "link" | "mailto" | "none";
    href?: string;
    axis?: "x" | "y" | "both";
};

export default function ContactEntry({
                                         title,
                                         value,
                                         icon,
                                         mode,
                                         href,
                                     axis = "x",
                                 }: ContactEntryProps) {

    const isInteractive = mode === "link" || mode === "mailto";
    const tilt = useTilt({axis});

    const sharedProps = {
        className: `${styles.contactEntry} ${
            isInteractive ? styles.contactEntryLink : ""
        }`,
        ...(isInteractive && {
            onMouseMove: tilt.onMouseMove,
            onMouseLeave: tilt.onMouseLeave,
        }),
    };

    if (mode === "none") {
        return (
            <div {...sharedProps}>
                <span className={styles.icon}>{icon}</span>
                <div className={styles.text}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.value}>{value}</span>
                </div>
            </div>
        );
    }

    const linkHref = mode === "mailto" ? `mailto:${href ?? value}` : href;

    return (
        <a
            {...sharedProps}
            href={linkHref}
            target={mode === "link" ? "_blank" : undefined}
            rel={mode === "link" ? "noopener noreferrer" : undefined}
        >
            <span className={styles.icon}>{icon}</span>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.value}>{value}</span>
            </div>
        </a>
    );
}
