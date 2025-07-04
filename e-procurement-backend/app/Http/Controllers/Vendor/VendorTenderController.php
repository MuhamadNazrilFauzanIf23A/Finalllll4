<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Penawaran;
use App\Models\Pengadaan;
use Illuminate\Http\Request;

class VendorTenderController extends Controller
{
    /** 
     * ✅ Mendapatkan pengadaan yang statusnya published
     */
        public function index(Request $request)
        {
            // Mengambil pengadaan yang statusnya 'published'
            $tenders = Pengadaan::where('status', 'published')
                ->with('permintaan') // Memastikan permintaan diload
                ->get(); // Ambil semua data yang memenuhi kriteria

            // Format data yang diinginkan
            $formattedTenders = $tenders->map(function ($tender) {
                return [
                    'id'             => $tender->id, // Pastikan ID tender ada
                    'nama_proyek'    => $tender->nama_proyek,
                    'spesifikasi'    => $tender->permintaan->spesifikasi ?? null, // Ambil spesifikasi dari permintaan
                    'kuantitas'      => $tender->permintaan->kuantitas ?? null,   // Ambil kuantitas dari permintaan
                    'nominal'        => $tender->permintaan->nominal ?? null,     // Ambil nominal dari permintaan
                ];
            });

            return response()->json($formattedTenders); // Kirim data dalam format JSON
        }

    // penawaran
public function submitTender(Request $request)
{
    // Validasi input dari vendor
    $request->validate([
        'pengadaan_id' => 'required|exists:pengadaans,id', // ID pengadaan yang valid
        'harga_penawaran' => 'required|numeric', // Harga penawaran yang valid
        'file_url' => 'required|file|mimes:pdf,doc,docx|max:2048', // File dokumen penawaran
    ]);

    // Menyimpan dokumen yang diupload
    $file = $request->file('file_url');
    $fileUrl = asset('storage/penawaran/' . basename($filePath));  // Menyimpan file di folder penawaran

    // Menyimpan data penawaran ke dalam database
    $penawaran = Penawaran::create([
        'vendor_id' => auth()->id(), // Mendapatkan ID vendor yang login
        'pengadaan_id' => $request->pengadaan_id,
        'file_url' => $fileUrl, // Menggunakan URL yang sudah dibuat
        'harga_penawaran' => $request->harga_penawaran,
        'status' => 'Evaluasi',
    ]);

    // Mengembalikan response
    return response()->json(['message' => 'Penawaran berhasil dikirim', 'penawaran' => $penawaran]);
}

public function cekPenawaranTersedia(Request $request, $pengadaan_id)
{
    // Mengecek apakah vendor sudah mengajukan penawaran untuk tender tersebut
    $penawaran = Penawaran::where('pengadaan_id', $pengadaan_id)
        ->where('vendor_id', auth()->id()) // Pastikan penawaran milik vendor yang sedang login
        ->exists(); // Mengembalikan true jika ada, false jika tidak ada

    return response()->json($penawaran); // Mengembalikan true/false
}


}

