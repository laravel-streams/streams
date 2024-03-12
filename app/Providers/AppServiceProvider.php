<?php

namespace App\Providers;

use App\Resources\People;
use Streams\Ui\Panels\Panel;
use Streams\Ui\Menu\MenuItem;
use App\Resources\Variables;
use Streams\Ui\Support\Facades\UI;
use App\Components\Admin\Dashboard;
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
        //
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
                ->resources([
                    People::class,
                    Variables::class,
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
                ->middleware([
                    'web',
                    //'auth',
                ])
        );
    }
}
