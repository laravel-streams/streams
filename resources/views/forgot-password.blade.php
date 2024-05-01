<x-ui::page
    @class([
        'h-screen',
        'relative',
    ])>

    <div class="flex flex-col min-h-screen justify-center items-center relative">

        <a href="/" class="absolute top-8 left-8">
            <img src="/img/logo.svg" class="h-7">
        </a>

        @if (!$this->sent)
        <h1 class="text-4xl font-bold tracking-wide">Let's Reset Your Password</h1>

        @error('*')
        <div class="error text-center text-red-500 m-3">{{ str_replace('data.', '', $message) }}</div>
        @enderror

        <form class="w-full max-w-sm mt-16" wire:submit="send()">
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
            
                <button class="bg-black text-white border-2 border-black hover:bg-white hover:border-black hover:text-black font-bold mx-3 py-2.5 px-4 mt-4 rounded-full" type="submit">
                    Email Password Reset Link
                </button>
            </div>
        </form>
        @else
        <p class="max-w-md text-center">We sent an email to {{ $this->sent }}! If this email is connected to an account, you'll be able to reset your password.</p>
        @endif

    </div>

    <x-ui::messages />

</x-ui::page>
