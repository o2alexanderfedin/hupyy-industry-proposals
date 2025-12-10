import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Hupyy Industry Proposals Site Verification
 *
 * This configuration sets up tests to verify the GitHub Pages deployment
 * at https://o2alexanderfedin.github.io/hupyy-industry-proposals/
 */
export default defineConfig({
  testDir: './specs',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: './reports', open: 'never' }],
    ['list'],
    ['json', { outputFile: './test-results/results.json' }]
  ],

  // Output directories
  outputDir: './test-results',

  // Shared test configuration
  use: {
    // Base URL for the site
    baseURL: 'https://o2alexanderfedin.github.io/hupyy-industry-proposals/',

    // Collect trace on failure
    trace: 'retain-on-failure',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Browser context options
    viewport: { width: 1280, height: 720 },

    // Emulate timezone
    timezoneId: 'America/Los_Angeles',

    // Permissions
    permissions: [],

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    // Mobile viewports
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5']
      },
    },

    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 12']
      },
    },

    // Tablet
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro']
      },
    },
  ],

  // Run your local dev server before starting tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:8000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
