<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengadaan;
use App\Models\Permintaan;

class PengadaanController extends Controller
{
    public function index()
    {
        $pengadaans = Pengadaan::all();
        return response()->json(['data' => $pengadaans]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'permintaan_id' => 'required|exists:permintaans,id',
        ]);

        $permintaan = Permintaan::findOrFail($request->permintaan_id);

        $pengadaan = Pengadaan::create([
            'permintaan_id' => $permintaan->id,
            'nama_proyek' => $permintaan->nama_proyek,
            'divisi' => $permintaan->divisi,
            'estimasi_anggaran' => $permintaan->nominal,
            'status' => 'draft',
        ]);

        return response()->json(['message' => 'Proyek pengadaan dibuat', 'data' => $pengadaan]);
    }

    public function destroy($id)
    {
        $pengadaan = Pengadaan::findOrFail($id);
        $pengadaan->delete();

        return response()->json(['message' => 'Pengadaan berhasil dihapus']);
    }

    public function publish($id)
    {
        $pengadaan = Pengadaan::findOrFail($id);

        if ($pengadaan->status === 'published') {
            return response()->json(['message' => 'Pengadaan sudah diterbitkan'], 400);
        }

        $pengadaan->status = 'published';
        $pengadaan->save();

        return response()->json(['message' => 'Pengadaan berhasil diterbitkan', 'data' => $pengadaan]);
    }
}
