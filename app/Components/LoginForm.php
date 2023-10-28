<?php namespace App\Components;

use Streams\Ui\Components\Form;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class LoginForm extends Form
{
    public function login()
    {
        if (!Auth::attempt([
            'email' => Request::get('email'),
            'password' => Request::get('password'),
        ])) {
            return Redirect::back()->with('error', 'Invalid credentials.');
        }

        return Redirect::intended('admin');
    }
}
