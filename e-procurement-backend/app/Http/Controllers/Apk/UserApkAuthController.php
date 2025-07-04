<?php

namespace App\Http\Controllers\Apk;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\UserApk;

class UserApkAuthController extends Controller
{
    /**
     * 🔐 Login user APK (pengaju / atasan)
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = UserApk::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        $token = $user->createToken('apk_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user
        ]);
    }

    /**
     * 👤 Ambil data user yang sedang login
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * 🚪 Logout dan hapus token aktif
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil']);
    }

    /**
     * 📧 Kirim token reset password ke email user
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:usersapk,email'
        ]);

        $user = UserApk::where('email', $request->email)->first();
        $token = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token'      => $token,
                'created_at' => Carbon::now()
            ]
        );

        // Kirim email - via log jika MAIL_MAILER=log
        Mail::raw("Token reset password Anda: $token", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Reset Password E-Procurement');
        });

        return response()->json([
            'message' => 'Token reset telah dikirim ke email Anda.'
        ]);
    }

    /**
     * 🔁 Reset password menggunakan token
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'                 => 'required|email|exists:usersapk,email',
            'token'                 => 'required',
            'password'              => 'required|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['message' => 'Token tidak valid atau sudah kedaluwarsa.'], 400);
        }

        UserApk::where('email', $request->email)->update([
            'password' => bcrypt($request->password)
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password berhasil direset. Silakan login ulang.']);
    }
}