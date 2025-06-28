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
       Schema::create('permintaans', function (Blueprint $table) {
    $table->id();
    $table->string('nama_proyek');
    $table->string('divisi');
    $table->double('nominal');
    $table->string('status');
    $table->date('tanggal_disetujui')->nullable();
    $table->text('alasan')->nullable();
    $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaans');
    }
};
