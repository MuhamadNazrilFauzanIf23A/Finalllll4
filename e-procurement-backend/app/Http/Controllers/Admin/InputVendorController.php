<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InputVendor;

class InputVendorController extends Controller
{
    public function index()
    {
        $vendors = InputVendor::all();
        return response()->json(['data' => $vendors]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'kategori' => 'required|string',
            'email' => 'required|email',
        ]);

        $vendor = InputVendor::create($request->only(['nama', 'kategori', 'email']));
        return response()->json(['message' => 'Vendor berhasil ditambahkan', 'data' => $vendor]);
    }

    public function destroy($id)
    {
        $vendor = InputVendor::findOrFail($id);
        $vendor->delete();
        return response()->json(['message' => 'Vendor berhasil dihapus']);
    }
}

