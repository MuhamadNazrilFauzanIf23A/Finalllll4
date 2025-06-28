<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Vendor extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'nama_perusahaan',
        'kategori',
        'email',
        'telepon',
        'alamat',
        'penanggung_jawab',
        'tahun_berdiri',
        'website',
        'dokumen_legalitas',
        'password',
    ];

    /**
     * Attributes to hide when serialized (JSON)
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'tahun_berdiri' => 'integer',
        'email_verified_at' => 'datetime',
    ];

    /**
     * Auto-hash password saat diset
     */
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => bcrypt($value)
        );
    }

    /**
     * Relasi ke penawaran
     */
    public function penawarans()
    {
        return $this->hasMany(\App\Models\Penawaran::class);
    }
}
