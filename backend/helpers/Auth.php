<?php
/**
 * GoBabyGo Cabs - Authentication & Security Token Helper
 * Lightweight HMAC-SHA256 Bearer Token implementation.
 * Zero external libraries required.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/Response.php';

class Auth {
    public static function hashPassword(string $password): string {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    }

    public static function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    private static function base64UrlEncode(string $data): string {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }
        return (string)base64_decode(strtr($data, '-_', '+/'));
    }

    public static function generateToken(array $payload): string {
        $config = require __DIR__ . '/../config/config.php';
        $secret = $config['jwt']['secret'];
        $expiry = time() + ($config['jwt']['expiry'] ?? 604800); // 7 days

        $header = self::base64UrlEncode((string)json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload['exp'] = $expiry;
        $payload['iat'] = time();
        $payloadEncoded = self::base64UrlEncode((string)json_encode($payload));

        $signature = hash_hmac('sha256', "{$header}.{$payloadEncoded}", $secret, true);
        $signatureEncoded = self::base64UrlEncode($signature);

        return "{$header}.{$payloadEncoded}.{$signatureEncoded}";
    }

    public static function verifyToken(string $token): ?array {
        $parts = explode('.', trim($token));
        if (count($parts) !== 3) {
            return null;
        }

        [$header, $payloadEncoded, $signatureEncoded] = $parts;
        $config = require __DIR__ . '/../config/config.php';
        $secret = $config['jwt']['secret'];

        $expectedSig = hash_hmac('sha256', "{$header}.{$payloadEncoded}", $secret, true);
        $providedSig = self::base64UrlDecode($signatureEncoded);

        if (!hash_equals($expectedSig, $providedSig)) {
            return null;
        }

        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
        if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
            return null; // Expired
        }

        return $payload;
    }

    public static function getBearerToken(): ?string {
        $headers = [];
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        if (!empty($headers) && preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }

        // Also allow passing via query parameter ?token=... for easy CSV export downloads
        if (isset($_GET['token']) && !empty($_GET['token'])) {
            return trim($_GET['token']);
        }

        return null;
    }

    public static function requireAdmin(): array {
        $token = self::getBearerToken();
        if (!$token) {
            Response::unauthorized('Authentication token missing. Please log in.');
        }

        $user = self::verifyToken($token);
        if (!$user) {
            Response::unauthorized('Invalid or expired token. Please log in again.');
        }

        return $user;
    }
}
