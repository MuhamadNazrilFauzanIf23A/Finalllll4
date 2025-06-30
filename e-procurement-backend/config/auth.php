<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Authentication Settings
    |--------------------------------------------------------------------------
    */

    'defaults' => [
        'guard' => 'admin', // default guard misal untuk backend Laravel (admin)
        'passwords' => 'admins',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],

        // 🔐 Guard untuk admin (web/admin panel)
        'admin' => [
            'driver' => 'sanctum',
            'provider' => 'admins',
        ],

        // 🔐 Guard untuk vendor publik
        'vendor' => [
            'driver' => 'sanctum',
            'provider' => 'vendors',
        ],

        // 🔐 Guard untuk APK (pengaju/atasan)
        'apk' => [
            'driver' => 'sanctum',
            'provider' => 'usersapk',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    */

    'providers' => [
        // 👤 Admin (purchasing/internal)
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],

        // 👤 Vendor eksternal
        'vendors' => [
            'driver' => 'eloquent',
            'model' => App\Models\Vendor::class,
        ],

        // 👤 Pengaju dan Atasan (APK Mobile)
        'usersapk' => [
            'driver' => 'eloquent',
            'model' => App\Models\UserApk::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Reset Settings
    |--------------------------------------------------------------------------
    */

    'passwords' => [
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'vendors' => [
            'provider' => 'vendors',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'usersapk' => [
            'provider' => 'usersapk',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    */

    'password_timeout' => 10800,

];
