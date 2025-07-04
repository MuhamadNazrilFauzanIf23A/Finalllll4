<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\PermintaanController;
use App\Http\Controllers\Admin\InputVendorController;
use App\Http\Controllers\Admin\PengadaanController;
use App\Http\Controllers\Admin\TenderController;
use App\Http\Controllers\Admin\AanwijzingController;
use App\Http\Controllers\Admin\PurchaseOrderController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\Vendor\VendorAuthController;
use App\Http\Controllers\Vendor\VendorProfileController;
use App\Http\Controllers\Apk\UserApkAuthController;
use App\Http\Controllers\Apk\PermintaanApkController;
use App\Http\Controllers\Apk\ApprovalController;
use App\Http\Controllers\Vendor\VendorTenderController;
use App\Http\Controllers\Admin\PenawaranController;
use App\Http\Controllers\Vendor\VendorBidingController;
use App\Http\Controllers\Vendor\PurchaseOrderVendorController;
use App\Http\Controllers\Vendor\VendorAanwijzingController;
use App\Http\Controllers\Vendor\HasilTenderController;

// Admin
// Admin

//  Login Admin 
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// santchum
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    // Admin Auth
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    // Permintaan
    Route::get('/permintaan', [PermintaanController::class, 'index']);
    Route::get('/permintaan/{id}', [PermintaanController::class, 'show']);

    // Pengadaan
    Route::get('/pengadaan', [PengadaanController::class, 'index']);
    Route::post('/pengadaan', [PengadaanController::class, 'store']);
    Route::delete('/pengadaan/{id}', [PengadaanController::class, 'destroy']);
    Route::post('/tender/publish/{id}', [TenderController::class, 'publish']); 

    // 📣 Tender
    Route::get('/tender', [TenderController::class, 'index']);
    Route::put('/tender/{id}', [TenderController::class, 'update']);

    // 📋 Penawaran
    Route::get('/penawaran', [PenawaranController::class, 'index']);
    Route::get('/penawaran', [PenawaranController::class, 'getAllPenawaran']);
    Route::put('/penawaran/{id}/verifikasi', [PenawaranController::class, 'verifikasiDokumen']);
    Route::post('/penawaran/{id}/update-harga', [PenawaranController::class, 'updateHarga']);

    // Route untuk mendapatkan jumlah vendor yang terdaftar pada setiap aanwijzing
    Route::get('/admin/aanwijzing/{id}/vendor-count', [AanwijzingController::class, 'getVendorCount']);

    // 📤 Upload Penawaran Manual dari Admin
    Route::post('/vendor/penawaran', [PenawaranController::class, 'store']);

    // 📑 Purchase Order
    Route::get('/purchase-order', [PurchaseOrderController::class, 'index']);
    Route::post('/purchase-order/{id}/upload', [PurchaseOrderController::class, 'uploadPO']);
    Route::post('/purchase-order/{id}/selesai', [PurchaseOrderController::class, 'markAsCompleted']);

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

// Vendorr   
//  Vendor

    // 🔐 Vendor Auth
    Route::post('/vendor/register', [VendorController::class, 'register']);
    Route::post('/vendor/login', [VendorAuthController::class, 'login']);
    Route::post('/vendor/forgot-password', [VendorAuthController::class, 'forgotPassword']); 
    Route::post('/vendor/reset-password', [VendorAuthController::class, 'resetPassword']);   

    // santchum
    Route::middleware(['auth:sanctum'])->prefix('vendor')->group(function () {
        Route::get('/profile', [VendorProfileController::class, 'show']);
        Route::put('/profile', [VendorProfileController::class, 'update']);
        Route::post('/upload-legalitas', [VendorProfileController::class, 'uploadDokumen']);

        // Rute untuk mengambil pengadaan yang sudah dipublish  
       Route::get('/tenders', [VendorTenderController::class, 'index']);
       
       // Rute untuk mengambil pengadaan yang sudah dipublish
       Route::get('/penawaran', [PenawaranController::class, 'getAllPenawaran']);  
       Route::post('/submit-penawaran', [PenawaranController::class, 'submitPenawaran']);

       // Cek apakah vendor sudah mengajukan penawaran untuk tender tertentu
        Route::get('vendor/tender/{pengadaan_id}/cek-penawaran', [VendorTenderController::class, 'cekPenawaranTersedia']);

        // Rute untuk mengambil penawaran vendor yang sudah diajukan
        Route::get('/penawaran', [VendorBidingController::class, 'getVendorPenawaran']);
    
        // Rute untuk submit penawaran baru
        Route::post('/submit-penawaran', [VendorBidingController::class, 'submitPenawaran']);
    
        // Rute untuk update harga penawaran
        Route::post('/penawaran/{id}/update-harga', [VendorBidingController::class, 'updateHarga']);

        // Aanwijzing Routes
        Route::get('/aanwijzing', [VendorAanwijzingController::class, 'index']);  // Daftar aanwijzing untuk vendor
        Route::get('/aanwijzing/{id}', [VendorAanwijzingController::class, 'show']);

         // Vendor mengikuti aanwijzing
        Route::post('/aanwijzing/{id}/follow', [VendorAanwijzingController::class, 'followAanwijzing']);

        // hasil tender
         Route::get('/hasil-tender', [HasilTenderController::class, 'index']);


         // Mendapatkan Purchase Order berdasarkan penawaran_id yang terkait dengan vendor yang sedang login
        Route::get('/purchase-order/by-penawaran/{penawaran_id}', [PurchaseOrderVendorController::class, 'getPurchaseOrder']);

        // Mengupload bukti pembayaran ke PO yang sesuai dengan penawaran_id
        Route::post('/purchase-order/{penawaran_id}/upload-bukti', [PurchaseOrderVendorController::class, 'uploadBuktiPembayaran']);

        // upload bukti pembayaran
         Route::post('/vendor/purchase-order/{id}/upload-bukti', [PurchaseOrderVendorController::class, 'uploadBuktiPembayaran']);
        
    });

// APK Routes - Pengaju dan Atasan
// APK Routes - Pengaju dan Atasan

    Route::prefix('apk')->group(function () {
        Route::post('/login', [UserApkAuthController::class, 'login']);
        Route::post('/forgot-password', [UserApkAuthController::class, 'forgotPassword']); // optional
        Route::post('/reset-password', [UserApkAuthController::class, 'resetPassword']);   // optional

        // santchum
        Route::middleware(['auth:sanctum'])->group(function () { 
            // 🔐 Authenticated routes  
            Route::get('/me', [UserApkAuthController::class, 'me']);
            Route::post('/logout', [UserApkAuthController::class, 'logout']);

            // 📝 Pengajuan Permintaan (oleh pengaju)
            Route::post('/permintaan', [PermintaanController::class, 'store']); // 🔄 dari APK
            Route::get('/permintaan', [PermintaanController::class, 'userIndex']); 

            // ✅ Approval oleh Atasan
                Route::get('/approval', [ApprovalController::class, 'index']); // 🟡 Ambil semua permintaan yang perlu diverifikasi
                Route::post('/approval/{id}/setujui', [ApprovalController::class, 'approve']); // Setujui
                Route::post('/approval/{id}/tolak', [ApprovalController::class, 'reject']);    // Tolak
            });

            // rekap
            Route::get('/rekap-pengajuan', [PengajuanController::class, 'getRekapPengajuan']);
    });
