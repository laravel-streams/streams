<?php

return [

    'admin' => [
        'prefix' => 'admin',
        'enabled' => env('STREAMS_ADMIN_ENABLED', true),
        'default' => \Streams\Ui\Components\Admin\AdminDashboard::class,
        'navigation' => [
            [
                'text' => 'Dashboard',
                'url' => '/admin',
                'sort_order' => 0,
                'component' => 'anchor',
            ],
        ],
        'buttons' => [],
        'menu' => [],
        'middleware' => explode('|', env('STREAMS_ADMIN_MIDDLEWARE', 'web|auth')),
    ],

    /**
     * Registered components.
     * 
     * @livewire($name, $class)
     */
    'components' => [
        'alerts' => \Streams\Ui\Components\Alerts::class,

        'form' => \Streams\Ui\Components\Form::class,
        'field' => \Streams\Ui\Components\Field::class,

        'table' => \Streams\Ui\Components\Table::class,
        'table.row' => \Streams\Ui\Components\Table\TableRow::class,
        //'table.views' => \Streams\Ui\Components\Table\TableViews::class,
        'table.header' => \Streams\Ui\Components\Table\TableHeader::class,
        'table.column' => \Streams\Ui\Components\Table\TableColumn::class,
        'table.filter' => \Streams\Ui\Components\Table\TableFilter::class,

        'tabs' => \Streams\Ui\Components\Tabs::class,

        'menu' => \Streams\Ui\Components\Menu::class,
        // 'menu.item' => \Streams\Ui\Components\Menu\MenuItem::class,

        'navigation' => \Streams\Ui\Components\Navigation::class,
        // 'navigation.item' => \Streams\Ui\Components\Navigation\NavigationItem::class,

        'content' => \Streams\Ui\Components\Content::class,
        
        'collapsable' => \Streams\Ui\Components\Collapsable::class,

        'avatar' => \Streams\Ui\Components\Avatar::class,
        'anchor' => \Streams\Ui\Components\Anchor::class,
        'button' => \Streams\Ui\Components\Button::class,
        'indicator' => \Streams\Ui\Components\Indicator::class,
        'breadcrumbs' => \Streams\Ui\Components\Breadcrumbs::class,

        'dropdown' => \Streams\Ui\Components\Dropdown::class,
        //'dropdown.item' => \Streams\Ui\Components\Dropdown\DropdownItem::class,

        'drawer' => \Streams\Ui\Components\Drawer::class,
        'modal' => \Streams\Ui\Components\Modal::class,
        //'modal.header' => \Streams\Ui\Components\Modal\ModalHeader::class,
        //'modal.content' => \Streams\Ui\Components\Modal\ModalContent::class,
        //'modal.footer' => \Streams\Ui\Components\Modal\ModalFooter::class,


        /**
         * Inputs are matched to
         * one or more field types.
         */
        'slug' => \Streams\Ui\Components\Inputs\SlugInput::class,

        'editor' => \Streams\Ui\Components\Inputs\EditorInput::class,
        'object' => \Streams\Ui\Components\Inputs\EditorInput::class,
        'markdown' => \Streams\Ui\Components\Inputs\MarkdownInput::class,
        // 'checkboxes' => \Streams\Ui\Components\Inputs\Checkboxes::class,
        // 'relationship' => \Streams\Ui\Components\Inputs\Relationship::class,

        'range' => \Streams\Ui\Components\Inputs\RangeInput::class,

        'number' => \Streams\Ui\Components\Inputs\NumberInput::class,
        'decimal' => \Streams\Ui\Components\Inputs\DecimalInput::class,
        'integer' => \Streams\Ui\Components\Inputs\IntegerInput::class,

        'select' => \Streams\Ui\Components\Inputs\SelectInput::class,

        'input' => \Streams\Ui\Components\Inputs\BasicInput::class,

        'tags' => \Streams\Ui\Components\Inputs\TagsInput::class,

        'file' => \Streams\Ui\Components\Inputs\FileInput::class,

        'toggle' => \Streams\Ui\Components\Inputs\ToggleInput::class,
        'checkbox' => \Streams\Ui\Components\Inputs\CheckboxInput::class,

        'textarea' => \Streams\Ui\Components\Inputs\TextareaInput::class,


        /**
         * Admin Components
         */
        'admin' => \Streams\Ui\Components\Admin\AdminDashboard::class,
        'admin.menu' => \Streams\Ui\Components\Admin\AdminMenu::class,
        'admin.navigation' => \Streams\Ui\Components\Admin\AdminNavigation::class,

        /**
         * Aliases for Field Types
         * 
         * Field types default to setting
         * the input.type = field.type
         */
        'array' => [
            'component' => 'tags',
        ],
        'boolean' => [
            'component' => 'checkbox',
        ],
        'enum' => [
            'component' => 'select',
        ],
        'text' => [
            'component' => 'input',
        ],
        'string' => [
            'component' => 'input',
        ],
        'uuid' => [
            'component' => 'input',
        ],
        'hash' => [
            'component' => 'input',
            'type' => 'password',
        ],
        'url' => [
            'component' => 'input',
            'type' => 'url',
        ],
        'date' => [
            'component' => 'input',
            'type' => 'date',
        ],
        'time' => [
            'component' => 'input',
            'type' => 'time',
        ],
        'datetime' => [
            'component' => 'input',
            'type' => 'datetime-local',
        ],
        'email' => [
            'component' => 'input',
            'type' => 'email',
        ],
        'color' => [
            'component' => 'input',
            'type' => 'color',
        ],
        'hidden' => [
            'component' => 'input',
            'type' => 'hidden',
        ],
        'password' => [
            'component' => 'input',
            'type' => 'password',
        ],

        /**
         * Button Variations
         */
        'button.edit' => [
            'component' => 'button',
            'tag' => 'a',
            'handle' => 'edit',
            'text' => 'Edit',
            'url' => '/{request.segments.0}/{request.segments.1}/{entry.id}/edit'
        ],
        'button.save' => [
            'component' => 'button',
            'type' => 'submit',
            'text' => 'Save',
        ],
        'button.cancel' => [
            'component' => 'button',
            'tag' => 'a',
            'handle' => 'cancel',
            'text' => 'Cancel',
            'url' => '/{request.segments.0}/{request.segments.1}'
        ],
        'button.delete' => [
            'tag' => 'button',
            'component' => 'button',
            'handle' => 'delete',
            'text' => 'Delete',
        ],
    ],
];
