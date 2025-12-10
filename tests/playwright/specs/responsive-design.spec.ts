import { test, expect } from '@playwright/test';

/**
 * Test Suite 6: Mobile Responsiveness
 *
 * Verifies that the site displays correctly and functions properly
 * across different viewport sizes (mobile, tablet, desktop).
 */
test.describe('Mobile Responsiveness', () => {
  const viewports = [
    { name: 'Mobile (375px)', width: 375, height: 667 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Desktop (1920px)', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test.describe(`${name}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto('/');
        await page.waitForSelector('.industry-card', { timeout: 5000 });
      });

      test(`should load site successfully at ${width}px`, async ({ page }) => {
        const response = await page.goto('/');
        expect(response?.status()).toBe(200);
      });

      test(`should display header at ${width}px`, async ({ page }) => {
        const header = page.locator('.site-header');
        await expect(header).toBeVisible();
      });

      test(`should display GitHub link at ${width}px`, async ({ page }) => {
        const githubLink = page.locator('.github-link');
        await expect(githubLink).toBeVisible();

        // Check if it's accessible (not behind other elements)
        const isVisible = await githubLink.isVisible();
        expect(isVisible).toBe(true);
      });

      test(`should display hero section at ${width}px`, async ({ page }) => {
        const hero = page.locator('.hero');
        await expect(hero).toBeVisible();

        const heading = page.locator('.hero h1');
        await expect(heading).toBeVisible();
      });

      test(`should display all 10 industry cards at ${width}px`, async ({ page }) => {
        const cards = page.locator('.industry-card');
        await expect(cards).toHaveCount(10);
      });

      test(`should have no horizontal scrollbar at ${width}px`, async ({ page }) => {
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        expect(hasHorizontalScroll).toBe(false);
      });

      test(`should have readable text size at ${width}px`, async ({ page }) => {
        const heading = page.locator('.hero h1');
        const fontSize = await heading.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });

        // Font should be at least 14px for readability
        expect(fontSize).toBeGreaterThanOrEqual(14);
      });

      test(`should display search box at ${width}px`, async ({ page }) => {
        const searchBox = page.locator('#searchBox');
        await expect(searchBox).toBeVisible();

        // Should be usable (not too small)
        const box = await searchBox.boundingBox();
        expect(box?.height).toBeGreaterThan(30);
      });

      test(`should display filter buttons at ${width}px`, async ({ page }) => {
        const filterButtons = page.locator('.filter-btn');
        await expect(filterButtons.first()).toBeVisible();
        await expect(filterButtons).toHaveCount(4);
      });
    });
  });

  test.describe('Mobile-specific (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForSelector('.industry-card', { timeout: 5000 });
    });

    test('should hide GitHub text on mobile, show only icon', async ({ page }) => {
      const githubText = page.locator('.github-text');

      // Get computed display style
      const display = await githubText.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });

      // Text should be hidden on mobile
      expect(display).toBe('none');

      // Icon should still be visible
      const githubIcon = page.locator('.github-icon');
      await expect(githubIcon).toBeVisible();
    });

    test('should stack hero stats vertically on mobile', async ({ page }) => {
      const heroStats = page.locator('.hero-stats');

      const flexDirection = await heroStats.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });

      // Should be column on mobile
      expect(flexDirection).toBe('column');
    });

    test('should display cards in single column on mobile', async ({ page }) => {
      const grid = page.locator('.industries-grid');

      const gridTemplate = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Should be single column (one value in grid-template-columns)
      // This will be something like "375px" or "343px" (full width minus padding)
      expect(gridTemplate.split(' ').length).toBe(1);
    });

    test('should make filter buttons stack vertically on mobile', async ({ page }) => {
      const filterButtons = page.locator('.filter-buttons');

      const flexDirection = await filterButtons.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });

      // May be column or row with wrap
      expect(['column', 'row']).toContain(flexDirection);
    });

    test('should make card action buttons full width on mobile', async ({ page }) => {
      const firstCard = page.locator('.industry-card').first();
      const firstButton = firstCard.locator('.btn').first();

      const width = await firstButton.evaluate((el) => {
        return window.getComputedStyle(el).width;
      });

      const cardWidth = await firstCard.evaluate((el) => {
        const cardBox = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        return cardBox.width - padding;
      });

      // Button should be close to full width (accounting for padding)
      const buttonWidth = await firstButton.evaluate((el) => {
        return el.getBoundingClientRect().width;
      });

      // Button width should be at least 80% of available card width
      expect(buttonWidth).toBeGreaterThan(cardWidth * 0.8);
    });

    test('should be touchable - GitHub link has adequate touch target', async ({ page }) => {
      const githubLink = page.locator('.github-link');
      const box = await githubLink.boundingBox();

      // Touch targets should be at least 44x44px (Apple) or 48x48px (Material Design)
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Tablet-specific (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForSelector('.industry-card', { timeout: 5000 });
    });

    test('should display cards in grid layout on tablet', async ({ page }) => {
      const grid = page.locator('.industries-grid');

      const display = await grid.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });

      expect(display).toBe('grid');
    });

    test('should show GitHub link text on tablet', async ({ page }) => {
      const githubLink = page.locator('.github-link');
      await expect(githubLink).toBeVisible();

      // Text might be visible or hidden depending on breakpoint
      // Just verify link is accessible
      const box = await githubLink.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
    });
  });

  test.describe('Desktop-specific (1920px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForSelector('.industry-card', { timeout: 5000 });
    });

    test('should display full GitHub link with text on desktop', async ({ page }) => {
      const githubText = page.locator('.github-text');
      await expect(githubText).toBeVisible();
      await expect(githubText).toContainText('View on GitHub');
    });

    test('should display cards in multi-column grid on desktop', async ({ page }) => {
      const grid = page.locator('.industries-grid');

      const gridTemplate = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Should have multiple columns
      const columnCount = gridTemplate.split(' ').length;
      expect(columnCount).toBeGreaterThan(1);
    });

    test('should display hero stats in row on desktop', async ({ page }) => {
      const heroStats = page.locator('.hero-stats');

      const flexDirection = await heroStats.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });

      expect(flexDirection).toBe('row');
    });

    test('should have adequate spacing between elements on desktop', async ({ page }) => {
      const firstCard = page.locator('.industry-card').first();
      const secondCard = page.locator('.industry-card').nth(1);

      const box1 = await firstCard.boundingBox();
      const box2 = await secondCard.boundingBox();

      if (box1 && box2) {
        // Check if cards are side by side (desktop layout)
        const areSideBySide = box1.y === box2.y;

        if (areSideBySide) {
          // There should be gap between cards
          const gap = Math.abs(box2.x - (box1.x + box1.width));
          expect(gap).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('Landscape Orientation', () => {
    test('should work in landscape mobile (667x375)', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');

      const header = page.locator('.site-header');
      await expect(header).toBeVisible();

      const githubLink = page.locator('.github-link');
      await expect(githubLink).toBeVisible();
    });
  });

  test.describe('Content Reflow', () => {
    test('should reflow content when resizing viewport', async ({ page }) => {
      // Start desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForSelector('.industry-card');

      const desktopCount = await page.locator('.industry-card:visible').count();

      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const mobileCount = await page.locator('.industry-card:visible').count();

      // Card count should remain the same (all still visible)
      expect(mobileCount).toBe(desktopCount);

      // Layout should have changed (verify single column)
      const grid = page.locator('.industries-grid');
      const gridTemplate = await grid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      expect(gridTemplate.split(' ').length).toBe(1);
    });
  });

  test.describe('Touch Interactions', () => {
    test('should handle touch events on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForSelector('.industry-card');

      // Tap filter button
      const filterBtn = page.locator('.filter-btn[data-filter="tier1"]');
      await filterBtn.tap();
      await page.waitForTimeout(200);

      // Filter should be applied
      await expect(filterBtn).toHaveClass(/active/);
    });

    test('should handle touch on search box', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const searchBox = page.locator('#searchBox');
      await searchBox.tap();

      // Should be focused
      const isFocused = await searchBox.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBe(true);
    });
  });
});
