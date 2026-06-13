"use client";

import {useCallback, useSyncExternalStore} from "react";

export type ThemePreference = "dark" | "light";

const listeners = new Set<() => void>();
let memoryTheme: ThemePreference = "dark";

function isThemePreference(value: string | null | undefined): value is ThemePreference {
    return value === "dark" || value === "light";
}

function emitThemeChange() {
    listeners.forEach((listener) => listener());
}

function readThemePreference(): ThemePreference {
    if (typeof window === "undefined") {
        return "dark";
    }

    try {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (isThemePreference(savedTheme)) {
            memoryTheme = savedTheme;
            return savedTheme;
        }
    } catch {
        // Fall back to the DOM attribute or in-memory value below.
    }

    const currentTheme = document.documentElement.dataset.theme;

    if (isThemePreference(currentTheme)) {
        memoryTheme = currentTheme;
        return currentTheme;
    }

    return memoryTheme;
}

function subscribeTheme(listener: () => void) {
    listeners.add(listener);

    const handleStorage = (event: StorageEvent) => {
        if (event.key === "portfolio-theme") {
            emitThemeChange();
        }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", handleStorage);
    };
}

function readServerTheme(): ThemePreference {
    return "dark";
}

export function useThemePreference() {
    const theme = useSyncExternalStore(subscribeTheme, readThemePreference, readServerTheme);

    const applyTheme = useCallback((nextTheme: ThemePreference) => {
        memoryTheme = nextTheme;
        document.documentElement.dataset.theme = nextTheme;

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch {
            // Theme still works for the session when storage is unavailable.
        }

        emitThemeChange();
    }, []);

    return [theme, applyTheme] as const;
}
