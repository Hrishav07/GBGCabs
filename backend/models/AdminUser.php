<?php
/**
 * GoBabyGo Cabs - Admin User Model & Authentication
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/Auth.php';

class AdminUser {
    public static function authenticate(string $email, string $password): ?array {
        $email = strtolower(trim($email));
        $config = require __DIR__ . '/../config/config.php';
        $pdo = Database::getConnection();

        if ($pdo) {
            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email AND status = 'active' LIMIT 1");
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && Auth::verifyPassword($password, $user['password_hash'])) {
                // Update last login
                $upd = $pdo->prepare("UPDATE admin_users SET last_login_at = NOW() WHERE id = :id");
                $upd->execute([':id' => $user['id']]);

                unset($user['password_hash']);
                return $user;
            }
            return null;
        }

        // Resilient fallback against .env credentials
        $adminConfig = $config['admin'];
        if ($email === strtolower($adminConfig['email']) && $password === $adminConfig['password']) {
            return [
                'id' => 1,
                'name' => $adminConfig['name'],
                'email' => $adminConfig['email'],
                'role' => 'superadmin',
                'status' => 'active',
                'last_login_at' => date('Y-m-d H:i:s'),
            ];
        }

        return null;
    }

    public static function findById(int $id): ?array {
        $pdo = Database::getConnection();
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT id, name, email, role, status, last_login_at, created_at FROM admin_users WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $id]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        }

        $config = require __DIR__ . '/../config/config.php';
        return [
            'id' => 1,
            'name' => $config['admin']['name'],
            'email' => $config['admin']['email'],
            'role' => 'superadmin',
            'status' => 'active',
        ];
    }
}
