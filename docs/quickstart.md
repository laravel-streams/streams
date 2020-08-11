---
title: Quickstart
category: installation
intro: TLDR; Show me the goods.
---

## Download & Install

The following libraries are supported for [Image](docs/streams/images) support:

- GD Library (>=2.0)
- Imagick PHP extension (>=6.5.7)

## Install Streams

```bash
composer create-project anomaly/streams example.com --prefer-dist --stability=dev
```

## Serve Streams

If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the `serve` Artisan command. This command will start a development server at [http://localhost:8000](http://localhost:8000):

```bash
cd example.com && php artisan serve
```

## Create Streams

```json
// streams/data/contacts.json
{
    "name": "Contacts",
    "route": "contacts/{id}",
    "template": "contacts",
    "fields": {
        "name": "text",
        "email": "email",
        "bio": "textarea"
    }
}
```

```json
// streams/data/organizations.json
{
    "name": "Organizations",
    "route": "orgs/{id}",
    "template": "organizations",
    "fields": {
        "name": "text",
        "website": "url"
    }
}
```

## Create Templates

```blade
// resources/views/layouts/default.blade.php
<!doctype html>
<html>

<head>

    <title>
        {{ config('app.name') }}
    </title>

</head>

<body>

    @yield('content')

</body>
</html>
```

```blade
// resources/views/contact.blade.php
@extends('layouts/default')

@section('content')

    <h1>
        {{ $entry->title }}
        @if ($entry->bio)
            <small>{!! Str::markdown($entry->bio) !!}</small>
        @endif
    </h1>

    {!! Str::markdown(View::parse($entry->body, compact('entry'))) !!}

@endsection
```

```blade
// resources/views/organization.blade.php
@extends('layouts/default')

@section('content')

    <h1>
        {{ $entry->title }}
    </h1>

    @if ($entry->description)
        {!! $entry->expand('website')->link() !!}
    @endif

    {!! Str::markdown($entry->description) !!}

@endsection
```

## Create Entries

```json
// streams/data/organizations/streams.json
{
    "name": "Streams",
    "website": "https://streams.dev/"
}
```

```json
// streams/data/contacts/ryan_thompson.md
{
    "name": "Ryan Thompson",
    "organization": "stream"
}
```
