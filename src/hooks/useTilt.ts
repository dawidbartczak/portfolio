"use client";

import { MouseEvent, useCallback } from "react";

type TiltAxis = "x" | "y" | "both";

type TiltOptions = {
    axis?: TiltAxis;
    rotateStrength?: number;
    liftMax?: number;
};

export function useTilt({
    axis = "both",
    rotateStrength = 10,
    liftMax = 10,
}: TiltOptions = {}) {
    const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
        const canAnimate = window.matchMedia("(hover: hover) and (pointer: fine)").matches
            && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!canAnimate) {
            return;
        }

        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = axis === "y" ? 0 : -((y - centerY) / centerY) * rotateStrength;
        const rotateY = axis === "x" ? 0 : ((x - centerX) / centerX) * rotateStrength;

        const dx = Math.abs(x - centerX);
        const dy = Math.abs(y - centerY);
        const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        const lift = (dist / maxDist) * liftMax;

        element.style.setProperty("--mx", `${x}px`);
        element.style.setProperty("--my", `${y}px`);
        element.style.setProperty("--rx", `${rotateX}deg`);
        element.style.setProperty("--ry", `${rotateY}deg`);
        element.style.setProperty("--lift", `${lift}px`);
        element.style.setProperty("--hover", "1");
    }, [axis, liftMax, rotateStrength]);

    const onMouseLeave = useCallback((event: MouseEvent<HTMLElement>) => {
        const element = event.currentTarget;

        element.style.setProperty("--hover", "0");
        element.style.setProperty("--rx", "0deg");
        element.style.setProperty("--ry", "0deg");
        element.style.setProperty("--lift", "0px");
    }, []);

    return {
        onMouseMove,
        onMouseLeave,
    };
}
