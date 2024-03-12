<?php namespace App\Components;

use Streams\Ui\Components\Form;
use Streams\Ui\Components\Button;

class TestForm extends Form
{
    public function getButtons(): array
    {
        return [
            Button::make([
                'text' => 'Save',
            ]),
        ];
    }
}
