<?php

namespace App\Http\Controllers;

use App\Models\Permintaan;
use Illuminate\Http\Request;

class PermintaanController extends Controller
{
    // GET /api/admin/permintaan

    public function index()
    {
        return Permintaan::with('items')->get();
    }

    // GET /api/admin/permintaan/{id}
    public function show($id)
    {
        return Permintaan::with('items')->findOrFail($id);
    }
}


