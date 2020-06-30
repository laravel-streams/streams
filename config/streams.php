<?php

return [

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
         * This is the URI  prefix
         * for the control panel.
         */
        'prefix' => env('STREAMS_CP_PREFIX', 'admin'),

        /**
         * Define additional CP middleware.
         */
        'middleware' => [
            //'auth',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Addon Customization
    |--------------------------------------------------------------------------
    |
    | Here you can customize and
    | extend the addon loader.
    |
    */

    'addons' => [

        /**
         * An array of disabled
         * addons by handle.
         */
        'disabled' => [
            //'anomaly.module.users',
        ],
    ],

];
