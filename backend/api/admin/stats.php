<?php
/**
 * GoBabyGo Cabs - Admin Stats & Dashboard Metrics
 * GET /api/admin/stats.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Response.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../models/Booking.php';
require_once __DIR__ . '/../../models/Inquiry.php';
require_once __DIR__ . '/../../models/Newsletter.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::error('Method not allowed', 405);
}

Auth::requireAdmin();

$totalBookings = Booking::count();
$totalInquiries = Inquiry::count();
$totalSubscribers = Newsletter::count();

// Recent items for rapid overview
$recentBookings = Booking::getAll(['limit' => 5]);
$recentInquiries = Inquiry::getAll(['limit' => 5]);

Response::success([
    'counts' => [
        'bookings'    => $totalBookings,
        'inquiries'   => $totalInquiries,
        'subscribers' => $totalSubscribers,
    ],
    'recent' => [
        'bookings'  => $recentBookings,
        'inquiries' => $recentInquiries,
    ],
], 'Dashboard statistics retrieved.');
