<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permintaan extends Model
{
    protected $fillable = [
        'nama_proyek', 'divisi', 'nominal', 'status', 'tanggal_disetujui', 'alasan'
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
