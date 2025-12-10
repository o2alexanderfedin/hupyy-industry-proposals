<objective>
Enhance the Hupyy Industry Proposals website with proper cross-references and implement Playwright verification for GitHub Pages deployment.

This will improve navigation between the live site and repository, and provide automated verification that deployments are working correctly.
</objective>

<context>
Current state: GitHub Pages site is live with CI/CD pipeline deploying from docs/ folder
Target state: Site has repository link in header, README.md links to live site, and Playwright verification suite exists

Project details:
- Live site: https://o2alexanderfedin.github.io/hupyy-industry-proposals/
- Repository: https://github.com/o2alexanderfedin/hupyy-industry-proposals
- Static site in docs/ with Material Design styling
- Existing CI/CD pipeline in .github/workflows/deploy.yml

Read project guidelines: @CLAUDE.md for any specific requirements
</context>

<requirements>

## 1. Add Repository Link to index.html

Add a prominent "View on GitHub" button in the site header/navigation area.

**Requirements:**
- Position: Header/navigation bar (top of page, visible on all devices)
- Style: Material Design button consistent with existing design (#1976D2 primary color)
- Icon: GitHub logo/icon (SVG preferred)
- Text: "View on GitHub" or "GitHub Repository"
- Behavior: Opens repository in new tab (target="_blank")
- URL: https://github.com/o2alexanderfedin/hupyy-industry-proposals
- Responsive: Should work on mobile (320px) through desktop (1920px)

**Why this matters:** Users viewing the research should be able to easily access the source repository to see the code, contribute, or review the project structure.

## 2. Add Live Site Link to README.md

Update README.md to include a prominent link to the live GitHub Pages site.

**Requirements:**
- Position: Near the top of README.md (in header section or immediately after title)
- Format: Badge/button style using shields.io or similar
- Text: "View Live Site" or "🌐 Live Website"
- URL: https://o2alexanderfedin.github.io/hupyy-industry-proposals/
- Should be visually distinct and easy to find

**Why this matters:** Repository visitors should immediately know the site is live and be able to access it without searching through documentation.

## 3. Verify CI/CD Pipeline Deploys to GitHub Pages

Review the existing .github/workflows/deploy.yml and ensure:
- Pipeline successfully deploys to GitHub Pages on push to main
- All stages (validate, test, deploy) are configured correctly
- Deployment outputs the live URL
- No errors or warnings in the workflow

**Why this matters:** The CI/CD pipeline is the foundation for automated deployments. It must be reliable and correctly configured.

## 4. Create Playwright Verification Suite

Create a manual Playwright test suite that can be run to verify the GitHub Pages deployment is working correctly.

**Test Suite Location:** `./tests/playwright/`

**Tests to Include:**

### Test 1: Site Accessibility
- Navigate to live site URL
- Verify index.html loads successfully (200 status)
- Check that hero section is visible
- Verify all 10 industry cards are present

### Test 2: Repository Link
- Navigate to live site
- Locate "View on GitHub" button in header
- Verify link points to correct repository URL
- Verify link opens in new tab

### Test 3: Navigation and Reports
- Navigate to live site
- Click on first industry report card
- Verify report page loads
- Check navigation breadcrumbs work
- Verify "Back to Home" functionality

### Test 4: Search Functionality
- Navigate to live site
- Type search query in search box
- Verify filtering works (cards appear/disappear)
- Test empty search results

### Test 5: Filter Functionality
- Navigate to live site
- Click filter buttons (Tier 1, Safety-Critical, Regulated)
- Verify correct cards are shown/hidden
- Test "All" filter resets properly

### Test 6: Mobile Responsiveness
- Test at viewport widths: 375px, 768px, 1920px
- Verify repository link is accessible at all sizes
- Check card layout adjusts properly
- Ensure no horizontal scrolling

**Test Configuration:**
- Framework: Playwright with TypeScript
- Browser: Chromium (can expand to Firefox/Safari later)
- Output: HTML test report in `./tests/playwright/reports/`
- Screenshots: Capture on failure for debugging

**Test Execution:**
- Can be run manually after deployments: `npm run test:playwright`
- Not integrated into CI/CD (manual verification as specified)
- Should provide clear pass/fail output

</requirements>

<implementation>

## Step-by-Step Execution

### Phase 1: Add Repository Link to index.html

1. **Read existing index.html:**
   ```
   @docs/index.html
   ```
   Examine the header/navigation structure and existing Material Design styles

2. **Identify insertion point:**
   - Find the header or navigation section
   - Determine best location for GitHub button (likely top-right)

3. **Create GitHub SVG icon** (if not already present):
   - Add to `docs/assets/images/` if needed
   - Or use existing icon system

4. **Add HTML for GitHub link:**
   ```html
   <a href="https://github.com/o2alexanderfedin/hupyy-industry-proposals"
      target="_blank"
      rel="noopener noreferrer"
      class="github-link"
      aria-label="View project on GitHub">
     <svg><!-- GitHub icon --></svg>
     <span>View on GitHub</span>
   </a>
   ```

5. **Add CSS styling:**
   - Match Material Design button styles
   - Use primary color (#1976D2)
   - Add hover effects
   - Ensure responsive behavior

6. **Test locally:**
   - Verify link appears in header
   - Check responsive behavior
   - Validate HTML

### Phase 2: Add Live Site Link to README.md

1. **Read existing README.md:**
   ```
   @README.md
   ```
   Examine current structure and badges

2. **Add live site badge:**
   Near the top (after title or in badges section), add:
   ```markdown
   ## 🌐 Live Website

   **[View Live Site →](https://o2alexanderfedin.github.io/hupyy-industry-proposals/)**

   [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://o2alexanderfedin.github.io/hupyy-industry-proposals/)
   ```

3. **Verify formatting:**
   - Ensure markdown renders correctly
   - Check badge displays properly on GitHub

### Phase 3: Verify CI/CD Pipeline

1. **Review workflow file:**
   ```
   @.github/workflows/deploy.yml
   ```

2. **Check for:**
   - Correct triggers (push to main, PRs)
   - All stages present (validate, test, deploy)
   - GitHub Pages deployment action configured
   - Permissions set correctly (pages: write, id-token: write)

3. **Test by viewing recent runs:**
   ```bash
   gh run list --limit 5
   gh run view [latest-run-id]
   ```

4. **Verify deployment output:**
   - Check that live URL is output by deployment step
   - Confirm site updates after deployment

### Phase 4: Create Playwright Test Suite

1. **Set up Playwright project:**
   ```bash
   mkdir -p tests/playwright
   cd tests/playwright
   npm init -y
   npm install -D @playwright/test
   npx playwright install chromium
   ```

2. **Create test configuration** (`tests/playwright/playwright.config.ts`):
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './specs',
     outputDir: './test-results',
     reporter: [['html', { outputFolder: './reports' }]],
     use: {
       baseURL: 'https://o2alexanderfedin.github.io/hupyy-industry-proposals/',
       screenshot: 'only-on-failure',
       video: 'retain-on-failure',
     },
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
     ],
   });
   ```

3. **Create test files** in `tests/playwright/specs/`:
   - `site-accessibility.spec.ts` - Test 1
   - `repository-link.spec.ts` - Test 2
   - `navigation.spec.ts` - Test 3
   - `search-functionality.spec.ts` - Test 4
   - `filter-functionality.spec.ts` - Test 5
   - `responsive-design.spec.ts` - Test 6

4. **Example test structure** (site-accessibility.spec.ts):
   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('Site Accessibility', () => {
     test('should load index.html successfully', async ({ page }) => {
       const response = await page.goto('/');
       expect(response?.status()).toBe(200);
     });

     test('should display hero section', async ({ page }) => {
       await page.goto('/');
       const hero = page.locator('.hero, [class*="hero"]');
       await expect(hero).toBeVisible();
     });

     test('should display all 10 industry cards', async ({ page }) => {
       await page.goto('/');
       const cards = page.locator('.card, [class*="card"]');
       await expect(cards).toHaveCount(10);
     });
   });
   ```

