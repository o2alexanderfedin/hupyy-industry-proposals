import { test, expect } from '@playwright/test';

/**
 * Test Suite 4: Search Functionality
 *
 * Verifies that the search box correctly filters industry cards
 * based on user input.
 */
test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.industry-card', { timeout: 5000 });
  });

  test('should display search box', async ({ page }) => {
    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEditable();
  });

  test('should have placeholder text in search box', async ({ page }) => {
    const searchBox = page.locator('#searchBox');
    const placeholder = await searchBox.getAttribute('placeholder');

    expect(placeholder).toBeTruthy();
    expect(placeholder?.toLowerCase()).toContain('search');
  });

  test('should initially display all 10 industry cards', async ({ page }) => {
    const visibleCards = page.locator('.industry-card:visible');
    await expect(visibleCards).toHaveCount(10);
  });

  test('should filter cards when typing in search box', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Type "financial"
    await searchBox.fill('financial');

    // Wait a moment for filtering
    await page.waitForTimeout(300);

    // Should show only Financial Services card
    const visibleCards = page.locator('.industry-card[style*="flex"], .industry-card:not([style*="none"])');
    const count = await visibleCards.count();

    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(10);

    // Verify Financial Services card is visible
    const financialCard = page.locator('.industry-card:has-text("Financial Services")');
    await expect(financialCard).toBeVisible();
  });

  test('should filter by partial match (case insensitive)', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for "HEALTH" (uppercase)
    await searchBox.fill('HEALTH');
    await page.waitForTimeout(300);

    // Healthcare card should be visible
    const healthcareCard = page.locator('.industry-card:has-text("Healthcare")');
    await expect(healthcareCard).toBeVisible();
  });

  test('should filter by industry name', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for "Manufacturing"
    await searchBox.fill('Manufacturing');
    await page.waitForTimeout(300);

    // Only Manufacturing card should be visible
    const manufacturingCard = page.locator('.industry-card:has-text("Manufacturing")');
    await expect(manufacturingCard).toBeVisible();

    // Financial card should be hidden
    const financialCard = page.locator('.industry-card:has-text("Financial Services")');
    await expect(financialCard).toBeHidden();
  });

  test('should filter by keywords in summary', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for "verification" which appears in multiple summaries
    await searchBox.fill('verification');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Multiple cards should match
    expect(count).toBeGreaterThan(1);
  });

  test('should show empty results for non-existent search term', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for something that doesn't exist
    await searchBox.fill('xyznonexistent');
    await page.waitForTimeout(300);

    // All cards should be hidden
    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    expect(count).toBe(0);
  });

  test('should restore all cards when search is cleared', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // First, search for something
    await searchBox.fill('healthcare');
    await page.waitForTimeout(300);

    // Verify filtered
    let visibleCards = page.locator('.industry-card:visible');
    expect(await visibleCards.count()).toBeLessThan(10);

    // Clear search
    await searchBox.fill('');
    await page.waitForTimeout(300);

    // All 10 cards should be visible again
    visibleCards = page.locator('.industry-card:visible');
    await expect(visibleCards).toHaveCount(10);
  });

  test('should update results in real-time as user types', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Type incrementally
    await searchBox.fill('f');
    await page.waitForTimeout(200);
    const countF = await page.locator('.industry-card:visible').count();

    await searchBox.fill('fi');
    await page.waitForTimeout(200);
    const countFi = await page.locator('.industry-card:visible').count();

    await searchBox.fill('fin');
    await page.waitForTimeout(200);
    const countFin = await page.locator('.industry-card:visible').count();

    // Results should narrow down as we type more
    expect(countFin).toBeLessThanOrEqual(countFi);
    expect(countFi).toBeLessThanOrEqual(countF);
  });

  test('should search across both name and summary fields', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for term likely in summary but not name
    await searchBox.fill('compliance');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Should find multiple cards with compliance in summary
    expect(count).toBeGreaterThan(0);
  });

  test('should handle special characters in search', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search with special characters
    await searchBox.fill('AI/ML');
    await page.waitForTimeout(300);

    // Should find AI/ML Operations card
    const aiCard = page.locator('.industry-card:has-text("AI/ML")');
    await expect(aiCard).toBeVisible();
  });

  test('should handle numeric search terms', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search for market value
    await searchBox.fill('$10');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Should find cards with $10 in their content
    expect(count).toBeGreaterThan(0);
  });

  test('should maintain search state when typing quickly', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Type quickly without waiting
    await searchBox.type('software', { delay: 50 });

    // Wait for debounce/filtering
    await page.waitForTimeout(500);

    // Should show Software Development card
    const softwareCard = page.locator('.industry-card:has-text("Software Development")');
    await expect(softwareCard).toBeVisible();
  });

  test('should not break when searching with only whitespace', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    // Search with spaces
    await searchBox.fill('   ');
    await page.waitForTimeout(300);

    // Should show all cards (empty search)
    const visibleCards = page.locator('.industry-card:visible');
    await expect(visibleCards).toHaveCount(10);
  });

  test('should focus search box when clicking on it', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    await searchBox.click();

    // Verify focus
    const isFocused = await searchBox.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });
});
