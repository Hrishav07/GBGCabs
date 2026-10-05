<?php
/**
 * GoBabyGo Cabs - CORS & Security Middleware
 */

declare(strict_types=1);

$config = require __DIR__ . '/config.php';
$allowedOrigins = $config['cors']['allowed_origins'] ?? ['*'];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array('*', $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: *');
} elseif ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
} else {
    // Default safe origin for dev or same-origin
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
header('Access-Control-Max-Age: 86400'); // 24 hours preflight cache

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Immediately respond to preflight OPTIONS requests
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
