<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permintaan extends Model
{
    protected $fillable = [
        'user_id',
        'nama_proyek',
        'spesifikasi',
        'kuantitas',
        'nominal',
        'alasan',
        'divisi',
        'status',
        'file_pdf',
        'tanggal_disetujui'
    ];

    public function items()
    {
        return $this->hasMany(\App\Models\PermintaanItem::class);
    }

    public function user()
    {
        return $this->belongsTo(UserApk::class, 'user_id');
    }
}
