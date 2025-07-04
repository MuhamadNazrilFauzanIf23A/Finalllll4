<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permintaan extends Model
{
    // Menambahkan 'atasan_id' ke dalam $fillable agar bisa disimpan
    protected $fillable = [
        'user_id',
        'atasan_id',  
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

    // Relasi satu-ke-banyak dengan item permintaan
    public function items()
    {
        return $this->hasMany(\App\Models\PermintaanItem::class);
    }

    // Relasi banyak ke satu dengan user (pengaju)
    public function user()
    {
        return $this->belongsTo(UserApk::class, 'user_id');
    }

    // Relasi satu ke satu dengan pengadaan
    public function pengadaan()
    {
        return $this->hasOne(Pengadaan::class);
    }

    // Relasi banyak ke satu dengan atasan (atasan_id)
    public function atasan()
    {
        return $this->belongsTo(UserApk::class, 'atasan_id');
    }
}
