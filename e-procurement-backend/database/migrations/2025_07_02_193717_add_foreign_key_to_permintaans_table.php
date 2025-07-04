<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToPermintaansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Tambahkan foreign key ke 'atasan_id' yang mengarah ke 'usersapk(id)'
        Schema::table('permintaans', function (Blueprint $table) {
            $table->foreign('atasan_id')->references('id')->on('usersapk')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Hapus foreign key jika rollback
        Schema::table('permintaans', function (Blueprint $table) {
            $table->dropForeign(['atasan_id']);
        });
    }
}
