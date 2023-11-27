<?php

namespace App\Livewire;

use Livewire\Component;
use Streams\Ui\Tables\Table;
use Streams\Ui\Tables\Actions\Action;
use Streams\Ui\Tables\Concerns\HasTable;
use Streams\Ui\Tables\Columns\TextColumn;
use Streams\Core\Support\Facades\Streams;
use Streams\Ui\Tables\Columns\IconColumn;

class TestTable extends Component
{
    use HasTable;

    public function table(Table $table)
    {
        return $table
            ->heading('People')
            ->description('This is a test for a table.')
            ->query(fn () => Streams::entries('people'))
            ->columns([
                TextColumn::make('name')
                    ->label('Full Name')
                    ->sortable(),
                TextColumn::make('age')
                    ->sortable(),
                IconColumn::make('gender')
                    ->icon(fn (string $value): string => match ($value) {
                        'm' => 'heroicon-o-male',
                        'f' => 'heroicon-o-female',
                    }),
            ])
            ->actions([
                Action::make('edit')
                    ->icon('heroicon-o-pencil')
                    ->url(fn ($entry) => url("/admin/people/edit/{$entry->id}")),
            ]);
    }

    public function render()
    {
        return view('livewire.test-table');
    }
}
