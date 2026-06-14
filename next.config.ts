import type {NextConfig} from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
    },
    {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
    },
    {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin",
    },
    {
        key: "Origin-Agent-Cluster",
        value: "?1",
    },
    {
        key: "X-Permitted-Cross-Domain-Policies",
        value: "none",
    },
];

const nextConfig: NextConfig = {
    output: "standalone",
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
