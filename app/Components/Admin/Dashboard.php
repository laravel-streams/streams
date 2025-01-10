<?php

namespace App\Components\Admin;

use Streams\Ui\Pages\PanelPage;

class Dashboard extends PanelPage
{
    public int $count = 0;

    public function increment()
    {
        $this->count++;
    }

    public function decrement()
    {
        $this->count--;
    }

    public function zero()
    {
        $this->count = 0;
    }

    protected static ?string $slug = '/';

    protected static string $view = 'admin.dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-bar';

    protected static ?int $navigationSort = -1;
}
