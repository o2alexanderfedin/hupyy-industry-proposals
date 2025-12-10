# Hupyy Proposals Website Generation

## Objective
Transform the 10 industry research reports into a professional GitHub Pages website with:
- Responsive HTML pages with Material Design cards
- PDF exports of all reports
- Interactive index page with filtering/search
- Mobile-friendly design
- Fast loading and SEO optimization

## Context
Input reports: @.prompts/001-hupyy-industry-research/reports/*.md
Master research: @.prompts/001-hupyy-industry-research/hupyy-industry-research.md

This prompt depends on completion of `001-hupyy-industry-research`.

## Requirements

### Technology Stack
- **HTML5/CSS3** with Material Design Lite (MDL) or Material Components Web (MCW)
- **Vanilla JavaScript** (no build step required for GitHub Pages)
- **markdown-it** (for markdown rendering in browser)
- **jsPDF** + **html2pdf.js** (for PDF generation)
- **Lunr.js** (for client-side search)

### File Structure

Generate the following structure in `docs/` (GitHub Pages root):

```
docs/
├── index.html                    # Main landing page with cards
├── assets/
│   ├── css/
│   │   ├── main.css             # Custom styles
│   │   └── material-icons.css   # Material icons
│   ├── js/
│   │   ├── main.js              # Navigation, search, filtering
│   │   ├── pdf-generator.js     # PDF export functionality
│   │   └── markdown-renderer.js # Markdown to HTML
│   └── images/
│       ├── hupyy-logo.svg       # Generate or placeholder
│       └── industry-icons/      # SVG icons for each industry
├── reports/
│   ├── financial-services.html
│   ├── healthcare.html
│   ├── enterprise-security.html
│   ├── legal-services.html
│   ├── manufacturing.html
│   ├── government-defense.html
│   ├── education-research.html
│   ├── ai-ml-operations.html
│   ├── software-development.html
│   └── energy-utilities.html
├── pdfs/
│   ├── financial-services.pdf
│   ├── healthcare.pdf
│   └── ... (all 10 PDFs)
└── markdown/
    ├── financial-services.md    # Original markdown (for download)
    └── ... (all 10 markdown files)
```

### Index Page (index.html) Requirements

#### Header Section
- Hupyy logo and tagline
- Navigation: Home | About | Industries | Contact
- Search bar (powered by Lunr.js)

#### Hero Section
```html
<section class="hero">
  <h1>Hupyy Technologies: Industry Solutions</h1>
  <p class="subtitle">AI-Powered Workplace Intelligence with Mathematical Certainty</p>
  <div class="hero-stats">
    <div class="stat"><strong>10</strong> Industries Analyzed</div>
    <div class="stat"><strong>3</strong> Core Technologies</div>
    <div class="stat"><strong>$XXB</strong> Total Addressable Market</div>
  </div>
</section>
```

#### Technology Overview Section
Three cards explaining Hupyy KB, Formal Verification, and Autonomous SE (from HUPYY-TECH.md)

#### Industry Cards Section
10 Material Design cards in a responsive grid (3 columns desktop, 1 column mobile):

Each card must include:
- Industry icon (SVG)
- Industry name
- 2-3 sentence summary from report
- Market size badge
- Key benefit highlight
- Three action buttons:
  - "View Report" (→ HTML page)
  - "Download PDF" (→ PDF file)
  - "Download MD" (→ Markdown file)

Example card structure:
```html
<div class="mdc-card industry-card" data-industry="financial-services">
  <div class="card-icon">
    <img src="assets/images/industry-icons/financial.svg" alt="Financial Services">
  </div>
  <div class="card-content">
    <h3>Financial Services</h3>
    <p class="market-size">$XXB Market</p>
    <p class="summary">Transform banking operations with verified RAG and
       autonomous compliance systems...</p>
    <div class="key-benefit">
      <strong>Top Benefit:</strong> 95% reduction in compliance audit time
    </div>
  </div>
  <div class="card-actions">
    <button onclick="navigateToReport('financial-services')" class="mdc-button">
      View Report
    </button>
    <button onclick="downloadPDF('financial-services')" class="mdc-button mdc-button--outlined">
      Download PDF
    </button>
    <button onclick="downloadMarkdown('financial-services')" class="mdc-button mdc-button--outlined">
      Download MD
    </button>
  </div>
</div>
```

#### Filtering & Search
- Filter buttons: All | Security-Critical | High ROI | Regulatory-Heavy
- Search bar that searches across all report content
- Real-time filtering using Lunr.js

### Individual Report Pages (reports/*.html)

Each report page must include:

#### Navigation
- Breadcrumbs: Home > Industries > {Industry Name}
- Sidebar navigation (auto-generated from report sections)
- "Back to Industries" button
- Export buttons (PDF, MD)

#### Content Rendering
- Convert markdown to HTML with proper styling
- Syntax highlighting for any code blocks
- Responsive tables
- Anchor links for all headings
- Reading progress indicator

#### Footer
- Links to other industry reports
- Contact/feedback section
- Copyright notice

### PDF Generation

Two approaches (implement both):

#### Approach 1: Pre-generated PDFs (Preferred)
Use a Node.js script with Puppeteer to generate PDFs during build:

```javascript
// scripts/generate-pdfs.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(htmlFile, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    printBackground: true
  });
  await browser.close();
}

// Generate all PDFs
```

#### Approach 2: Client-side PDF Generation (Fallback)
Use html2pdf.js for on-demand generation in browser

### Styling Requirements

#### Color Scheme (Professional)
```css
:root {
  --primary-color: #1976D2;        /* Blue */
  --secondary-color: #424242;      /* Dark Gray */
  --accent-color: #FFA726;         /* Orange */
  --success-color: #66BB6A;        /* Green */
  --background: #FAFAFA;           /* Light Gray */
  --card-background: #FFFFFF;
  --text-primary: #212121;
  --text-secondary: #757575;
}
```

#### Typography
- Headings: Roboto (Google Fonts)
- Body: Roboto / Open Sans
- Code: Fira Code / Roboto Mono

#### Responsive Breakpoints
```css
/* Mobile: < 600px */
/* Tablet: 600px - 1024px */
/* Desktop: > 1024px */
```

### Performance Optimization

- [ ] Lazy load images
- [ ] Minify CSS/JS
- [ ] Use CDN for libraries (Material, markdown-it, etc.)
- [ ] Implement service worker for offline access (optional)
- [ ] Compress images to WebP with fallbacks
- [ ] Defer non-critical JavaScript

### SEO & Meta Tags

Each page must include:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Industry} Solutions | Hupyy Technologies</title>
  <meta name="description" content="{2 sentence summary from report}">
  <meta name="keywords" content="Hupyy, {industry}, AI, RAG, formal verification">
  <meta property="og:title" content="{Industry} Solutions | Hupyy">
  <meta property="og:description" content="{summary}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://{username}.github.io/{repo}/reports/{industry}.html">

  <link rel="canonical" href="https://{username}.github.io/{repo}/reports/{industry}.html">
</head>
```

