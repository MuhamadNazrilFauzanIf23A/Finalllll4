<?php

namespace App\Http\Controllers;

use App\Models\Permintaan;
use Illuminate\Http\Request;

class PermintaanController extends Controller
{
    // GET /api/admin/permintaan
    public function index()
    {
        return Permintaan::with('items')->get();
    }

    // GET /api/admin/permintaan/{id}
    public function show($id)
    {
        return Permintaan::with('items')->findOrFail($id);
    }

    // POST /api/permintaan
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
            $path = $request->file('file_pdf')->store('pdf', 'public');
            $data['file_pdf'] = asset('storage/' . $path);
        }

        $permintaan = Permintaan::create($data);

        return response()->json([
            'message' => 'Permintaan berhasil dikirim',
            'data' => $permintaan
        ], 201);
    }

    // GET /api/permintaan
    public function userIndex()
    {
        $userId = auth()->id();

        return Permintaan::where('user_id', $userId)
            ->with('items')
            ->orderByDesc('created_at')
            ->get();
    }
}
