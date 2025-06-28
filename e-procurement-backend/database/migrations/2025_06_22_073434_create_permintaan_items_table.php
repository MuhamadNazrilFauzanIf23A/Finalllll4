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
       Schema::create('permintaan_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('permintaan_id')->constrained()->onDelete('cascade');
    $table->string('nama');
    $table->text('spesifikasi')->nullable();
    $table->integer('kuantitas');
    $table->string('satuan');
    $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_items');
    }
};
