<?php
/**
 * GoBabyGo Cabs - Bookings API Endpoint
 * POST /api/bookings.php -> Create new booking / test ride
 * GET  /api/bookings.php -> List bookings (Admin only)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/Validator.php';
require_once __DIR__ . '/../helpers/Auth.php';
require_once __DIR__ . '/../models/Booking.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = Response::getJsonInput();

    $validator = new Validator();
    $validator->required($input['customer_name'] ?? null, 'customer_name', 'Full Name')
              ->minLength($input['customer_name'] ?? '', 2, 'customer_name', 'Full Name')
              ->required($input['customer_email'] ?? null, 'customer_email', 'Email Address')
              ->email($input['customer_email'] ?? '', 'customer_email', 'Email Address')
              ->required($input['customer_phone'] ?? null, 'customer_phone', 'Phone Number')
              ->phone($input['customer_phone'] ?? '', 'customer_phone', 'Phone Number');

    if ($validator->fails()) {
        Response::error('Validation failed', 422, $validator->getErrors());
    }

    try {
        $booking = Booking::create([
            'customer_name'   => $validator->sanitize($input['customer_name']),
            'customer_email'  => strtolower(trim($input['customer_email'])),
            'customer_phone'  => $validator->sanitize($input['customer_phone']),
            'service_type'    => $validator->sanitize($input['service_type'] ?? 'scooter_subscription'),
            'vehicle_model'   => $validator->sanitize($input['vehicle_model'] ?? 'GBG EV Multi-Brand'),
            'city'            => $validator->sanitize($input['city'] ?? 'Noida / NCR'),
            'pickup_location' => $validator->sanitize($input['pickup_location'] ?? ''),
            'drop_location'   => $validator->sanitize($input['drop_location'] ?? ''),
            'preferred_date'  => $validator->sanitize($input['preferred_date'] ?? ''),
            'preferred_time'  => $validator->sanitize($input['preferred_time'] ?? ''),
            'duration'        => $validator->sanitize($input['duration'] ?? 'Monthly Rental'),
            'notes'           => $validator->sanitize($input['notes'] ?? ''),
        ]);

        Response::success($booking, 'Booking request received! Our team will contact you shortly.', 201);
    } catch (Exception $e) {
        Response::error('Failed to submit booking: ' . $e->getMessage(), 500);
    }
} elseif ($method === 'GET') {
    // Admin only
    Auth::requireAdmin();

    $filters = [
        'status'       => $_GET['status'] ?? '',
        'service_type' => $_GET['service_type'] ?? '',
        'search'       => $_GET['search'] ?? '',
        'limit'        => $_GET['limit'] ?? 100,
    ];

    $bookings = Booking::getAll($filters);
    Response::success($bookings, 'Bookings retrieved successfully.');
} else {
    Response::error("Method {$method} not allowed", 405);
}
