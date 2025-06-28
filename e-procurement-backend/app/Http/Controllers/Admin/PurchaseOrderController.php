<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseOrder;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        // Ambil semua PO dengan relasi penawaran -> vendor & pengadaan
        $poList = PurchaseOrder::with(['penawaran.vendor', 'penawaran.pengadaan'])->get();

        // Format data untuk dikirim ke frontend
        $data = $poList->map(function ($item) {
            return [
                'id' => $item->id,
                'proyek' => $item->penawaran->pengadaan->nama_proyek ?? '-',
                'vendor' => $item->penawaran->vendor->nama ?? '-',
                'nilai' => $item->nilai,
                'tanggal' => $item->tanggal,
                'status' => $item->status,
                'url' => $item->file_url
            ];
        });

        return response()->json([
            'message' => 'List Purchase Order',
            'data' => $data
        ]);
    }
}
