<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;

class LaporanController extends Controller
{
    public function index()
    {
        $data = PurchaseOrder::with(['penawaran.vendor', 'penawaran.pengadaan'])->get()->map(function ($po) {
            return [
                'proyek' => $po->penawaran->pengadaan->nama_proyek ?? '-',
                'divisi' => $po->penawaran->pengadaan->divisi ?? '-',
                'vendor' => $po->penawaran->vendor->nama ?? '-',
                'nominal' => (float) $po->nilai, 
                'status' => $po->status ?? '-',
                'tanggal' => $po->tanggal ?? $po->created_at
            ];
        });

        return response()->json(['data' => $data]);
    }
}
