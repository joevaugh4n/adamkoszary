import { test, expect, chromium, firefox, webkit } from '@playwright/test';

// Define the list of browsers you want to test
const browsers = [chromium, firefox, webkit];

// Function to run tests in multiple browsers
for (const browserType of browsers) {
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
};