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

    <div class="o-header bg-primary w-screen h-screen">
        <div class="container mx-auto">
            <div class="flex flex-wrap">
                <div class="o-inside">
                    <h1 class="text-white text-title font-extrabold w-full tracking-tight mb-4 mt-20 leading-none">
                        Streams
                    </h1>
                    <p class="text-white text-subtitle leading-none font-semibold mb-12 tracking-tight">
                        A mutation of Laravel giving developers superpowers! 
                    </p>
                    <ul class="flex w-full">
                        <li>
                            <a href="/docs" class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">docs</a>
                        </li>
                        <li>
                            <a href="https://pyrocms.com/posts"
                                class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">news</a>
                        </li>
                        <li>
                            <a href="https://github.com/pyrocms/pyrocms"
                                class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">github</a>
                        </li>
                        @if (config('streams.installed') == true)
                        <li>
                            <a href="v" class="bg-white text-primary font-bold rounded-sm px-2 py-1">login</a>
                        </li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="o-intro bg-white w-screen h-screen">

    </div>


</body>

</html>