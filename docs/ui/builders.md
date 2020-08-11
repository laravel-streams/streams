---
title: Builders
intro: Builders are classes that help you quickly build up UI component objects.
---

All builders accept an array of attributes and return an instance via the `build` method:
```php
$instance = (new Builder([
    'stream' => 'examples',
]))->build();
```

## Output

All builders provide a few methods of standard output.-m-0

### Views

```php
$instance = (new Builder([
    'stream' => 'examples',
]))->build();

$instance->render();
```

### JSON

```php
$instance = (new Builder([
    'stream' => 'examples',
]))->build();

$instance->toJson();
```

### Array

```php
$instance = (new Builder([
    'stream' => 'examples',
]))->build();

$instance->toArray();
```

### Response

```php
$instance = (new Builder([
    'stream' => 'examples',
]))->build();

$instance->response();
```
