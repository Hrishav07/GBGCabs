<?php
/**
 * GoBabyGo Cabs - Health Check Endpoint
 * GET /api/health.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/Response.php';

$pdo = Database::getConnection();
$isFallback = Database::isFallback();
$fallbackError = Database::getFallbackError();

$status = [
    'service' => 'GoBabyGo Cabs Backend API',
    'status' => 'operational',
    'php_version' => PHP_VERSION,
    'server_time' => date('c'),
    'database' => [
        'mode' => $isFallback ? 'file_storage_fallback' : 'mysql_pdo',
        'connected' => ($pdo !== null),
        'note' => $isFallback ? "Using persistent file storage in backend/data. Set MySQL password in backend/.env to switch to MySQL." : "Connected to MySQL successfully.",
    ],
    'environment' => $config['app']['env'] ?? 'development',
];

if (!empty($fallbackError)) {
    $status['database']['last_mysql_notice'] = $fallbackError;
}

Response::success($status, 'GBG API is running smoothly.');
