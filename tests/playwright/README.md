# Playwright Verification Tests for Hupyy Industry Proposals

Comprehensive end-to-end test suite for verifying the GitHub Pages deployment of the Hupyy Industry Proposals website.

## Overview

This test suite provides automated verification that the deployed site at [https://o2alexanderfedin.github.io/hupyy-industry-proposals/](https://o2alexanderfedin.github.io/hupyy-industry-proposals/) is functioning correctly after CI/CD deployments.

### Test Coverage

The suite includes **6 comprehensive test scenarios**:

1. **Site Accessibility** - Verifies core elements load and display correctly
2. **Repository Link** - Tests the "View on GitHub" button in the header
3. **Navigation & Reports** - Validates navigation and report page loading
4. **Search Functionality** - Tests industry card search filtering
5. **Filter Functionality** - Validates tag-based filtering (Tier 1, Safety-Critical, Regulated)
6. **Mobile Responsiveness** - Ensures proper display across device sizes (375px, 768px, 1920px)

## Installation

### Prerequisites

- Node.js 18+ (recommended: Node.js 20 LTS)
- npm 9+

### Setup

```bash
# Navigate to test directory
cd tests/playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

To install all browsers (optional):
```bash
npx playwright install
```

## Running Tests

### Basic Test Execution

```bash
# Run all tests (headless mode)
npm test

# Run tests with visible browser
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Tests

```bash
# Run on Chromium only (default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on WebKit (Safari)
npm run test:webkit
```

### Running Specific Test Files

```bash
# Run single test file
npx playwright test specs/site-accessibility.spec.ts

# Run specific test suite
npx playwright test --grep "Site Accessibility"

# Run tests matching pattern
npx playwright test --grep "GitHub"
```

### Viewing Test Reports

```bash
# Show latest HTML report
npm run test:report

# Report opens automatically in browser
# Located at: reports/index.html
```

## Test Suite Details

### Test 1: Site Accessibility (10 tests)

Verifies core site elements are accessible and display correctly:

- ✅ Index page loads with 200 status
- ✅ Hero section displays with correct content
- ✅ Hero stats section shows SAM, industries count, technologies
- ✅ Technology overview section displays all 3 tech cards
- ✅ All 10 industry cards render correctly
- ✅ Search and filter UI elements are present
- ✅ Footer displays with copyright
- ✅ Page title and meta tags are correct
- ✅ Stylesheets load properly
- ✅ JavaScript renders dynamic content

**Why it matters:** Ensures the base deployment is functional and all critical elements are visible to users.

### Test 2: Repository Link (13 tests)

Validates the "View on GitHub" link functionality:

- ✅ Header and navigation display correctly
- ✅ Logo/branding is visible
- ✅ GitHub button displays in header
- ✅ GitHub icon (SVG) is visible
- ✅ Links to correct repository URL
- ✅ Opens in new tab (target="_blank")
- ✅ Has security attributes (noopener noreferrer)
- ✅ Proper ARIA label for accessibility
- ✅ Material Design styling (primary color #1976D2)
- ✅ Hover effects work (darker blue on hover)
- ✅ Positioned correctly (top-right)
- ✅ Navigation works when clicked
- ✅ Remains visible when scrolling (sticky header)

**Why it matters:** Ensures cross-reference between live site and repository is functional and secure.

### Test 3: Navigation and Reports (15 tests)

Tests report page navigation and functionality:

- ✅ Navigates to report pages from cards
- ✅ Report pages load with 200 status
- ✅ Report header displays correctly
- ✅ Breadcrumb navigation exists
- ✅ "Back to Home" functionality works
- ✅ Browser back button works
- ✅ Report title and metadata display
- ✅ Report content section is visible
- ✅ PDF download links present
- ✅ Download attribute on PDF links
- ✅ Multiple reports accessible
- ✅ Consistent header across pages
- ✅ Footer on report pages
- ✅ Invalid URLs handled gracefully (404)
- ✅ Reports load within acceptable time (<3s)

**Why it matters:** Validates users can navigate to and view all research reports.

### Test 4: Search Functionality (16 tests)

Verifies industry card search filtering:

- ✅ Search box displays and is editable
- ✅ Placeholder text present
- ✅ Initially displays all 10 cards
- ✅ Filters cards based on text input
- ✅ Case-insensitive partial matching
- ✅ Filters by industry name
- ✅ Filters by keywords in summary
- ✅ Shows empty results for non-existent terms
- ✅ Restores all cards when search cleared
- ✅ Real-time updates as user types
- ✅ Searches both name and summary fields
- ✅ Handles special characters (AI/ML)
- ✅ Handles numeric search terms ($10)
- ✅ Maintains state during rapid typing
- ✅ Handles whitespace-only searches
- ✅ Focus works correctly

**Why it matters:** Ensures users can quickly find specific industries of interest.

### Test 5: Filter Functionality (16 tests)

Tests tag-based filtering system:

- ✅ All 4 filter buttons display
- ✅ "All Industries" active by default
- ✅ Shows all 10 cards on "All"
- ✅ Tier 1 filter shows high-priority industries
- ✅ Safety-Critical filter works
- ✅ Regulated filter shows compliant industries
- ✅ Switches between filters correctly
- ✅ Resets to "All" properly
- ✅ Hides non-matching cards
- ✅ Maintains filter while scrolling
- ✅ Works with dynamically loaded cards
- ✅ Active button has consistent styling
- ✅ Handles filter with active search
- ✅ Handles rapid filter clicks
- ✅ Keyboard accessibility (Tab + Enter)

**Why it matters:** Allows users to segment industries by strategic priorities (tier, safety, regulation).

### Test 6: Mobile Responsiveness (33 tests)

Comprehensive responsive design validation:

**All Viewports (375px, 768px, 1920px):**
- ✅ Site loads successfully
- ✅ Header displays
- ✅ GitHub link accessible
- ✅ Hero section visible
- ✅ All 10 cards display
- ✅ No horizontal scrollbar
- ✅ Readable text size
- ✅ Search box usable
- ✅ Filter buttons visible

**Mobile-Specific (375px):**
- ✅ GitHub text hidden, icon only
- ✅ Hero stats stack vertically
- ✅ Cards in single column
- ✅ Filter buttons stack
- ✅ Action buttons full width
- ✅ Touch targets adequate (44x44px min)

**Tablet-Specific (768px):**
- ✅ Grid layout for cards
- ✅ GitHub link accessible

**Desktop-Specific (1920px):**
- ✅ Full GitHub link with text
- ✅ Multi-column card grid
- ✅ Hero stats in row
- ✅ Adequate spacing

**Additional Tests:**
- ✅ Landscape orientation (667x375)
- ✅ Content reflows when resizing
- ✅ Touch events work on mobile
- ✅ Touch on search box

**Why it matters:** Ensures excellent user experience across all devices from phones to large desktops.

## Test Configuration

### Browser Support

The suite is configured to test across multiple browsers:

- **Chromium** (primary) - Desktop Chrome
- **Firefox** - Desktop Firefox
- **WebKit** - Desktop Safari
- **Mobile Chrome** - Pixel 5
- **Mobile Safari** - iPhone 12
- **Tablet** - iPad Pro

### Timeouts

- Test timeout: 30 seconds
- Navigation timeout: 30 seconds (default)

### Artifacts

Tests capture the following on failure:

- **Screenshots** - Visual snapshot at failure point
- **Videos** - Recording of test execution
- **Traces** - Detailed timeline and network activity

Artifacts saved to: `test-results/`

### Reports

- **HTML Report**: Interactive report with test results, screenshots, and videos
- **JSON Report**: Machine-readable results at `test-results/results.json`
- **List Reporter**: Console output during test run

## Continuous Integration

While these tests are designed for **manual verification** after deployments, they can be integrated into CI/CD:

### Example GitHub Actions Integration

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: |
          cd tests/playwright
          npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium
      - name: Run tests
        run: |
          cd tests/playwright
          npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: tests/playwright/reports/
          retention-days: 30
```

## Troubleshooting

### Common Issues

#### Tests fail with "Browser not installed"

```bash
npx playwright install chromium
```

#### Tests timeout or fail to load site

- Verify site is accessible: `curl -I https://o2alexanderfedin.github.io/hupyy-industry-proposals/`
- Check network connectivity
- Increase timeout in `playwright.config.ts`

#### "Permission denied" errors

```bash
chmod +x node_modules/.bin/playwright
```

#### Tests pass locally but fail remotely

- Check viewport differences
- Verify fonts are loading (Google Fonts)
- Review network conditions

### Debug Mode

Run tests in debug mode for step-by-step execution:

```bash
npm run test:debug

# Or debug specific test
npx playwright test --debug specs/site-accessibility.spec.ts
```

### Verbose Logging

```bash
DEBUG=pw:api npx playwright test
```

### Generate Trace Files

```bash
npx playwright test --trace on
```

View trace:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('.selector');

    // Act
    await element.click();

    // Assert
    await expect(element).toHaveClass('active');
  });
});
```

### Best Practices

1. **Use descriptive test names** - Test name should explain what's being verified
2. **Wait for elements** - Use `waitForSelector` for dynamic content
3. **Use data attributes** - Prefer `data-testid` over CSS classes for stability
4. **Test user flows** - Focus on what users actually do
5. **Keep tests independent** - Each test should work in isolation
6. **Use page objects** - For complex pages, create page object models
7. **Avoid hard waits** - Use `waitForTimeout` sparingly
8. **Check visibility** - Verify elements are visible, not just present

## Project Structure

```
tests/playwright/
├── specs/                          # Test specifications
│   ├── site-accessibility.spec.ts  # Test 1: Core site elements
│   ├── repository-link.spec.ts     # Test 2: GitHub link
│   ├── navigation.spec.ts          # Test 3: Navigation & reports
│   ├── search-functionality.spec.ts # Test 4: Search filtering
│   ├── filter-functionality.spec.ts # Test 5: Tag filtering
│   └── responsive-design.spec.ts   # Test 6: Responsive layouts
├── reports/                        # HTML test reports (generated)
├── test-results/                   # Test artifacts (generated)
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── .gitignore                      # Ignored files
└── README.md                       # This file
```

## Maintenance

### Updating Tests After Site Changes

When the site is updated, review and update tests:

1. **New features** - Add corresponding test coverage
2. **Changed selectors** - Update CSS/ARIA selectors in tests
3. **New pages** - Add navigation tests
4. **Removed features** - Remove or skip obsolete tests

### Periodic Review

- **Monthly**: Review test results for flaky tests
- **Quarterly**: Update browser versions
- **Major releases**: Run full test suite across all browsers

## Resources

- **Playwright Documentation**: https://playwright.dev
- **Playwright API**: https://playwright.dev/docs/api/class-playwright
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Debugging Guide**: https://playwright.dev/docs/debug

## License

Proprietary - All Rights Reserved

---

**Note**: These tests verify the **live production site** at GitHub Pages. They are designed for manual execution after deployments to ensure everything is working correctly. For local development testing, update the `baseURL` in `playwright.config.ts` to point to your local server (e.g., `http://localhost:8000`).
