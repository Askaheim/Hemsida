"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";
import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";
import ContentBox from "../ContentBox/ContentBox";
import { AnimationGeneratorType, motion, Variants } from 'framer-motion';
import NewHero from "./new/NewHero";

const LandingpageHeroSection = ({ hero }: LandingpageHeroSectionProps) => {
    const { heroTitle, heroText, heroImage, heroCtaPrimary, heroCtaSecondary } = hero;

    // slideIn function with delay built-in
    const slideIn = (
        direction: string,
        type: AnimationGeneratorType | undefined,
        delay: number,
        duration: number
    ): Variants => ({
        hidden: {
            y: direction === 'down' ? '-100%' : direction === 'up' ? '100%' : 0,
            x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay, // This is your delay parameter (seconds)
                duration: duration,
                ease: "easeOut"
            },
        },
    });

    return (
        <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#fff" }}>
            <NewHero hero={hero} />
        </section>
    );
}

export default LandingpageHeroSection;