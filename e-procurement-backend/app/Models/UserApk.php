<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserApk extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'usersapk'; // 🔧 Pastikan sesuai tabel

    protected $fillable = [
        'nama',
        'email',
        'password',
        'role',
        'divisi',
        'atasan_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'reset_token', // ini boleh disembunyikan jika tidak perlu dikirim ke frontend
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // 🔁 Relasi: User ini punya Atasan
    public function atasan()
    {
        return $this->belongsTo(UserApk::class, 'atasan_id');
    }

    // 🔁 Relasi: User ini punya banyak Bawahan
    public function bawahans()
    {
        return $this->hasMany(UserApk::class, 'atasan_id');
    }

    // 🔁 Relasi ke permintaan barang/jasa
    public function permintaans()
    {
        return $this->hasMany(Permintaan::class, 'user_id');
    }
}
