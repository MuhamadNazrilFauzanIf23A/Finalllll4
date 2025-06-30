<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('permintaans', function (Blueprint $table) {
            // pastikan FK belum ada sebelumnya
            $table->foreign('user_id')
                ->references('id')
                ->on('usersapk')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('permintaans', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
};
