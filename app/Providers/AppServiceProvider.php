<?php

namespace App\Providers;

use Streams\Ui\Panels\Panel;
use App\Components\Admin\Test;
use Streams\Ui\Support\Facades\UI;
use App\Components\Admin\Dashboard;
use Illuminate\Support\ServiceProvider;
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
                ->navigationGroups([
                    NavigationGroup::make()
                        ->label('Resources')
                ])
                ->navigationItems([
                    NavigationItem::make()
                        ->label('Dashboard')
                        ->url('/admin')
                        ->icon('heroicon-o-presentation-chart-bar'),
                    NavigationItem::make()
                        ->label('Testing')
                        ->url('/admin/test-page')
                        ->icon('heroicon-o-adjustments-horizontal'),
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
