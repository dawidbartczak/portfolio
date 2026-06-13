"use client";

import { ReactNode, useEffect, useState } from "react";

export default function NoMobile({ children }: { children: ReactNode }) {
    const [deviceChecked, setDeviceChecked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
            setDeviceChecked(true);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Don't render anything until we know if it's mobile
    if (!deviceChecked) return null;

    if (isMobile) return null;

    return <>{children}</>;
}
