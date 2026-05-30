'use client';

import { useEffect } from 'react';

interface PrerenderNavigationTiming extends PerformanceNavigationTiming {
    activationStart?: number;
}

export default function PerformanceMonitor({ pageName }: { pageName: string }) {
    useEffect(() => {
        if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

        const valueToRating = (ms: number) =>
            ms <= 2500 ? "good" : ms <= 4000 ? "needs-improvement" : "poor";

        const RATING = {
            good: { icon: "🟢", color: "#0CCE6A" },
            "needs-improvement": { icon: "🟠", color: "#FFA400" },
            poor: { icon: "🔴", color: "#FF4E42" },
        };

        /**
         * Get the page navigation entry to calculate TTFB and activation time
         */
        const getNavigationEntry = () => {
            return performance.getEntriesByType("navigation")[0] as PrerenderNavigationTiming;
        };

        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            // Last entry in the list is the LCP element
            const lastEntry = entries[entries.length - 1];

            if (!lastEntry) return;

            const navEntry = getNavigationEntry();
            const activationStart = navEntry?.activationStart || 0;
            const startTime = activationStart > 0 ? activationStart : (navEntry?.startTime || 0);

            // Calculate LCP
            const lcpTime = Math.max(0, lastEntry.startTime - activationStart);
            const rating = valueToRating(lcpTime);
            const { icon, color } = RATING[rating];
            const lcpDisplayTime = (lcpTime / 1000).toFixed(2);

            // Calculate Perceived TTFB
            const ttfbTime = navEntry ? Math.max(0, navEntry.responseStart - startTime) : 0;

            console.log(
                `%c${pageName} Page Performance: LCP: ${icon} ${lcpDisplayTime}s (${rating})`,
                `color: ${color}; font-weight: bold; font-size: 14px;`
            );

            console.log(
                `%c↳ TTFB: ${ttfbTime.toFixed(2)}ms`,
                `font-weight: bold; font-size: 13px;`
            );

            console.groupEnd();
        });

        // Start observing LCP
        observer.observe({ type: "largest-contentful-paint", buffered: true });

        return () => observer.disconnect();
    }, [pageName]);

    return null;
}