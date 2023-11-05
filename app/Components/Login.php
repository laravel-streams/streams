<?php

namespace App\Components;

use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Redirect;

class Login extends Component
{
    public string $email = '';
    public string $password = '';

    public bool $remember = false;

    public string $error = '';

    public string $redirect = '/';

    public function render()
    {
        return <<<'blade'
            <form wire:submit.prevent="login">
                <div>
                    <label for="email">Email</label>
                    <input wire:model="email" type="email" id="email">
                </div>

                <div>
                    <label for="password">Password</label>
                    <input wire:model="password" type="password" id="password">
                </div>

                <div>
                    <label for="remember">Remember Me</label>
                    <input wire:model="remember" type="checkbox" id="remember">
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>

                <div>
                    @if ($error)
                        <div>{{ $error }}</div>
                    @endif
                </div>
            </form>
        blade;
    }

    public function login()
    {
        // if (Auth::attempt([
        //     'email' => $this->email,
        //     'password' => $this->password,
        // ])) {
        //     return Redirect::intended($this->redirect);
        // }

        if (
            $this->email == 'ryan@pyrocms.com'
            && $this->password == 'password'
        ) {

            Cookie::queue('admin', true);

            return Redirect::intended($this->redirect);
        }

        $this->error = 'Invalid credentials.';
    }
}
