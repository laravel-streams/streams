<?php

namespace App\Resources\Pages;

use App\Resources\People;
use Streams\Ui\Pages\CreateEntry;

class CreatePerson extends CreateEntry
{
    protected static string $resource = People::class;
}
