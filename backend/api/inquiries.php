<?php
/**
 * GoBabyGo Cabs - Inquiries API Endpoint
 * POST /api/inquiries.php -> Submit general or B2B partner inquiry
 * GET  /api/inquiries.php -> List inquiries (Admin only)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/Validator.php';
require_once __DIR__ . '/../helpers/Auth.php';
require_once __DIR__ . '/../models/Inquiry.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = Response::getJsonInput();

    $validator = new Validator();
    $validator->required($input['name'] ?? null, 'name', 'Full Name')
              ->minLength($input['name'] ?? '', 2, 'name', 'Full Name')
              ->required($input['email'] ?? null, 'email', 'Email Address')
              ->email($input['email'] ?? '', 'email', 'Email Address')
              ->required($input['phone'] ?? null, 'phone', 'Phone Number')
              ->phone($input['phone'] ?? '', 'phone', 'Phone Number')
              ->required($input['message'] ?? null, 'message', 'Message')
              ->minLength($input['message'] ?? '', 5, 'message', 'Message');

    if ($validator->fails()) {
        Response::error('Validation failed', 422, $validator->getErrors());
    }

    try {
        $inquiry = Inquiry::create([
            'name'         => $validator->sanitize($input['name']),
            'email'        => strtolower(trim($input['email'])),
            'phone'        => $validator->sanitize($input['phone']),
            'company_name' => $validator->sanitize($input['company_name'] ?? ''),
            'inquiry_type' => $validator->sanitize($input['inquiry_type'] ?? 'general_inquiry'),
            'fleet_size'   => $validator->sanitize($input['fleet_size'] ?? ''),
            'city'         => $validator->sanitize($input['city'] ?? ''),
            'message'      => $validator->sanitize($input['message']),
        ]);

        Response::success($inquiry, 'Your inquiry has been submitted! Our executive will get in touch.', 201);
    } catch (Exception $e) {
        Response::error('Failed to submit inquiry: ' . $e->getMessage(), 500);
    }
} elseif ($method === 'GET') {
    // Admin only
    Auth::requireAdmin();

    $filters = [
        'status'       => $_GET['status'] ?? '',
        'inquiry_type' => $_GET['inquiry_type'] ?? '',
        'search'       => $_GET['search'] ?? '',
        'limit'        => $_GET['limit'] ?? 100,
    ];

    $inquiries = Inquiry::getAll($filters);
    Response::success($inquiries, 'Inquiries retrieved successfully.');
} else {
    Response::error("Method {$method} not allowed", 405);
}
