@extends('layouts/default')

@section('content')

<div class="c-alert">
    Template being used : doc
</div>
<div class="flex flex-wrap min-h-screen">
    <aside class="w-aside bg-primary text-white p-8">
        Aside

        {{-- @foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach --}}


    </aside>
    <div class="o-doc-body">
        <h1>
            {{ $entry->title }}
        </h1>
        @if ($entry->intro)
        {!! Str::markdown($entry->intro) !!}
        @endif

        {!! Str::markdown(View::parse($entry->body)) !!}
    </div>
</div>
@endsection