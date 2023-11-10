<?php

namespace App\Components\Admin;

use Streams\Ui\Pages\Page;

class Dashboard extends Page
{
    protected static ?string $slug = '/';
    
    protected static string $view = 'admin.dashboard';
}
