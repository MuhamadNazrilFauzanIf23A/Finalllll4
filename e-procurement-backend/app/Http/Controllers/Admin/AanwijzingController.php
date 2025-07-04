<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Aanwijzing;
use App\Models\Pengadaan;
use Illuminate\Support\Facades\DB;

class AanwijzingController extends Controller
{

// Menghitung jumlah vendor yang terdaftar berdasarkan vendor_id
public function index()
{
    $data = Aanwijzing::with('pengadaan') // Mengambil data pengadaan
        ->get()
        ->map(function ($a) {
            // Menghitung jumlah vendor yang memiliki vendor_id (vendor_id tidak null)
            $vendorCount = DB::table('aanwijzings')
                ->where('aanwijzings.id', $a->id)
                ->whereNotNull('aanwijzings.vendor_id')  // Hanya menghitung vendor yang terdaftar
                ->count();  // Menghitung jumlah vendor yang terdaftar pada aanwijzing

            return [
                'id' => $a->id,
                'namaProyek' => $a->pengadaan->nama_proyek ?? '-',  // Hindari error jika null
                'vendorCount' => $vendorCount,  // Menghitung jumlah vendor terkait
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
            'pengadaan_id' => 'required|exists:pengadaans,id',
            'tanggal' => 'required|date',
        ]);

        $a = Aanwijzing::create([
            'pengadaan_id' => $request->pengadaan_id,
            'tanggal' => $request->tanggal,
            'status' => 'Dijadwalkan',
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
