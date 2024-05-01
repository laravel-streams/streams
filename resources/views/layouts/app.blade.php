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

    @vite(['resources/js/app.js'])

</head>

<body class="bg-black antialiased flex flex-col justify-center items-center h-screen">

	{!! $slot !!}

	<footer>
		&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
	</footer>

</body>

</html>
