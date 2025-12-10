# Hupyy Website Testing & Validation

## Objective
Comprehensively test the Hupyy industry proposals website using WebFetch and Playwright tools to verify:
- All pages load correctly
- Interactive features work (search, filtering, navigation)
- PDFs are accessible and download correctly
- Mobile responsiveness
- Accessibility compliance
- Performance metrics
- GitHub Pages deployment validation

## Context
Website location: @/Users/alexanderfedin/Projects/hapyy/proposals/generic/docs/
Research reports: @.prompts/001-hupyy-industry-research/reports/*.md
This prompt depends on completion of `002-hupyy-website-generation`.

## Requirements

### Testing Strategy

Execute tests in parallel using map-reduce approach:

1. **Static Analysis** (parallel tasks)
   - HTML validation
   - CSS validation
   - JavaScript syntax check
   - File integrity check

2. **WebFetch Tests** (parallel tasks)
   - Index page loading
   - All 10 report pages loading
   - PDF accessibility check
   - Search index validation

3. **Playwright Interactive Tests** (sequential with parallel sub-tests)
   - Navigation testing
   - Search functionality
   - Filter functionality
   - PDF download testing
   - Mobile responsiveness
   - Accessibility audit

### Test Execution Framework

Use TodoWrite to track all tests:
```json
[
  {"content": "Validate HTML structure (11 pages)", "status": "pending", "activeForm": "Validating HTML structure"},
  {"content": "Test WebFetch on all pages (11 pages)", "status": "pending", "activeForm": "Testing WebFetch"},
  {"content": "Test Playwright navigation", "status": "pending", "activeForm": "Testing navigation"},
  {"content": "Test Playwright search functionality", "status": "pending", "activeForm": "Testing search"},
  {"content": "Test Playwright filtering", "status": "pending", "activeForm": "Testing filtering"},
  {"content": "Test PDF downloads", "status": "pending", "activeForm": "Testing PDFs"},
  {"content": "Test mobile responsiveness", "status": "pending", "activeForm": "Testing mobile"},
  {"content": "Accessibility audit", "status": "pending", "activeForm": "Running accessibility audit"},
  {"content": "Performance testing", "status": "pending", "activeForm": "Testing performance"}
]
```

## Test Suite Details

### 1. Static File Validation

**Test 1.1: File Existence Check**
```bash
# Verify all expected files exist
test -f docs/index.html
test -f docs/reports/financial-services.html
test -f docs/reports/healthcare.html
# ... (all 10 report pages)
test -f docs/pdfs/financial-services.pdf
# ... (all 10 PDFs)
test -f docs/markdown/financial-services.md
# ... (all 10 markdown files)
test -f docs/assets/css/main.css
test -f docs/assets/js/main.js
```

**Test 1.2: HTML Validation**
Use htmlhint or validator.nu API to check HTML5 compliance

**Test 1.3: File Size Check**
```bash
# Ensure files are not empty and within reasonable size limits
# Index: 20KB - 200KB
# Report pages: 30KB - 500KB each
# PDFs: 100KB - 5MB each
```

### 2. WebFetch Testing

**Test 2.1: Index Page Loading**
```
WebFetch(
  url: "file:///Users/alexanderfedin/Projects/hapyy/proposals/generic/docs/index.html",
  prompt: "Verify the page loads correctly. Check for:
           1. Hupyy title and hero section visible
           2. All 10 industry cards present
           3. Search bar present
           4. No error messages or missing content warnings
           5. Material Design components rendered
           List any issues found."
)
```

**Test 2.2: Industry Report Pages (Parallel)**
Spawn 10 parallel WebFetch tasks:
```
For each industry in [financial-services, healthcare, ...]:
  WebFetch(
    url: "file:///.../docs/reports/{industry}.html",
    prompt: "Check this report page:
             1. Title matches industry name
             2. All sections from markdown rendered
             3. Table of contents present
             4. Navigation links work
             5. No broken images or missing content
             Report any issues."
  )
```

**Test 2.3: Search Index Validation**
```
WebFetch(
  url: "file:///.../docs/assets/search-index.json",
  prompt: "Validate search index JSON:
           1. Valid JSON syntax
           2. Contains 10 documents
           3. Each document has id, title, summary, content fields
           4. Content is substantial (not empty)
           Report structure and any issues."
)
```

### 3. Playwright Interactive Testing

**IMPORTANT**: Start local HTTP server first to test with Playwright
```bash
cd docs && python3 -m http.server 8080 &
# Store server PID for cleanup
```

**Test 3.1: Navigation Testing**
```javascript
// Playwright test sequence
await browser_navigate({ url: "http://localhost:8080" });
await browser_snapshot(); // Verify index page loaded

// Test navigation to first report
await browser_click({
  element: "Financial Services View Report button",
  ref: "[data-industry='financial-services'] button:first-of-type"
});
await browser_snapshot(); // Verify report page loaded

// Test breadcrumb navigation back
await browser_click({
  element: "Back to Industries link",
  ref: "a[href='../index.html']"
});
await browser_snapshot(); // Verify back on index

// Test navigation to all 10 reports (parallel subtasks)
```

**Test 3.2: Search Functionality**
```javascript
await browser_navigate({ url: "http://localhost:8080" });

// Test search with relevant query
await browser_type({
  element: "Search input",
  ref: "input[type='search']",
  text: "compliance",
  submit: false
});

// Trigger search
await browser_press_key({ key: "Enter" });

// Wait for results
await browser_wait_for({ text: "results", time: 2 });
await browser_snapshot(); // Verify results displayed

// Test empty search
await browser_type({
  element: "Search input",
  ref: "input[type='search']",
  text: "xyzabc123nonexistent",
  submit: true
});
await browser_wait_for({ text: "No results", time: 2 });
await browser_snapshot(); // Verify "no results" message
```

**Test 3.3: Filter Functionality**
```javascript
await browser_navigate({ url: "http://localhost:8080" });
await browser_snapshot(); // Initial state - all cards visible

// Click "Security-Critical" filter
await browser_click({
  element: "Security-Critical filter button",
  ref: "button[data-filter='security']"
});
await browser_wait_for({ time: 1 }); // Wait for filter animation
await browser_snapshot(); // Verify only security-related cards visible

// Click "All" to reset
await browser_click({
  element: "All filter button",
  ref: "button[data-filter='all']"
});
await browser_snapshot(); // Verify all cards visible again
```

**Test 3.4: PDF Download Testing**
```javascript
await browser_navigate({ url: "http://localhost:8080" });

// Click PDF download button for first industry
await browser_click({
  element: "Financial Services PDF download button",
  ref: "[data-industry='financial-services'] button[onclick*='downloadPDF']"
});

// Wait for download to start
await browser_wait_for({ time: 2 });

// Check network requests to verify PDF was requested
const requests = await browser_network_requests({ includeStatic: true });
// Verify PDF file was requested and response was 200 OK
```

**Test 3.5: Mobile Responsiveness**
```javascript
// Test various viewport sizes
const viewports = [
  { width: 320, height: 568, name: "iPhone SE" },
  { width: 375, height: 812, name: "iPhone 12" },
  { width: 768, height: 1024, name: "iPad" },
  { width: 1920, height: 1080, name: "Desktop" }
];

for (const viewport of viewports) {
  await browser_resize({ width: viewport.width, height: viewport.height });
  await browser_navigate({ url: "http://localhost:8080" });
  await browser_snapshot(); // Verify layout adapts correctly

  // Check card layout
  // Mobile (< 600px): 1 column
  // Tablet (600-1024px): 2 columns
  // Desktop (> 1024px): 3 columns
}
```

**Test 3.6: Accessibility Audit**
```javascript
await browser_navigate({ url: "http://localhost:8080" });

// Use browser_evaluate to run axe-core accessibility checks
await browser_evaluate({
  function: `async () => {
    // Inject axe-core
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js';
    document.head.appendChild(script);

    await new Promise(resolve => script.onload = resolve);

    // Run accessibility audit
    const results = await axe.run();

    return {
      violations: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      issues: results.violations.map(v => ({
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      }))
    };
  }`
});

// Repeat for all report pages
```

**Test 3.7: Performance Testing**
```javascript
await browser_navigate({ url: "http://localhost:8080" });

// Use Performance API to measure metrics
await browser_evaluate({
  function: `() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');

    return {
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
      firstPaint: paintEntries.find(e => e.name === 'first-paint')?.startTime,
      firstContentfulPaint: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime,
      domInteractive: perfData.domInteractive,
      totalSize: performance.getEntriesByType('resource').reduce((sum, r) => sum + (r.transferSize || 0), 0)
    };
  }`
});
```

### 4. Content Accuracy Validation

**Test 4.1: Report Content Verification**
For each report, verify:
- All sections from original markdown are present
- Tables rendered correctly
- Lists and numbered items intact
- Metadata preserved
- Citations/sources included

**Test 4.2: Card Data Accuracy**
Verify each card on index page:
- Industry name matches report
- Market size matches metadata
- Summary matches executive summary
- Links point to correct files

### 5. GitHub Pages Deployment Testing

**Test 5.1: Local Server Simulation**
```bash
# Serve from docs/ directory
cd docs && python3 -m http.server 8080

# Test with relative paths (GitHub Pages uses /repo-name/ base path)
```

**Test 5.2: GitHub Pages Configuration**
```bash
# Verify .nojekyll exists
test -f docs/.nojekyll

# Verify no conflicting files
! test -f docs/_config.yml || grep -q "theme: null" docs/_config.yml
```

**Test 5.3: Path Resolution**
Verify all paths are relative and work with subdirectory deployment:
- CSS: `assets/css/main.css` ✓
- JS: `assets/js/main.js` ✓
- Reports: `reports/financial-services.html` ✓
- NOT: `/assets/...` ✗ (absolute paths won't work)

## Test Reporting

### Create Detailed Test Report

Generate `.prompts/003-hupyy-website-testing/test-report.md`:

```markdown
# Hupyy Website Test Report

**Generated**: {timestamp}
**Total Tests**: {count}
**Passed**: {passed}
**Failed**: {failed}
**Warnings**: {warnings}

## Test Results Summary

| Category | Tests | Pass | Fail | Warn |
|----------|-------|------|------|------|
| Static Analysis | {count} | {pass} | {fail} | {warn} |
| WebFetch | {count} | {pass} | {fail} | {warn} |
| Playwright Navigation | {count} | {pass} | {fail} | {warn} |
| Search & Filter | {count} | {pass} | {fail} | {warn} |
| Mobile Responsive | {count} | {pass} | {fail} | {warn} |
| Accessibility | {count} | {pass} | {fail} | {warn} |
| Performance | {count} | {pass} | {fail} | {warn} |

## Detailed Results

### 1. Static Analysis
{detailed results}

### 2. WebFetch Tests
{detailed results with URLs and findings}

### 3. Playwright Tests
{detailed results with screenshots if available}

### 4. Accessibility Audit
{violations found, impact levels, recommendations}

### 5. Performance Metrics

#### Index Page
- DOM Content Loaded: {ms}ms
- Load Complete: {ms}ms
- First Contentful Paint: {ms}ms
- Total Page Size: {kb}KB

#### Report Pages (Average)
- DOM Content Loaded: {ms}ms
- Load Complete: {ms}ms
- First Contentful Paint: {ms}ms
- Total Page Size: {kb}KB

### 6. Mobile Responsiveness
{viewport test results}

## Issues Found

### Critical (Blocking Deployment)
{list of critical issues}

### High Priority
{list of high priority issues}

### Medium Priority
{list of medium priority issues}

### Low Priority / Nice-to-Have
{list of low priority improvements}

## Recommendations

### Immediate Actions Required
1. {action item}
2. {action item}

### Suggested Improvements
1. {improvement}
2. {improvement}

## Conclusion

{Overall assessment - Ready for deployment? What needs fixing?}
```

### Create Fix Script (If Issues Found)

If tests reveal issues, generate `.prompts/003-hupyy-website-testing/fixes-required.md`:

```markdown
# Required Fixes for Hupyy Website

## Critical Issues

### Issue 1: {description}
**Location**: {file}:{line}
**Problem**: {detailed problem}
**Fix**: {code or instructions}

### Issue 2: ...

## Suggested Script to Apply Fixes

```bash
#!/bin/bash
# fix-website.sh - Automated fixes for test issues

# Fix 1: {description}
sed -i '' 's/{pattern}/{replacement}/' docs/{file}

# Fix 2: ...
```

## Manual Review Required

{Issues that need human judgment}
```

## Output Files

All output to `.prompts/003-hupyy-website-testing/`:

- `test-report.md` - Comprehensive test results
- `fixes-required.md` - List of issues and fixes (if any)
- `accessibility-audit.json` - Full axe-core results
- `performance-metrics.json` - Detailed performance data
- `screenshots/` - Playwright screenshots for visual verification
- `SUMMARY.md` - Executive summary

## SUMMARY.md Requirements

```markdown
# Hupyy Website Testing Summary

**Comprehensive testing with WebFetch and Playwright: {passed}/{total} tests passed**

## Version
v1.0 - Initial testing phase

## Key Findings

### Overall Assessment
{PASS | PASS WITH WARNINGS | FAIL}

### Test Coverage
- ✓ Static analysis: {count} tests
- ✓ Page loading: {count} tests across 11 pages
- ✓ Interactive features: {count} tests (search, filter, navigation)
- ✓ PDF downloads: {count} tests
- ✓ Mobile responsive: {count} viewports tested
- ✓ Accessibility: {violations} violations found
- ✓ Performance: {metrics} measured

### Performance Results
- **Index page load**: {ms}ms (target: <3000ms) {PASS|FAIL}
- **Report page load**: {ms}ms average (target: <2000ms) {PASS|FAIL}
- **First Contentful Paint**: {ms}ms (target: <1500ms) {PASS|FAIL}
- **Total page size**: {kb}KB (target: <2000KB) {PASS|FAIL}

### Accessibility Score
- **Violations**: {count} ({critical} critical, {serious} serious, {moderate} moderate)
- **WCAG 2.1 Compliance**: {AA|AAA|Partial AA}
- **Score**: {score}/100

### Functionality Status
- ✓ Navigation: {PASS|FAIL}
- ✓ Search: {PASS|FAIL}
- ✓ Filtering: {PASS|FAIL}
- ✓ PDF downloads: {PASS|FAIL}
- ✓ Mobile responsive: {PASS|FAIL}

## Critical Issues Found
{If none: "None - all critical functionality working"}
{If any: numbered list}

## Decisions Needed
- [ ] {Decision required based on test results}
- [ ] Approve deployment with warnings? (if any warnings)
- [ ] Fix critical issues before deployment? (if any critical)

## Blockers
{If ready for deployment: "None - ready for GitHub Pages deployment"}
{If issues found: "Critical issues must be fixed before deployment"}

## Next Step
{If all passed: "**Deploy to GitHub Pages** - Website is tested and ready for production"}
{If issues found: "**Fix critical issues** - See test-report.md and fixes-required.md for details"}

Alternative next steps:
- Generate deployment guide for GitHub Pages
- Create CI/CD workflow for automated testing
- Set up custom domain configuration
```

## Success Criteria

- [ ] All 11 pages load successfully (WebFetch)
- [ ] Navigation works between all pages (Playwright)
- [ ] Search returns relevant results (Playwright)
- [ ] Filtering shows/hides correct cards (Playwright)
- [ ] All 10 PDFs accessible and download (Playwright)
- [ ] Mobile responsive at 4+ viewport sizes (Playwright)
- [ ] Accessibility violations < 5 (or 0 critical/serious)
- [ ] Performance metrics meet targets (FCP < 1.5s, Load < 3s)
- [ ] No console errors on any page
- [ ] All links functional (no 404s)
- [ ] Test report generated with detailed findings
- [ ] SUMMARY.md created with pass/fail assessment

## Execution Strategy

**Use parallel execution aggressively**:

1. **Phase 1** (Parallel): Static checks across all files
2. **Phase 2** (Parallel): WebFetch all 11 pages simultaneously
3. **Phase 3** (Sequential with parallel sub-tasks): Playwright tests
   - Start HTTP server
   - Run navigation tests (sequential to avoid conflicts)
   - Run search tests (sequential)
   - Run filter tests (sequential)
   - Run mobile responsive tests (parallel across viewports)
   - Run accessibility audit (parallel across pages)
   - Stop HTTP server
4. **Phase 4** (Sequential): Generate reports and summary

**Estimated execution time**: 10-15 minutes

## Cleanup

After testing:
```bash
# Stop HTTP server
kill $SERVER_PID

# Archive test results
mv .prompts/003-hupyy-website-testing/003-hupyy-website-testing.md \
   .prompts/003-hupyy-website-testing/completed/
```

## Notes

This testing phase is critical before deployment. Do NOT skip tests to save time.

If issues are found, generate the fixes-required.md file and either:
1. Apply fixes automatically (if safe)
2. Request user review before fixing
3. Report issues and wait for user decision

Testing serves as quality gate - deployment should only proceed after PASS status.
