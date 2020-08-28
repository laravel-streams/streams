<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/theme.css') }}">

</head>

<body>

    <div class="w-1/2 m-auto mt-20">
        
        <ul>
            @foreach (Streams::entries('pages')->get() as $page)
                <li>{{ $page->expand('entry')->created_at }}</li>
            @endforeach
        </ul>

    </div>

    <script src="{{ mix('/js/app.js') }}"></script>
</body>

</html>
