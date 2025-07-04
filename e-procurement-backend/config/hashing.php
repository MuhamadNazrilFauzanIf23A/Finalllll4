<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | Laravel supports several hash drivers for your application. By default,
    | Laravel uses the bcrypt hashing algorithm, but you may change this 
    | to "argon" or any other supported driver as needed.
    |
    */

    'driver' => env('HASH_DRIVER', 'bcrypt'),

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may configure the options used by the Bcrypt hashing algorithm.
    | You may change the cost factor if necessary, but the default should
    | work for most applications.
    |
    */

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may configure the options used by the Argon hashing algorithm.
    | You may adjust the time cost and memory cost as necessary for your app.
    |
    */

    'argon' => [
        'memory' => 1024,
        'threads' => 2,
        'time' => 2,
    ],

];
