@extends('layouts/default')

@section('content')
    {!! Str::markdown($entry->body) !!}
@endsection
