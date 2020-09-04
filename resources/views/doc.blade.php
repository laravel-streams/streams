@extends('layouts/default')

@section('content')
<div class="c-alert">
    Template being used : doc
</div>

<div class="o-doc-body">
    <h1>
        {{ $entry->title }}
    </h1>
    @if ($entry->intro)
    {!! Str::markdown($entry->intro) !!}
    @endif

    {!! Str::markdown(View::parse($entry->body)) !!}
</div>

@endsection