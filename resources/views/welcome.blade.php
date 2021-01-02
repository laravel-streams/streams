@extends('layouts/default')

@section('content')
    
    <div class="py-6 px-20">

        <h1 class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">The complete Laravel<br>development system.</h1>

        <p class="max-w-screen-lg text-lg text-gray-700 sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">A cohesive system for building, administrating, and interacting-with data-driven Laravel applications. <span class="font-bold text-black">Your team and clients will love it.</span></p>
        
        <ul class="list-disc pl-4">
            <li>Introduction</li>
            <li>Use Cases</li>
            <li>Documentation</li>
            <li>Contribute</li>
            <ul class="list-disc pl-4">
                <li note="https://www.iconfinder.com/#contributors">Become a contributor</li>
                <li note="https://github.com/sponsors/RyanThompson">Sponsor the project</li>
            </ul>
        </ul>

        <ul class="list-disc pl-4">
            <li>VCS Content</li>
            <li>Data Modeling</li>
            <li>RESTful API</li>
        </ul>
    </div>

@endsection
