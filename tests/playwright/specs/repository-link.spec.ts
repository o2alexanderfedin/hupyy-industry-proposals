import { test, expect } from '@playwright/test';

/**
 * Test Suite 2: Repository Link
 *
 * Verifies that the "View on GitHub" link is present in the header,
 * correctly styled, and functions properly.
 */
test.describe('Repository Link', () => {
  test('should display site header with navigation', async ({ page }) => {
    await page.goto('/');

    // Verify header exists
    const header = page.locator('.site-header');
    await expect(header).toBeVisible();

    // Verify navigation exists
    const nav = page.locator('.header-nav');
    await expect(nav).toBeVisible();
  });

  test('should display logo/branding in header', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('.logo-text');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Hupyy Industry Research');
  });

  test('should display "View on GitHub" button in header', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');
    await expect(githubLink).toBeVisible();

    // Check text is visible
    const githubText = page.locator('.github-text');
    await expect(githubText).toContainText('View on GitHub');
  });

  test('should have GitHub icon in the button', async ({ page }) => {
    await page.goto('/');

    const githubIcon = page.locator('.github-icon');
    await expect(githubIcon).toBeVisible();

    // Verify it's an SVG
    const svg = page.locator('.github-link svg');
    await expect(svg).toBeVisible();
  });

  test('should link to correct repository URL', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/o2alexanderfedin/hupyy-industry-proposals'
    );
  });

  test('should open link in new tab', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should have security attributes (noopener noreferrer)', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');
    const relAttr = await githubLink.getAttribute('rel');

    expect(relAttr).toContain('noopener');
    expect(relAttr).toContain('noreferrer');
  });

  test('should have proper ARIA label for accessibility', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');
    await expect(githubLink).toHaveAttribute('aria-label', /github/i);
  });

  test('should have Material Design styling (primary color)', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');

    // Get computed styles
    const backgroundColor = await githubLink.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Primary color #1976D2 should be rgb(25, 118, 210)
    expect(backgroundColor).toBe('rgb(25, 118, 210)');
  });

  test('should have hover effect', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.github-link');

    // Get initial background color
    const initialBg = await githubLink.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Hover over the link
    await githubLink.hover();

    // Wait a bit for transition
    await page.waitForTimeout(100);

    // Get background after hover
    const hoverBg = await githubLink.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Hover color should be darker (primary-dark #1565C0 = rgb(21, 101, 192))
    expect(hoverBg).toBe('rgb(21, 101, 192)');
  });

  test('should be positioned in top-right of header', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('.header-nav');
    const justifyContent = await nav.evaluate((el) => {
      return window.getComputedStyle(el).justifyContent;
    });

    // Should use space-between or flex-end for right positioning
    expect(['space-between', 'flex-end']).toContain(justifyContent);
  });

  test('should navigate to repository when clicked in new context', async ({ page, context }) => {
    await page.goto('/');

    // Listen for new page
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('.github-link').click()
    ]);

    // Wait for new page to load
    await newPage.waitForLoadState('domcontentloaded');

    // Verify new page URL
    expect(newPage.url()).toContain('github.com/o2alexanderfedin/hupyy-industry-proposals');
  });

  test('should remain visible when scrolling (sticky header)', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('.site-header');
    const githubLink = page.locator('.github-link');

    // Link should be visible initially
    await expect(githubLink).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    // Wait for scroll
    await page.waitForTimeout(100);

    // Header and link should still be visible (sticky)
    await expect(header).toBeVisible();
    await expect(githubLink).toBeVisible();
  });
});
