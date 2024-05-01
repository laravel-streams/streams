<?php

namespace App\Http\Pages;

use Streams\Ui\Pages\Page;
use Illuminate\Support\Facades\Password;
use Streams\Ui\Notifications\Notification;

class ForgotPassword extends Page
{
    protected static bool $registerNavigation = false;

    protected static string $view = 'forgot-password';

    protected static ?string $routeName = 'password.reset';

    protected static string | array $withoutMiddleware = [
        'auth',
    ];

    public ?string $sent = null;

    public function send(): void
    {
        $rules = ['data.email' => 'required|email'];

        $validData = $this->validate($rules)['data'];

        $status = Password::sendResetLink($validData);

        if ($status === Password::RESET_LINK_SENT) {
            $this->sent = $this->data['email'];
        } else {
            Notification::make(__($status))->danger()->send();
        }
    }
}
