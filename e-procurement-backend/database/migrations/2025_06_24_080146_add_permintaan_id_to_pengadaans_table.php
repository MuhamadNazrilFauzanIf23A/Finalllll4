<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengadaans', function (Blueprint $table) {
            $table->unsignedBigInteger('permintaan_id')->after('id');

            $table->foreign('permintaan_id')
                ->references('id')
                ->on('permintaans')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('pengadaans', function (Blueprint $table) {
            $table->dropForeign(['permintaan_id']);
            $table->dropColumn('permintaan_id');
        });
    }
};
