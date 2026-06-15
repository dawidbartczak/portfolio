"use client";

import {useEffect} from "react";

export function useReveal(selector = "[data-reveal]") {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const prefersMobileFastPath = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
        const tracked = new WeakSet<HTMLElement>();

        if (prefersReducedMotion || prefersMobileFastPath || !("IntersectionObserver" in window)) {
            const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
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

        const revealOrObserve = (element: HTMLElement, index = 0) => {
            if (element.dataset.revealed === "true") {
                return;
            }

            const rect = element.getBoundingClientRect();
            const isVisibleNow = rect.top < window.innerHeight * 0.96 && rect.bottom > 0;

            if (isVisibleNow) {
                element.setAttribute("data-revealed", "true");
                observer.unobserve(element);
                return;
            }

            if (tracked.has(element)) {
                return;
            }

            tracked.add(element);
            element.style.setProperty("--reveal-delay", `${Math.min(index * 12, 72)}ms`);
            observer.observe(element);
        };

        const scan = () => {
            Array.from(document.querySelectorAll<HTMLElement>(selector)).forEach((element, index) => {
                revealOrObserve(element, index);
            });
        };

        scan();

        const rescan = () => window.requestAnimationFrame(scan);
        const hashRescan = window.setTimeout(scan, 240);

        window.addEventListener("hashchange", rescan);
        window.addEventListener("load", rescan);
        window.addEventListener("resize", rescan);

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) {
                        return;
                    }

                    if (node.matches(selector)) {
                        revealOrObserve(node);
                    }

                    node.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
                        revealOrObserve(element, index);
                    });
                });
            });
        });

        mutationObserver.observe(document.body, {childList: true, subtree: true});

        return () => {
            window.clearTimeout(hashRescan);
            window.removeEventListener("hashchange", rescan);
            window.removeEventListener("load", rescan);
            window.removeEventListener("resize", rescan);
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [selector]);
}
