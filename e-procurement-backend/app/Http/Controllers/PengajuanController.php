<?php

namespace App\Http\Controllers;

use App\Models\Permintaan;
use Illuminate\Http\Request;

class PengajuanController extends Controller
{
    // Method untuk mengambil rekap pengajuan
    public function getRekapPengajuan()
    {
        // Ambil data pengajuan berdasarkan status dan urutkan berdasarkan tanggal terbaru
        $rekap = Permintaan::select('nama_proyek', 'status', 'divisi', 'tanggal_disetujui', 'created_at')
                            ->orderByDesc('created_at')
                            ->get();

        return response()->json($rekap);
    }
}
