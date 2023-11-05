<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {

    if (auth()->check()) {
        return redirect('admin');
    }

    return view('login');
})->name('login');

Route::get('/logout', function () {

    auth()->logout();
    cookie()->queue('admin', null, -1);

    return redirect('/');
})->name('logout');
