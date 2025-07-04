<?php

namespace App\Http\Controllers\Vendor;

use App\Models\Aanwijzing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class VendorAanwijzingController extends Controller
{
    // Menampilkan daftar aanwijzing yang relevan untuk vendor
    public function index()
    {
        $vendor = Auth::user();  // Pastikan vendor sudah login

        // Ambil semua aanwijzing yang ada dan muat relasi pengadaan dan vendor
        $aanwijzings = Aanwijzing::with('pengadaan', 'vendor')  // Memuat relasi pengadaan dan vendor
            ->whereNull('vendor_id')  // Mengambil hanya yang belum diikuti oleh vendor
            ->get();

        // Memetakan data untuk memastikan kita mengambil nama proyek dan tanggal yang benar
        $data = $aanwijzings->map(function ($a) {
            return [
                'id' => $a->id,
                'namaProyek' => $a->pengadaan->nama_proyek ?? '-',  // Ambil nama proyek dari relasi pengadaan
                'tanggal' => $a->tanggal,
                'status' => $a->status ?? 'Dijadwalkan',
                'vendorName' => $a->vendor->nama_perusahaan ?? '-',  // Nama vendor (jika ada)
                'vendorCount' => $a->vendor ? 1 : 0,  // Menghitung vendor yang ikut
                'dokumenUrl' => $a->dokumen_url ?? null,  // Sertakan URL dokumen jika ada
            ];
        });

        return response()->json($data);
    }

    // Vendor mengikuti aanwijzing, update vendor_id
    public function followAanwijzing($id)
    {
        $vendor = Auth::user();  // Ambil vendor yang sedang login

        // Cari aanwijzing berdasarkan ID yang diikuti oleh vendor
        $aanwijzing = Aanwijzing::where('id', $id)->whereNull('vendor_id')->first();

        if (!$aanwijzing) {
            return response()->json(['message' => 'Aanwijzing tidak ditemukan atau sudah ada vendor'], 404);
        }

        // Update vendor_id pada aanwijzing yang dipilih
        $aanwijzing->vendor_id = $vendor->id;
        $aanwijzing->status = 'Berlangsung';  // Ubah status menjadi 'Berlangsung'
        $aanwijzing->save();

        return response()->json(['message' => 'Aanwijzing berhasil diikuti', 'data' => $aanwijzing]);
    }

}
