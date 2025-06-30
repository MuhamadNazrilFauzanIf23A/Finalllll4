<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('permintaans', function (Blueprint $table) {
            $table->text('spesifikasi')->nullable()->after('nominal');
            $table->integer('kuantitas')->nullable()->after('spesifikasi');
            $table->string('file_pdf')->nullable()->after('alasan'); // path file pdf, disimpan sebagai string
        });
    }

    public function down(): void
    {
        Schema::table('permintaans', function (Blueprint $table) {
            $table->dropColumn(['spesifikasi', 'kuantitas', 'file_pdf']);
        });
    }
};

