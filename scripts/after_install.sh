#!/bin/bash
# Stop the Node.js app
# pm2 stop deploy-nestjs

# Move to the deployment directory
cd /var/www/html/deploy-nestjs

# Install dependencies
# npm install

# Restart the Node.js app
# pm2 start deploy-nestjs

docker build -t nesjt-deploy .