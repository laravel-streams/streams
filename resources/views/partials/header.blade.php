<header id="header">

    <a href="/" class="flex justify-center mb-16">
        <img class="w-24" src="{!! Assets::url('/img/logo.svg') !!}" alt="{{ config('app.name') }} Logo">
        <span class="sr-only">{{ config('app.name') }}</span>
    </a>

    @include('partials.navigation')

</header>
