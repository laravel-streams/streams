<x-ui::page
    @class([
        'h-screen',
        'relative',
    ])>

    <div class="flex flex-col min-h-screen justify-center items-center relative">

        <a href="/" class="mb-16">
            <img src="/img/logo.svg" class="h-36">
        </a>

        <h1 class="text-white text-4xl font-bold tracking-wide">Welcome back 👋</h1>

        @error('login')
        <div class="error text-white text-center text-red-500 m-3">{{ $message }}</div>
        @enderror

        <form class="w-full max-w-sm mt-16" wire:submit="login()">
            <div class="flex flex-col">
                
                <div class="w-full px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="email">
                        Email
                    </label>
                    <input
                        required
                        wire:model="data.email"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3"
                        id="email" type="email" placeholder="Email">
                </div>
            
                <div class="w-full mt-4 px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="password">
                        Password
                    </label>
                    <input
                        required
                        wire:model="data.password"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3"
                        id="password" type="password" placeholder="Password">
                    
                    <a href="{{ route('password.forgot') }}" class="text-white font-bold">Forgot your password?</a>
                </div>
            
                <div class="w-full mt-4 px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="remember">
                        <input
                        wire:model="data.remember"
                        class="rounded-full mr-1 -mt-1"
                        id="remember" type="checkbox">
                        <span class="text-white">Remember me</span>
                    </label>
                </div>
            
                <button class="bg-white hover:bg-black border-2  border-white hover:text-white text-black font-bold mx-3 py-2.5 px-4 mt-4 rounded-full" type="submit">
                    Login
                </button>
            </div>

            <p class="text-white text-center mt-12 px-3">
                Don’t have an account? <a href="{{ route('register') }}" class="font-bold hover:underline">Sign up here!</a>
            </p>
        </form>

    </div>

    <x-ui::messages />

</x-ui::page>
