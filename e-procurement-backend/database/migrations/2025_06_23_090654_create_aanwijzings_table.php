<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('aanwijzings', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('proyek_id');
        $table->dateTime('tanggal');
        $table->string('dokumen_url')->nullable();
        $table->string('status')->default('Dijadwalkan');
        $table->timestamps();

        $table->foreign('proyek_id')->references('id')->on('proyeks')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aanwijzings');
    }
};
