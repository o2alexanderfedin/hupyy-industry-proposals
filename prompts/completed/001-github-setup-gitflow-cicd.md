<objective>
Set up a new GitHub repository with complete git-flow branching strategy, configure GitHub Actions CI/CD pipeline for automated testing and deployment to GitHub Pages.

This will enable professional development workflow with:
- Proper branch protection and git-flow conventions
- Automated testing and linting before deployment
- Continuous deployment to GitHub Pages on releases
- Team collaboration with pull request workflows
</objective>

<context>
Current state: Local git repository exists with initial commit
Target state: GitHub repository with git-flow, branch protection, and CI/CD pipeline configured

Project details:
- Static website in `docs/` folder (GitHub Pages ready)
- Research reports and markdown documentation
- No build step required (vanilla HTML/CSS/JS)

Read project guidelines: @CLAUDE.md for any specific requirements
</context>

<requirements>

## 1. Create GitHub Repository

Use GitHub CLI (gh) to create a new repository:
- Repository name: Choose descriptive name (suggest: hupyy-industry-proposals)
- Description: "Comprehensive industry research and analysis for Hupyy Technologies across 10 verticals with interactive website"
- Visibility: Public (for GitHub Pages)
- Initialize without README (we already have one)

## 2. Configure Git Flow Locally

Install and initialize git-flow with these branches:
- **main**: Production-ready code, deployed to GitHub Pages
- **develop**: Integration branch for features
- **feature/\***: Feature development branches
- **release/\***: Release preparation branches
- **hotfix/\***: Emergency fixes to main

Branch naming convention:
- Features: `feature/descriptive-name`
- Releases: `release/v1.0.0` (semantic versioning)
- Hotfixes: `hotfix/issue-description`

## 3. Push Initial Code

Push the current commit to both main and develop:
```bash
git push -u origin main
git checkout -b develop
git push -u origin develop
```

## 4. Configure Branch Protection Rules

Use GitHub CLI or API to set up branch protection for `main`:
- Require pull request reviews before merging (at least 1 approval)
- Require status checks to pass before merging (CI/CD pipeline)
- Require branches to be up to date before merging
- Do NOT allow force pushes
- Do NOT allow deletions

For `develop` branch:
- Require status checks to pass
- Allow force pushes (for rebasing)

## 5. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` with the following CI/CD pipeline:

**Trigger conditions:**
- Push to `main` branch (releases)
- Pull requests to `main` or `develop`

**Pipeline stages:**

### Stage 1: Validation (runs on all PRs and pushes)
- Checkout code
- Validate HTML files (use html5validator or similar)
- Validate markdown files (use markdownlint)
- Check for broken links (use markdown-link-check)
- Validate file sizes are reasonable

### Stage 2: Testing (runs on all PRs and pushes)
- Set up Python environment
- Install dependencies (if any)
- Run any test scripts (if they exist)
- Check that all required files are present

### Stage 3: Build (runs on push to main only)
- No build step needed (static site)
- Verify docs/ directory structure
- Create deployment artifact

### Stage 4: Deploy to GitHub Pages (runs on push to main only)
- Use GitHub Pages action (peaceiris/actions-gh-pages or similar)
- Deploy from `docs/` folder
- Force orphan branch for gh-pages
- Include CNAME if custom domain configured

**Workflow should:**
- Use latest stable GitHub Actions versions
- Include caching for dependencies (if applicable)
- Show clear status messages
- Fail fast on errors
- Use GitHub Actions secrets for any sensitive data

## 6. Enable GitHub Pages

Configure GitHub Pages settings:
- Source: Deploy from a branch
- Branch: `gh-pages` (will be created by CI/CD)
- Folder: `/` (root)
- Enforce HTTPS: Yes

Alternative if using GitHub Actions deployment:
- Source: GitHub Actions (recommended approach)

## 7. Create Git Flow Helper Scripts (Optional)

Create convenience scripts in project root:

**`scripts/start-feature.sh`**: Start a new feature
```bash
#!/bin/bash
git checkout develop
git pull origin develop
git flow feature start $1
```

