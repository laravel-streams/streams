<?php

namespace App\Providers;

use Livewire\Livewire;
use Streams\Ui\Components\Panel;
use Streams\Ui\Support\Facades\UI;
use App\Components\Admin\AdminTest;
use Illuminate\Support\ServiceProvider;
use App\Components\Admin\AdminDashboard;
use Streams\Ui\Components\NavigationItem;

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
            Panel::make([
                'name' => 'admin',
                'path' => 'admin',
                'layout' => 'ui::layouts.panel',
            ])
                ->default()
                ->components([
                    AdminDashboard::class,
                    AdminTest::class,
                ])
                ->navigationItems([
                    NavigationItem::make([
                        'name' => 'dashboard',
                        'text' => 'Dashboard',
                        'url' => '/admin',
                        // 'icon' => 'fas fa-tachometer-alt',
                    ]),
                    NavigationItem::make([
                        'name' => 'test',
                        'text' => 'Test',
                        'url' => '/admin/test',
                        // 'icon' => 'fas fa-tachometer-alt',
                    ]),
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
