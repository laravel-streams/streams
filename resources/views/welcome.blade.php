<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	@include('partials.head')
</head>

<body class="antialiased flex flex-col justify-center items-center h-screen">

	@include('partials.header')

	<div class="container text-center mx-auto">
		<div class="wysiwyg-content">
			
		</div>
	</div>

	@include('partials.footer')
	@include('partials.assets')

</body>
</html>
