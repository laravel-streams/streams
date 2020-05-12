@extends('layouts/default')

@section('content')
    
<h1>{{ $entry->name }}</h1>
<code>{{ $entry->life_cycle }}</code>

@endsection
