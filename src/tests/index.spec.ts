import { test, expect, chromium, firefox, webkit } from '@playwright/test';

// Define the list of browsers you want to test
const browsers = [chromium, firefox, webkit];

// Function to run tests in multiple browsers
for (const browserType of browsers) {
    test.describe(`Cookie Banner Tests in ${browserType.name()}`, () => {
        test.describe(`Testing in ${browserType.name()}`, () => {

            test('Cookie banner is visible on initial load', async ({ context }) => {
                const page = await context.newPage();
                await page.goto('http://localhost:4321/');

                const cookieBanner = page.locator('#cookie-banner');
                await expect(cookieBanner).toBeVisible();
            });

            test('Accepting cookies hides banner', async ({ context }) => {
                const page = await context.newPage();
                await page.goto('http://localhost:4321/');

                const acceptButton = page.locator('#accept-cookies');
                await acceptButton.click();

                const cookieBanner = page.locator('#cookie-banner');
                await expect(cookieBanner).not.toBeVisible();
            });

            test('Declining cookies hides banner', async ({ context }) => {
                const page = await context.newPage();
                await page.goto('http://localhost:4321/');

                const declineButton = page.locator('#decline-cookies');
                await declineButton.click();

                const cookieBanner = page.locator('#cookie-banner');
                await expect(cookieBanner).not.toBeVisible();
            });

            test('Banner remains hidden on subsequent visits after accepting', async ({ context }) => {
                const page = await context.newPage();

                // Simulate accepted cookies using localStorage
                await page.evaluate(() => {
                    const expiryDays = 365;
                    const expiry = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
                    localStorage.setItem('cookieChoice', JSON.stringify({ value: 'accept', expiry }));
                });

                await page.goto('http://localhost:4321/');

                const cookieBanner = page.locator('#cookie-banner');
                await expect(cookieBanner).not.toBeVisible();
            });

            test('Banner remains hidden on subsequent visits after declining', async ({ context }) => {
                const page = await context.newPage();

                // Simulate declined cookies using localStorage
                await page.evaluate(() => {
                    const expiryDays = 30;
                    const expiry = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
                    localStorage.setItem('cookieChoice', JSON.stringify({ value: 'decline', expiry }));
                });

                await page.goto('http://localhost:4321/');

                const cookieBanner = page.locator('#cookie-banner');
                await expect(cookieBanner).not.toBeVisible();
            });

            test('Google Analytics loads after accepting cookies', async ({ context }) => {
                const page = await context.newPage();
                await page.goto('http://localhost:4321/');

                const acceptButton = page.locator('#accept-cookies');
                await acceptButton.click();

                // Wait for Google Analytics script to load
                await page.waitForFunction(() => window.gtag !== undefined, null, { timeout: 5000 });

                const gaScript = page.locator('script[src^="https://www.googletagmanager.com/gtag/js"]');
                await expect(gaScript).toBeAttached();
            });
        });

        test('meta is correct and elements are present', async () => {
            const browser = await browserType.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            // Go to the page
            await page.goto('http://localhost:4321/');

            // Check the page title
            await expect(page).toHaveTitle('Adam Koszary');

            // Check meta description
            const metaDescription = await page.locator('meta[name="description"]');
            await expect(metaDescription).toHaveAttribute('content', 'Adam Koszary is an expert in social media and digital engagement for museums, galleries, libraries, archives, and theatres.');

            // Wait for the header to be visible
            const header = page.locator('[data-testid="page-header"]');
            await header.waitFor({ state: 'visible', timeout: 10000 });

            // Check Header title
            const headerTitle = page.locator('header#home h1');
            await expect(headerTitle).toHaveText('Adam Koszary');

            // Take a screenshot of the page
            await page.screenshot({ path: `${browserType.name()}_homepage_screenshot.png`, fullPage: true });

            console.info('Playwright test passed: meta is correct and homepage elements are present');

            await browser.close();
        });

        test('blogpost loads correctly', async () => {
            const browser = await browserType.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            // Go to the page
            await page.goto('http://localhost:4321/posts/we-need-three-skillsets-for-great-content/');

            // Check the page title
            await expect(page).toHaveTitle('We need three skillsets for great content | Adam Koszary');

            // Take a screenshot of the page
            await page.screenshot({ path: `${browserType.name()}_blogpost_screenshot.png`, fullPage: true });

            console.info('Playwright test passed: blogpost renders correctly');

            await browser.close();
        });

        test('posts page loads correctly', async () => {
            const browser = await browserType.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            // Go to the page
            await page.goto('http://localhost:4321/posts');

            // Check the page title
            await expect(page).toHaveTitle('Blog | Adam Koszary');

            // Check for post grid
            const postGrid = page.locator('[data-testid="posts-grid"]');
            await postGrid.waitFor({ state: 'visible', timeout: 10000 });

            // Take a screenshot of the page
            await page.screenshot({ path: `${browserType.name()}_posts_page_screenshot.png`, fullPage: true });

            console.info('Playwright test passed: posts page renders correctly');

            await browser.close();
        });
    });
}
