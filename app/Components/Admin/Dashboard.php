<?php

namespace App\Components\Admin;

use Streams\Ui\Pages\Page;

class Dashboard extends Page
{
    protected static ?string $slug = '/';
    
    protected static string $view = 'admin.dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-bar';

    protected static ?int $navigationSort = -1;
}
