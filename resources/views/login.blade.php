<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	@include('partials.head')
</head>

<body class="antialiased flex flex-col justify-center items-center h-screen">

	<div class="container text-center mx-auto">
		<div class="w-80 mx-auto text-left">
			<livewire:login redirect="admin" />
		</div>
	</div>

	@include('partials.footer')
	@include('partials.assets')

</body>
</html>
