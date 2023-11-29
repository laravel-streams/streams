<?php

namespace App\Resources;

use Streams\Ui\Forms\Form;
use Streams\Ui\Tables\Table;
use Streams\Ui\Inputs\DateInput;
use Streams\Ui\Inputs\TextInput;
use Streams\Ui\Inputs\SelectInput;
use Streams\Ui\Resources\Resource;
use Streams\Ui\Tables\Actions\Action;
use Streams\Core\Support\Facades\Streams;
use Streams\Ui\Forms\Layouts\Fieldset;
use Streams\Ui\Forms\Layouts\Grid;
use Streams\Ui\Forms\Layouts\Section;
use Streams\Ui\Inputs\ToggleInput;
use Streams\Ui\Inputs\ColorInput;
use Streams\Ui\Inputs\TextareaInput;
use Streams\Ui\Tables\Columns\IconColumn;
use Streams\Ui\Tables\Columns\TextColumn;

class Variables extends Resource
{
    protected static ?string $navigationIcon = 'heroicon-o-adjustments-horizontal';

    protected static ?int $navigationSort = 3;

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVariables::route('/'),
            'edit' => Pages\EditVariables::route('/edit/{id}'),
            // CreatePerson::class,
            // EditPerson::class,
        ];
    }

    static public function form(Form $form)
    {
        return $form
            ->components([
                Grid::make([
                    'default' => 1,
                    'sm' => 2,
                    'md' => 3,
                    'lg' => 4,
                    'xl' => 6,
                    '2xl' => 8,
                ])
                    ->components([
                        TextInput::make('first_name')
                            ->placeholder('First Name')
                            ->label('Last Name')
                            ->required(),
                        TextInput::make('last_name')
                            ->placeholder('Last Name')
                            ->label('Last Name')
                            ->columnSpan([
                                'default' => 2,
                                'md' => 2,
                                'lg' => 2,
                                'xl' => 2,
                                '2xl' => 2,
                            ])
                            ->required(),
                    ])
            ]);
    }

    static public function table(Table $table)
    {
        return $table
            //->perPage(2)
            ->query(fn () => Streams::entries('variables'))
            ->columns([
                TextColumn::make('id'),
            ])
            ->actions([
                Action::make('edit')
                    ->icon('heroicon-o-pencil')
                    ->url(fn ($entry) => url("/admin/variables/edit/{$entry->id}")),
            ]);
    }
}
