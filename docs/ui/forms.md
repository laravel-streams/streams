---
title: Forms
intro: Form builders help you quickly build up form components.
---

All forms accept a standard array of attributes:
```php
$form = (new FormBuilder([
    'stream' => 'examples',
    'inputs' => [
        'field_slug' => 'input_type',
    ],
]))->build();
```

## Methods

All form builders provide a few methods of standard operation.

### Post

Load form values from post submission data.

```php
$form = (new FormBuilder([
    'stream' => 'examples',
]))->build();

$form->post();
```

### Validate

Validate form posted submissions.

```php
$form = (new FormBuilder([
    'stream' => 'examples',
]))->build();

$form->validate();
```

### Save

```php
$form = (new FormBuilder([
    'stream' => 'examples',
]))->build();

$form->save();
```
