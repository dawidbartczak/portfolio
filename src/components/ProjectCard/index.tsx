import Image from "next/image";
import Link from "next/link";
import EyeOff from "@/icons/EyeOff";
import {text} from "@/content/site";
import type {Locale, Project} from "@/types/project";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
    project: Project;
    locale?: Locale;
};

export default function ProjectCard({project, locale = "pl"}: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`} className={styles.projectCard}>
            {project.thumbnailPath ? (
                <Image
                    className={styles.thumbnail}
                    src={project.thumbnailPath}
                    alt=""
                    width={640}
                    height={400}
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                />
            ) : (
                <div className={styles.thumbnail}>
                    <EyeOff className={styles.nothumbnail}/>
                </div>
            )}
            <div className={styles.copy}>
                <span className={styles.category}>{text(project.category, locale)}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{text(project.description, locale)}</p>
            </div>
        </Link>
    );
}
