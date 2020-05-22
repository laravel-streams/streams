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
use Anomaly\Streams\Platform\Ui\Form\FormBuilder;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;

Route::view('/', 'welcome');

Route::any('/test', function () {

    $form = (new FormBuilder([
        'stream' => 'plants',
    ]));

    return $form->json();

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
