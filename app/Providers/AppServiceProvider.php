<?php

namespace App\Providers;

use App\Components\Admin\AdminDashboard;
use Livewire\Livewire;
use Streams\Ui\Components\Page;
use Streams\Ui\Components\Panel;
use Streams\Ui\Support\Facades\UI;
use Illuminate\Support\ServiceProvider;
use Streams\Ui\Components\NavigationGroup;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Livewire::component('login', \App\Components\Login::class);

        UI::panel(Panel::make([
            'name' => 'admin',
            'path' => 'admin',
            'layout' => 'ui::layouts.panel',
            //'template' => 'ui::components.panel',
        ])
            ->default()
            ->components([
                AdminDashboard::class,
            ])
            ->navigationGroups([
                NavigationGroup::make([
                    'label' => 'Streams',
                    'name' => 'streams',
                ])
            ]));
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
