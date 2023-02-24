<?php

use Illuminate\Support\Facades\Auth;
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

    if (Auth::check()) {
        return redirect('cp');
    }

    return view('login');
})->name('login');

Route::get('/logout', function () {
    
    Auth::logout();

    return redirect('/');
})->name('logout');
