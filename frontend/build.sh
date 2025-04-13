#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting the frontend build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Run linting
echo "Running linting checks..."
npm run lint

# Build the application
echo "Building the frontend application..."
npm run build

echo "Build completed successfully!"
echo "The production build files are available in the 'dist' directory."

# Optional: Print file sizes
echo "File sizes:"
if [ -d "dist" ]; then
    du -sh dist
    find dist -type f -name "*.js" -o -name "*.css" | xargs du -sh
fi

echo "Build process finished!"
