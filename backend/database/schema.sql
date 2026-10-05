-- ==============================================================================
-- GoBabyGo Cabs (GBG EV & GBG X) - Production Database Schema
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB 10.3+
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `gbg_cabs_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `gbg_cabs_db`;

-- ------------------------------------------------------------------------------
-- 1. Bookings Table (Rides, Scooter Subscriptions, Test Rides, Fleet Leases)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `booking_ref` VARCHAR(32) NOT NULL UNIQUE,
    `service_type` VARCHAR(64) NOT NULL DEFAULT 'scooter_subscription',
    `vehicle_model` VARCHAR(128) DEFAULT 'GBG EV Multi-Brand',
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(32) NOT NULL,
    `city` VARCHAR(100) NOT NULL DEFAULT 'Noida / NCR',
    `pickup_location` TEXT DEFAULT NULL,
    `drop_location` TEXT DEFAULT NULL,
    `preferred_date` DATE DEFAULT NULL,
    `preferred_time` VARCHAR(32) DEFAULT NULL,
    `duration` VARCHAR(64) DEFAULT 'Monthly Rental',
    `notes` TEXT DEFAULT NULL,
    `status` ENUM('pending', 'contacted', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_bookings_email` (`customer_email`),
    INDEX `idx_bookings_phone` (`customer_phone`),
    INDEX `idx_bookings_status` (`status`),
    INDEX `idx_bookings_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Inquiries Table (B2B Fleet, Franchise, Buy & Lease Investors, General Contact)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `inquiry_ref` VARCHAR(32) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(32) NOT NULL,
    `company_name` VARCHAR(150) DEFAULT NULL,
    `inquiry_type` VARCHAR(64) NOT NULL DEFAULT 'general_inquiry',
    `fleet_size` VARCHAR(64) DEFAULT NULL,
    `city` VARCHAR(100) DEFAULT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'in_progress', 'converted', 'closed') NOT NULL DEFAULT 'new',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_inquiries_email` (`email`),
    INDEX `idx_inquiries_type` (`inquiry_type`),
    INDEX `idx_inquiries_status` (`status`),
    INDEX `idx_inquiries_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Newsletter Subscribers Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `source` VARCHAR(64) NOT NULL DEFAULT 'website_footer',
    `status` ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_newsletter_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Admin Users Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `last_login_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Default Initial Admin Account:
-- Email: admin@gbgcabs.com
-- Password: Admin@GBG2026!
-- (Pre-hashed with BCRYPT)
-- ------------------------------------------------------------------------------
INSERT INTO `admin_users` (`name`, `email`, `password_hash`, `role`, `status`)
VALUES (
    'GBG Fleet Administrator',
    'admin@gbgcabs.com',
    '$2y$12$Nq9v7wVvC4eJ3eE8/4f.euT2jI8o8zGlnr57c8gH2qB4U7e6Wq71K',
    'superadmin',
    'active'
)
ON DUPLICATE KEY UPDATE `email` = `email`;
