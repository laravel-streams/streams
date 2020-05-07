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
        'dir' => '../addons/laravel-filebase/data/users_example',
    ]);

    // in this example, you would search an exact user name
    // it would technically be stored as user_name.json in the directories
    // if user_name.json doesn't exists get will return new empty Document
    $item = $database->get('ryan_thompson');
    dd($item);
    // display property values
    echo $item->first_name;
    echo $item->last_name;
    echo $item->email;

    // change existing or add new properties
    $item->email = 'example@example.com';
    $item->tags  = ['php', 'developer', 'html5'];

    // need to save? thats easy!
    $item->save();


    // check if a record exists and do something if it does or does not
    if ($database->has('kingslayer')) {
        // do some action
    }

    // Need to find all the users that have a tag for "php" ?
    $users = $database->where('tags', 'IN', 'php')->results();

    // Need to search for all the users who use @yahoo.com email addresses?
    $users = $database->where('email', 'LIKE', '@yahoo.com')->results();
});
