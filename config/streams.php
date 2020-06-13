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
         * This is the admin segment
         * prefix used for routing.
         */
        'prefix' => env('STREAMS_CP_PREFIX', 'admin'),

        /**
         * Define additional CP middleware.
         */
        'middleware' => [
            //'auth',
        ],
    ],

];
