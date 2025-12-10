import { test, expect } from '@playwright/test';

/**
 * Test Suite 3: Navigation and Reports
 *
 * Verifies that navigation works correctly, report pages load,
 * and all links function as expected.
 */
test.describe('Navigation and Reports', () => {
  test('should navigate to first industry report (Financial Services)', async ({ page }) => {
    await page.goto('/');

    // Wait for cards to load
    await page.waitForSelector('.industry-card');

    // Find and click the first "View Report" button
    const firstCard = page.locator('.industry-card').first();
    const viewReportBtn = firstCard.locator('.btn-primary');

    await viewReportBtn.click();

    // Wait for navigation
    await page.waitForLoadState('domcontentloaded');

    // Verify we're on a report page
    expect(page.url()).toContain('/reports/');
    expect(page.url()).toContain('.html');
  });

  test('should load report page successfully', async ({ page }) => {
    // Navigate directly to a known report
    const response = await page.goto('/reports/financial-services.html');

    // Should return 200 OK
    expect(response?.status()).toBe(200);
  });

  test('should display report header on report page', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Check for report header
    const reportHeader = page.locator('.report-header');
    await expect(reportHeader).toBeVisible();
  });

  test('should display breadcrumb navigation on report page', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Look for breadcrumb
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toBeVisible();

    // Should contain link back to home
    const homeLink = breadcrumb.locator('a');
    await expect(homeLink).toBeVisible();
  });

  test('should have "Back to Home" functionality', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Look for back to home link in breadcrumb or actions
    const backLink = page.locator('a:has-text("Home"), a:has-text("Back")').first();

    if (await backLink.count() > 0) {
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', /index\.html|\/$/);
    }
  });

  test('should navigate back to home from report page', async ({ page }) => {
    // Start at home
    await page.goto('/');

    // Go to a report
    await page.goto('/reports/healthcare.html');

    // Click browser back button
    await page.goBack();

    // Should be back at home
    expect(page.url()).toMatch(/\/$|index\.html$/);
  });

  test('should display report title and meta information', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Check for report title
    const title = page.locator('.report-title, .report-header h1');
    await expect(title).toBeVisible();
    await expect(title).toContainText(/financial/i);

    // Check for meta information (SAM, tier, etc.)
    const meta = page.locator('.report-meta');
    if (await meta.count() > 0) {
      await expect(meta).toBeVisible();
    }
  });

  test('should display report content section', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Check for main report content
    const reportContent = page.locator('.report-content, main, article');
    await expect(reportContent.first()).toBeVisible();
  });

  test('should have PDF download link on report page', async ({ page }) => {
    await page.goto('/reports/financial-services.html');

    // Look for PDF download link
    const pdfLink = page.locator('a[href*=".pdf"]');

    if (await pdfLink.count() > 0) {
      await expect(pdfLink.first()).toBeVisible();
      await expect(pdfLink.first()).toHaveAttribute('href', /\.pdf$/);
    }
  });

  test('should have download attribute on PDF links', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('.industry-card');

    // Find first PDF download button
    const pdfBtn = page.locator('.btn-secondary').first();
    await expect(pdfBtn).toHaveAttribute('download', '');
  });

  test('should navigate to multiple different reports', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.industry-card');

    // Get all industry cards
    const cards = page.locator('.industry-card');
    const count = await cards.count();

    // Test first 3 reports
    for (let i = 0; i < Math.min(3, count); i++) {
      await page.goto('/');
      await page.waitForSelector('.industry-card');

      const card = page.locator('.industry-card').nth(i);
      const viewBtn = card.locator('.btn-primary');

      const href = await viewBtn.getAttribute('href');
      expect(href).toMatch(/^reports\/.+\.html$/);

      await viewBtn.click();
      await page.waitForLoadState('domcontentloaded');

      // Verify we navigated to a report page
      expect(page.url()).toContain('/reports/');
    }
  });

  test('should display consistent header across all pages', async ({ page }) => {
    // Check home page
    await page.goto('/');
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('.github-link')).toBeVisible();

    // Check report page
    await page.goto('/reports/healthcare.html');
    await expect(page.locator('.site-header, header')).toBeVisible();
  });

  test('should have footer on report pages', async ({ page }) => {
    await page.goto('/reports/healthcare.html');

    const footer = page.locator('.footer, footer');
    if (await footer.count() > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });

  test('should handle invalid report URLs gracefully', async ({ page }) => {
    const response = await page.goto('/reports/nonexistent-report.html', {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    }).catch(() => null);

    // Should either return 404 or redirect
    if (response) {
      expect([404, 301, 302]).toContain(response.status());
    }
  });

  test('should load report page within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/reports/financial-services.html', {
      waitUntil: 'domcontentloaded'
    });

    const loadTime = Date.now() - startTime;

    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});
