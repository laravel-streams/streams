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
