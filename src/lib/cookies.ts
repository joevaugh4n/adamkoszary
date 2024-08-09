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

const STORAGE_KEY = "cookieChoice";

export function getCookieConsent(): boolean {
    if (typeof window === 'undefined') return false;

    // Check for test cookie first
    const testCookie = document.cookie.split('; ').find(row => row.startsWith('testCookieChoice='));
    if (testCookie) {
        const [, value] = testCookie.split('=');
        return value === 'accept';
    }

    // Existing localStorage logic
    const storedChoice = localStorage.getItem(STORAGE_KEY);
    if (!storedChoice) return false;

    try {
        const { value, expiry } = JSON.parse(storedChoice);
        if (Date.now() > expiry) {
            localStorage.removeItem(STORAGE_KEY);
            return false;
        }
        return value === 'accept';
    } catch (error) {
        console.error("Error parsing cookie consent:", error);
        return false;
    }
}