<?php namespace App\Components;

use Streams\Ui\Components\Table;
use Streams\Ui\Components\Table\Column\TextColumn;

class TestTable extends Table
{
    public function getColumns(): array
    {
        return [
            TextColumn::make('id'),
            TextColumn::make('email'),
        ];
    }
}
