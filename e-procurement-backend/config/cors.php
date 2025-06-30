<?php

return [

    'paths' => [
        'api/*',
        'admin/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:4200',   // untuk web Angular
        'http://localhost:50892',  // untuk Ionic APK
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // penting kalau pakai cookies / withCredentials
];
