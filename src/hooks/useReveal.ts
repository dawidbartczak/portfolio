"use client";

import {useEffect} from "react";

export function useReveal(selector = "[data-reveal]") {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach((element) => element.setAttribute("data-revealed", "true"));
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.setAttribute("data-revealed", "true");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -5% 0px",
            threshold: 0.08,
        });

        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.96) {
                element.setAttribute("data-revealed", "true");
                return;
            }

            element.style.setProperty("--reveal-delay", `${Math.min(index * 12, 72)}ms`);
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [selector]);
}
