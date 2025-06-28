<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aanwijzing extends Model
{
    // Gunakan nama kolom yang benar sesuai tabel
    protected $fillable = ['pengadaan_id', 'tanggal', 'dokumen_url', 'status'];

    // Relasi ke pengadaan (bukan proyek lagi)
    public function pengadaan()
    {
        return $this->belongsTo(Pengadaan::class);
    }
}
