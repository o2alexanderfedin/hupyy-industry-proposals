#!/bin/bash
# Create a release using git-flow
# Usage: ./scripts/create-release.sh version [description]

if [ -z "$1" ]; then
    echo "Error: Version is required"
    echo "Usage: ./scripts/create-release.sh version [description]"
    echo "Example: ./scripts/create-release.sh v1.0.0 'Initial release'"
    exit 1
fi

VERSION=$1
DESCRIPTION=${2:-"Release $VERSION"}

echo "Creating release: $VERSION"
echo "Description: $DESCRIPTION"
echo ""

# Ensure we're on develop and up to date
echo "Ensuring develop is up to date..."
git checkout develop
git pull origin develop

# Start release branch
echo "Starting release branch..."
git flow release start "$VERSION"

# Update version in README if it exists
if [ -f README.md ]; then
    echo "Updating version in README.md..."
    # This is a placeholder - adjust based on your version format
    echo "Note: Remember to update version numbers in documentation if needed"
fi

echo ""
echo "Release branch created: release/$VERSION"
echo ""
echo "Next steps:"
echo "  1. Update version numbers in documentation"
echo "  2. Update CHANGELOG (if exists)"
echo "  3. Commit any version updates: git commit -am 'Bump version to $VERSION'"
echo "  4. Finish release: git flow release finish '$VERSION' -m '$DESCRIPTION'"
echo "  5. Push all branches and tags: git push origin main develop --tags"
echo ""
echo "Or run automatically:"
read -p "Finish release now? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Finish release (merges to main and develop, creates tag)
    git flow release finish "$VERSION" -m "$DESCRIPTION"

    # Push everything
    echo "Pushing to remote..."
    git push origin main
    git push origin develop
    git push origin --tags

    echo "✓ Release $VERSION complete!"
    echo "✓ Tagged and pushed to GitHub"
    echo ""
    echo "GitHub Actions will now deploy to GitHub Pages"
    echo "Monitor deployment: gh run watch"
fi
