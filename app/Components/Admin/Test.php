<?php

namespace App\Components\Admin;

use Streams\Ui\Pages\Page;

class Test extends Page
{
    protected static ?string $title = 'Testing';

    protected static string $view = 'admin.test';

    protected static ?string $slug = 'test-page';
}
