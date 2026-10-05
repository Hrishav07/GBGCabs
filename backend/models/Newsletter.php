<?php
/**
 * GoBabyGo Cabs - Newsletter Subscriber Model & Repository
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Newsletter {
    private static string $fallbackFile = 'subscribers.json';

    public static function subscribe(string $email, string $source = 'website_footer'): array {
        $pdo = Database::getConnection();
        $email = strtolower(trim($email));
        $now = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;

        if ($pdo) {
            // Check if already subscribed
            $checkStmt = $pdo->prepare("SELECT id, status FROM newsletter_subscribers WHERE email = :email LIMIT 1");
            $checkStmt->execute([':email' => $email]);
            $existing = $checkStmt->fetch();

            if ($existing) {
                if ($existing['status'] === 'unsubscribed') {
                    $upd = $pdo->prepare("UPDATE newsletter_subscribers SET status = 'active' WHERE id = :id");
                    $upd->execute([':id' => $existing['id']]);
                    return ['email' => $email, 'status' => 'reactivated', 'is_new' => false];
                }
                return ['email' => $email, 'status' => 'already_subscribed', 'is_new' => false];
            }

            $stmt = $pdo->prepare("
                INSERT INTO newsletter_subscribers (email, source, status, ip_address, created_at)
                VALUES (:email, :source, 'active', :ip, :now)
            ");
            $stmt->execute([
                ':email' => $email,
                ':source' => $source,
                ':ip' => $ip,
                ':now' => $now,
            ]);

            return ['id' => (int)$pdo->lastInsertId(), 'email' => $email, 'status' => 'subscribed', 'is_new' => true];
        }

        // File fallback
        $records = self::readFileRecords();
        foreach ($records as &$r) {
            if (strtolower($r['email'] ?? '') === $email) {
                if (($r['status'] ?? '') === 'unsubscribed') {
                    $r['status'] = 'active';
                    self::writeFileRecords($records);
                    return ['email' => $email, 'status' => 'reactivated', 'is_new' => false];
                }
                return ['email' => $email, 'status' => 'already_subscribed', 'is_new' => false];
            }
        }

        $newRecord = [
            'id' => count($records) + 1,
            'email' => $email,
            'source' => $source,
            'status' => 'active',
            'ip_address' => $ip,
            'created_at' => $now,
        ];
        array_unshift($records, $newRecord);
        self::writeFileRecords($records);

        return $newRecord;
    }

    public static function getAll(): array {
        $pdo = Database::getConnection();
        if ($pdo) {
            $stmt = $pdo->query("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return self::readFileRecords();
    }

    public static function count(): int {
        $pdo = Database::getConnection();
        if ($pdo) {
            return (int)$pdo->query("SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active'")->fetchColumn();
        }
        $records = self::readFileRecords();
        return count(array_filter($records, fn($r) => ($r['status'] ?? '') === 'active'));
    }

    private static function readFileRecords(): array {
        $filePath = Database::getFallbackDir() . DIRECTORY_SEPARATOR . self::$fallbackFile;
        if (!file_exists($filePath)) {
            return [];
        }
        $json = file_get_contents($filePath);
        return json_decode($json, true) ?: [];
    }

    private static function writeFileRecords(array $records): void {
        $filePath = Database::getFallbackDir() . DIRECTORY_SEPARATOR . self::$fallbackFile;
        file_put_contents($filePath, json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}
