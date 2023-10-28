<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	@include('partials.head')
</head>

<body class="antialiased flex flex-col justify-center items-center h-screen">

	<div class="container text-center mx-auto">
		<div class="w-80 mx-auto text-left">
			@ui('login-form', [
				'action' => 'login',
				'fields' => [
					[
						'type' => 'email',
						'handle' => 'email',
						'label' => 'Email',
						'placeholder' => 'Email',
						'rules' => 'required|email',
						'input' => [
							'attributes' => [
								'class' => 'border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4',
							],
						],
					],
					[
						'type' => 'password',
						'handle' => 'password',
						'label' => 'Password',
						'placeholder' => 'Password',
						'rules' => 'required',
						'input' => [
							'attributes' => [
								'class' => 'border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
							],
						],
					],
				],
				'buttons' => [
					[
						'type' => 'submit',
						'handle' => 'submit',
						'text' => 'Login',
						'placeholder' => 'Login',
						'attributes' => [
							'class' => 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
						],
					]
				],
			])
		</div>
	</div>

	@include('partials.footer')
	@include('partials.assets')

</body>
</html>