5. **Add npm scripts** to `tests/playwright/package.json`:
   ```json
   {
     "scripts": {
       "test": "playwright test",
       "test:headed": "playwright test --headed",
       "test:ui": "playwright test --ui",
       "test:report": "playwright show-report reports"
     }
   }
   ```

6. **Create README** (`tests/playwright/README.md`):
   - Explain how to run tests
   - Document test scenarios
   - Provide troubleshooting guidance

</implementation>

<verification>

Before declaring complete, verify:

1. **index.html Changes:**
   - [ ] Open docs/index.html in browser
   - [ ] Verify "View on GitHub" link appears in header
   - [ ] Click link and confirm it opens repository in new tab
   - [ ] Test on mobile viewport (375px) - link should be accessible
   - [ ] Validate HTML with `grep -i "github" docs/index.html`

2. **README.md Changes:**
   - [ ] View README.md on GitHub
   - [ ] Verify live site link/badge is visible near top
   - [ ] Click link and confirm it opens live site
   - [ ] Badge renders correctly (not broken image)

3. **CI/CD Pipeline:**
   - [ ] Review .github/workflows/deploy.yml
   - [ ] Check recent workflow runs: `gh run list --limit 3`
   - [ ] Verify deploy job outputs GitHub Pages URL
   - [ ] Confirm no errors in latest deployment

