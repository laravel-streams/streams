<?php

namespace App\Http\Pages;

use Streams\Ui\Pages\Page;

class Home extends Page
{
    protected static string $layout = 'layouts.app';

    protected static string $view = 'home';

    protected static ?string $slug = '/';
}
