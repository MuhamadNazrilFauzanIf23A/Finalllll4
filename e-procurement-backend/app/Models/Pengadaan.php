<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengadaan extends Model
{
    use HasFactory;

    protected $fillable = ['permintaan_id','nama_proyek', 'divisi', 'estimasi_anggaran', 'status'];

    public function tender()
    {
        return $this->hasOne(Tender::class);
    }

        public function permintaan()
    {
        return $this->belongsTo(Permintaan::class, 'permintaan_id');
    }
}

    