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

use Anomaly\Streams\Platform\Ui\Table\TableBuilder;

Route::view('/', 'welcome');

Route::any('/test', function () {

    $table = (new TableBuilder([
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
            'edit',
        ],
    ]));

    return $table->response();

    $stream = app('streams::plants');

    return View::parse('
    <ul>
        @foreach($stream->repository()->all() as $entry)
        <li><a href="/garden/{{ $entry->id }}">{{ $entry->name }} <small>({{ $entry->life_cycle }})</small></a></li>
        @endforeach
    </ul>
    ', compact('stream'));
});

Route::get('/garden', function () {

    $stream = app('streams::plants');

    return View::parse('
    <ul>
        @foreach($stream->repository()->all() as $entry)
        <li><a href="/garden/{{ $entry->id }}">{{ $entry->name }} <small>({{ $entry->life_cycle }})</small></a></li>
        @endforeach
    </ul>
    ', compact('stream'));
});
