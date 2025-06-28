<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('aanwijzings', function (Blueprint $table) {
            // Hapus foreign key dulu
            $table->dropForeign(['proyek_id']);
            // Jika mau, bisa sekalian drop kolomnya juga:
            // $table->dropColumn('proyek_id');
        });

        // Setelah itu, baru drop table proyeks
        Schema::dropIfExists('proyeks');
    }

    public function down(): void
    {
        Schema::create('proyeks', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->timestamps();
        });

        Schema::table('aanwijzings', function (Blueprint $table) {
            $table->foreignId('proyek_id')->nullable()->constrained('proyeks')->onDelete('cascade');
        });
    }
};

