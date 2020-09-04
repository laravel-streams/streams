@extends('layouts/default')

@section('content')
<code>TPL: DOC</code>
    <h1>
        {{ $entry->title }}
        @if ($entry->intro)
            <small>{!! Str::markdown($entry->intro) !!}</small>
        @endif
    </h1>

    {!! Str::markdown(View::parse($entry->body)) !!}
    
@endsection
