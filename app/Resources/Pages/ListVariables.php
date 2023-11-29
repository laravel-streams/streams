<?php

namespace App\Resources\Pages;

use App\Resources\Variables;
use Streams\Ui\Pages\ListEntries;

class ListVariables extends ListEntries
{
    protected static string $resource = Variables::class;
}
