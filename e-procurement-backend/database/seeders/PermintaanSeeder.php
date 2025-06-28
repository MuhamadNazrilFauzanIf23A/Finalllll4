<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permintaan;
use App\Models\PermintaanItem;

class PermintaanSeeder extends Seeder
{
    public function run(): void
    {
        // ===== Permintaan 1 =====
        $permintaan1 = Permintaan::create([
            'nama_proyek' => 'Pengadaan Laptop IT',
            'divisi' => 'IT',
            'nominal' => 35000000,
            'status' => 'Disetujui',
            'tanggal_disetujui' => '2025-06-01',
            'alasan' => 'Untuk operasional tim developer'
        ]);

        $permintaan1->items()->createMany([
            [
                'nama' => 'Laptop Lenovo ThinkPad',
                'spesifikasi' => 'Intel i7, 16GB RAM, 512GB SSD',
                'kuantitas' => 10,
                'satuan' => 'Unit'
            ],
            [
                'nama' => 'Mouse Wireless Logitech',
                'spesifikasi' => 'USB Receiver, 2.4GHz',
                'kuantitas' => 10,
                'satuan' => 'Unit'
            ]
        ]);

        // ===== Permintaan 2 =====
        $permintaan2 = Permintaan::create([
            'nama_proyek' => 'Pengadaan Meja Rapat',
            'divisi' => 'General Affairs',
            'nominal' => 15000000,
            'status' => 'Disetujui',
            'tanggal_disetujui' => '2025-06-10',
            'alasan' => 'Untuk ruang meeting baru'
        ]);

        $permintaan2->items()->createMany([
            [
                'nama' => 'Meja Kayu Jati',
                'spesifikasi' => 'Ukuran 3m x 1m',
                'kuantitas' => 2,
                'satuan' => 'Unit'
            ]
        ]);
    }
}

