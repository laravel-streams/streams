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

use Illuminate\Support\Facades\Route;
use Anomaly\Streams\Platform\Support\Facades\Streams;

Route::view('/', 'welcome');

Route::any('validate/{stream}/{entry}', function($stream, $entry) {
    dd(Streams::entries($stream)->find($entry)->validator()->passes());
});

Route::any('ui/{stream}/table', function($stream) {
    
    $stream = Streams::make($stream);

    return $stream
        ->table()
        ->response();
});

Route::any('ui/{stream}/form/{entry?}', function($stream, $entry = null) {
    
    $stream = Streams::make($stream);

    return $stream->form([
        'entry' => $entry,
    ])->response();
});

// Route::any('docs/{handle}', [
//     'stream' => 'docs',
//     'uses' => '\Anomaly\Streams\Platform\Http\Controller\EntryController@view'
// ]);
