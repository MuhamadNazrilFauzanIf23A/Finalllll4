<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aanwijzing extends Model
{
    // Gunakan nama kolom yang benar sesuai tabel
    protected $fillable = ['pengadaan_id', 'tanggal', 'dokumen_url', 'status', 'vendor_id'];

    // Relasi ke pengadaan (bukan proyek lagi)
    public function pengadaan()
    {
        return $this->belongsTo(Pengadaan::class);
    }

    // Relasi ke vendor
    public function vendor()
    {
        return $this->belongsTo(Vendor::class); // Vendor yang terkait dengan aanwijzing
    }
}
