<?php

return [

    /*
    |--------------------------------------------------------------------------
    | System
    |--------------------------------------------------------------------------
    |
    | Register system level configuration.
    |
    */

    'installed' => env('INSTALLED', false),

    /*
    |--------------------------------------------------------------------------
    | View Overrides
    |--------------------------------------------------------------------------
    |
    | Define globally overridden views as 'view' => 'override' view paths.
    |
    */

    'overrides' => [],

    /*
    |--------------------------------------------------------------------------
    | Control Panel Customization
    |--------------------------------------------------------------------------
    |
    | Support for control panel configuration is
    | currently limited to the Streams module.
    |
    */

    'cp' => [

        /**
         * This is the admin segment
         * prefix used for routing.
         */
        'prefix' => 'admin',

        /**
         * Define additional CP middleware.
         */
        'middleware' => [
            'auth',
        ],
    ],

];
