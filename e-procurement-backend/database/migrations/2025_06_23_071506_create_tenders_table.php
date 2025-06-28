<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('pengadaan_id')->constrained()->onDelete('cascade');
    $table->date('tanggal_mulai');
    $table->date('tanggal_berakhir');
    $table->string('dokumen_persyaratan')->nullable(); // PDF path
    $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenders');
    }
};
