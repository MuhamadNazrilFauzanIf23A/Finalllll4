<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Penawaran;
use App\Models\Pengadaan;
use Illuminate\Http\Request;
use App\Models\PurchaseOrder;

class PenawaranController extends Controller
{

    // Mengambil semua penawaran
    public function getAllPenawaran()
    {
        $penawaran = Penawaran::with(['pengadaan', 'vendor']) // join
            ->get()
            ->map(function ($penawaran) {
                // tambah nama proyek dan vendor
                return [
                    'id' => $penawaran->id,
                    'harga_penawaran' => $penawaran->harga_penawaran,
                    'status' => $penawaran->status,
                    'verifikasi' => $penawaran->verifikasi,
                    'file_url' => $penawaran->file_url,
                    'nama_proyek' => $penawaran->pengadaan->nama_proyek,
                    'vendor' => $penawaran->vendor->nama_perusahaan, 
                ];
            });

        return response()->json($penawaran);
    }

    // Menyimpan penawaran
    public function submitPenawaran(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id', // Validasi vendor_id
            'pengadaan_id' => 'required|exists:pengadaans,id', // Validasi pengadaan_id
            'harga_penawaran' => 'required|numeric', // Harga penawaran yang valid
            'file_url' => 'required|file|mimes:pdf,doc,docx|max:2048', // File dokumen penawaran
        ]);

        // Menyimpan file penawaran
        $filePath = $request->file('file_url')->store('penawaran', 'public');

        // Menyimpan data penawaran ke dalam database
        $penawaran = Penawaran::create([
            'vendor_id' => $validated['vendor_id'],
            'pengadaan_id' => $validated['pengadaan_id'],
            'file_url' => $filePath,
            'harga_penawaran' => $validated['harga_penawaran'],
            'status' => 'Evaluasi',  // Status awal adalah Evaluasi
            'verifikasi' => 0, // Status verifikasi adalah 0 (belum diverifikasi)
        ]);

        // Mengembalikan response
        return response()->json(['message' => 'Penawaran berhasil diajukan', 'penawaran' => $penawaran], 201);
    }


    // Verifikasi dokumen penawaran
    public function verifikasiDokumen($id, Request $request)
    {
        $penawaran = Penawaran::with('pengadaan')->findOrFail($id);

        $penawaran->verifikasi = 1;
        $penawaran->status = $request->status ?? $penawaran->status;
        $penawaran->harga_penawaran = $request->harga_penawaran ?? $penawaran->harga_penawaran;
        $penawaran->save();

        // Buat Purchase Order jika statusnya Lolos & belum ada PO
        if ($penawaran->status === 'Lolos' && !$penawaran->purchaseOrder) {
            PurchaseOrder::create([
                'penawaran_id' => $penawaran->id,
                'nilai' => $penawaran->harga_penawaran,
                'tanggal' => now(),
                'status' => 'Diterbitkan'
            ]);
        }

        return response()->json(['message' => 'Verifikasi Berhasil']);
    }

    // Update harga penawaran
    public function updateHarga($id, Request $request)
    {
        $validated = $request->validate([
            'harga_penawaran' => 'required|numeric',
        ]);

        $penawaran = Penawaran::findOrFail($id);
        $penawaran->harga_penawaran = $validated['harga_penawaran'];
        $penawaran->save();

        return response()->json(['message' => 'Harga penawaran berhasil diperbarui']);
    }
}
