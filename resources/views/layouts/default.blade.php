<!doctype html>
<html lang="{{ config('app.locale') }}">

<head>

    @include('partials/head')

</head>

<body>
    <div id="app">
        @yield('content')
    </div>
    {!! Assets::tag('/js/app.js') !!}
</body>
</html>
