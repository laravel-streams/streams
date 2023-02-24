<header id="header">

    <a href="/" class="flex justify-center mb-8">
        <img class="w-24" src="{!! Assets::url('/storage/logo.svg') !!}" alt="{{ config('app.name') }} Logo">
        <span class="sr-only">{{ config('app.name') }}</span>
    </a>

    @include('partials.navigation')

</header>
