@extends('layouts/default')

@section('content')
<div class="c-alert">
    Template being used : page
</div>
<div class="flex flex-wrap min-h-screen">
    <aside class="w-aside bg-primary text-white p-8">
        Aside
    </aside>
    <main class="w-main p-8">
        <h1>
            {{ $entry->title }}
            @if ($entry->intro)
            <small>{!! Str::markdown($entry->intro) !!}</small>
            @endif
        </h1>

        {!! Str::markdown(View::parse($entry->body, compact('entry'))) !!}
    </main>
</div>

@endsection