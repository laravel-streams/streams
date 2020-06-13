<?php

/*
|--------------------------------------------------------------------------
| CP Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Finder\SplFileInfo;
use Anomaly\Streams\Platform\Ui\Form\FormBuilder;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;
use Anomaly\Streams\Platform\Streams\Facades\Streams;

Route::any('/', function () {

    $table = (new TableBuilder([
        'columns' => [
            'entry.name',
        ],
        'buttons' => [
            'entries' => [
                'href' => 'admin/{entry.slug}',
            ],
        ],
    ]));

    $table->on('build', function($workflow) use ($table) {

        $workflow->on('before_query_entries', function() use ($table) {

            array_map(function(SplFileInfo $item) use ($table) {
                $table->instance->entries->push([
                    'name' => Streams::try($item->getBasename('.json'), function($stream) {
                        return $stream->name;
                    }) ?? ucwords(Str::humanize($item->getBasename('.json'), '-')),
                    'slug' => $item->getBasename('.json'),
                ]);
            }, File::files(base_path('streams')));
        });
    });

    return $table->response();
});

Route::any('/{stream}', function ($stream) {

    $table = (new TableBuilder([
        'stream' => $stream,
        'columns' => Streams::make($stream)->fields->keys()->all(),
        'buttons' => [
            'edit' => [
                'href' => 'admin/{request.segments.1}/{entry.id}',
            ],
        ],
    ]));

    return $table->response();
});

Route::any('/{stream}/{id}', function ($stream, $id) {

    $form = (new FormBuilder([
        'stream' => $stream,
        'entry' => $id,
    ]));

    return $form->response();
});
