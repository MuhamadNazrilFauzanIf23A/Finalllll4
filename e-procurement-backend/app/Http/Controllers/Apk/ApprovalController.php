<?php

namespace App\Http\Controllers\Apk;

use App\Models\Permintaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ApprovalController extends Controller
{
    /**
     * Ambil semua permintaan yang statusnya "Menunggu"
     */
    public function index()
    {
        try {
            // Ambil hanya kolom yang dibutuhkan tanpa relasi
            $data = Permintaan::select([
                'id',
                'nama_proyek',
                'spesifikasi',
                'kuantitas',
                'nominal',
                'alasan',
                'divisi',
                'status',
                'file_pdf',
                'tanggal_disetujui',
                'created_at'
            ])
            ->where('status', 'Menunggu')
            ->orderByDesc('created_at')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            Log::error('Approval index error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal ambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function approve($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        $permintaan->status = 'Disetujui';
        $permintaan->tanggal_disetujui = now();
        $permintaan->save();

        return response()->json(['message' => 'Permintaan disetujui']);
    }

    public function reject($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        $permintaan->status = 'Ditolak';
        $permintaan->save();

        return response()->json(['message' => 'Permintaan ditolak']);
    }
}