<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Penawaran;

class PurchaseOrder extends Model
{
    protected $fillable = [
        'penawaran_id', 'nilai', 'tanggal', 'status', 'file_url', 'bukti_pembayaran_url'
    ];

    public function penawaran()
    {
        return $this->belongsTo(Penawaran::class);
    }

        // Model Penawaran
    public function pengadaan()
    {
        return $this->belongsTo(Pengadaan::class);
    }
}