### GitHub Pages Configuration

Create `.nojekyll` file in `docs/` to bypass Jekyll processing.

Create `docs/_config.yml`:
```yaml
theme: null
markdown: GFM
```

## Implementation Steps

### Step 1: Create Directory Structure
```bash
mkdir -p docs/{assets/{css,js,images/industry-icons},reports,pdfs,markdown}
```

### Step 2: Copy Markdown Files
Copy all reports from `.prompts/001-hupyy-industry-research/reports/*.md` to `docs/markdown/`

### Step 3: Generate HTML Pages
For each markdown report:
1. Parse markdown to extract metadata and content
2. Generate semantic HTML with Material components
3. Create table of contents from headings
4. Add navigation and export buttons
5. Save to `docs/reports/{industry}.html`

### Step 4: Generate Index Page
1. Extract summary data from all reports
2. Create hero section with aggregate stats
3. Generate 10 industry cards with correct data
4. Implement search index with Lunr.js
5. Add filtering logic

### Step 5: Generate PDFs
Run Puppeteer script to create all PDFs from HTML pages

### Step 6: Create Assets
- Generate/find appropriate industry icons (SVG)
- Create Hupyy logo (or use placeholder)
- Write CSS for responsive design
- Write JavaScript for interactivity

### Step 7: Testing (Do NOT test yet - that's next prompt)
Leave testing for the dedicated testing prompt (003)

## Output Files

Primary output: `docs/` directory with complete website

### Key Deliverables
- [ ] `docs/index.html` - 300+ lines, fully functional
- [ ] 10 HTML report pages - each 500+ lines
- [ ] 10 PDF files - professionally formatted
- [ ] 10 markdown files - copied originals
- [ ] `docs/assets/css/main.css` - 500+ lines
- [ ] `docs/assets/js/main.js` - 300+ lines
- [ ] `docs/assets/js/pdf-generator.js` - 100+ lines
- [ ] Search index for Lunr.js
- [ ] All icons and images

### Quality Checklist

