<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Ubah kolom status menjadi enum yang benar
        DB::statement("ALTER TABLE pengadaans MODIFY status ENUM('draft', 'published') NOT NULL DEFAULT 'draft'");
    }

    public function down(): void
    {
        // Kalau sebelumnya pernah pakai 'publish' tanpa -ed, bisa rollback ke situ
        DB::statement("ALTER TABLE pengadaans MODIFY status ENUM('draft', 'publish') NOT NULL DEFAULT 'draft'");
    }
};
