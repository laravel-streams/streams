<?php

namespace App\Components\Admin;

use Streams\Ui\Components\Page;

class AdminDashboard extends Page
{
    protected ?string $path = '/';
    protected ?string $name = 'admin';

    protected string $template = 'admin.dashboard';
}
