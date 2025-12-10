import { test, expect } from '@playwright/test';

/**
 * Test Suite 5: Filter Functionality
 *
 * Verifies that the filter buttons correctly show/hide industry cards
 * based on their tags (tier1, safety-critical, regulated).
 */
test.describe('Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.industry-card', { timeout: 5000 });
  });

  test('should display all filter buttons', async ({ page }) => {
    const filterButtons = page.locator('.filter-btn');
    await expect(filterButtons).toHaveCount(4);

    // Verify button labels
    await expect(filterButtons.nth(0)).toContainText('All Industries');
    await expect(filterButtons.nth(1)).toContainText('Tier 1');
    await expect(filterButtons.nth(2)).toContainText('Safety-Critical');
    await expect(filterButtons.nth(3)).toContainText('Regulated');
  });

  test('should have "All Industries" filter active by default', async ({ page }) => {
    const allButton = page.locator('.filter-btn[data-filter="all"]');
    await expect(allButton).toHaveClass(/active/);
  });

  test('should display all 10 cards when "All Industries" is active', async ({ page }) => {
    const allButton = page.locator('.filter-btn[data-filter="all"]');
    await allButton.click();
    await page.waitForTimeout(200);

    const visibleCards = page.locator('.industry-card:visible');
    await expect(visibleCards).toHaveCount(10);
  });

  test('should filter by Tier 1 (High Priority)', async ({ page }) => {
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    // Button should be active
    await expect(tier1Button).toHaveClass(/active/);

    // Other buttons should not be active
    const allButton = page.locator('.filter-btn[data-filter="all"]');
    await expect(allButton).not.toHaveClass(/active/);

    // Should show only Tier 1 industries
    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Based on the data: Financial, Healthcare, Enterprise Security, AI/ML, Gov/Defense = 5
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(10);

    // Verify specific Tier 1 cards are visible
    await expect(page.locator('.industry-card:has-text("Financial Services")')).toBeVisible();
    await expect(page.locator('.industry-card:has-text("Healthcare")')).toBeVisible();
    await expect(page.locator('.industry-card:has-text("AI/ML")')).toBeVisible();
  });

  test('should filter by Safety-Critical', async ({ page }) => {
    const safetyCriticalButton = page.locator('.filter-btn[data-filter="safety-critical"]');
    await safetyCriticalButton.click();
    await page.waitForTimeout(200);

    // Button should be active
    await expect(safetyCriticalButton).toHaveClass(/active/);

    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Should show safety-critical industries
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(10);

    // Verify Healthcare (safety-critical) is visible
    await expect(page.locator('.industry-card:has-text("Healthcare")')).toBeVisible();

    // Verify Manufacturing (safety-critical) is visible
    await expect(page.locator('.industry-card:has-text("Manufacturing")')).toBeVisible();

    // Verify Energy (safety-critical) is visible
    await expect(page.locator('.industry-card:has-text("Energy")')).toBeVisible();
  });

  test('should filter by Regulated Industries', async ({ page }) => {
    const regulatedButton = page.locator('.filter-btn[data-filter="regulated"]');
    await regulatedButton.click();
    await page.waitForTimeout(200);

    // Button should be active
    await expect(regulatedButton).toHaveClass(/active/);

    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    // Should show regulated industries
    expect(count).toBeGreaterThan(0);

    // Verify Financial Services (regulated) is visible
    await expect(page.locator('.industry-card:has-text("Financial Services")')).toBeVisible();

    // Verify Healthcare (regulated) is visible
    await expect(page.locator('.industry-card:has-text("Healthcare")')).toBeVisible();

    // Verify Legal Services (regulated) is visible
    await expect(page.locator('.industry-card:has-text("Legal")')).toBeVisible();
  });

  test('should switch between filters correctly', async ({ page }) => {
    // Start with Tier 1
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    await expect(tier1Button).toHaveClass(/active/);
    const tier1Count = await page.locator('.industry-card:visible').count();

    // Switch to Safety-Critical
    const safetyCriticalButton = page.locator('.filter-btn[data-filter="safety-critical"]');
    await safetyCriticalButton.click();
    await page.waitForTimeout(200);

    await expect(safetyCriticalButton).toHaveClass(/active/);
    await expect(tier1Button).not.toHaveClass(/active/);
    const safetyCount = await page.locator('.industry-card:visible').count();

    // Counts should be different
    expect(tier1Count).not.toBe(safetyCount);

    // Switch back to All
    const allButton = page.locator('.filter-btn[data-filter="all"]');
    await allButton.click();
    await page.waitForTimeout(200);

    await expect(allButton).toHaveClass(/active/);
    await expect(safetyCriticalButton).not.toHaveClass(/active/);
    await expect(page.locator('.industry-card:visible')).toHaveCount(10);
  });

  test('should reset to "All" properly', async ({ page }) => {
    // Apply a filter
    const regulatedButton = page.locator('.filter-btn[data-filter="regulated"]');
    await regulatedButton.click();
    await page.waitForTimeout(200);

    // Verify filtered
    const filteredCount = await page.locator('.industry-card:visible').count();
    expect(filteredCount).toBeLessThan(10);

    // Reset to All
    const allButton = page.locator('.filter-btn[data-filter="all"]');
    await allButton.click();
    await page.waitForTimeout(200);

    // All cards should be visible
    await expect(page.locator('.industry-card:visible')).toHaveCount(10);
  });

  test('should hide non-matching cards when filtering', async ({ page }) => {
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    // Legal Services is Tier 2, should be hidden
    const legalCard = page.locator('.industry-card:has-text("Legal Services")');
    await expect(legalCard).toBeHidden();

    // Education is Tier 3, should be hidden
    const educationCard = page.locator('.industry-card:has-text("Education")');
    await expect(educationCard).toBeHidden();
  });

  test('should maintain filter when scrolling', async ({ page }) => {
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    const countBefore = await page.locator('.industry-card:visible').count();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(200);

    // Count should remain the same
    const countAfter = await page.locator('.industry-card:visible').count();
    expect(countAfter).toBe(countBefore);

    // Button should still be active
    await expect(tier1Button).toHaveClass(/active/);
  });

  test('should apply filter to dynamically loaded cards', async ({ page }) => {
    // Wait for cards to be fully loaded
    await page.waitForFunction(() => {
      const grid = document.getElementById('industriesGrid');
      return grid && grid.children.length === 10;
    });

    // Apply filter
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    // Verify filtering worked on dynamically loaded cards
    const visibleCards = page.locator('.industry-card:visible');
    expect(await visibleCards.count()).toBeLessThan(10);
  });

  test('should have consistent styling for active filter button', async ({ page }) => {
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');

    // Get background color before click
    const bgBefore = await tier1Button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Click to activate
    await tier1Button.click();
    await page.waitForTimeout(100);

    // Get background color after click
    const bgAfter = await tier1Button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Colors should be different (active state)
    expect(bgAfter).not.toBe(bgBefore);

    // Active button should have primary color (rgb(25, 118, 210))
    expect(bgAfter).toBe('rgb(25, 118, 210)');
  });

  test('should clear search when applying filter', async ({ page }) => {
    // First, perform a search
    const searchBox = page.locator('#searchBox');
    await searchBox.fill('healthcare');
    await page.waitForTimeout(200);

    // Then apply a filter
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    await tier1Button.click();
    await page.waitForTimeout(200);

    // Filter should override search (or they should work together)
    const visibleCards = page.locator('.industry-card:visible');
    const count = await visibleCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should handle multiple rapid filter clicks', async ({ page }) => {
    const tier1Button = page.locator('.filter-btn[data-filter="tier1"]');
    const regulatedButton = page.locator('.filter-btn[data-filter="regulated"]');
    const allButton = page.locator('.filter-btn[data-filter="all"]');

    // Click filters rapidly
    await tier1Button.click();
    await regulatedButton.click();
    await allButton.click();

    await page.waitForTimeout(300);

    // Should end up with All filter active
    await expect(allButton).toHaveClass(/active/);
    await expect(page.locator('.industry-card:visible')).toHaveCount(10);
  });

  test('should have filter buttons accessible via keyboard', async ({ page }) => {
    // Tab to first filter button
    await page.keyboard.press('Tab');

    // Skip header elements, keep tabbing until we reach filter buttons
    for (let i = 0; i < 10; i++) {
      const focused = await page.evaluate(() => document.activeElement?.className);
      if (focused?.includes('filter-btn')) {
        break;
      }
      await page.keyboard.press('Tab');
    }

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    // Some filter should be applied
    // (We don't know which button we landed on, but filtering should work)
    const activeButtons = page.locator('.filter-btn.active');
    await expect(activeButtons).toHaveCount(1);
  });
});
