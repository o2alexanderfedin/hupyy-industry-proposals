#!/bin/bash
# Finish a feature branch using git-flow
# Usage: ./scripts/finish-feature.sh feature-name

if [ -z "$1" ]; then
    echo "Error: Feature name is required"
    echo "Usage: ./scripts/finish-feature.sh feature-name"
    exit 1
fi

FEATURE_NAME=$1

echo "Finishing feature: $FEATURE_NAME"

# Check if we're on the feature branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "feature/$FEATURE_NAME" ]; then
    echo "Switching to feature/$FEATURE_NAME..."
    git checkout "feature/$FEATURE_NAME"
fi

# Finish the feature (merges into develop)
git flow feature finish "$FEATURE_NAME"

echo "✓ Feature merged into develop"

# Push develop to remote
echo "Pushing develop to remote..."
git push origin develop

echo "✓ Feature complete and pushed to remote"
echo ""
echo "Next steps:"
echo "  - Create a pull request from develop to main for production deployment"
echo "  - Or create a release: ./scripts/create-release.sh v1.0.0"
