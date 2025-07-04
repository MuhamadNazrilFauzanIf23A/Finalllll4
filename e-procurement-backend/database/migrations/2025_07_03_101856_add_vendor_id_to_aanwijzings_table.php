<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVendorIdToAanwijzingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('aanwijzings', function (Blueprint $table) {
            // Menambahkan kolom vendor_id
            $table->unsignedBigInteger('vendor_id')->nullable();

            // Menambahkan foreign key constraint
            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('aanwijzings', function (Blueprint $table) {
            // Menghapus kolom dan foreign key jika migration di rollback
            $table->dropForeign(['vendor_id']);
            $table->dropColumn('vendor_id');
        });
    }
}
