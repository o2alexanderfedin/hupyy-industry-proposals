import { test, expect } from '@playwright/test';

/**
 * Test Suite 1: Site Accessibility
 *
 * Verifies that the GitHub Pages deployment is accessible and displays
 * all key elements correctly.
 */
test.describe('Site Accessibility', () => {
  test('should load index.html successfully with 200 status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('should display hero section with correct content', async ({ page }) => {
    await page.goto('/');

    // Check hero section is visible
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Verify main heading
    const heading = page.locator('.hero h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Hupyy Industry Research Reports');

    // Verify hero description
    const description = page.locator('.hero p');
    await expect(description).toBeVisible();
    await expect(description).toContainText('$75-115B');
  });

  test('should display hero stats section', async ({ page }) => {
    await page.goto('/');

    // Check all three stats are visible
    const stats = page.locator('.hero-stats .stat');
    await expect(stats).toHaveCount(3);

    // Verify SAM stat
    const samStat = stats.first();
    await expect(samStat).toContainText('$75-115B');
    await expect(samStat).toContainText('SAM by 2030');

    // Verify industries stat
    const industriesStat = stats.nth(1);
    await expect(industriesStat).toContainText('10');
    await expect(industriesStat).toContainText('Industries Analyzed');

    // Verify technologies stat
    const techStat = stats.nth(2);
    await expect(techStat).toContainText('3');
    await expect(techStat).toContainText('Core Technologies');
  });

  test('should display technology overview section', async ({ page }) => {
    await page.goto('/');

    // Check technology section exists
    const techSection = page.locator('.tech-overview');
    await expect(techSection).toBeVisible();

    // Verify section heading
    await expect(techSection.locator('h2')).toContainText('Hupyy Technologies Platform');

    // Verify all three technology cards
    const techCards = page.locator('.tech-card');
    await expect(techCards).toHaveCount(3);

    // Verify tech card titles
    await expect(techCards.nth(0).locator('h3')).toContainText('Hupyy KB Platform');
    await expect(techCards.nth(1).locator('h3')).toContainText('Formal Verification Engine');
    await expect(techCards.nth(2).locator('h3')).toContainText('Autonomous SE Platform');
  });

  test('should display all 10 industry cards', async ({ page }) => {
    await page.goto('/');

    // Wait for JavaScript to render cards
    await page.waitForSelector('.industry-card', { timeout: 5000 });

    // Count industry cards
    const cards = page.locator('.industry-card');
    await expect(cards).toHaveCount(10);
  });

  test('should display search and filter section', async ({ page }) => {
    await page.goto('/');

    // Check search box
    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toHaveAttribute('placeholder', /search/i);

    // Check filter buttons
    const filterButtons = page.locator('.filter-btn');
    await expect(filterButtons).toHaveCount(4);

    // Verify filter button labels
    await expect(filterButtons.nth(0)).toContainText('All Industries');
    await expect(filterButtons.nth(1)).toContainText('Tier 1');
    await expect(filterButtons.nth(2)).toContainText('Safety-Critical');
    await expect(filterButtons.nth(3)).toContainText('Regulated');
  });

  test('should display footer with copyright', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('2025 Hupyy Technologies');
  });

  test('should have proper page title and meta tags', async ({ page }) => {
    await page.goto('/');

    // Verify page title
    await expect(page).toHaveTitle(/Hupyy Industry Research Reports/);

    // Verify meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /comprehensive market analysis/i);
  });

  test('should load required stylesheets', async ({ page }) => {
    await page.goto('/');

    // Check main CSS is loaded
    const mainCss = page.locator('link[href="assets/css/main.css"]');
    await expect(mainCss).toHaveCount(1);

    // Check Google Fonts is loaded
    const googleFonts = page.locator('link[href*="fonts.googleapis.com"]');
    await expect(googleFonts.first()).toHaveCount(1);
  });

  test('should load JavaScript and render dynamic content', async ({ page }) => {
    await page.goto('/');

    // Wait for JS to execute and render cards
    await page.waitForFunction(() => {
      const grid = document.getElementById('industriesGrid');
      return grid && grid.children.length === 10;
    }, { timeout: 5000 });

    // Verify cards were rendered by JavaScript
    const grid = page.locator('#industriesGrid');
    const cards = grid.locator('.industry-card');
    await expect(cards).toHaveCount(10);
  });
});
