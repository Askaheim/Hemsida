export interface ContentBoxProps {
    heroTitle?: string;
    heroText?: string;
    heroImage?: {
        url: string;
        alt: string;
    };
    heroCtaPrimary?: string;
    heroCtaSecondary?: string;
    variant?: 'light' | 'dark';
}
