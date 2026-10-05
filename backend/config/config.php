<?php
/**
 * GoBabyGo Cabs - Core Configuration Loader
 * Reads .env file with fallback defaults. Zero external dependencies.
 */

declare(strict_types=1);

if (!function_exists('loadEnv')) {
    function loadEnv(string $path): array {
        $env = [];
        if (!file_exists($path)) {
            return $env;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            if (strpos($line, '=') !== false) {
                [$key, $value] = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);

                // Strip quotes if wrapped
                if ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                    (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
                    $value = substr($value, 1, -1);
                }

                $env[$key] = $value;
                if (!isset($_ENV[$key])) {
                    $_ENV[$key] = $value;
                }
            }
        }
        return $env;
    }
}

$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
$loadedEnv = loadEnv($envPath);

if (!function_exists('env')) {
    function env(string $key, mixed $default = null): mixed {
        return $_ENV[$key] ?? getenv($key) ?: $default;
    }
}

return [
    'app' => [
        'name' => 'GoBabyGo Cabs Backend API',
        'env' => env('APP_ENV', 'development'),
        'debug' => filter_var(env('APP_DEBUG', true), FILTER_VALIDATE_BOOLEAN),
        'url' => env('APP_URL', 'http://localhost:8000'),
    ],
    'cors' => [
        'allowed_origins' => array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', '*')))),
    ],
    'database' => [
        'driver' => env('DB_DRIVER', 'mysql'),
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => (int)env('DB_PORT', 3306),
        'database' => env('DB_NAME', 'gbg_cabs_db'),
        'username' => env('DB_USER', 'root'),
        'password' => env('DB_PASS', ''),
        'charset' => 'utf8mb4',
    ],
    'jwt' => [
        'secret' => env('JWT_SECRET', 'gbg_fallback_secret_key_change_me_in_production'),
        'expiry' => 86400 * 7, // 7 days in seconds
    ],
    'admin' => [
        'name' => env('ADMIN_NAME', 'GBG Fleet Administrator'),
        'email' => env('ADMIN_EMAIL', 'admin@gbgcabs.com'),
        'password' => env('ADMIN_PASSWORD', 'Admin@GBG2026!'),
    ],
];
