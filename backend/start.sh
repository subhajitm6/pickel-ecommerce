#!/bin/sh

# Set Render PORT or default to 8080
PORT=${PORT:-8080}

# Update nginx listen port based on Render's dynamic PORT
sed -i "s/listen 80;/listen ${PORT};/g" /etc/nginx/sites-enabled/default

# Cache configurations for production
echo "Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Start PHP-FPM in the background
echo "Starting PHP-FPM..."
php-fpm -D

# Start Nginx in the foreground
echo "Starting Nginx..."
nginx -g "daemon off;"
