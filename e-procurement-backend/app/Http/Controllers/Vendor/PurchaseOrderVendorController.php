<?php

namespace App\Http\Controllers\Vendor;


use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Storage;

class PurchaseOrderVendorController extends Controller
{
    // Mendapatkan detail Purchase Order berdasarkan penawaran_id yang terkait dengan vendor
        public function getPurchaseOrder($penawaran_id)
        {
            $vendorId = auth()->user()->id; // ID vendor yang sedang login

            // Mencari Purchase Order berdasarkan penawaran_id dan vendor_id
            $purchaseOrder = PurchaseOrder::where('penawaran_id', $penawaran_id)
                                        ->whereHas('penawaran', function ($query) use ($vendorId) {
                                            $query->where('vendor_id', $vendorId); // Memastikan PO yang diambil adalah milik vendor yang sedang login
                                        })
                                        ->first(); // Mengambil satu PO yang sesuai

            if (!$purchaseOrder) {
                return response()->json(['message' => 'Purchase Order tidak ditemukan'], 404);
            }

            // Mengembalikan PO beserta file URL jika ada
            return response()->json([
                'data' => [
                    'id' => $purchaseOrder->id,
                    'fileUrl' => $purchaseOrder->file_url ? asset('' . $purchaseOrder->file_url) : null,
                    'buktiPembayaranUrl' => $purchaseOrder->bukti_pembayaran_url ? asset('storage/' . $purchaseOrder->bukti_pembayaran_url) : null
                ]
            ]);
        }


  // Mengupload bukti pembayaran ke PO yang sesuai
public function uploadBuktiPembayaran(Request $request, $penawaran_id)
{
       // ✅ DEBUG LOG TAMBAHAN:
    logger('📥 Penawaran ID dari URL: ' . $penawaran_id);
    logger('📤 Data file yang diterima:', $request->all());

    $vendorId = auth()->user()->id;

    $purchaseOrder = PurchaseOrder::where('penawaran_id', $penawaran_id)
        ->whereHas('penawaran', function ($query) use ($vendorId) {
            $query->where('vendor_id', $vendorId);
        })
        ->first();

    if (!$purchaseOrder) {
        return response()->json(['message' => 'Purchase Order tidak ditemukan'], 404);
    }

    $request->validate([
        'bukti_pembayaran' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);

    $file = $request->file('bukti_pembayaran');
    $path = $file->store('bukti-pembayaran', 'public');

    // Logging untuk debug
    \Log::info('Upload Bukti Pembayaran', [
        'penawaran_id' => $penawaran_id,
        'vendor_id' => $vendorId,
        'path' => $path,
        'purchase_order_id' => $purchaseOrder->id
    ]);

    $purchaseOrder->bukti_pembayaran_url = 'storage/' . $path;
    $purchaseOrder->save();

    \Log::info('PO berhasil diupdate', [
        'url_disimpan' => $purchaseOrder->bukti_pembayaran_url
    ]);

    return response()->json([
        'message' => 'Bukti Pembayaran berhasil diupload',
        'data' => $purchaseOrder
    ]);
}

}