Before considering complete:
- [ ] All 10 industry pages render correctly
- [ ] Cards on index page display accurate data
- [ ] Search functionality works across all content
- [ ] Filtering buttons work correctly
- [ ] All PDFs generated successfully
- [ ] Mobile responsive (test viewport sizes)
- [ ] All links functional
- [ ] No console errors
- [ ] Fast loading (< 3s on 3G)
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation

## Detailed Implementation Guide

### Card Data Extraction Script

Create a script to extract card data from markdown reports:

```javascript
// scripts/extract-card-data.js
const fs = require('fs');
const path = require('path');

function extractCardData(markdownPath) {
  const content = fs.readFileSync(markdownPath, 'utf-8');

  // Extract executive summary (first 2-3 sentences)
  const execSummaryMatch = content.match(/## Executive Summary\n\n([\s\S]*?)\n\n##/);
  const summary = execSummaryMatch ? execSummaryMatch[1].substring(0, 200) + '...' : '';

  // Extract market size from metadata
  const marketSizeMatch = content.match(/<market_size>(.*?)<\/market_size>/);
  const marketSize = marketSizeMatch ? marketSizeMatch[1] : 'N/A';

  // Extract top benefit from metadata
  const topUseCaseMatch = content.match(/<use_case priority="1">(.*?)<\/use_case>/);
  const topBenefit = topUseCaseMatch ? topUseCaseMatch[1] : '';

  return {
    summary,
    marketSize,
    topBenefit
  };
}

// Export for use in HTML generation
module.exports = { extractCardData };
```

### Material Design Card Template

```html
<div class="mdc-card mdc-card--outlined industry-card" data-tags="security regulatory">
  <div class="card-primary">
    <div class="card-icon-wrapper">
      <img src="assets/images/industry-icons/financial.svg" alt="" class="card-icon">
    </div>
    <div class="card-header">
      <h2 class="mdc-typography--headline6">Financial Services</h2>
      <span class="market-badge mdc-chip">
        <span class="mdc-chip__text">$4.5T Market</span>
      </span>
    </div>
  </div>

  <div class="card-content">
    <p class="mdc-typography--body2 summary-text">
      Transform banking operations with mathematically verified AI systems...
    </p>

    <div class="key-benefit">
      <svg class="benefit-icon" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span class="mdc-typography--body2">
        <strong>Top Benefit:</strong> 95% faster compliance audits
      </span>
    </div>
  </div>

  <div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button class="mdc-button mdc-card__action mdc-card__action--button"
              onclick="navigateToReport('financial-services')">
        <span class="mdc-button__label">View Report</span>
      </button>
    </div>
    <div class="mdc-card__action-icons">
      <button class="mdc-icon-button mdc-card__action mdc-card__action--icon"
              onclick="downloadPDF('financial-services')"
              title="Download PDF">
        <svg viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2z"/><path d="M13 12.67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/></svg>
      </button>
      <button class="mdc-icon-button mdc-card__action mdc-card__action--icon"
              onclick="downloadMarkdown('financial-services')"
              title="Download Markdown">
        <svg viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/><path d="M7 17h2v-6h2l-3-4-3 4h2v6zm8 0h2v-6h1.5l-2.5-3-2.5 3H15v6z"/></svg>
      </button>
    </div>
  </div>
</div>
```

### Search Implementation

```javascript
// assets/js/main.js - Search functionality
let searchIndex;
let documents;

async function initializeSearch() {
  // Load pre-built search index
  const response = await fetch('assets/search-index.json');
  const data = await response.json();
  documents = data.documents;

  searchIndex = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('summary', { boost: 5 });
    this.field('content');

    data.documents.forEach(doc => {
      this.add(doc);
    });
  });
}

function performSearch(query) {
  const results = searchIndex.search(query);
  displaySearchResults(results);
}

function displaySearchResults(results) {
  const container = document.getElementById('search-results');

  if (results.length === 0) {
    container.innerHTML = '<p>No results found</p>';
    return;
  }

  container.innerHTML = results.map(result => {
    const doc = documents.find(d => d.id === result.ref);
    return `
      <div class="search-result-card">
        <h3><a href="reports/${doc.id}.html">${doc.title}</a></h3>
        <p>${doc.summary}</p>
        <span class="result-score">Relevance: ${(result.score * 100).toFixed(0)}%</span>
      </div>
    `;
  }).join('');
}
```

### Build Search Index Script

