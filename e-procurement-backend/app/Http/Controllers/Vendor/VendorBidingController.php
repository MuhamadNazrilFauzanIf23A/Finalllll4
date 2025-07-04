<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Penawaran;
use App\Models\Pengadaan;
use Illuminate\Http\Request;

class VendorBidingController extends Controller
{
    // Mengambil semua penawaran vendor berdasarkan status "published"
    public function getVendorPenawaran(Request $request)
    {
        // Mengambil penawaran yang terkait dengan vendor yang login
        $penawaran = Penawaran::with(['pengadaan', 'vendor'])
            ->where('vendor_id', auth()->id())
            ->get()
            ->filter(function ($penawaran) {
                return $penawaran->pengadaan && $penawaran->vendor;
            })
            ->map(function ($penawaran) {
                return [
                    'id' => $penawaran->id,
                    'harga_penawaran' => $penawaran->harga_penawaran,
                    'status' => $penawaran->status,
                    'verifikasi' => $penawaran->verifikasi,
                    'file_url' => $penawaran->file_url,
                    'nama_proyek' => optional($penawaran->pengadaan)->nama_proyek,
                    'vendor' => optional($penawaran->vendor)->nama_perusahaan,
                    'nilai_evaluasi' => $penawaran->nilai_evaluasi,
                    'catatan' => $penawaran->catatan,
                ];
            });

        return response()->json($penawaran);
    }

    // Mengajukan penawaran baru
    public function submitPenawaran(Request $request)
    {
        $validated = $request->validate([
            'pengadaan_id' => 'required|exists:pengadaans,id', // Validasi pengadaan_id
            'harga_penawaran' => 'required|numeric', // Validasi harga penawaran
            'file_url' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi file penawaran
        ]);

        // Menyimpan file penawaran yang di-upload
        $filePath = $request->file('file_url')->store('penawaran', 'public');

        // Membuat URL yang bisa diakses publik untuk file
        $fileUrl = asset('storage/penawaran/' . basename($filePath));

        // Menyimpan data penawaran ke dalam database
        $penawaran = Penawaran::create([
            'vendor_id' => auth()->id(),
            'pengadaan_id' => $validated['pengadaan_id'],
            'file_url' => $fileUrl, // Menyimpan URL file
            'harga_penawaran' => $validated['harga_penawaran'],
            'status' => 'Bidding Terbuka',
            'verifikasi' => 0, // Status verifikasi awal adalah 0
        ]);

        return response()->json(['message' => 'Penawaran berhasil dikirim', 'penawaran' => $penawaran]);
    }

    // Mengupdate harga penawaran
    public function updateHarga(Request $request, $id)
    {
        $validated = $request->validate([
            'harga_penawaran' => 'required|numeric', // Validasi harga penawaran
        ]);

        $penawaran = Penawaran::findOrFail($id);

        // Pastikan vendor hanya bisa mengupdate penawarannya sendiri
        if ($penawaran->vendor_id != auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Mengupdate harga penawaran
        $penawaran->harga_penawaran = $validated['harga_penawaran'];
        $penawaran->save();

        return response()->json(['message' => 'Harga penawaran berhasil diperbarui']);
    }
}
