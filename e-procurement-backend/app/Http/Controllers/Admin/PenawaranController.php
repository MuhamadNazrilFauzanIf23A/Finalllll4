<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Penawaran;
use App\Models\PurchaseOrder;
use Carbon\Carbon;

class PenawaranController extends Controller
{
    // GET: /api/admin/penawaran
    public function index()
    {
        $data = Penawaran::with(['vendor', 'pengadaan'])->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'vendor' => $p->vendor->nama ?? '-',
                'namaProyek' => $p->pengadaan->nama_proyek ?? '-',
                'penawaran' => $p->harga_penawaran,
                'status' => $p->status,
                'terverifikasi' => (bool) $p->verifikasi,
                'dokumenUrl' => $p->file_url,
            ];
        });

        return response()->json(['data' => $data]);
    }

    // POST: /api/admin/penawaran/{id}/verifikasi
    public function verifikasi($id)
    {
        $penawaran = Penawaran::findOrFail($id);
        $penawaran->verifikasi = true;
        $penawaran->save();

        return response()->json(['message' => 'Dokumen berhasil diverifikasi']);
    }

    // POST: /api/admin/penawaran/{id}/update
    public function update(Request $request, $id)
    {
        $request->validate([
            'harga_penawaran' => 'required|numeric',
            'status' => 'required|in:Evaluasi,Lolos,Gugur,Selesai'
        ]);

        $penawaran = Penawaran::findOrFail($id);
        $penawaran->harga_penawaran = $request->harga_penawaran;
        $penawaran->status = $request->status;
        $penawaran->save();

        return response()->json(['message' => 'Penawaran berhasil diperbarui']);
    }

    // tanda selesai
    public function tandaiSelesai($id)
{
    $penawaran = Penawaran::with('vendor', 'pengadaan')->findOrFail($id);

    if (!$penawaran->verifikasi) {
        return response()->json(['message' => 'Dokumen belum diverifikasi'], 400);
    }

    $penawaran->update(['status' => 'Lolos']);

    // Cek apakah PO sudah pernah dibuat
    $existingPO = PurchaseOrder::where('penawaran_id', $penawaran->id)->first();
    if (!$existingPO) {
        PurchaseOrder::create([
            'penawaran_id' => $penawaran->id,
            'nilai' => $penawaran->harga_penawaran,
            'tanggal' => Carbon::now(),
            'status' => 'Diterbitkan',
            'file_url' => null // Bisa diisi jika kamu generate PDF
        ]);
    }

    return response()->json(['message' => 'Penawaran ditandai sebagai pemenang dan PO diterbitkan']);
}
}
