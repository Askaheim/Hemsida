export interface ContentBoxProps {
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
    heroImage?: {
        url: string;
        alt: string;
    };
    heroCtaPrimary?: string;
    heroCtaSecondary?: string;
    variant?: 'light' | 'dark';
}
