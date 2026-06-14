import ProjectPage from "@/components/ProjectPage";
import { getProject, projects } from "@/content/projects";
import {defaultOgImage, siteName} from "@/content/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectRouteProps = {
    params: Promise<{
        id: string;
    }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProject(id);

    if (!project) {
        return {};
    }

    const canonical = `/projects/${project.id}`;
    const title = `${project.title} case study`;
    const description = project.description.pl;
    const image = project.thumbnailPath ?? defaultOgImage;

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        keywords: [
            project.title,
            ...project.tags,
            ...project.stack,
            "case study",
            "software portfolio",
            "MVP delivery",
        ],
        openGraph: {
            title: `${project.title} | ${siteName}`,
            description,
            url: canonical,
            siteName,
            type: "article",
            locale: "pl_PL",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} project preview`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | ${siteName}`,
            description,
            images: [image],
        },
    };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
    const { id } = await params;
    const project = getProject(id);

    if (!project) {
        notFound();
    }

    return <ProjectPage project={project} />;
}
