<?php
/**
 * GoBabyGo Cabs - Built-in PHP Development Server Router
 * Usage: php -S localhost:8000 backend/router.php
 */

declare(strict_types=1);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize API requests
if (str_starts_with($uri, '/api/')) {
    $script = substr($uri, 5); // strip '/api/'

    // Append .php if omitted
    if (!str_ends_with($script, '.php')) {
        $script .= '.php';
    }

    $targetFile = __DIR__ . '/api/' . $script;
    if (file_exists($targetFile)) {
        require $targetFile;
        exit(0);
    }
}

// Serve static files if they physically exist
$publicFilePath = __DIR__ . $uri;
if ($uri !== '/' && file_exists($publicFilePath) && !is_dir($publicFilePath)) {
    return false; // Let PHP built-in server serve the static file
}

// Root route welcome check
if ($uri === '/' || $uri === '/api' || $uri === '/api/') {
    require __DIR__ . '/api/health.php';
    exit(0);
}

// 404 handler for API routes
header('Content-Type: application/json; charset=utf-8');
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => "Endpoint not found: {$uri}",
    'timestamp' => date('c'),
]);
exit(0);
