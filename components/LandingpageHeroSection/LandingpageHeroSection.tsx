"use client";

import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";
import Image from "next/image";
import ContentBox from "../ContentBox/ContentBox";

const LandingpageHeroSection = ({ hero }: LandingpageHeroSectionProps) => {
    const { heroTitle, heroText, heroImage, heroBgImage, heroCtaPrimary, heroCtaSecondary } = hero;

    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={heroBgImage?.url || ""}
                    alt={heroTitle || ""}
                    fill
                    priority
                    className="absolute inset-0 object-cover object-center z-0"
                    sizes="100vw"
                    quality={90}
                />

                <div className="relative z-10">

                    <ContentBox
                        variant="light"
                        heroTitle={heroTitle}
                        heroText={heroText}
                        heroImage={heroImage}
                        heroCtaPrimary={heroCtaPrimary}
                        heroCtaSecondary={heroCtaSecondary}
                    />
                </div>
            </div>
        </section>
    );
}

export default LandingpageHeroSection;