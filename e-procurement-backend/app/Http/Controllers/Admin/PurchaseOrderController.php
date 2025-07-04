<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseOrder;

class PurchaseOrderController extends Controller
{
        public function index()
        {
            $poList = PurchaseOrder::with(['penawaran.vendor', 'penawaran.pengadaan'])->get();

$data = $poList->map(function ($po) {
    return [
        'id' => $po->id,
        'namaProyek' => optional($po->penawaran->pengadaan)->nama_proyek ?? '-',
        'vendor' => optional($po->penawaran->vendor)->nama_perusahaan ?? '-',
        'tanggalTerbit' => $po->tanggal,
        'statusPembayaran' => $po->status === 'Selesai' ? 'Selesai' : 'Menunggu',
        'filePO' => $po->file_url ? asset($po->file_url) : null,
        'buktiPembayaran' => $po->bukti_pembayaran_url ? asset($po->bukti_pembayaran_url) : null,
    ];
});


            return response()->json([
                'message' => 'Daftar Purchase Order',
                'data' => $data
            ]);
        }


        public function uploadPO(Request $request, $id)
    {
        $request->validate([
            'file_po' => 'required|file|mimes:pdf,doc,docx|max:2048'
        ]);

        $po = PurchaseOrder::findOrFail($id);

        $path = $request->file('file_po')->store('purchase-orders', 'public');

        $po->file_url = 'storage/' . $path;
        $po->save();

        return response()->json(['message' => 'File PO berhasil diunggah.']);
    }

    public function markAsCompleted($id)
    {
        $po = PurchaseOrder::findOrFail($id);
        $po->status = 'Selesai';
        $po->save();

        return response()->json(['message' => 'PO telah ditandai sebagai selesai.']);
    }
}
