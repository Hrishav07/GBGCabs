<?php
/**
 * GoBabyGo Cabs - Database Migration & Table Setup Script
 * Can be run from CLI: `php backend/database/migrate.php`
 * or via browser / GET request.
 */

declare(strict_types=1);

require_once __DIR__ . '/../helpers/Auth.php';

$config = require __DIR__ . '/../config/config.php';
$db = $config['database'];
$admin = $config['admin'];

$isCli = (php_sapi_name() === 'cli');

function outputMsg(string $msg, bool $isCli, bool $isError = false): void {
    if ($isCli) {
        $prefix = $isError ? "[\033[31mERROR\033[0m] " : "[\033[32mOK\033[0m] ";
        echo $prefix . $msg . "\n";
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => !$isError, 'message' => $msg]);
    }
}

try {
    outputMsg("Connecting to MySQL host {$db['host']}:{$db['port']}...", $isCli);

    $initDsn = sprintf('mysql:host=%s;port=%d;charset=%s', $db['host'], $db['port'], $db['charset']);
    $pdo = new PDO($initDsn, $db['username'], $db['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    outputMsg("Ensuring database `{$db['database']}` exists...", $isCli);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$db['database']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // Select the DB
    $pdo->exec("USE `{$db['database']}`");
    outputMsg("Database selected successfully.", $isCli);

    // Read and run schema.sql
    $schemaPath = __DIR__ . '/schema.sql';
    if (!file_exists($schemaPath)) {
        throw new Exception("schema.sql not found at: {$schemaPath}");
    }

    $sql = file_get_contents($schemaPath);
    // Split into individual queries
    $statements = array_filter(array_map('trim', explode(';', $sql)));

    foreach ($statements as $stmt) {
        if (!empty($stmt) && !str_starts_with($stmt, '--')) {
            $pdo->exec($stmt);
        }
    }
    outputMsg("All tables (bookings, inquiries, newsletter_subscribers, admin_users) verified/created.", $isCli);

    // Ensure the default admin user exists with current .env password
    $adminPassHash = Auth::hashPassword($admin['password']);
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE email = :email LIMIT 1");
    $stmt->execute([':email' => $admin['email']]);
    $existingAdmin = $stmt->fetch();

    if ($existingAdmin) {
        $updateStmt = $pdo->prepare("UPDATE admin_users SET password_hash = :hash, name = :name WHERE email = :email");
        $updateStmt->execute([
            ':hash' => $adminPassHash,
            ':name' => $admin['name'],
            ':email' => $admin['email']
        ]);
        outputMsg("Default admin account ({$admin['email']}) credentials updated.", $isCli);
    } else {
        $insertStmt = $pdo->prepare("
            INSERT INTO admin_users (name, email, password_hash, role, status)
            VALUES (:name, :email, :hash, 'superadmin', 'active')
        ");
        $insertStmt->execute([
            ':name' => $admin['name'],
            ':email' => $admin['email'],
            ':hash' => $adminPassHash
        ]);
        outputMsg("Default admin account created: {$admin['email']}", $isCli);
    }

    outputMsg("Database migration completed successfully! GBG Cabs backend is ready.", $isCli);
} catch (PDOException $e) {
    outputMsg("Database Migration Failed: " . $e->getMessage(), $isCli, true);
    if ($isCli) {
        echo "\nTip: If MySQL requires a password, please update `DB_PASS` in `backend/.env`.\n";
        echo "If MySQL is not installed on this host, the backend automatically uses JSON file storage fallback in `backend/data/`.\n";
    }
    exit(1);
} catch (Exception $e) {
    outputMsg("Migration Error: " . $e->getMessage(), $isCli, true);
    exit(1);
}
