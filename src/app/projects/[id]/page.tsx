import ProjectPage from "@/components/ProjectPage";
import { getProject, projects } from "@/content/projects";
import {absoluteUrl, defaultOgImage, siteName, siteUrl} from "@/content/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type {Project} from "@/types/project";

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

function buildProjectStructuredData(project: Project) {
    const projectUrl = absoluteUrl(`/projects/${project.id}`);
    const imageUrl = absoluteUrl(project.thumbnailPath ?? defaultOgImage);
    const sourceLinks = project.links.filter((link) => link.type === "source").map((link) => link.href);
    const sameAs = project.links.map((link) => link.href);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Portfolio",
                        item: siteUrl,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: project.title,
                        item: projectUrl,
                    },
                ],
            },
            {
                "@type": "SoftwareSourceCode",
                "@id": `${projectUrl}#project`,
                name: project.title,
                url: projectUrl,
                description: project.description.pl,
                image: imageUrl,
                dateCreated: project.year,
                inLanguage: ["pl", "en"],
                creator: {
                    "@type": "Person",
                    name: siteName,
                    url: siteUrl,
                },
                isPartOf: {
                    "@type": "WebSite",
                    name: siteName,
                    url: siteUrl,
                },
                programmingLanguage: project.stack,
                runtimePlatform: project.stack.join(", "),
                keywords: [...project.tags, ...project.stack, project.category.pl].join(", "),
                about: [project.category.pl, ...project.tags],
                sameAs,
                ...(sourceLinks.length > 0 ? {codeRepository: sourceLinks.length === 1 ? sourceLinks[0] : sourceLinks} : {}),
            },
        ],
    };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
    const { id } = await params;
    const project = getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(buildProjectStructuredData(project))}} />
            <ProjectPage project={project} />
        </>
    );
}
