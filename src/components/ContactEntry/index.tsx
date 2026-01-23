import styles from "./ContactEntry.module.scss";

import {ReactNode} from "react";

type ContactEntryProps = {
    title: string;
    value: string;
    icon: ReactNode;
    mode: "link" | "mailto" | "none";
    href?: string;
};

export default function ContactEntry({title, value, icon, mode, href}: ContactEntryProps) {
    if (mode === "none") {
        return (
            <div className={styles.contactEntry}>
                <span className={styles.icon}>{icon}</span>

                <div className={styles.text}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.value}>{value}</span>
                </div>
            </div>
        );
    }

    const linkHref =
        mode === "mailto" ? `mailto:${href ?? value}` : href;

    return (
        <a
            className={styles.contactEntry}
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
