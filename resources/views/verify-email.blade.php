<x-ui::page
    @class([
        'h-screen',
        'relative',
    ])>

    <div class="flex flex-col min-h-screen justify-center items-center relative">

        <a href="/" class="absolute top-8 left-8">
            <img src="/img/logo.svg" class="h-7">
        </a>

        <h1 class="text-4xl font-bold tracking-wide mb-3">Check Your Inbox 📥</h1>

        <div class="w-full max-w-sm mt-16">
            
            <p class="px-3">
                Click the link in the email that was just sent to you to confirm and login.
            </p>

            <p class="px-3 block mt-12">
                Didn't get an email? <a href="{{ route('verification.send') }}" class="font-bold hover:underline">Resend verification link</a>.
            </p>

        </div>

    </div>

    <x-ui::messages />

</x-ui::page>
