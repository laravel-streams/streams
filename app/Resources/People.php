<?php

namespace App\Resources;

use Streams\Ui\Forms\Form;
use Streams\Ui\Tables\Table;
use Streams\Ui\Resources\Resource;
use Streams\Ui\Tables\Actions\Action;
use Streams\Core\Support\Facades\Streams;
use Streams\Ui\Tables\Columns\IconColumn;
use Streams\Ui\Tables\Columns\TextColumn;

class People extends Resource
{
    protected static ?string $slug = 'people';

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?int $navigationSort = 3;

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPeople::route('/'),
            'edit' => Pages\EditPerson::route('/edit/{id}'),
            // CreatePerson::class,
            // EditPerson::class,
        ];
    }

    static public function form(Form $form)
    {
        return $form;
    }

    static public function table(Table $table)
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
                    ->url(fn ($record) => url("/admin/people/edit/{$record->id}")),
            ]);
    }
}
