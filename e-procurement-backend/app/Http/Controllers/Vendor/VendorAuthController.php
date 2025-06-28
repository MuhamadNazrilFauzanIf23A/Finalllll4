<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class VendorAuthController extends Controller
{
    /**
     * ✅ Register Vendor & langsung login
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_perusahaan'   => 'required|string|max:255',
            'kategori'          => 'required|string',
            'email'             => 'required|email|unique:vendors,email',
            'telepon'           => 'required|string|max:20',
            'alamat'            => 'required|string',
            'penanggung_jawab'  => 'required|string',
            'tahun_berdiri'     => 'nullable|integer|digits:4',
            'website'           => 'nullable|url',
            'password'          => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $vendor = Vendor::create([
            'nama_perusahaan'   => $request->nama_perusahaan,
            'kategori'          => $request->kategori,
            'email'             => $request->email,
            'telepon'           => $request->telepon,
            'alamat'            => $request->alamat,
            'penanggung_jawab'  => $request->penanggung_jawab,
            'tahun_berdiri'     => $request->tahun_berdiri,
            'website'           => $request->website,
            'password'          => Hash::make($request->password),
        ]);

        $token = $vendor->createToken('vendor-token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'token'   => $token,
            'vendor'  => [
                'id'    => $vendor->id,
                'nama'  => $vendor->nama_perusahaan,
                'email' => $vendor->email,
            ]
        ]);
    }

    /**
     * ✅ Login Vendor
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $vendor = Vendor::where('email', $request->email)->first();

        if (!$vendor || !Hash::check($request->password, $vendor->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        $token = $vendor->createToken('vendor-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'vendor' => [
                'id'    => $vendor->id,
                'nama'  => $vendor->nama_perusahaan,
                'email' => $vendor->email,
            ]
        ]);
    }

    /**
     * ✅ Kirim token reset ke email vendor
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $vendor = Vendor::where('email', $request->email)->first();

        if (!$vendor) {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        $token = Str::random(60);
        $vendor->reset_token = $token;
        $vendor->save();

        // Kirim token via email
        Mail::raw("Token reset password Anda: $token", function ($message) use ($vendor) {
            $message->to($vendor->email)
                    ->subject('Reset Password Vendor');
        });

        return response()->json([
            'message' => 'Token reset telah dikirim ke email Anda',
            'token_debug' => $token // development only
        ]);
    }

    /**
     * ✅ Reset password dengan token
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email|exists:vendors,email',
            'token'    => 'required|string',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $vendor = Vendor::where('email', $request->email)->first();

        if (!$vendor) {
            return response()->json(['message' => 'Vendor tidak ditemukan'], 404);
        }

        if ($vendor->reset_token !== $request->token) {
            return response()->json(['message' => 'Token tidak valid atau sudah digunakan'], 400);
        }

        // Hash password baru
        $vendor->password = Hash::make($request->password);
        $vendor->reset_token = null; // Hapus token agar tidak bisa dipakai lagi
        $vendor->save();

        return response()->json(['message' => 'Password berhasil direset']);
    }
}
