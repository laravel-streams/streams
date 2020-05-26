<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

use Illuminate\Support\Facades\View;
use Anomaly\Streams\Platform\Ui\Grid\GridBuilder;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;

Route::view('/', 'welcome');

Route::any('/test', function () {

    $grid = (new GridBuilder([
        'stream' => 'plants',
    ]));

    return $grid->response();
});

Route::get('/garden', function () {

    return (new TableBuilder([
        'stream' => 'plants',
        'columns' => [
            'name'
        ],
    ]))->response();
});
