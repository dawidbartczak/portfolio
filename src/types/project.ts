export type Locale = "pl" | "en";

export type LocalizedText = Record<Locale, string>;

export type ProjectEra = "without-ai" | "ai-assisted";

export type ProjectLinkType = "demo" | "source" | "case-study";

export type ProjectLink = {
    type: ProjectLinkType;
    label: LocalizedText;
    value: string;
    href: string;
};

export type ProjectCaseStudy = {
    problem: LocalizedText;
    built: LocalizedText;
    role: LocalizedText;
    architecture: LocalizedText;
    hardParts: LocalizedText[];
    proves: LocalizedText[];
    note?: LocalizedText;
};

export type Project = {
    id: string;
    title: string;
    year: string;
    category: LocalizedText;
    era: ProjectEra;
    featured?: boolean;
    featuredLabel?: LocalizedText;
    description: LocalizedText;
    thumbnailPath?: string;
    tags: string[];
    stack: string[];
    role: LocalizedText;
    proofPoints: LocalizedText[];
    caseStudy: ProjectCaseStudy;
    links: ProjectLink[];
};
