<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('penawarans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            $table->unsignedBigInteger('pengadaan_id');
            $table->string('file_url')->nullable();
            $table->double('harga_penawaran')->nullable();
            $table->enum('status', ['Evaluasi', 'Lolos', 'Gugur', 'Selesai'])->default('Evaluasi');
            $table->boolean('verifikasi')->default(false);
            $table->timestamps();

            // Foreign key relations
            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
            $table->foreign('pengadaan_id')->references('id')->on('pengadaans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penawarans');
    }
};
