<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tender extends Model
{
    use HasFactory;

    protected $fillable = [
        'pengadaan_id',
        'tanggal_mulai',
        'tanggal_berakhir',
        'dokumen_persyaratan'
    ];

    public function pengadaan()
    {
        return $this->belongsTo(Pengadaan::class);
    }
}
