<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('aanwijzings', function (Blueprint $table) {
            $table->unsignedBigInteger('pengadaan_id')->after('id');
            $table->foreign('pengadaan_id')->references('id')->on('pengadaans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('aanwijzings', function (Blueprint $table) {
            $table->dropForeign(['pengadaan_id']);
            $table->dropColumn('pengadaan_id');
        });
    }
};

