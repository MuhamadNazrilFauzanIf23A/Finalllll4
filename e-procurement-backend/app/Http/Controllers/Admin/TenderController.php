<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Penawaran;
use App\Models\Pengadaan;

class TenderController extends Controller
{
    /**
     * Menampilkan daftar semua penawaran tender
     */
    public function index()
    {
        $penawarans = Penawaran::with(['vendor', 'pengadaan'])->get();

        $data = $penawarans->map(function ($p) {
            return [
                'id' => $p->id,
                'namaProyek' => $p->pengadaan->nama_proyek ?? '-',
                'vendor' => $p->vendor->nama ?? '-',
                'penawaran' => $p->harga_penawaran,
                'status' => $p->status,
                'terverifikasi' => $p->verifikasi,
            ];
        });

        return response()->json($data);
    }

    /**
     * Update informasi penawaran tender
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'harga_penawaran' => 'nullable|numeric',
            'status' => 'nullable|string|in:Evaluasi,Lolos,Gugur,Selesai',
            'verifikasi' => 'nullable|boolean',
        ]);

        $penawaran = Penawaran::findOrFail($id);
        $penawaran->update($request->only(['harga_penawaran', 'status', 'verifikasi']));

        return response()->json(['message' => 'Tender berhasil diperbarui']);
    }

    /**
     * Terbitkan tender dari pengadaan
     */
    public function publish($id)
    {
        $pengadaan = Pengadaan::find($id);

        if (!$pengadaan) {
            return response()->json(['message' => 'Pengadaan tidak ditemukan'], 404);
        }

        if ($pengadaan->status === 'published') {
            return response()->json(['message' => 'Tender sudah dipublikasikan sebelumnya'], 400);
        }

        $pengadaan->status = 'published';
        $pengadaan->save();

        return response()->json(['message' => 'Tender berhasil dipublikasikan']);
    }
}
