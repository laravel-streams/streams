<head>

    <div class="flex items-center justify-between px-20 py-6">
        
        <div class="flex items-center justify-center">
            
            <div class="flex items-center justify-center font-bold text-black text-3xl">
                <a href="/">Laravel Streams</a>
            </div>   

            <div class="hidden lg:flex items-center justify-center antialiased lg:ml-20 pt-1">

                <div class="relative" x-data="{show: false}">
                    <a href="#" class="flex items-center justify-center mr-10 text-base text-gray-700 text-opacity-90 font-medium tracking-tight hover:text-cool-gray-600 transition duration-150 ease-in-out" x-on:click="show == true ? show = false : show = true; return false;" x-on:click.away="show = false">
                        Demo
                        <x-fas-chevron-down class="h-3 ml-2"/>
                    </a>
                    
                    <div class="absolute origin-top-left left-0 mt-2 w-48 rounded-md border-2 border-primary z-5" x-show="show">
                        <div class="py-1 rounded-md bg-white">
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="/api/streams">API</a>
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="/tinker">Sandbox</a>
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="/cp">Control Panel</a>
                        </div>
                    </div>
                </div>

                <div class="relative" x-data="{show: false}">
                    <a href="#" class="flex items-center justify-center mr-10 text-base text-gray-700 text-opacity-90 font-medium tracking-tight hover:text-cool-gray-600 transition duration-150 ease-in-out" x-on:click="show == true ? show = false : show = true; return false;" x-on:click.away="show = false">
                        Community
                        <x-fas-chevron-down class="h-3 ml-2"/>
                    </a>
                    
                    <div class="absolute origin-top-left left-0 mt-2 w-48 rounded-md border-2 border-primary z-5" x-show="show">
                        <div class="py-1 rounded-md bg-white">
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="https://discord.gg/vhz8NZC" target="_blank">Discord</a>
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="https://github.com/laravel-streams/streams" target="_blank">GitHub</a>
                            <a class="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black hover:text-white transition ease-in-out duration-150" href="https://stackoverflow.com/search?q=laravel+streams" target="_blank">Stack Exchange</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        <div class="hidden md:flex items-center justify-center gap-x-2">
            <a href="https://streams.dev/docs" target="_blank" class="px-6 py-3 rounded-3xl font-bold bg-gray-200 hover:bg-gray-800 hover:text-white text-black outline-none focus:outline-none hover:shadow-md transition duration-200 ease-in-out">Docs</a>
            <a href="https://streams.dev/docs/installation" target="_blank" class="px-6 py-3 rounded-3xl font-bold bg-black hover:bg-gray-800 text-white outline-none focus:outline-none hover:shadow-md transition duration-200 ease-in-out">Download</a>
        </div>

    </div>

</head>
