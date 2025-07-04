<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penawaran extends Model
{
    protected $fillable = [
        'vendor_id',
        'pengadaan_id',
        'file_url',
        'harga_penawaran',
        'status',
        'verifikasi'
    ];

    // Relasi ke vendor
    public function vendor()
    {
        return $this->belongsTo(\App\Models\Vendor::class);
    }

    // Relasi ke pengadaan
    public function pengadaan()
    {
        return $this->belongsTo(\App\Models\Pengadaan::class);
    }

    public function purchaseOrder()
{
    return $this->hasOne(PurchaseOrder::class);
}
}
