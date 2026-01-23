"use client";

import styles from "./Background.module.scss";

import {useEffect, useRef} from "react";

type Position = {
    x: number;
    y: number;
}

export default function Background() {
    const interactiveBubbleRef = useRef<HTMLDivElement>(null);

    const targetPositionRef = useRef<Position>({x: 0, y: 0});
    const currentPositionRef = useRef<Position>({x: 0, y: 0});

    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            targetPositionRef.current = {
                x: event.clientX,
                y: event.clientY,
            };
        };

        window.addEventListener("mousemove", handleMouseMove);

        const updatePosition = () => {
            const targetPosition = targetPositionRef.current;
            const currentPosition = currentPositionRef.current;

            currentPosition.x += (targetPosition.x - currentPosition.x) / 20;
            currentPosition.y += (targetPosition.y - currentPosition.y) / 20;

            if (interactiveBubbleRef.current) {
                interactiveBubbleRef.current.style.transform = `translate(${Math.round(currentPosition.x)}px, ${Math.round(currentPosition.y)}px)`;
            }

            animationFrameIdRef.current = requestAnimationFrame(updatePosition);
        }

        animationFrameIdRef.current = requestAnimationFrame(updatePosition);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);

            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [interactiveBubbleRef]);

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

            <div className={styles.blobs}>
                <div className={styles.blob1}/>
                <div className={styles.blob2}/>
                <div className={styles.blob3}/>
                <div className={styles.blob4}/>
                <div className={styles.blob5}/>
                <div className={styles.blobInteractive} ref={interactiveBubbleRef}/>
            </div>
        </div>
    );
}
