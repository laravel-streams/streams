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

    $database = new \Filebase\Database([
        'dir' => __DIR__ . '/../addons/laravel-filebase/data/users_example',
    ]);

    // in this example, you would search an exact user name
    // it would technically be stored as user_name.json in the directories
    // if user_name.json doesn't exists get will return new empty Document
    $item = $database->get('ryan_thompson');

    // display property values
    echo $item->name . '<br>';
    echo $item->email;

    // need to save? thats easy!
    //$item->save();

    dd($database->where('email', 'LIKE', '@pyrocms.com')->results());
});
