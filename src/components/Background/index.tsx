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

        const getTransformPosition = (clientX: number, clientY: number) => {
            const parentRect = element.parentElement?.getBoundingClientRect();
            const originX = parentRect?.left ?? 0;
            const originY = parentRect?.top ?? 0;

            return {
                x: clientX - originX - element.offsetWidth / 2,
                y: clientY - originY - element.offsetHeight / 2,
            };
        };

        const initialPosition = {
            x: window.innerWidth * 0.58,
            y: window.innerHeight * 0.42,
        };

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

            currentPosition.x += (targetPosition.x - currentPosition.x) / 20;
            currentPosition.y += (targetPosition.y - currentPosition.y) / 20;

            element.style.transform = `translate3d(${Math.round(currentPosition.x)}px, ${Math.round(currentPosition.y)}px, 0)`;

            const deltaX = Math.abs(targetPosition.x - currentPosition.x);
            const deltaY = Math.abs(targetPosition.y - currentPosition.y);

            if (deltaX > 0.5 || deltaY > 0.5) {
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

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            stopAnimation();
        };
    }, []);

    return (
        <div className={styles.background}>
            <svg className={styles.filter} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>
                        <feBlend in="SourceGraphic" in2="goo"/>
                    </filter>
                </defs>
            </svg>

            <div className={styles.aurora}>
                <div className={styles.blob1}/>
                <div className={styles.blob2}/>
                <div className={styles.blob3}/>
                <div className={styles.blob4}/>
                <div className={styles.blob5}/>
                <div className={styles.blob6}/>
                <div className={styles.blob7}/>
                <div className={styles.auroraRibbon}/>
                <div className={styles.blobInteractive} ref={interactiveBubbleRef}/>
            </div>
        </div>
    );
}
