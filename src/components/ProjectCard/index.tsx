"use client";

import styles from "./ProjectCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";
import EyeOff from "@/icons/EyeOff";

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({project}: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${project.id}`}
            className={styles.projectCard}
        >
            {project.thumbnailPath ? (
                <Image
                    className={styles.thumbnail}
                    src={project.thumbnailPath}
                    alt={project.title}
                    width={640}
                    height={400}
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            ) : (
                <div className={styles.thumbnail}>
                    <EyeOff className={styles.nothumbnail}/>
                </div>
            )}
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
        </Link>
    );
}
