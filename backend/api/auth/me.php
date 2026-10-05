<?php
/**
 * GoBabyGo Cabs - Authenticated Admin Profile Endpoint
 * GET /api/auth/me.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Response.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../models/AdminUser.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::error('Method not allowed', 405);
}

$authUser = Auth::requireAdmin();
$user = AdminUser::findById((int)$authUser['sub']);

if (!$user) {
    Response::notFound('User record not found.');
}

Response::success([
    'id'    => $user['id'],
    'name'  => $user['name'],
    'email' => $user['email'],
    'role'  => $user['role'],
], 'Profile loaded.');
