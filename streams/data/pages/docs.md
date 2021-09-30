---
title: Documentation
intro: Everything you need to know to get up and running with Laravel Streams.
path: docs
enabled: true
sort: 14
---

<!-- <div class="fancy-hero-five">
    <div class="bg-wrapper">
        <div class="container">
            <div class="text-center">
                <h1 class="heading">Find docs</h1>
                <p class="sub-heading space-xs">Find articles, help and advice for getting the most our of docall theme</p>
            </div>
            <div class="search-filter-form mt-30">
                <form action="#">
                    <input type="text" placeholder="Search Somthing..">
                    <button><img src="images/icon/54.svg" alt=""></button>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>All</option>
                        <option>Layout</option>
                        <option>API</option>
                        <option>Doc</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
</div> -->


<div class="flex">

@include('partials.docs.aside')

<div class="ls-doc__content w-3/4 flex-grow pb-16 px-16">
    
    <h1 class="text-4xl sm:text-6xl lg:text-5xl leading-none font-extrabold tracking-tight text-gray-900 mt-8 mb-4">
        {{ $entry->title }}
    </h1>
    
    @if ($entry->intro)
    <p class="text-xl tracking-tight mb-5 opacity-40">{{ $entry->intro }}</p>
    @endif

    
    <div class="flex space-x-4 bg-white">
    
        <div class="w-1/3">
            <div class="hover:shadow-xl transition-shadow duration-1000 rounded-3xl h-full p-8 flex flex-col">
            
                <h3 class="text-2xl leading-none font-extrabold tracking-tight text-gray-900 mb-4">1.&nbsp&nbspGetting Started</h3>
                
                <p>Start here if you are new to the Laravel Streams platform or Laravel.</p>

                <div class="mt-5 space-x-4">

                    <ul class="mt-4 list-none text-xl leading-relaxed">
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/introduction">
                                <strong class="">Introduction</strong>
                                <!-- What is Laravel Streams? -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/installation">
                                <strong class="">Installation</strong>
                                <!-- Options for working with Streams. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/contributing">
                                <strong class="">Contributing</strong>
                                <!-- How to contribute to the project. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="https://github.com/sponsors/ryanthompson" target="_blank">
                                <strong class="">Sponsors</strong>
                                <!-- Support our projects. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                    </ul>

                </div>

            </div>
        </div>


        <div class="w-1/3">
            <div class="hover:shadow-xl transition-shadow duration-1000 rounded-3xl h-full p-8 flex flex-col">

                <h3 class="text-2xl leading-none font-extrabold tracking-tight text-gray-900 mb-4">2.&nbsp&nbspCore Packages</h3>
                
                <p>Know what you are looking for already? Dive right in to our core packages. </p>

                <div class="mt-5 space-x-4">

                    <ul class="mt-4 list-none text-xl leading-relaxed">
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/core/introduction">
                                <strong class="">streams/core</strong>
                                <!-- Core utilities and modeling for Streams. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/api/introduction">
                                <strong class="">streams/api</strong>
                                <!-- A universal RESTful API for Streams. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted"href="docs/ui/introduction">
                                <strong class="">streams/ui</strong>
                                <!-- A versatile UI and control panel for Streams. -->
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                    </ul>

                </div>

            </div>
        </div>
        
    
        <div class="w-1/3">
            <div class="hover:shadow-xl transition-shadow duration-1000 rounded-3xl h-full p-8 flex flex-col">

                <h3 class="text-2xl leading-none font-extrabold tracking-tight text-gray-900 mb-4">3.&nbsp&nbspMore Resources</h3>

                <p>Discover more resources from the core team and community.</p>
                
                <div class="mt-5 space-x-4">

                    <ul class="mt-4 list-none text-xl leading-relaxed">
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted" href="https://discord.gg/vhz8NZC">
                                Discord
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted" href="https://stackoverflow.com/search?q=laravel+streams">
                                Stack Overflow
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                        <li>
                            <a class="border-b bottom-1 border-black hover-border-solid border-dotted" href="https://github.com/laravel-streams">
                                GitHub
                            </a>
                            <span class="ml-4">&#10141;</span>
                        </li>
                    </ul>

                </div>

            </div>
        </div>

    </div>





    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="w-full mt-5">
        <div class="p-2 rounded-lg bg-gray-600 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
                {{-- <span class="flex p-2 rounded-lg bg-indigo-800">
                    <!-- Heroicon name: outline/speakerphone -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </span> --}}
                <p class="ml-3 font-medium text-white truncate">
                    This project and documentation are both in pre-release.
                </p>
            </div>
            {{-- <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a href="#" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                    Learn more
                </a>
            </div> --}}
            {{-- <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
                    <span class="sr-only">Dismiss</span>
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div> --}}
        </div>
        </div>
    </div>



    

</div>
</div>
