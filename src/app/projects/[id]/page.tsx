import ProjectPage from "@/components/ProjectPage";
import { getProject, projects } from "@/content/projects";
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

    return {
        title: `${project.title} | Dawid Bartczak`,
        description: project.description,
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
