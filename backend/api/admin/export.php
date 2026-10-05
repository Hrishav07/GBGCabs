<?php
/**
 * GoBabyGo Cabs - Data Export Endpoint (CSV)
 * GET /api/admin/export.php?type=bookings&token=...
 * GET /api/admin/export.php?type=inquiries&token=...
 * GET /api/admin/export.php?type=subscribers&token=...
 */

declare(strict_types=1);

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Response.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../models/Booking.php';
require_once __DIR__ . '/../../models/Inquiry.php';
require_once __DIR__ . '/../../models/Newsletter.php';

Auth::requireAdmin();

$type = $_GET['type'] ?? 'bookings';
$filename = "gbg_{$type}_" . date('Y-m-d_His') . ".csv";

header('Content-Type: text/csv; charset=utf-8');
header("Content-Disposition: attachment; filename=\"{$filename}\"");
header('Pragma: no-cache');
header('Expires: 0');

$output = fopen('php://output', 'w');

// Add UTF-8 BOM so Excel opens with proper encoding
fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

if ($type === 'bookings') {
    $headers = ['ID', 'Reference', 'Service Type', 'Vehicle Model', 'Customer Name', 'Customer Email', 'Customer Phone', 'City', 'Pickup Location', 'Drop Location', 'Preferred Date', 'Duration', 'Status', 'Created At'];
    fputcsv($output, $headers);

    $items = Booking::getAll(['limit' => 5000]);
    foreach ($items as $item) {
        fputcsv($output, [
            $item['id'] ?? '',
            $item['booking_ref'] ?? '',
            $item['service_type'] ?? '',
            $item['vehicle_model'] ?? '',
            $item['customer_name'] ?? '',
            $item['customer_email'] ?? '',
            $item['customer_phone'] ?? '',
            $item['city'] ?? '',
            $item['pickup_location'] ?? '',
            $item['drop_location'] ?? '',
            $item['preferred_date'] ?? '',
            $item['duration'] ?? '',
            $item['status'] ?? '',
            $item['created_at'] ?? '',
        ]);
    }
} elseif ($type === 'inquiries') {
    $headers = ['ID', 'Reference', 'Name', 'Email', 'Phone', 'Company Name', 'Inquiry Type', 'Fleet Size', 'City', 'Message', 'Status', 'Created At'];
    fputcsv($output, $headers);

    $items = Inquiry::getAll(['limit' => 5000]);
    foreach ($items as $item) {
        fputcsv($output, [
            $item['id'] ?? '',
            $item['inquiry_ref'] ?? '',
            $item['name'] ?? '',
            $item['email'] ?? '',
            $item['phone'] ?? '',
            $item['company_name'] ?? '',
            $item['inquiry_type'] ?? '',
            $item['fleet_size'] ?? '',
            $item['city'] ?? '',
            $item['message'] ?? '',
            $item['status'] ?? '',
            $item['created_at'] ?? '',
        ]);
    }
} elseif ($type === 'subscribers') {
    $headers = ['ID', 'Email', 'Source', 'Status', 'IP Address', 'Created At'];
    fputcsv($output, $headers);

    $items = Newsletter::getAll();
    foreach ($items as $item) {
        fputcsv($output, [
            $item['id'] ?? '',
            $item['email'] ?? '',
            $item['source'] ?? '',
            $item['status'] ?? '',
            $item['ip_address'] ?? '',
            $item['created_at'] ?? '',
        ]);
    }
} else {
    fclose($output);
    Response::error("Unknown export type '{$type}'", 400);
}

fclose($output);
exit(0);
