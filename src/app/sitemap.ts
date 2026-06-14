import type {MetadataRoute} from "next";
import {projects} from "@/content/projects";
import {absoluteUrl} from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: absoluteUrl("/"),
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: absoluteUrl(`/projects/${project.id}`),
            lastModified,
            changeFrequency: "monthly" as const,
            priority: project.featured ? 0.9 : 0.7,
        })),
    ];
}
