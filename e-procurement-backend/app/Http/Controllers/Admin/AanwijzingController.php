<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Aanwijzing;
use App\Models\Pengadaan;

class AanwijzingController extends Controller
{
    // GET /admin/aanwijzing
    public function index()
    {
        $data = Aanwijzing::with('pengadaan')->get()->map(function ($a) {
            return [
                'id' => $a->id,
                'namaProyek' => $a->pengadaan->nama_proyek ?? '-', // hindari error jika null
                'vendorCount' => rand(2, 5), // nanti ganti dengan jumlah vendor real
                'tanggalAanwijzing' => $a->tanggal,
                'status' => $a->status ?? 'Dijadwalkan',
                'dokumenUrl' => $a->dokumen_url
            ];
        });

        return response()->json($data);
    }

    // POST /admin/aanwijzing
    public function store(Request $request)
    {
        $request->validate([
            'pengadaan_id' => 'required|exists:pengadaans,id', // ✅ Ganti proyek_id → pengadaan_id
            'tanggal' => 'required|date'
        ]);

        $a = Aanwijzing::create([
            'pengadaan_id' => $request->pengadaan_id,
            'tanggal' => $request->tanggal,
            'status' => 'Dijadwalkan'
        ]);

        return response()->json([
            'message' => 'Aanwijzing berhasil dibuat',
            'data' => $a
        ]);
    }

    // POST /admin/aanwijzing/{id}/upload
    public function uploadDokumen(Request $request, $id)
    {
        $request->validate([
            'dokumen' => 'required|file|mimes:pdf|max:2048'
        ]);

        $aanwijzing = Aanwijzing::findOrFail($id);

        $path = $request->file('dokumen')->store('dokumen-aanwijzing', 'public');

        $aanwijzing->update([
            'dokumen_url' => asset('storage/' . $path),
            'status' => 'Selesai'
        ]);

        return response()->json(['message' => 'Upload berhasil']);
    }
}
