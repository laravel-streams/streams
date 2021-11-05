---
title: Laravel Streams
intro: The ultimate Laravel development system.
path: /
enabled: true
sort: 14
---

<div class="flex p-20">
    
    <div>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">{!! __('app.title') !!}</h1>
        
        <p class="max-w-screen-lg text-lg text-gray-700 sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">{!! __('app.description') !!} {{-- <a href="/mission#your-team-and-clients-will-love-it" class="font-bold text-black border-b-2 border-black border-dotted" onmouseover="this.classList.remove('border-dotted');" onmouseout="this.classList.add('border-dotted');">Your team and clients will love it.</a> --}}</p>    

        <div class="mt-16 space-x-4">
            <a href="/docs" class="px-6 py-3 font-bold text-2xl bg-black hover:bg-gray-800 text-white outline-none focus:outline-none hover:shadow-md transition duration-200 ease-in-out"><x-heroicon-o-document-duplicate class="w-6 h-6 mb-1 mr-2 inline-block" /> Documentation</a>
        </div>
    </div>

    <img src="/img/undraw_building_websites.svg" class="w-5/12">
    
</div>



<div class="flex py-24 px-20 my-24 bg-white">

    <div class="w-2/5">
        <div class="relative w-full flex flex-col bg-black">
    <div class="flex-none h-11 flex items-center px-4">
        <div class="flex space-x-1.5">
            <div class="w-3 h-3 border-2 rounded-full bg-red-500 border-red-500"></div>
            <div class="w-3 h-3 border-2 rounded-full bg-yellow-400 border-yellow-400"></div>
            <div class="w-3 h-3 border-2 rounded-full bg-green-400 border-green-400"></div>
        </div>
    </div>
    <div class="relative border-t border-white border-opacity-10 min-h-0 flex-auto flex flex-col">
        <div class="hidden md:block absolute inset-y-0 left-0 bg-black bg-opacity-25" style="width: 50px;"></div>
        <div class="w-full flex-auto flex min-h-0 overflow-auto">
            <div class="w-full relative flex-auto">
                <pre>
<code class="language-json">// streams/pages.json
{
    "handle": "pages",
    "source.format": "md",
    
    "template": "page",
    "rules": {
        "id": "required",
        "title": "required"
    },
    "fields": {
        "id": "slug",
        "path": "string"
    }
}</code></pre>
            </div>
        </div>
    </div>
</div>
    </div>
    
    <div class="pl-12">
        <h2 class="text-4xl sm:text-6xl lg:text-5xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">Code Configured + Flat File</h2>
        
        <p class="max-w-screen-lg text-lg text-gray-700 sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">
        Hit the ground running and rapidly build out your prototypes with code configured set up and plenty of database options including flat-file support. All with a single API.
        {{-- <a href="/mission#your-team-and-clients-will-love-it" class="font-bold text-black border-b-2 border-black border-dotted" onmouseover="this.classList.remove('border-dotted');" onmouseout="this.classList.add('border-dotted');">Your team and clients will love it.</a> --}}</p>    

        <div class="mt-16 space-x-4">
            <a href="/explore/idea" class="px-6 py-3 font-bold text-2xl bg-black hover:bg-gray-800 text-white outline-none focus:outline-none hover:shadow-md transition duration-200 ease-in-out"><x-far-compass class="w-6 h-6 mb-1 mr-2 inline-block" /> Explore More</a>
        </div>
    </div>
    
</div>



<div class="flex p-20">
    
    <img src="/img/undraw_stepping_up.svg" class="w-5/12 mr-20">
    
    <div>
        <h2 class="text-4xl sm:text-6xl lg:text-5xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">Ready to Scale</h2>
        
        <p class="max-w-screen-lg text-lg text-gray-700 sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">Scale your flat-file structures to SQL and more without changing your code.</p>    

        <!-- <div class="mt-16 space-x-4">
            <a href="/docs" class="px-6 py-3 font-bold text-2xl bg-black hover:bg-gray-800 text-white outline-none focus:outline-none hover:shadow-md transition duration-200 ease-in-out"><x-heroicon-o-document-duplicate class="w-6 h-6 mb-1 mr-2 inline-block" /> Documentation</a>
        </div> -->
    </div>
    
</div>
