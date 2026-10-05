<?php
/**
 * GoBabyGo Cabs - Newsletter Subscribers API Endpoint
 * POST /api/newsletter.php -> Subscribe email
 * GET  /api/newsletter.php -> List subscribers (Admin only)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/Validator.php';
require_once __DIR__ . '/../helpers/Auth.php';
require_once __DIR__ . '/../models/Newsletter.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = Response::getJsonInput();

    $validator = new Validator();
    $validator->required($input['email'] ?? null, 'email', 'Email Address')
              ->email($input['email'] ?? '', 'email', 'Email Address');

    if ($validator->fails()) {
        Response::error('Invalid email address provided', 422, $validator->getErrors());
    }

    try {
        $source = $validator->sanitize($input['source'] ?? 'website_footer');
        $result = Newsletter::subscribe($input['email'], $source);

        if ($result['status'] === 'already_subscribed') {
            Response::success($result, 'You are already subscribed to GoBabyGo Cabs updates!');
        }

        Response::success($result, 'Thank you for subscribing to GBG Electric Mobility updates!', 201);
    } catch (Exception $e) {
        Response::error('Subscription failed: ' . $e->getMessage(), 500);
    }
} elseif ($method === 'GET') {
    Auth::requireAdmin();

    $subscribers = Newsletter::getAll();
    Response::success($subscribers, 'Subscribers retrieved successfully.');
} else {
    Response::error("Method {$method} not allowed", 405);
}
