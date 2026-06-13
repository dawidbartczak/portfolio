import ContactEntry from "@/components/ContactEntry";
import Title from "@/components/Title";
import { Code, Play } from "@/icons";
import type { Project } from "@/types/project";
import styles from "./ProjectPage.module.scss";

type ProjectPageProps = {
    project: Project;
};

export default function ProjectPage({ project }: ProjectPageProps) {
    return (
        <div className={styles.page}>
            <section className={styles.section}>
                <Title title={project.title} />

                {project.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}

                <div className={styles.contactEntries}>
                    {project.actions.map((action) => (
                        <ContactEntry
                            key={`${action.type}-${action.href}`}
                            title={action.type === "demo" ? "Demo" : "Kod źródłowy"}
                            value={action.value}
                            icon={action.type === "demo" ? <Play /> : <Code />}
                            mode="link"
                            href={action.href}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
