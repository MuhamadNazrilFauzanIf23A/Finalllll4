<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class VendorController extends Controller
{
    /**
     * Handle vendor registration
     */
    public function register(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama_perusahaan'   => 'required|string|max:255',
            'kategori'          => 'required|string|max:100',
            'email'             => 'required|email|unique:vendors,email',
            'telepon'           => 'required|string|max:20',
            'alamat'            => 'required|string',
            'penanggung_jawab'  => 'required|string|max:255',
            'tahun_berdiri'     => 'nullable|digits:4|integer|min:1900|max:' . now()->year,
            'website'           => 'nullable|url',
            'dokumen_legalitas' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'password'          => 'required|string|min:6|confirmed',
        ]);

        // Simpan file legalitas ke storage/app/public/legalitas
        $filePath = $request->file('dokumen_legalitas')->store('legalitas', 'public');

        // Simpan data vendor
        $vendor = Vendor::create([
            'nama_perusahaan'   => $request->nama_perusahaan,
            'kategori'          => $request->kategori,
            'email'             => $request->email,
            'telepon'           => $request->telepon,
            'alamat'            => $request->alamat,
            'penanggung_jawab'  => $request->penanggung_jawab,
            'tahun_berdiri'     => $request->tahun_berdiri,
            'website'           => $request->website,
            'dokumen_legalitas' => $filePath,
            'password'          => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil!',
            'vendor'  => [
                'id'    => $vendor->id,
                'nama'  => $vendor->nama_perusahaan,
                'email' => $vendor->email,
            ]
        ], 201);
    }
}
