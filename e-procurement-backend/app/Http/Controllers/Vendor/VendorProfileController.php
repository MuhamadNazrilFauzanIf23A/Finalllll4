<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Models\Vendor;

class VendorProfileController extends Controller
{
    /**
     * ✅ Ambil data profil vendor yang sedang login
     */
public function show(Request $request)
{
    // Log untuk melihat token yang diterima
    \Log::info('Authorization Token:', [$request->header('Authorization')]);

    // Verifikasi token menggunakan auth:vendor
    $vendor = $request->user();

    if (!$vendor) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    // Hindari kirim semua field sensitif, batasi data yang dikembalikan
    return response()->json([
        'id' => $vendor->id,
        'nama_perusahaan' => $vendor->nama_perusahaan,
        'kategori' => $vendor->kategori,
        'email' => $vendor->email,
        'telepon' => $vendor->telepon,
        'alamat' => $vendor->alamat,
        'penanggung_jawab' => $vendor->penanggung_jawab,
        'tahun_berdiri' => $vendor->tahun_berdiri,
        'website' => $vendor->website,
        'dokumen_legalitas' => $vendor->dokumen_legalitas,
    ]);
}


    /**
     * ✅ Update data profil vendor
     */
    public function update(Request $request)
    {
        $vendor = Auth::guard('vendor')->user();

        if (!$vendor) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'nama_perusahaan'   => 'required|string|max:255',
            'kategori'          => 'required|string|max:255',
            'email'             => [
                'required',
                'email',
                Rule::unique('vendors', 'email')->ignore($vendor->id),
            ],
            'telepon'           => 'required|string|max:20',
            'alamat'            => 'required|string|max:500',
            'penanggung_jawab'  => 'required|string|max:255',
            'tahun_berdiri'     => 'nullable|integer|digits:4',
            'website'           => 'nullable|url|max:255',
        ]);

        $vendor->update([
            'nama_perusahaan'   => $request->nama_perusahaan,
            'kategori'          => $request->kategori,
            'email'             => $request->email,
            'telepon'           => $request->telepon,
            'alamat'            => $request->alamat,
            'penanggung_jawab'  => $request->penanggung_jawab,
            'tahun_berdiri'     => $request->tahun_berdiri,
            'website'           => $request->website,
        ]);

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'data' => [
                'id' => $vendor->id,
                'nama_perusahaan' => $vendor->nama_perusahaan,
                'kategori' => $vendor->kategori,
                'email' => $vendor->email,
                'telepon' => $vendor->telepon,
                'alamat' => $vendor->alamat,
                'penanggung_jawab' => $vendor->penanggung_jawab,
                'tahun_berdiri' => $vendor->tahun_berdiri,
                'website' => $vendor->website,
            ]
        ]);
    }

    /**
     * ✅ Upload ulang dokumen legalitas
     */
    public function uploadDokumen(Request $request)
    {
        $vendor = Auth::guard('vendor')->user();

        if (!$vendor) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'dokumen_legalitas' => 'required|file|mimes:pdf,doc,docx|max:2048'
        ]);

        // Hapus file lama jika ada
        if ($vendor->dokumen_legalitas && Storage::disk('public')->exists($vendor->dokumen_legalitas)) {
            Storage::disk('public')->delete($vendor->dokumen_legalitas);
        }

        $path = $request->file('dokumen_legalitas')->store('legalitas', 'public');

        $vendor->dokumen_legalitas = $path;
        $vendor->save();

        return response()->json([
            'message' => 'Dokumen berhasil diupload ulang',
            'path' => $path
        ]);
    }
}
