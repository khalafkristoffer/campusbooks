#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting the frontend build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Skip linting for the deployment
# echo "Running linting checks..."
# npm run lint

# Build the application
echo "Building the application..."
npm run build

echo "Build completed!"
exit 0
