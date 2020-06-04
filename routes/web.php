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

use Anomaly\Streams\Platform\Ui\Form\FormBuilder;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;

Route::view('/', 'welcome');

Route::any('/test', function () {

    $builder = (new TableBuilder([
        'stream' => 'plants',
        'columns' => [
            'name',
        ],
        'buttons' => [
            'view',
        ],
    ]));

    return $builder->response();
});

Route::get('/garden', function () {

    return (new TableBuilder([
        'stream' => 'plants',
        'filters' => [
            'name',
            'type',
        ],
        'columns' => [
            'name',
            'type',
        ],
        'buttons' => [
            'edit' => [
                'href' => 'garden/edit/{entry.id}'
            ],
            'view' => [
                'href' => 'garden/{entry.id}'
            ],
        ],
    ]))->response();
});

Route::get('/garden/edit/{id}', function ($id) {
    return (new FormBuilder([
        'stream' => 'plants',
        'entry' => $id,
    ]))->response();
});
