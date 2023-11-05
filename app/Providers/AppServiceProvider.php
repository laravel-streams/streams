<?php

namespace App\Providers;

use App\Components\AdminDashboard;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use Streams\Ui\Components\NavigationGroup;
use Streams\Ui\Components\Page;
use Streams\Ui\Components\Panel;
use Streams\Ui\Support\Facades\UI;

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
                AdminDashboard::make([
                    'name' => 'index',
                    'path' => '/',
                ]),
                Page::make([
                    'name' => 'test',
                    'template' => 'ui::components.page',
                ])
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
