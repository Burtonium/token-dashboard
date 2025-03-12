#!/bin/bash

MODULES_DIR="./ignition/modules"
NETWORK="localhost"

# Check if the directory exists
if [ ! -d "$MODULES_DIR" ]; then
  echo "Error: Ignition modules directory not found: $MODULES_DIR"
  exit 1
fi

# Loop through all TypeScript or JavaScript files in the modules directory
for file in "$MODULES_DIR"/*.ts "$MODULES_DIR"/*.js; do
  # Check if there are any matching files
  if [ -f "$file" ]; then
    MODULE_NAME=$(basename "$file")

    echo "Deploying $MODULE_NAME..."
    npx hardhat ignition deploy "ignition/modules/$MODULE_NAME" --network "$NETWORK"

    if [ $? -ne 0 ]; then
      echo "Error deploying $MODULE_NAME. Exiting..."
      exit 1
    fi
  fi
done

echo "All modules deployed successfully!"
