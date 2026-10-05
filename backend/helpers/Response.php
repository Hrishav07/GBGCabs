<?php
/**
 * GoBabyGo Cabs - Standard JSON Response Helper
 */

declare(strict_types=1);

class Response {
    public static function json(bool $success, mixed $data = null, string $message = '', int $statusCode = 200, array $errors = []): void {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');

        $payload = [
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c'),
        ];

        if (!empty($errors)) {
            $payload['errors'] = $errors;
        }

        echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit(0);
    }

    public static function success(mixed $data = null, string $message = 'Operation successful', int $statusCode = 200): void {
        self::json(true, $data, $message, $statusCode);
    }

    public static function error(string $message = 'An error occurred', int $statusCode = 400, array $errors = []): void {
        self::json(false, null, $message, $statusCode, $errors);
    }

    public static function notFound(string $message = 'Resource not found'): void {
        self::error($message, 404);
    }

    public static function unauthorized(string $message = 'Unauthorized access'): void {
        self::error($message, 401);
    }

    public static function forbidden(string $message = 'Access forbidden'): void {
        self::error($message, 403);
    }

    public static function getJsonInput(): array {
        $raw = file_get_contents('php://input');
        if (empty($raw)) {
            return $_POST ?? [];
        }
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }
}
