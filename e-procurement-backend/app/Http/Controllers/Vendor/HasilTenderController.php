<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Penawaran;
use Illuminate\Http\Request;

class HasilTenderController extends Controller
{
    public function index(Request $request)
    {
        $vendorId = auth()->user()->id;

        // Ambil semua penawaran yang lolos/gugur/selesai beserta relasi pengadaan & purchaseOrder
        $penawaran = Penawaran::with(['pengadaan', 'purchaseOrder'])
            ->where('vendor_id', $vendorId)
            ->whereIn('status', ['Lolos', 'Gugur', 'Selesai'])
            ->get()
            ->map(function ($item) {
                return [
                    'penawaran_id' => $item->id,
                    'id' => $item->id,
                    'namaProyek' => $item->pengadaan->nama_proyek ?? '-',
                    'status' => in_array($item->status, ['Lolos', 'Selesai']) ? 'Menang' : 'Tidak Menang',
                    'nilaiKontrak' => $item->harga_penawaran,
                    'file_po' => $item->purchaseOrder?->file_url ? asset($item->purchaseOrder->file_url) : null,
                    'bukti_pembayaran' => $item->purchaseOrder?->bukti_pembayaran_url ? asset($item->purchaseOrder->bukti_pembayaran_url) : null,
                ];
            });

        return response()->json([
            'message' => 'Hasil tender vendor',
            'data' => $penawaran
        ]);
    }
}
