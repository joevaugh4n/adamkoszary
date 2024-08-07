export interface CookieBannerProps {
    GA_MEASUREMENT_ID: string;
}

export type CookieChoice = 'accept' | 'decline';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}