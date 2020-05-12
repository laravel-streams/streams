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

Route::view('/', 'welcome');
Route::get('/test', function () {
    dd(app('streams::plants')->repository()->find('hardy-kiwi'));
});
