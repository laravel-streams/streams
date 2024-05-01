<?php

namespace App\Http\Pages;

use Streams\Ui\Pages\Page;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;

class Login extends Page
{
    protected static string $layout = 'layouts.app';

    protected static string $view = 'login';

    public function mount(): void
    {
        if (Auth::check()) {
            $this->redirect(RouteServiceProvider::HOME);
        }
    }

    public function login(): void
    {
        $validData = $this->validate([
            'data.email' => 'required|email',
            'data.password' => 'required',
        ])['data'];

        if (Auth::attempt($validData, Arr::get($this->data, 'remember', false))) {
            $this->redirect(RouteServiceProvider::HOME);
        } else {
            $this->addError('login', 'These credentials do not match our records.');
        }
    }
}
