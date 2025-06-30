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
        Schema::create('usersapk', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['pengaju', 'atasan']);
            $table->string('divisi');
            $table->unsignedBigInteger('atasan_id')->nullable();
            $table->string('reset_token')->nullable();
            $table->timestamps();

            $table->foreign('atasan_id')->references('id')->on('usersapk')->onDelete('set null');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usersapk');
    }
};
