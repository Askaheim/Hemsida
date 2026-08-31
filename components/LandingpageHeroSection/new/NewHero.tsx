import Image from "next/image";
import { LandingpageHeroSectionProps } from "../LandingpageHeroSection.types";
import ContentBox from "@/components/ContentBox/ContentBox";


const NewHero = ({ hero }: LandingpageHeroSectionProps) => {
    const { heroTitle, heroText, heroImage, heroBgImage, heroCtaPrimary, heroCtaSecondary } = hero;

    return (
        <div className="flex items-center justify-center relative w-full min-h-full h-full">
            <Image src={heroBgImage?.url || ""} alt={heroTitle || ""} fill className="absolute" />

            <ContentBox
                variant="light"
                heroTitle={heroTitle}
                heroText={heroText}
                heroImage={heroImage}
                heroCtaPrimary={heroCtaPrimary}
                heroCtaSecondary={heroCtaSecondary}
            />
        </div>
    );
}

export default NewHero;