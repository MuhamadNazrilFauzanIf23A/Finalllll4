<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermintaanItem extends Model
{
    protected $fillable = ['permintaan_id', 'nama', 'spesifikasi', 'kuantitas', 'satuan'];

    public function permintaan()
    {
        return $this->belongsTo(Permintaan::class);
    }
}

