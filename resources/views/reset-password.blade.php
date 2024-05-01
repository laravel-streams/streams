<x-ui::page @class([ 'h-screen' , 'relative' , ])>

    <div class="flex flex-col min-h-screen justify-center items-center relative">

        <h1 class="text-4xl font-bold tracking-wide mb-3">Setup a New Password</h1>

        @error('*')
        <div class="error text-center text-red-500 m-3">{{ str_replace('data.', '', $message) }}</div>
        @enderror

        <form class="w-full max-w-sm mt-16" wire:submit="resetPassword()">
            <div class="flex flex-col">

                @if (!isset($this->data['token']))
                <div class="w-full px-3">
                    <label class="block tracking-wide text-gray-700 mb-2" for="token">
                        Token
                    </label>
                    <input required wire:model="data.token"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3" id="token"
                        type="text" placeholder="Reset Token">
                </div>

                <div class="w-full mt-4 px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="email">
                        Email
                    </label>
                    <input required wire:model="data.email"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3" id="email"
                        type="email" placeholder="Email">
                </div>
                @else
                <input type="hidden" wire:model="data.token">
                <input type="hidden" wire:model="data.email">
                @endif

                <div class="w-full mt-4 px-3">
                    <label class="sr-only flex justify-between w-full tracking-wide text-gray-700 mb-2" for="password">
                        <span>Password</span>
                        <span class="text-gray-400">Min 12 characters</span>
                    </label>
                    <input required wire:model="data.password"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3" id="password"
                        type="password" placeholder="Password">
                </div>

                <div class="w-full mt-4 px-3">
                    <label class="sr-only block tracking-wide text-gray-700 mb-2" for="password">
                        Confirm Password
                    </label>
                    <input required wire:model="data.password_confirmation"
                        class="appearance-none block w-full bg-white border rounded-full py-3 px-4 mb-3"
                        id="password_confirmation" type="password" placeholder="Confirm Password">
                </div>

                <button class="bg-black text-white border-2 border-black hover:bg-white hover:border-black hover:text-black font-bold mx-3 py-2.5 px-4 mt-4 rounded-full" type="submit">
                    Set New Password and Login
                </button>
            </div>
        </form>

    </div>

    <x-ui::messages />

</x-ui::page>
