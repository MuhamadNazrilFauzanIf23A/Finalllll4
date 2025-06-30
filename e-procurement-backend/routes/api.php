<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\PermintaanController;
use App\Http\Controllers\Admin\InputVendorController;
use App\Http\Controllers\Admin\PengadaanController;
use App\Http\Controllers\Admin\TenderController;
use App\Http\Controllers\Admin\AanwijzingController;
use App\Http\Controllers\Admin\PenawaranController;
use App\Http\Controllers\Admin\PurchaseOrderController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\Vendor\VendorAuthController;
use App\Http\Controllers\Vendor\VendorProfileController;
use App\Http\Controllers\Apk\UserApkAuthController;
use App\Http\Controllers\Apk\PermintaanApkController;
use App\Http\Controllers\Apk\ApprovalController;
/*
|--------------------------------------------------------------------------
| 🧑‍💼 Admin Routes (prefix: /admin)
|--------------------------------------------------------------------------
*/

// 🔐 Login Admin (no middleware)
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    // ✅ Admin Auth
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    // 📌 Permintaan
    Route::get('/permintaan', [PermintaanController::class, 'index']);
    Route::get('/permintaan/{id}', [PermintaanController::class, 'show']);

    // 📦 Pengadaan
    Route::get('/pengadaan', [PengadaanController::class, 'index']);
    Route::post('/pengadaan', [PengadaanController::class, 'store']);
    Route::delete('/pengadaan/{id}', [PengadaanController::class, 'destroy']);
    Route::post('/tender/publish/{id}', [TenderController::class, 'publish']); // ✅ Corrected handler

    // 📣 Tender
    Route::get('/tender', [TenderController::class, 'index']);
    Route::put('/tender/{id}', [TenderController::class, 'update']);

    // 📋 Penawaran
    Route::get('/penawaran', [PenawaranController::class, 'index']);
    Route::put('/penawaran/{id}', [PenawaranController::class, 'update']);
    Route::put('/penawaran/{id}/verifikasi', [PenawaranController::class, 'verifikasi']);
    Route::post('/penawaran/{id}/update-harga', [PenawaranController::class, 'updateHarga']);
    Route::post('/penawaran/{id}/selesai', [PenawaranController::class, 'tandaiSelesai']);

    // 📤 Upload Penawaran Manual dari Admin
    Route::post('/vendor/penawaran', [PenawaranController::class, 'store']);

    // 📑 Purchase Order
    Route::get('/purchase-order', [PurchaseOrderController::class, 'index']);

    // 📊 Laporan
    Route::get('/laporan', [LaporanController::class, 'index']);

    // 📅 Aanwijzing
    Route::get('/aanwijzing', [AanwijzingController::class, 'index']);
    Route::post('/aanwijzing', [AanwijzingController::class, 'store']);
    Route::post('/aanwijzing/{id}/upload', [AanwijzingController::class, 'uploadDokumen']);

    // 📥 Input Vendor Manual
    Route::get('/input-vendor', [InputVendorController::class, 'index']);
    Route::post('/input-vendor', [InputVendorController::class, 'store']);
    Route::delete('/input-vendor/{id}', [InputVendorController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| 🏢 Vendor Routes (prefix: /vendor)
|--------------------------------------------------------------------------
*/

// 🔐 Vendor Auth (tanpa middleware)
Route::post('/vendor/register', [VendorController::class, 'register']);
Route::post('/vendor/login', [VendorAuthController::class, 'login']);
Route::post('/vendor/forgot-password', [VendorAuthController::class, 'forgotPassword']); // ✅ request token
Route::post('/vendor/reset-password', [VendorAuthController::class, 'resetPassword']);   // ✅ reset with token

Route::middleware(['auth:sanctum'])->prefix('vendor')->group(function () {
    Route::get('/profile', [VendorProfileController::class, 'show']);
    Route::put('/profile', [VendorProfileController::class, 'update']);
    Route::post('/upload-legalitas', [VendorProfileController::class, 'uploadDokumen']);
});

//
// 📱 APK Routes - Pengaju dan Atasan
//
Route::prefix('apk')->group(function () {
    Route::post('/login', [UserApkAuthController::class, 'login']);
    Route::post('/forgot-password', [UserApkAuthController::class, 'forgotPassword']); // optional
    Route::post('/reset-password', [UserApkAuthController::class, 'resetPassword']);   // optional

    Route::middleware(['auth:sanctum'])->group(function () {
        // 🔐 Authenticated routes
        Route::get('/me', [UserApkAuthController::class, 'me']);
        Route::post('/logout', [UserApkAuthController::class, 'logout']);

        // 📝 Pengajuan Permintaan (oleh pengaju)
        Route::post('/permintaan', [PermintaanController::class, 'store']); // 🔄 dari APK
        Route::get('/permintaan', [PermintaanController::class, 'userIndex']); 

        // ✅ Approval oleh Atasan
            Route::get('/approval', [ApprovalController::class, 'index']); // 🟡 Ambil semua permintaan yang perlu diverifikasi
            Route::post('/approval/{id}/setujui', [ApprovalController::class, 'approve']); // 🟢 Setujui
            Route::post('/approval/{id}/tolak', [ApprovalController::class, 'reject']);    // 🔴 Tolak
        });

        // rekap
        Route::get('/rekap-pengajuan', [PengajuanController::class, 'getRekapPengajuan']);
});
