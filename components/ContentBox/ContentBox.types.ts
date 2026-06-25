export interface ContentBoxProps {
    heroTitle?: string;
    heroText: {
        json: {
            content: Array<{
                content: Array<{
                    value: string;
                }>;
            }>;
        }
    };
    heroImage?: {
        url: string;
    };
    heroCtaPrimary?: string;
    heroCtaSecondary?: string;
    variant?: 'light' | 'dark';
}
