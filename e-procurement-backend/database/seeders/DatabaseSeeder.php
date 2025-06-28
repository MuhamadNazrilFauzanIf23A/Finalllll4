<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   public function run(): void
{
    // Cek user berdasarkan email
    $user = User::where('email', 'test@example.com')->first();

    if (!$user) {
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);
    }

    $this->call(PermintaanSeeder::class);
}
}
