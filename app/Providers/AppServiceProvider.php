<?php

namespace App\Providers;

use Streams\Ui\Panels\Panel;
use App\Components\Admin\Test;
use Streams\Ui\Support\Facades\UI;
use App\Components\Admin\Dashboard;
use Illuminate\Support\ServiceProvider;
use Streams\Ui\Menu\MenuItem;
use Streams\Ui\Navigation\NavigationGroup;
use Streams\Ui\Navigation\NavigationItem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        UI::panel(
            Panel::make()
                ->id('admin')
                ->path('admin')
                ->default()
                ->pages([
                    Dashboard::class,
                    Test::class,
                ])
                ->userMenuItems([
                    MenuItem::make()
                        ->label('View Website')
                        ->url('/', true)
                        ->icon('heroicon-o-eye'),
                    MenuItem::make()
                        ->label('Logout')
                        ->url('/admin/logout')
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
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
