#!/bin/bash
# Start a new feature branch using git-flow
# Usage: ./scripts/start-feature.sh feature-name

if [ -z "$1" ]; then
    echo "Error: Feature name is required"
    echo "Usage: ./scripts/start-feature.sh feature-name"
    exit 1
fi

FEATURE_NAME=$1

echo "Starting feature: $FEATURE_NAME"
echo "Switching to develop and pulling latest changes..."

git checkout develop
git pull origin develop

echo "Creating feature branch: feature/$FEATURE_NAME"
git flow feature start "$FEATURE_NAME"

echo "✓ Feature branch created successfully"
echo "You are now on branch: feature/$FEATURE_NAME"
echo ""
echo "Next steps:"
echo "  1. Make your changes"
echo "  2. Commit your changes: git add . && git commit -m 'Your message'"
echo "  3. Finish feature: ./scripts/finish-feature.sh $FEATURE_NAME"
