<?php

namespace App\Http\Pages;

use App\Models\User;
use Streams\Ui\Pages\Page;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Streams\Ui\Notifications\Notification;

class ResetPassword extends Page
{
    protected static string $view = 'reset-password';

    public function mount(): void
    {
        if ($email = Request::get('email')) {
            $this->data['email'] = $email;
        }

        if ($token = Request::get('token')) {
            $this->data['token'] = $token;
        }
    }

    public function resetPassword(): void
    {
        $rules = [
            'data.token' => 'required',
            'data.email' => 'required|email',
            'data.password' => 'required|min:8|confirmed',
        ];

        $validData = $this->validate($rules)['data'];

        $status = Password::reset(
            $validData,
            function (User $user, string $password) {
                
                $user->password = Hash::make($password);
                $user->remember_token = Str::random(60);
     
                $user->save();

                Auth::login($user);
     
                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            Notification::make(__($status))->info()->send();
            $this->redirect(RouteServiceProvider::HOME);
        } else {
            Notification::make(__($status))->danger()->send();
        }
    }
}
