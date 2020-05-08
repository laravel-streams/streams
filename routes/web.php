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

use Anomaly\Streams\Platform\Entry\FilebaseRepository;
use App\TestModel;

Route::view('/', 'welcome');
Route::get('/test', function () {

    $repository = (new FilebaseRepository((new TestModel)->stream()));

    dd($repository->all());
});
