@extends('layouts/default')

@section('content')

    <h1>
        {{ $entry->title }}
        @if ($entry->intro)
            <small>{!! Str::markdown($entry->intro) !!}</small>
        @endif
    </h1>

    {!! Str::markdown($entry->body) !!}
    
@endsection
