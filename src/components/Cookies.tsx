import React, { useState } from "react";
import { type CookieBannerProps, type CookieChoice } from "../lib/cookies";

const STORAGE_KEY = "cookieChoice";

function CookieBanner({ GA_MEASUREMENT_ID }: CookieBannerProps) {
  const [cookieChoice, setCookieChoice] = useState<CookieChoice | null>(null);

  function getStorageItem(key: string): CookieChoice | null {
    if (typeof window !== "undefined" && window.localStorage) {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const { value, expiry } = JSON.parse(item);
      if (Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return value as CookieChoice;
    }
    return null;
  }

  function setStorageItem(
    key: string,
    value: CookieChoice,
    expiryDays: number
  ) {
    if (typeof window !== "undefined" && window.localStorage) {
      const expiry = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify({ value, expiry }));
    }
  }

  function handleCookieChoice(choice: CookieChoice) {
    console.log(`Cookie choice: ${choice}`);
    setStorageItem(STORAGE_KEY, choice, 365); // Store for 1 year
    setCookieChoice(choice);
    if (choice === "accept") {
      loadGoogleAnalytics();
    }
  }

  function loadGoogleAnalytics() {
    console.log("Loading Google Analytics");
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}';
    `;
    document.head.appendChild(script2);
  }

  function renderCookieBanner() {
    const existingChoice = getStorageItem(STORAGE_KEY);
    if (existingChoice === "accept") {
      return null; // Don't render the cookie banner if the user has accepted
    }

    return (
      <div
        id="cookie-banner"
        className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-md z-50 px-4 pb-4 pt-2"
      >
        <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col items-center justify-between">
          <p className="py-4 px-4 sm:mb-0 text-sm text-black text-pretty">
            We use cookies to make this service work and analyse performance.&nbsp;
            <a
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Privacy Policy
            </a>
          </p>
          <div>
            <button
              id="accept-cookies"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleCookieChoice("accept")}
            >
              Accept
            </button>
            <button
              id="decline-cookies"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => handleCookieChoice("decline")}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  return renderCookieBanner();
}

export default CookieBanner;
