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
    Schema::table('permintaans', function (Blueprint $table) {
        $table->unsignedBigInteger('atasan_id')->nullable()->after('user_id');
        $table->foreign('atasan_id')->references('id')->on('users')->onDelete('set null');
    });
}

public function down()
{
    Schema::table('permintaans', function (Blueprint $table) {
        $table->dropColumn('atasan_id');
    });
}

};
