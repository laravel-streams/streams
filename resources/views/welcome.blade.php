<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Pyro</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- Styles -->
    <style>
        html,
        body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links>a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }

        svg {
            height: 50px;
        }
    </style>
</head>

<body>
    <div class="flex-center position-ref full-height">
        <div class="content">
            <div class="title m-b-md">
                {!! img('anomaly.theme.flow::img/logo.svg')->data() !!}
            </div>

            <div class="links">
                <a href="https://pyrocms.com/docs" target="_blank">Docs</a>
                {{--<a href="https://laracasts.com" target="_blank">Laracasts</a>--}}
                <a href="https://pyrocms.com/posts" target="_blank">News</a>
                {{--<a href="https://blog.laravel.com" target="_blank">Blog</a>--}}
                <a href="https://github.com/pyrocms/pyrocms" target="_blank">GitHub</a>
                @if (config('streams.installed') == true)
                <a href="{{ url('admin/login') }}">Login</a>
                @endif
                @if (!config('streams.installed') == true)
                <a href="{{ url('https://streams.dev/docs/install') }}" target="_blank">Install</a>
                @endif
            </div>
        </div>
    </div>
</body>

</html>
