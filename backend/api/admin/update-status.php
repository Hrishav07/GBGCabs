<?php
/**
 * GoBabyGo Cabs - Update Lead / Booking Status Endpoint
 * POST /api/admin/update-status.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Response.php';
require_once __DIR__ . '/../../helpers/Validator.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../models/Booking.php';
require_once __DIR__ . '/../../models/Inquiry.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

Auth::requireAdmin();

$input = Response::getJsonInput();

$validator = new Validator();
$validator->required($input['id'] ?? null, 'id', 'Item ID / Reference')
          ->required($input['type'] ?? null, 'type', 'Type')
          ->in($input['type'] ?? '', ['booking', 'inquiry'], 'type', 'Type')
          ->required($input['status'] ?? null, 'status', 'Status');

if ($validator->fails()) {
    Response::error('Validation failed', 422, $validator->getErrors());
}

$id = $input['id'];
$type = $input['type'];
$status = strtolower(trim($input['status']));

$updated = false;
if ($type === 'booking') {
    $updated = Booking::updateStatus($id, $status);
} elseif ($type === 'inquiry') {
    $updated = Inquiry::updateStatus($id, $status);
}

if (!$updated) {
    Response::error("Could not update {$type} record. Check ID/Reference.", 404);
}

Response::success([
    'id'     => $id,
    'type'   => $type,
    'status' => $status,
], "Status updated to '{$status}' successfully.");
