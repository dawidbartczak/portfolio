"use client";

import styles from "./Background.module.scss";

import {useEffect, useRef} from "react";

type Position = {
    x: number;
    y: number;
};

export default function Background() {
    const interactiveBubbleRef = useRef<HTMLDivElement>(null);

    const targetPositionRef = useRef<Position>({x: 0, y: 0});
    const currentPositionRef = useRef<Position>({x: 0, y: 0});

    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const element = interactiveBubbleRef.current;

        if (prefersReducedMotion || !hasFinePointer || !element) {
            return;
        }

        let originX = 0;
        let originY = 0;
        let halfWidth = element.offsetWidth / 2;
        let halfHeight = element.offsetHeight / 2;

        const measure = () => {
            const parentRect = element.parentElement?.getBoundingClientRect();

            originX = parentRect?.left ?? 0;
            originY = parentRect?.top ?? 0;
            halfWidth = element.offsetWidth / 2;
            halfHeight = element.offsetHeight / 2;
        };

        const getTransformPosition = (clientX: number, clientY: number) => {
            return {
                x: clientX - originX - halfWidth,
                y: clientY - originY - halfHeight,
            };
        };

        const initialPosition = {
            x: window.innerWidth * 0.58,
            y: window.innerHeight * 0.42,
        };

        measure();

        const initialTransformPosition = getTransformPosition(initialPosition.x, initialPosition.y);

        targetPositionRef.current = initialTransformPosition;
        currentPositionRef.current = initialTransformPosition;
        element.style.transform = `translate3d(${Math.round(initialTransformPosition.x)}px, ${Math.round(initialTransformPosition.y)}px, 0)`;

        const stopAnimation = () => {
            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        };

        const updatePosition = () => {
            const targetPosition = targetPositionRef.current;
            const currentPosition = currentPositionRef.current;

            currentPosition.x += (targetPosition.x - currentPosition.x) / 10;
            currentPosition.y += (targetPosition.y - currentPosition.y) / 10;

            element.style.transform = `translate3d(${Math.round(currentPosition.x)}px, ${Math.round(currentPosition.y)}px, 0)`;

            const deltaX = Math.abs(targetPosition.x - currentPosition.x);
            const deltaY = Math.abs(targetPosition.y - currentPosition.y);

            if (deltaX > 1 || deltaY > 1) {
                animationFrameIdRef.current = requestAnimationFrame(updatePosition);
            } else {
                stopAnimation();
            }
        };

        const startAnimation = () => {
            if (animationFrameIdRef.current === null) {
                animationFrameIdRef.current = requestAnimationFrame(updatePosition);
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            targetPositionRef.current = getTransformPosition(event.clientX, event.clientY);

            startAnimation();
        };

        window.addEventListener("pointermove", handlePointerMove, {passive: true});
        window.addEventListener("resize", measure, {passive: true});

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("resize", measure);
            stopAnimation();
        };
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.aurora}>
                <div className={styles.blob1}/>
                <div className={styles.blob2}/>
                <div className={styles.blob3}/>
                <div className={styles.blob4}/>
                <div className={styles.blob5}/>
                <div className={styles.auroraRibbon}/>
                <div className={styles.blobInteractive} ref={interactiveBubbleRef}/>
            </div>
        </div>
    );
}
