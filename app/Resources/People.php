<?php

namespace App\Resources;

use Streams\Ui\Forms\Form;
use Streams\Ui\Tables\Table;
use Streams\Ui\Inputs\DateInput;
use Streams\Ui\Inputs\TextInput;
use Streams\Ui\Forms\Layouts\Grid;
use Streams\Ui\Inputs\SelectInput;
use Streams\Ui\Resources\Resource;
use Streams\Ui\Inputs\MarkdownInput;
use Streams\Ui\Tables\Actions\Action;
use Streams\Core\Support\Facades\Streams;
use Streams\Ui\Forms\Layouts\Tab;
use Streams\Ui\Forms\Layouts\Tabs;
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
        return $form
            ->components([
                Tabs::make('General')
                    ->activeTab(1)
                    ->components([
                        Tab::make('first')
                            ->components([
                                SelectInput::make('gender')
                                    ->options([
                                        'm' => 'Male',
                                        'f' => 'Female',
                                    ]),
                                ]),
                        Tab::make('second')
                            ->components([
                                DateInput::make('birthday')
                                    ->autocomplete(false),
                            ]),
                    ]),
                Grid::make(2)
                    ->components([
                        TextInput::make('name')
                            ->label('Full Name')
                            ->placeholder('John Doe')
                            ->required()
                            ->autofocus(),
                        TextInput::make('age')
                            ->label('Age')
                            ->placeholder('Age')
                            ->integer()
                            ->minValue(18)
                            ->maxValue(100)
                            ->helpText('This is a test.')
                            ->hint('Must be 18 or older.')
                            ->hintIcon('heroicon-o-exclamation-triangle'),
                        MarkdownInput::make('bio')
                            ->label('Biography')
                            ->fullWidth()
                            ->helpText('This is a test.'),
                    ])
            ]);
    }

    static public function table(Table $table)
    {
        return $table
            ->heading('People')
            ->description('This is a test for a table.')
            //->perPage(2)
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
}
