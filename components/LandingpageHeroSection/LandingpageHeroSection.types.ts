export interface LandingpageHeroSectionProps {
    heroTitle?: string;
    heroText?: {
        json: {
            content: Array<{
                content: Array<{
                    value: string;
                }>;
            }>;
        };
    };
    heroCtaPrimary?: string;
    heroCtaSecondary?: string;
    heroImage?: {
        url: string;
        alt: string;
    };
}