```javascript
// scripts/build-search-index.js
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');

const md = new markdownIt();

function buildSearchIndex() {
  const reportsDir = path.join(__dirname, '../.prompts/001-hupyy-industry-research/reports');
  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.md'));

  const documents = files.map((file, index) => {
    const content = fs.readFileSync(path.join(reportsDir, file), 'utf-8');
    const titleMatch = content.match(/# Hupyy Technologies: (.*?) Market Proposal/);
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '');

    const summaryMatch = content.match(/## Executive Summary\n\n([\s\S]*?)\n\n##/);
    const summary = summaryMatch ? summaryMatch[1].replace(/\n/g, ' ') : '';

    // Remove markdown syntax for search
    const plainContent = content
      .replace(/#+\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/<[^>]*>/g, '');

    return {
      id: file.replace('-proposal.md', ''),
      title,
      summary,
      content: plainContent
    };
  });

  fs.writeFileSync(
    path.join(__dirname, '../docs/assets/search-index.json'),
    JSON.stringify({ documents }, null, 2)
  );

  console.log(`✓ Built search index with ${documents.length} documents`);
}

buildSearchIndex();
```

## Execution Strategy

**IMPORTANT**: This is a complex task requiring multiple subtasks. Use parallel execution where possible:

### Parallel Task Group 1: Asset Generation (4 tasks)
1. Generate industry icons (SVG)
2. Create main CSS file
3. Create JavaScript files
4. Build search index

### Sequential Task Group 2: Page Generation
1. Generate index.html (needs card data from all reports)
2. Generate 10 report HTML pages in parallel (8 at once)

### Parallel Task Group 3: PDF Generation
Generate all 10 PDFs in parallel

### Task: Validation Script
Create a validation script that checks all requirements

## SUMMARY.md Requirements

Create `.prompts/002-hupyy-website-generation/SUMMARY.md`:

```markdown
# Hupyy Website Generation Summary

**Professional GitHub Pages site with 10 industry reports, interactive cards, and PDF exports**

## Version
v1.0 - Initial website generation

## Key Deliverables

### Pages Created
- 1 index page with Material Design cards and search
- 10 industry-specific HTML report pages
- Responsive design (mobile/tablet/desktop)

### Assets Generated
- 10 industry PDF reports (professionally formatted)
- 10 markdown files (originals copied)
- Custom CSS (500+ lines) with Material Design
- Interactive JavaScript (search, filtering, navigation)
- 10 industry-specific SVG icons
- Complete search index (Lunr.js)

### Features Implemented
- ✓ Material Design card grid (responsive 3/2/1 columns)
- ✓ Client-side search across all content
- ✓ Category filtering (security, regulatory, ROI)
- ✓ PDF export functionality (pre-generated + on-demand)
- ✓ Mobile-first responsive design
- ✓ Keyboard navigation and accessibility
- ✓ SEO optimization with meta tags
- ✓ Fast loading (< 3s on 3G)

### Performance Metrics
- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Total page size: < 2MB (index), < 500KB (report pages)

## Files Created
```
docs/
├── index.html (1 file, 400 lines)
├── reports/*.html (10 files, ~500 lines each)
├── pdfs/*.pdf (10 files)
├── markdown/*.md (10 files, originals)
├── assets/css/main.css (1 file, 600 lines)
├── assets/js/*.js (3 files, 500 lines total)
├── assets/images/industry-icons/*.svg (10 files)
└── assets/search-index.json (1 file)

Total: 37 files
```

## Decisions Needed
- [ ] Review and approve website design/layout
- [ ] Decide on GitHub repository name for Pages URL
- [ ] Confirm industry icon designs are appropriate
- [ ] Approve color scheme and branding

## Blockers
None - website generation complete, ready for testing

## Next Step
**Create testing and validation prompt** to verify website with:
- WebFetch tool for page loading validation
- Playwright for interactive testing (search, filtering, navigation)
- Accessibility audit
- Mobile responsiveness testing
- PDF download verification

Suggested next prompt: `003-hupyy-website-testing`
```

## Success Criteria

- [ ] All HTML pages valid and render correctly
- [ ] Material Design components properly implemented
- [ ] All 10 PDFs generated and accessible
- [ ] Search functionality works across all content
- [ ] Filtering works correctly
- [ ] Mobile responsive (tested 320px, 768px, 1024px, 1920px)
- [ ] No console errors in browser
- [ ] All links functional (internal and external)
- [ ] Fast loading (< 3s on 3G simulation)
- [ ] Accessibility score 90+ (WCAG 2.1 AA)
- [ ] SEO meta tags on all pages
- [ ] GitHub Pages ready (no Jekyll issues)

## Notes

**Do NOT test the website yet** - testing will be handled by prompt 003.

Focus on generation and ensuring all files are created correctly. The testing prompt will use WebFetch and Playwright to validate everything works.
