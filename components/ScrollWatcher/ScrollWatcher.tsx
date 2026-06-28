'use client';

import { useEffect } from 'react';

export default function ScrollWatcher() {
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        const html = document.documentElement;

        // Start by hiding the scrollbar thumb
        html.classList.add('hide-scrollbar');

        const handleScroll = () => {
            // User is scrolling -> reveal the scrollbar thumb
            html.classList.remove('hide-scrollbar');

            // Clear the previous timeout
            clearTimeout(scrollTimeout);

            // Set a timeout to hide it again after 1 second of no scrolling
            scrollTimeout = setTimeout(() => {
                html.classList.add('hide-scrollbar');
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return null; // This component doesn't render any HTML, it just runs the logic
}