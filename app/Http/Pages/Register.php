<?php

namespace App\Http\Pages;

use Carbon\Carbon;
use Streams\Ui\Pages\Page;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Streams\Core\Support\Facades\Streams;

class Register extends Page
{
    protected static bool $registerNavigation = false;

    protected static string $view = 'register';

    protected static string | array $withoutMiddleware = [
        'auth',
    ];

    public function mount(): void
    {
        if (auth()->check()) {
            $this->redirect('/pins');
        }
    }

    public function register(): void
    {
        $rules = Streams::make('users')->rules();
        
        unset($rules['id']);

        $rules = array_combine(
            array_map(function($k) { return "data." . $k; }, array_keys($rules)),
            array_values($rules)
        );
        
        $rules = array_filter($rules);
        
        $validData = $this->validate($rules)['data'];

        $user = Streams::entries('users')->create($validData);

        event(new Registered($user));

        Auth::login($user);

        $this->redirect(route('verification.notice'));
    }
}
