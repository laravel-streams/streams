<?php

namespace App\Resources\Pages;

use App\Resources\People;
use Streams\Ui\Pages\EditEntry;

class EditPerson extends EditEntry
{
    protected static string $resource = People::class;
}
