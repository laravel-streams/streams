<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Streams\Core\Support\Facades\Streams;

class LoginForm extends Component
{
    public string $stream = 'users';

    public $email = "ryan@pyrocms.com";
    public $password;

    public function stream()
    {
        return Streams::make($this->stream);
    }

    public function render()
    {
        return view('livewire.login-form');
    }

    public function submit()
    {
        if (!$user = Streams::repository('users')->findBy('email', $this->email)) {
            $this->reset('password');
            return $this->render();
        }

        if (!Hash::check($this->password, $user->password)) {
            $this->reset('password');
            return $this->render();
        }

        return Redirect::to('cp');
    }
}