**`scripts/finish-feature.sh`**: Complete a feature
```bash
#!/bin/bash
git flow feature finish $1
git push origin develop
```

**`scripts/create-release.sh`**: Create a release
```bash
#!/bin/bash
git checkout develop
git pull origin develop
git flow release start $1
# Update version in relevant files
git flow release finish $1
git push origin main develop --tags
```

</requirements>

<implementation>

## Step-by-Step Execution

### Phase 1: GitHub Repository Setup

1. **Check if gh CLI is installed:**
   ```bash
   gh --version
   ```
   If not installed, provide instructions for installation

2. **Authenticate with GitHub:**
   ```bash
   gh auth login
   ```

3. **Create repository:**
   ```bash
   gh repo create hupyy-industry-proposals \
     --public \
     --description "Comprehensive industry research for Hupyy Technologies - 10 verticals, $75-115B SAM analysis" \
     --source=. \
     --remote=origin
   ```

4. **Verify remote is added:**
   ```bash
   git remote -v
   ```

### Phase 2: Git Flow Setup

1. **Install git-flow if not present:**
   - macOS: `brew install git-flow`
   - Linux: `apt-get install git-flow` or `yum install gitflow`
   - Check with: `git flow version`

2. **Initialize git-flow:**
   ```bash
   git flow init -d
   ```
   This uses default branch names (main, develop, feature/, release/, hotfix/)

3. **Create and push develop branch:**
   ```bash
   git branch develop
   git push -u origin develop
   ```

### Phase 3: Branch Protection

Use `gh` CLI to configure branch protection:

```bash
# Protect main branch
gh api repos/:owner/:repo/branches/main/protection \
  -X PUT \
  -f required_pull_request_reviews[required_approving_review_count]=1 \
  -f required_status_checks[strict]=true \
  -f required_status_checks[contexts][]=validate \
  -f required_status_checks[contexts][]=test \
  -f enforce_admins=false \
  -f allow_force_pushes=false \
  -f allow_deletions=false

# Protect develop branch (less strict)
gh api repos/:owner/:repo/branches/develop/protection \
  -X PUT \
  -f required_status_checks[strict]=true \
  -f required_status_checks[contexts][]=validate \
  -f enforce_admins=false
```

### Phase 4: GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Validate HTML
        run: |
          # Check HTML files exist and are valid
          find docs -name "*.html" -exec echo "Checking {}" \;
          # Add html5validator if needed

      - name: Validate Markdown
        uses: DavidAnson/markdownlint-cli2-action@v14
        with:
          globs: '**/*.md'

      - name: Check file sizes
        run: |
          echo "Checking file sizes..."
          find docs -type f -size +5M -exec ls -lh {} \;

  test:
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Verify file structure
        run: |
          test -f docs/index.html || exit 1
          test -d docs/reports || exit 1
          test -d docs/assets || exit 1
          echo "✓ All required files present"

  deploy:
    runs-on: ubuntu-latest
    needs: [validate, test]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'docs'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Phase 5: Enable GitHub Pages

```bash
# Enable GitHub Pages via CLI
gh api repos/:owner/:repo/pages \
  -X POST \
  -f source[branch]=gh-pages \
  -f source[path]=/

# Or use GitHub Actions deployment (recommended)
# This is configured in the workflow above
```

### Phase 6: Test the Workflow

1. **Create a test feature:**
   ```bash
   git flow feature start test-cicd
   echo "Test CI/CD" >> docs/README.md
   git add docs/README.md
   git commit -m "Test: Verify CI/CD pipeline"
   git flow feature finish test-cicd
   ```

2. **Push develop and create PR:**
   ```bash
   git push origin develop
   gh pr create --base main --head develop --title "Test: CI/CD Pipeline" --body "Testing automated deployment"
   ```

3. **Verify workflow runs:**
   ```bash
   gh run list
   gh run view
   ```

4. **Merge PR and check deployment:**
   ```bash
   gh pr merge --squash
   # Wait for deployment
   gh run watch
   ```

