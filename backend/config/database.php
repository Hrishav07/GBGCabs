<?php
/**
 * GoBabyGo Cabs - Database Connection Manager
 * Provides a PDO Singleton with automatic JSON-File fallback
 * if MySQL is offline or not yet configured.
 */

declare(strict_types=1);

class Database {
    private static ?PDO $pdo = null;
    private static bool $isFallback = false;
    private static string $fallbackError = '';

    public static function getConnection(): ?PDO {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $config = require __DIR__ . '/config.php';
        $db = $config['database'];

        if ($db['driver'] === 'file') {
            self::$isFallback = true;
            return null;
        }

        try {
            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=%s',
                $db['host'],
                $db['port'],
                $db['database'],
                $db['charset']
            );

            self::$pdo = new PDO($dsn, $db['username'], $db['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 2,
            ]);

            self::$isFallback = false;
            return self::$pdo;
        } catch (PDOException $e) {
            // Check if connection succeeded to host, but database doesn't exist yet
            if ($e->getCode() === 1049) { // 1049: Unknown database
                try {
                    $initDsn = sprintf('mysql:host=%s;port=%d;charset=%s', $db['host'], $db['port'], $db['charset']);
                    $tempPdo = new PDO($initDsn, $db['username'], $db['password']);
                    $tempPdo->exec("CREATE DATABASE IF NOT EXISTS `{$db['database']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    
                    // Reconnect to newly created db
                    self::$pdo = new PDO($dsn, $db['username'], $db['password'], [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    ]);
                    self::$isFallback = false;
                    return self::$pdo;
                } catch (Exception $initEx) {
                    self::$fallbackError = $initEx->getMessage();
                }
            } else {
                self::$fallbackError = $e->getMessage();
            }

            // Fallback to resilient file-backed repository
            self::$isFallback = true;
            return null;
        }
    }

    public static function isFallback(): bool {
        return self::$isFallback;
    }

    public static function getFallbackError(): string {
        return self::$fallbackError;
    }

    public static function getFallbackDir(): string {
        $dir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir;
    }
}
