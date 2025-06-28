<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusahaan');
            $table->string('kategori');
            $table->string('email')->unique();
            $table->string('telepon');
            $table->text('alamat');
            $table->string('penanggung_jawab');
            $table->year('tahun_berdiri')->nullable();
            $table->string('website')->nullable();
            $table->string('dokumen_legalitas')->nullable(); // file path
            $table->string('password'); // hashed password
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
