# Quick Setup Guide for Playwright Tests

## One-Time Setup

Follow these steps to set up the Playwright test suite:

### 1. Install Dependencies

```bash
cd tests/playwright
npm install
```

This will install:
- `@playwright/test` - Playwright test runner
- `@types/node` - TypeScript type definitions

### 2. Install Playwright Browsers

```bash
npx playwright install chromium
```

**Optional**: Install all browsers for comprehensive testing:
```bash
npx playwright install
```

This installs browser binaries for:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

### 3. Verify Installation

```bash
npm test -- --list
```

Should display 6 test suites:
- site-accessibility.spec.ts
- repository-link.spec.ts
- navigation.spec.ts
- search-functionality.spec.ts
- filter-functionality.spec.ts
- responsive-design.spec.ts

## Running Your First Test

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:headed

# Open interactive UI
npm run test:ui
```

## Expected Test Results

When tests pass, you'll see output like:

```
Running 103 tests using 4 workers

  ✓ 1 site-accessibility.spec.ts:7:1 › Site Accessibility › should load index.html successfully (1s)
  ✓ 2 site-accessibility.spec.ts:12:1 › Site Accessibility › should display hero section (847ms)
  ...

  103 passed (2m 15s)
```

## View HTML Report

```bash
npm run test:report
```

Opens an interactive HTML report showing:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Execution traces

## Troubleshooting

### Error: "Browser not installed"

Run: `npx playwright install chromium`

### Error: "Cannot find module '@playwright/test'"

Run: `npm install`

### Tests timeout

- Check internet connection
- Verify site is accessible: https://o2alexanderfedin.github.io/hupyy-industry-proposals/
- Increase timeout in playwright.config.ts if needed

## Next Steps

- Review [README.md](README.md) for comprehensive documentation
- Explore test files in `specs/` directory
- Customize tests for your needs
- Integrate into CI/CD pipeline (optional)

## Testing Against Local Development

To test against a local server instead of the live site:

1. Open `playwright.config.ts`
2. Change `baseURL` to `http://localhost:8000`
3. Start local server: `cd ../../docs && python3 -m http.server 8000`
4. Run tests: `npm test`

---

**Ready to test?** Run `npm test` to verify the deployment!
