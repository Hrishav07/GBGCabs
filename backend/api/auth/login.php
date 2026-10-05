<?php
/**
 * GoBabyGo Cabs - Admin Login Endpoint
 * POST /api/auth/login.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Response.php';
require_once __DIR__ . '/../../helpers/Validator.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../models/AdminUser.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

$input = Response::getJsonInput();

$validator = new Validator();
$validator->required($input['email'] ?? null, 'email', 'Email Address')
          ->email($input['email'] ?? '', 'email', 'Email Address')
          ->required($input['password'] ?? null, 'password', 'Password');

if ($validator->fails()) {
    Response::error('Validation failed', 422, $validator->getErrors());
}

$user = AdminUser::authenticate($input['email'], $input['password']);

if (!$user) {
    Response::error('Invalid email or password', 401);
}

$token = Auth::generateToken([
    'sub'   => $user['id'],
    'email' => $user['email'],
    'name'  => $user['name'],
    'role'  => $user['role'],
]);

Response::success([
    'token' => $token,
    'user'  => [
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
        'role'  => $user['role'],
    ],
], 'Login successful.');
