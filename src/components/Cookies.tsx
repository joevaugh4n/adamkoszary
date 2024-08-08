import React, { useState, useEffect } from "react";
import { type CookieBannerProps, type CookieChoice } from "../lib/cookies";

const STORAGE_KEY = "cookieChoice";
const ACCEPT_EXPIRY_DAYS = 365; // 1 year
const DECLINE_EXPIRY_DAYS = 30;

function getStorageItem(key: string): CookieChoice | null {
  if (typeof window === "undefined" || !window.localStorage) return null;

  try {
    console.log("Getting storage item:", key);
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { value, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      console.log("Item expired, removing from storage:", key);
      return null;
    }
    return value as CookieChoice;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
}

function setStorageItem(key: string, value: CookieChoice, expiryDays: number) {
  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    const expiry = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
    console.log(`Setting storage item: ${key} = ${value}, expires in ${expiryDays} days`);
  } catch (error) {
    console.error("Error setting value in localStorage:", error);
  }
}

function CookieBanner({ GA_MEASUREMENT_ID }: CookieBannerProps) {
  const [cookieChoice, setCookieChoice] = useState<CookieChoice | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const existingChoice = getStorageItem(STORAGE_KEY);
    setCookieChoice(existingChoice);

    if (existingChoice === "accept") {
      console.log("Cookies accepted, loading Google Analytics");
      loadGoogleAnalytics();
    }

    setIsBannerVisible(existingChoice === null);
  }, []);

  function handleCookieChoice(choice: CookieChoice) {
    console.log(`Cookie choice: ${choice}`);
    setStorageItem(STORAGE_KEY, choice, choice === "accept" ? ACCEPT_EXPIRY_DAYS : DECLINE_EXPIRY_DAYS);
    setCookieChoice(choice);

    if (choice === "accept") {
      console.log("Cookies accepted, loading Google Analytics");
      loadGoogleAnalytics();
    }

    setIsBannerVisible(false);
  }

  function loadGoogleAnalytics() {
    console.log("Starting Google Analytics setup");
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);
    console.log("Google Analytics script added:", script1.src);

    const script2 = document.createElement("script");
    script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
    console.log("Google Analytics configuration script added");
  }

  if (cookieChoice !== null && !isBannerVisible) {
    return null;
  }

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className={`fixed bottom-0 left-0 right-0 bg-gray-100 shadow-md z-50 px-4 pb-4 pt-2 transition-opacity duration-500 ${
        isBannerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col items-center justify-between">
        <p className="py-4 px-4 sm:mb-0 text-sm text-black text-pretty">
          We use cookies to make this service work and analyse performance.
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
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button
            id="decline-cookies"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => handleCookieChoice("decline")}
            aria-label="Decline cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
