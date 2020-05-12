<!doctype html>
<html lang="{{ config('app.locale') }}">

<head>

    {{-- partials.metadata --}}
    <meta charset="utf-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Content-Language" content="{{ config('app.locale') }}">
    
    <meta name="generator" content="{{ config('streams.distribution.name') }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <meta name="description" content="{{ trans($metaDescription ?? config('app.name')) }}"/>
    
    {!! View::includes('meta') !!}
    
    <title>
        {{ config('app.name') }}
        @if (isset($metaTitle))
            &#8250;
            {{ $metaTitle }}
        @endif
    </title>
    
    {{-- { favicons("public::vendor/anomaly/theme/flow/img/favicon.png") } --}}
    
    {{ constants() }}
    
    {!! View::includes('head') !!}
    {{-- partials.metadata --}}

</head>

<body>

    @yield('content')

</body>
</html>
