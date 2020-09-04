@extends('layouts/default')

@section('content')




<div class="o-header bg-primary w-screen h-screen">
    <div class="c-header-lottie">
        <div class="c-header-lottie__bkg"></div>
        <lottie-player class="c-header-lottie__player" autoplay loop mode="normal" src="/lottie/tt.json">
    </div>
    </lottie-player>
    <div class="container mx-auto">
        <div class="flex flex-wrap">
            <div class="o-inside">
                <h1 class="text-white text-title font-extrabold w-full tracking-tight mb-4 mt-20 leading-none">
                    Streams
                </h1>
                <p class="text-white text-subtitle leading-none font-semibold mb-12 tracking-tight">
                    Streams is a cult 🙌
                    <br>
                    <small>
                        <small>
                            Enhancing Laravel to give developers superpowers!
                        </small>
                    </small>
                </p>
                <ul class="flex w-full">
                    <li>
                        <a href="/docs" class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">docs</a>
                    </li>
                    <li>
                        <a href="https://pyrocms.com/posts"
                            class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">news</a>
                    </li>
                    <li>
                        <a href="https://github.com/pyrocms/pyrocms"
                            class="bg-white text-primary font-bold rounded-sm px-2 py-1 mr-1">github</a>
                    </li>
                    @if (config('streams.installed') == true)
                    <li>
                        <a href="v" class="bg-white text-primary font-bold rounded-sm px-2 py-1">login</a>
                    </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="o-intro bg-white w-screen h-screen">

</div>
@endsection