export type ProjectAction = {
    type: "demo" | "source";
    value: string;
    href: string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    paragraphs: string[];
    thumbnailPath?: string;
    actions: ProjectAction[];
};
