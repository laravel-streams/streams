<?php

namespace App\Providers;

use Livewire\Livewire;
use Streams\Ui\Panels\Panel;
use Streams\Ui\Menu\MenuItem;
use Streams\Ui\Support\Facades\UI;
use App\Http\Pages\Admin\Dashboard;
use App\Http\Middleware\VerifyEmail;
use Illuminate\Support\Facades\View;
use Streams\Ui\Support\Facades\Colors;
use Illuminate\Support\ServiceProvider;
use Streams\Ui\Navigation\NavigationItem;
use Streams\Ui\Navigation\NavigationGroup;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Livewire::component('login', \App\Http\Pages\Login::class);
        Livewire::component('register', \App\Http\Pages\Register::class);
        Livewire::component('email.verify', \App\Http\Pages\VerifyEmail::class);
        Livewire::component('password.reset', \App\Http\Pages\ResetPassword::class);
        Livewire::component('password.forgot', \App\Http\Pages\ForgotPassword::class);
        
        foreach (Colors::getColors() as $name => $shades) {
            foreach ($shades as $shade => $color) {
                $variables["{$name}-{$shade}"] = $color;
            }
        }

        View::share('cssVariables', $variables);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        UI::panel(
            Panel::make()
                ->id('admin')
                ->path('admin')
                ->default()
                ->pages([
                    Dashboard::class,
                ])
                ->userMenuItems([
                    MenuItem::make()
                        ->label('View Website')
                        ->url('/', true)
                        ->icon('heroicon-o-eye'),
                    MenuItem::make()
                        ->label('Logout')
                        ->url('/logout')
                        ->icon('heroicon-o-arrow-left-on-rectangle'),
                ])
                ->navigationGroups([
                    NavigationGroup::make()
                        ->label('Resources')
                ])
                ->navigationItems([
                    NavigationItem::make()
                        ->label('Documentation')
                        ->group('Resources')
                        ->url('https://streams.dev/docs')
                        ->openInNewTab(true)
                        ->icon('heroicon-o-book-open'),
                    NavigationItem::make()
                        ->label('Repository')
                        ->group('Resources')
                        ->url('https://github.com/laravel-streams/streams')
                        ->openInNewTab(true)
                        ->icon('heroicon-o-code-bracket'),
                ])
                ->middleware([
                    'web',
                    'auth',
                    VerifyEmail::class,
                ])
        );
    }
}