4. **Playwright Tests:**
   - [ ] Navigate to tests/playwright/
   - [ ] Install dependencies: `npm install`
   - [ ] Run test suite: `npm test`
   - [ ] All tests should pass
   - [ ] HTML report generated in reports/ folder
   - [ ] Verify test coverage includes all 6 test scenarios

5. **End-to-End Verification:**
   - [ ] Visit live site: https://o2alexanderfedin.github.io/hupyy-industry-proposals/
   - [ ] Click "View on GitHub" button → should reach repository
   - [ ] Visit repository: https://github.com/o2alexanderfedin/hupyy-industry-proposals
   - [ ] Click live site link in README → should reach website
   - [ ] Run Playwright tests and verify all pass

</verification>

<success_criteria>

The implementation is complete when:

1. ✅ index.html has a visible, working "View on GitHub" link in the header
2. ✅ Link is styled consistently with Material Design (matches site theme)
3. ✅ Link works on all device sizes (320px to 1920px)
4. ✅ README.md has a prominent live site link/badge near the top
5. ✅ CI/CD pipeline verified to be deploying correctly to GitHub Pages
6. ✅ Playwright test suite created with all 6 test scenarios
7. ✅ Playwright tests can be run successfully: `npm test`
8. ✅ All Playwright tests pass when run against live site
9. ✅ Test reports generated in `tests/playwright/reports/`
10. ✅ Documentation exists for running and understanding tests

**Final deliverables:**
- Modified docs/index.html with GitHub link
- Modified README.md with live site link
- Complete Playwright test suite in tests/playwright/
- Test execution documentation
- All tests passing against live deployment

</success_criteria>

<output>

Files to create/modify:

**Modify:**
- `docs/index.html` - Add GitHub repository link in header
- `docs/assets/css/main.css` - Add styles for GitHub link (if needed)
- `README.md` - Add live site link/badge near top

**Create:**
- `tests/playwright/package.json` - Playwright project dependencies
- `tests/playwright/playwright.config.ts` - Test configuration
- `tests/playwright/specs/site-accessibility.spec.ts` - Test 1
- `tests/playwright/specs/repository-link.spec.ts` - Test 2
- `tests/playwright/specs/navigation.spec.ts` - Test 3
- `tests/playwright/specs/search-functionality.spec.ts` - Test 4
- `tests/playwright/specs/filter-functionality.spec.ts` - Test 5
- `tests/playwright/specs/responsive-design.spec.ts` - Test 6
- `tests/playwright/README.md` - Test suite documentation
- `tests/playwright/.gitignore` - Ignore test-results and node_modules

</output>

<constraints>

**Why these constraints matter:**

1. **GitHub link in header (not footer)**: Headers are more visible and consistent across pages. This ensures users always know where to find the repository.

2. **New tab for external links**: Opening external links in new tabs prevents users from losing their place on the documentation site.

3. **Manual Playwright tests (not CI/CD)**: Allows for controlled verification after deployments without slowing down the CI/CD pipeline. Can be integrated later if desired.

4. **Material Design consistency**: Maintains professional appearance and user experience consistency across the entire site.

5. **Comprehensive test coverage**: The 6 test scenarios cover critical functionality (accessibility, navigation, search, filters, responsive) to catch any deployment issues.

**Security considerations:**
- Use `rel="noopener noreferrer"` on external links to prevent tabnapping attacks
- Validate all HTML changes to avoid XSS vulnerabilities
- Keep Playwright dependencies updated for security patches

</constraints>
