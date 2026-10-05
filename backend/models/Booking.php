<?php
/**
 * GoBabyGo Cabs - Booking Model & Repository
 * Handles creation, filtering, listing, and status updates for bookings.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Booking {
    private static string $fallbackFile = 'bookings.json';

    public static function create(array $data): array {
        $pdo = Database::getConnection();
        $ref = 'GBG-BK-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        $now = date('Y-m-d H:i:s');

        $record = [
            'booking_ref' => $ref,
            'service_type' => $data['service_type'] ?? 'scooter_subscription',
            'vehicle_model' => $data['vehicle_model'] ?? 'GBG EV Multi-Brand',
            'customer_name' => $data['customer_name'],
            'customer_email' => $data['customer_email'],
            'customer_phone' => $data['customer_phone'],
            'city' => $data['city'] ?? 'Noida / NCR',
            'pickup_location' => $data['pickup_location'] ?? null,
            'drop_location' => $data['drop_location'] ?? null,
            'preferred_date' => $data['preferred_date'] ?? null,
            'preferred_time' => $data['preferred_time'] ?? null,
            'duration' => $data['duration'] ?? 'Monthly Rental',
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
            'created_at' => $now,
            'updated_at' => $now,
        ];

        if ($pdo) {
            $sql = "INSERT INTO bookings (
                booking_ref, service_type, vehicle_model, customer_name, customer_email,
                customer_phone, city, pickup_location, drop_location, preferred_date,
                preferred_time, duration, notes, status, created_at, updated_at
            ) VALUES (
                :booking_ref, :service_type, :vehicle_model, :customer_name, :customer_email,
                :customer_phone, :city, :pickup_location, :drop_location, :preferred_date,
                :preferred_time, :duration, :notes, :status, :created_at, :updated_at
            )";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($record);
            $record['id'] = (int)$pdo->lastInsertId();
            return $record;
        }

        // File-based fallback
        $records = self::readFileRecords();
        $record['id'] = count($records) + 1;
        array_unshift($records, $record);
        self::writeFileRecords($records);

        return $record;
    }

    public static function getAll(array $filters = []): array {
        $pdo = Database::getConnection();

        if ($pdo) {
            $sql = "SELECT * FROM bookings WHERE 1=1";
            $params = [];

            if (!empty($filters['status'])) {
                $sql .= " AND status = :status";
                $params[':status'] = $filters['status'];
            }

            if (!empty($filters['service_type'])) {
                $sql .= " AND service_type = :service_type";
                $params[':service_type'] = $filters['service_type'];
            }

            if (!empty($filters['search'])) {
                $sql .= " AND (customer_name LIKE :search OR customer_phone LIKE :search OR booking_ref LIKE :search)";
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
                str_contains(strtolower($r['customer_name'] ?? ''), $q) ||
                str_contains(strtolower($r['customer_phone'] ?? ''), $q) ||
                str_contains(strtolower($r['booking_ref'] ?? ''), $q)
            );
        }
        return array_values($records);
    }

    public static function updateStatus(int|string $id, string $status): bool {
        $pdo = Database::getConnection();
        $now = date('Y-m-d H:i:s');

        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE bookings SET status = :status, updated_at = :now WHERE id = :id OR booking_ref = :ref");
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
            if ($rec['id'] == $id || ($rec['booking_ref'] ?? '') === $id) {
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
            return (int)$pdo->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
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
