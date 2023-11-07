<?php

namespace App\Components\Admin;

use Streams\Ui\Components\Page;

class AdminTest extends Page
{
    protected ?string $path = '/test';
    protected ?string $name = 'test';

    protected string $template = 'admin.test';
}
