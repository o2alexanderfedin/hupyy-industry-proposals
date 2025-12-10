# Playwright Tests - Quick Reference Card

## Installation (One-Time)

```bash
cd tests/playwright
npm install
npx playwright install chromium
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Interactive test UI |
| `npm run test:debug` | Debug mode (step through) |
| `npm run test:report` | View HTML report |

## Test Files (6 Suites, 103 Tests)

| File | Tests | What It Tests |
|------|-------|---------------|
| `site-accessibility.spec.ts` | 10 | Core elements, hero, tech cards, 10 industry cards |
| `repository-link.spec.ts` | 13 | GitHub link, styling, security, hover, sticky |
| `navigation.spec.ts` | 15 | Report pages, breadcrumbs, PDFs, back button |
| `search-functionality.spec.ts` | 16 | Search box, filtering, real-time updates |
| `filter-functionality.spec.ts` | 16 | Tier 1, Safety-Critical, Regulated filters |
| `responsive-design.spec.ts` | 33 | Mobile (375px), Tablet (768px), Desktop (1920px) |

## Run Specific Tests

```bash
# Single file
npx playwright test specs/site-accessibility.spec.ts

# By test name
npx playwright test --grep "GitHub"

# Single test
npx playwright test --grep "should load index.html successfully"
```

## Debugging Failed Tests

```bash
# Debug mode
npm run test:debug

# Show trace
npx playwright show-trace test-results/[test-name]/trace.zip

# View report with failures
npm run test:report
```

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Browser not installed" | `npx playwright install chromium` |
| "Cannot find module" | `npm install` |
| Tests timeout | Check internet, verify site is up |
| No report | Run `npm test` first, then `npm run test:report` |

## Expected Results

**All tests passing**:
- ✅ 103 tests in ~2 minutes
- ✅ HTML report in `reports/`
- ✅ No errors or warnings

## Test Against Local Development

1. Edit `playwright.config.ts`: Change `baseURL` to `http://localhost:8000`
2. Start server: `cd ../../docs && python3 -m http.server 8000`
3. Run tests: `npm test`

## File Locations

- **Config**: `playwright.config.ts`
- **Tests**: `specs/*.spec.ts`
- **Reports**: `reports/` (HTML)
- **Results**: `test-results/` (JSON, screenshots, videos)
- **Docs**: `README.md`, `SETUP.md`

## Test Coverage Summary

✅ Site loads and renders correctly
✅ GitHub link works and is styled properly
✅ Navigation to all report pages
✅ Search filters 10 industry cards
✅ Filter buttons (All, Tier 1, Safety, Regulated)
✅ Responsive design (mobile, tablet, desktop)

---

**Quick Start**: `npm install && npx playwright install chromium && npm test`
