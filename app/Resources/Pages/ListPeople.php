<?php

namespace App\Resources\Pages;

use App\Resources\People;
use Streams\Ui\Pages\ListEntries;

class ListPeople extends ListEntries
{
    protected static string $resource = People::class;
}
