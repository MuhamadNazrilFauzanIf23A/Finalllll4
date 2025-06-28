<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('penawaran_id');
            $table->decimal('nilai', 15, 2);
            $table->date('tanggal')->nullable();
            $table->string('status')->default('Diterbitkan');
            $table->string('file_url')->nullable();
            $table->timestamps();

            // Foreign key
            $table->foreign('penawaran_id')->references('id')->on('penawarans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
