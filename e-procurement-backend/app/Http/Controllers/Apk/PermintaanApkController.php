<?php

namespace App\Http\Controllers\Apk;

use Illuminate\Http\Request;
use App\Models\Permintaan;
use Illuminate\Support\Facades\Auth; // Pastikan auth diimport

class PermintaanApkController extends Controller
{
    // Fungsi untuk menyimpan permintaan
public function store(Request $request)
{
    // Validasi input dari pengguna
    $request->validate([
        'nama_proyek' => 'required|string',
        'spesifikasi' => 'nullable|string',
        'kuantitas'   => 'nullable|integer',
        'nominal'     => 'nullable|numeric',
        'alasan'      => 'nullable|string',
        'divisi'      => 'required|string',
        'file_pdf'    => 'nullable|file|mimes:pdf|max:2048',
    ]);

    // Ambil data dari request dan tambahkan informasi pengguna yang sedang login
    $data = $request->all();
    $data['user_id'] = auth()->id(); // Ambil user_id yang sedang login
    $data['status'] = 'Menunggu'; // Status permintaan saat pertama kali dibuat

    // Tentukan atasan_id berdasarkan user yang login (dari relasi pada user yang login)
    // Pastikan kolom atasan_id pada user sudah terisi
    $data['atasan_id'] = auth()->user()->atasan_id ?? null;  // Menambahkan default null jika atasan_id kosong

    // Cek apakah ada file PDF yang diupload dan simpan file tersebut
    if ($request->hasFile('file_pdf')) {
        $file = $request->file('file_pdf');
        if ($file->isValid()) {
            $path = $file->store('pdf', 'public');
            $data['file_pdf'] = 'storage/' . $path;
        } else {
            return response()->json(['error' => 'File tidak valid'], 422);
        }
    }

    // Simpan permintaan ke dalam database
    $permintaan = Permintaan::create($data);

    // Kembalikan response sukses dengan data permintaan yang baru
    return response()->json([
        'message' => 'Permintaan berhasil dikirim',
        'data' => $permintaan
    ], 201);
}


    // Fungsi untuk mengambil semua permintaan yang diajukan kepada atasan yang sedang login
    public function index(Request $request)
    {
        // Ambil ID atasan yang sedang login
        $atasanId = auth()->id();  // Mendapatkan ID atasan dari user yang sedang login
        
        // Ambil semua permintaan yang ditujukan kepada atasan yang sedang login
        $permintaans = Permintaan::where('atasan_id', $atasanId)
            ->latest() // Mengurutkan berdasarkan tanggal terbaru
            ->get();

        return response()->json($permintaans);
    }
}
