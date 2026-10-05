<?php
/**
 * GoBabyGo Cabs - Inquiry Model & Repository
 * Handles B2B partner leads, fleet inquiries, investor requests, and contact messages.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Inquiry {
    private static string $fallbackFile = 'inquiries.json';

    public static function create(array $data): array {
        $pdo = Database::getConnection();
        $ref = 'GBG-INQ-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        $now = date('Y-m-d H:i:s');

        $record = [
            'inquiry_ref' => $ref,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'company_name' => $data['company_name'] ?? null,
            'inquiry_type' => $data['inquiry_type'] ?? 'general_inquiry',
            'fleet_size' => $data['fleet_size'] ?? null,
            'city' => $data['city'] ?? null,
            'message' => $data['message'],
            'status' => 'new',
            'created_at' => $now,
            'updated_at' => $now,
        ];

        if ($pdo) {
            $sql = "INSERT INTO inquiries (
                inquiry_ref, name, email, phone, company_name,
                inquiry_type, fleet_size, city, message, status, created_at, updated_at
            ) VALUES (
                :inquiry_ref, :name, :email, :phone, :company_name,
                :inquiry_type, :fleet_size, :city, :message, :status, :created_at, :updated_at
            )";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($record);
            $record['id'] = (int)$pdo->lastInsertId();
            return $record;
        }

        // File fallback
        $records = self::readFileRecords();
        $record['id'] = count($records) + 1;
        array_unshift($records, $record);
        self::writeFileRecords($records);

        return $record;
    }

    public static function getAll(array $filters = []): array {
        $pdo = Database::getConnection();

        if ($pdo) {
            $sql = "SELECT * FROM inquiries WHERE 1=1";
            $params = [];

            if (!empty($filters['status'])) {
                $sql .= " AND status = :status";
                $params[':status'] = $filters['status'];
            }

            if (!empty($filters['inquiry_type'])) {
                $sql .= " AND inquiry_type = :inquiry_type";
                $params[':inquiry_type'] = $filters['inquiry_type'];
            }

            if (!empty($filters['search'])) {
                $sql .= " AND (name LIKE :search OR email LIKE :search OR phone LIKE :search OR inquiry_ref LIKE :search)";
                $params[':search'] = '%' . $filters['search'] . '%';
            }

            $sql .= " ORDER BY created_at DESC";

            $limit = isset($filters['limit']) ? (int)$filters['limit'] : 100;
            $sql .= " LIMIT {$limit}";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // File fallback
        $records = self::readFileRecords();
        if (!empty($filters['status'])) {
            $records = array_filter($records, fn($r) => ($r['status'] ?? '') === $filters['status']);
        }
        if (!empty($filters['search'])) {
            $q = strtolower($filters['search']);
            $records = array_filter($records, fn($r) => 
                str_contains(strtolower($r['name'] ?? ''), $q) ||
                str_contains(strtolower($r['email'] ?? ''), $q) ||
                str_contains(strtolower($r['phone'] ?? ''), $q) ||
                str_contains(strtolower($r['inquiry_ref'] ?? ''), $q)
            );
        }
        return array_values($records);
    }

    public static function updateStatus(int|string $id, string $status): bool {
        $pdo = Database::getConnection();
        $now = date('Y-m-d H:i:s');

        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE inquiries SET status = :status, updated_at = :now WHERE id = :id OR inquiry_ref = :ref");
            return $stmt->execute([
                ':status' => $status,
                ':now' => $now,
                ':id' => is_numeric($id) ? (int)$id : 0,
                ':ref' => (string)$id,
            ]);
        }

        $records = self::readFileRecords();
        $found = false;
        foreach ($records as &$rec) {
            if ($rec['id'] == $id || ($rec['inquiry_ref'] ?? '') === $id) {
                $rec['status'] = $status;
                $rec['updated_at'] = $now;
                $found = true;
                break;
            }
        }
        if ($found) {
            self::writeFileRecords($records);
        }
        return $found;
    }

    public static function count(): int {
        $pdo = Database::getConnection();
        if ($pdo) {
            return (int)$pdo->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
        }
        return count(self::readFileRecords());
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
