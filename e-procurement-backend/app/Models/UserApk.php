<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserApk extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usersapk'; // <-- ini penting

    protected $fillable = [
        'nama', 'email', 'password', 'role', 'divisi', 'atasan_id'
    ];

    protected $hidden = [
        'password', 'reset_token', 'remember_token',
    ];

    public function atasan()
    {
        return $this->belongsTo(UserApk::class, 'atasan_id');
    }

    public function bawahans()
    {
        return $this->hasMany(UserApk::class, 'atasan_id');
    }

    public function permintaans()
    {
        return $this->hasMany(Permintaan::class, 'user_id');
    }

}
