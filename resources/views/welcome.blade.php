@extends('layouts/default')

@section('content')
    
    <div class="py-6 px-20 relative">

        <h1 class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">A new breed of CMS.</h1>

        <p class="max-w-screen-lg text-lg text-gray-700 sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">A code-configured data management system loaded with features like <code class="font-mono text-black font-bold ">data modeling</code>, <code class="font-mono text-black font-bold ">automagic UI</code>, and a built-in <code class="font-mono text-black font-bold ">REST API</code> that can be used to build anything.</p>
        
        <ul class="list-disc pl-4">
            <li>Introduction</li>
            <li>Documentation</li>
            <li>Contribute</li>
            <ul class="list-disc pl-4">
                <li note="https://www.iconfinder.com/#contributors">Become a contributor</li>
                <li note="https://github.com/sponsors/RyanThompson">Sponsor the project</li>
            </ul>
        </ul>
    </div>

@endsection
