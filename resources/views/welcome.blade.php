<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	
	<meta charset="utf-8">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>{{ implode(' | ', array_filter([
		$metaTitle ?? null,
		config('app.name')
		])) }}</title>

	<link rel="icon" type="image/png" href="favicon.png" />
</head>

<body class="bg-black antialiased flex flex-col justify-center items-center h-screen">

	<header id="header">

		<a href="/" class="flex justify-center mb-16">
			<img class="w-24" src="{!! Assets::url('/img/logo.svg') !!}" alt="{{ config('app.name') }} Logo">
			<span class="sr-only">{{ config('app.name') }}</span>
		</a>

		<nav>
			<ul class="inline-flex space-x-8 font-mono text-white">
				<li class="hover:underline">
					<a href="https://streams.dev/docs" target="_blank">Documentation</a>
				</li>
				<li class="hover:underline">
					<a href="/admin">Administration</a>
				</li>
			</ul>
		</nav>

	</header>

	<div class="container text-center mx-auto">
		<div class="wysiwyg-content">

		</div>
	</div>

	<footer>
		{{-- &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved. --}}
	</footer>

	@vite(['resources/js/app.js'])

</body>

</html>
