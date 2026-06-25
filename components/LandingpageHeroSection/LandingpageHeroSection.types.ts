export interface LandingpageHeroSectionProps {
    hero: {
        heroTitle?: string;
        heroText: {
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

        };
    };
}

export interface TileProps {
    col: number;
    row: number;
    delay: number;
    gridOffsetX: number;
    gridOffsetY: number;
    materials: any;
    geometry: any;
}