5. **Verify site is live:**
   ```bash
   gh browse
   # Navigate to Settings → Pages to see URL
   ```

</implementation>

<verification>

Before declaring success, verify:

1. **Repository Setup:**
   - [ ] GitHub repository created and accessible
   - [ ] Local repository connected to GitHub remote
   - [ ] Both main and develop branches pushed

2. **Git Flow:**
   - [ ] git-flow initialized locally
   - [ ] Can create feature branches: `git flow feature start test`
   - [ ] Can create release branches: `git flow release start v1.0.0`
   - [ ] Branches follow naming convention

3. **Branch Protection:**
   - [ ] Main branch requires PR reviews
   - [ ] Main branch requires status checks
   - [ ] Force push disabled on main
   - [ ] Develop branch has basic protection

4. **CI/CD Pipeline:**
   - [ ] `.github/workflows/deploy.yml` exists and is valid
   - [ ] Workflow triggers on push to main
   - [ ] Workflow triggers on PRs to main/develop
   - [ ] All three stages (validate, test, deploy) defined
   - [ ] Validation stage checks HTML and markdown
   - [ ] Deploy stage only runs on main branch

5. **GitHub Pages:**
   - [ ] GitHub Pages enabled in repository settings
   - [ ] Website accessible at GitHub Pages URL
   - [ ] All 10 industry report pages load correctly
   - [ ] Search and filter functionality works

6. **End-to-End Test:**
   - [ ] Created a test feature branch
   - [ ] PR triggered CI/CD validation
   - [ ] Merge to main triggered deployment
   - [ ] Changes reflected on live website within 2-3 minutes

Check deployment status:
```bash
gh run list --limit 5
gh browse --settings
```

Visit the live site:
```bash
# Get the GitHub Pages URL
gh api repos/:owner/:repo/pages | grep html_url
```

</verification>

<success_criteria>

The setup is complete when:

1. ✅ GitHub repository created with proper description and visibility
2. ✅ Git-flow initialized with all branch types (main, develop, feature/, release/, hotfix/)
3. ✅ Branch protection rules active on main (PR required, status checks required)
4. ✅ GitHub Actions workflow file created and functioning
5. ✅ CI/CD pipeline stages all passing (validate → test → deploy)
6. ✅ GitHub Pages enabled and website deployed successfully
7. ✅ Live website accessible at GitHub Pages URL
8. ✅ End-to-end test completed (feature → PR → merge → deploy → verify)
9. ✅ Documentation updated with repository URL and deployment instructions

**Final deliverables:**
- GitHub repository URL with code pushed
- CI/CD workflow running automatically
- Live website at `https://username.github.io/hupyy-industry-proposals/`
- Branch protection preventing accidental main branch changes
- Git-flow ready for team collaboration

</success_criteria>

<output>

Files to create:
- `.github/workflows/deploy.yml` - CI/CD pipeline configuration
- `scripts/start-feature.sh` - Helper script for starting features (optional)
- `scripts/finish-feature.sh` - Helper script for finishing features (optional)
- `scripts/create-release.sh` - Helper script for creating releases (optional)

Update README.md with:
- GitHub repository URL
- CI/CD badge from GitHub Actions
- Deployment status badge
- Contributing guidelines referencing git-flow

Commands will be executed via Bash tool.
GitHub API calls will use `gh` CLI.
</output>

<constraints>

**Why these constraints matter:**

1. **Branch protection on main**: Prevents accidental direct pushes to production, ensuring all changes go through review
2. **Required status checks**: Ensures CI/CD validates all changes before they reach production
3. **Git-flow convention**: Provides clear workflow for team collaboration and release management
4. **PR reviews required**: Catches bugs and maintains code quality through peer review
5. **Automated deployment**: Reduces manual deployment errors and enables continuous delivery

**Security considerations:**
- Never commit secrets or API keys to the repository
- Use GitHub Actions secrets for sensitive data
- Keep branch protection rules strict on main
- Regularly update GitHub Actions versions for security patches

</constraints>
