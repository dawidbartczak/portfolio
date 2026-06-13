import styles from "./page.module.scss";
import Title from "@/components/Title";
import ProjectCard from "@/components/ProjectCard";
import ContactEntry from "@/components/ContactEntry";
import { Github, Mail } from "@/icons";
import { aboutMe } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
    return (
        <div className={styles.page}>
            <section className={styles.section}>
                <Title title="O mnie"/>

                <div className={styles.paragraphs}>
                    {aboutMe.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <Title title="Moja twórczość"/>

                <p>Demo, case-study i kod źródłowy na GitHub</p>

                <div className={styles.projects}>
                    {projects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <Title title="Kontakt"/>

                <p>Jeśli chcesz porozmawiać o współpracy lub projektach, napisz do mnie</p>

                <div className={styles.contactEntries}>
                    <ContactEntry title="GitHub"
                                  value={"dawidbartczak"}
                                  icon={<Github size="100px"/>}
                                  mode="link"
                                  href={"https://github.com/dawidbartczak"}
                    />
                    <ContactEntry title="Mail"
                                  value={"pluton.radiated378@passfwd.com"}
                                  icon={<Mail/>}
                                  mode="mailto"
                    />
                </div>
            </section>
        </div>
    );
}
