<?php

namespace App\Http\Pages;

use Streams\Ui\Pages\Page;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Request;
use Streams\Ui\Notifications\Notification;

class VerifyEmail extends Page
{
    protected static bool $registerNavigation = false;

    protected static string $view = 'verify-email';

    public function mount()
    {
        $user = Auth::user();

        if ($user && $user->email_verified_at) {
            $this->redirect(RouteServiceProvider::HOME);
        }

        if (Request::get('status') == 'sent') {
            Notification::make('Email verification sent!')
                ->duration(5)
                ->success()
                ->send();
        }
    }
}
