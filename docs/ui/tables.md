---
title: Tables
intro: Table builders help you quickly build up table components.
---

All tables accept a standard array of attributes:
```php
$table = (new TableBuilder([
    'stream' => 'examples',
]))->build();
```

## Methods

All form builders provide a few methods of standard operation.

### Post

Handle post requests for form actions and filtering.

```php
$table = (new TableBuilder([
    'stream' => 'examples',
]))->build();

$table->post();
```
