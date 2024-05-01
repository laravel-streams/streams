<?php

namespace App\Http\Pages\Admin;

use Streams\Ui\Pages\PanelPage;

class Dashboard extends PanelPage
{
    protected static ?string $slug = '/';

    protected static string $view = 'admin.dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-bar';

    protected static ?int $navigationSort = -1;
}
