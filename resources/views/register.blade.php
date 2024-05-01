<x-ui::page
    @class([
        'h-screen',
        'relative',
    ])>

    <div class="flex flex-col min-h-screen justify-center items-center relative">

        <h1 class="text-4xl font-bold tracking-wide mb-3">Let's Get Started 🎉</h1>

        @error('*')
        <div class="error text-center text-red-500 m-3">{{ str_replace('data.', '', $message) }}</div>
        @enderror

        <form class="w-full max-w-sm mt-16" wire:submit="register()">
            <div class="flex flex-col">
                
                <div class="w-full px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="name">
                        Full Name
                    </label>
                    <input
                        required
                        wire:model="data.name"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3"
                        id="name" type="text" placeholder="Full Name">
                </div>

                <div class="w-full mt-4 px-3">
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
                </div>

                <p class="my-6 px-3">
                    By creating an account you agree to our <a href="#tos" class="font-bold hover:underline" target="_blank">Terms of Service</a> and <a href="#pos" class="font-bold hover:underline" target="_blank">Privacy Policy</a>.
                </p>
            
                <button class="bg-black text-white border-2 border-black hover:bg-white hover:border-black hover:text-black font-bold mx-3 py-2.5 px-4 mt-4 rounded-full" type="submit">
                    Register Account
                </button>
            </div>
        </form>

    </div>

    <x-ui::messages />

</x-ui::page>
