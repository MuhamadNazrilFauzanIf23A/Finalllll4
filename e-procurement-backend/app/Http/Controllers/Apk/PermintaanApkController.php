<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permintaan;

class PermintaanApkController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama_proyek' => 'required|string',
            'spesifikasi' => 'nullable|string',
            'kuantitas'   => 'nullable|integer',
            'nominal'     => 'nullable|numeric',
            'alasan'      => 'nullable|string',
            'divisi'      => 'required|string',
            'file_pdf'    => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $data = $request->all();
        $data['user_id'] = auth()->id();
        $data['status'] = 'Menunggu';

        if ($request->hasFile('file_pdf')) {
            $file = $request->file('file_pdf');

            if ($file->isValid()) {
                $path = $file->store('pdf', 'public');
                $data['file_pdf'] = 'storage/' . $path; 
            } else {
                return response()->json(['error' => 'File tidak valid'], 422);
            }
        }

        $permintaan = Permintaan::create($data);

        return response()->json([
            'message' => 'Permintaan berhasil dikirim',
            'data' => $permintaan
        ], 201);
    }

    public function index()
    {
        $userId = auth()->id();
        $permintaans = Permintaan::where('user_id', $userId)->latest()->get();

        return response()->json($permintaans);
    }
}
