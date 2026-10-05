# ==============================================================================
# GoBabyGo Cabs - PHP 8.3 Apache Production Dockerfile
# ==============================================================================

FROM php:8.3-apache

# Install PDO MySQL and required extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql opcache \
    && a2enmod rewrite headers deflate

# Copy Apache configuration
COPY .htaccess /var/www/html/backend/.htaccess

# Set working directory
WORKDIR /var/www/html

# Expose HTTP port
EXPOSE 80

CMD ["apache2-foreground"]
