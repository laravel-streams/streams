@extends('layouts/default')

@section('content')

<script>
    function example() {
        return {
            entries: [],
            title: null,
            async init() {
                
                window.streams.core.app.streams.make('planets')
                    .then((stream) => {
                        
                        this.title = stream.name;

                        return stream;
                    })
                    .then((stream) => {
                        stream.entries().get().then((entries) => {
                            this.entries = entries;
                        });
                    });
            }
        }
    }
</script>

<div class="px-20 py-6 mx-auto">
    {{-- <div x-data=example() x-init=init()>
    
        <h1 x-text="title"></h1>
    
        <ul>
            <template x-for="entry in entries">
                <li x-id="entry.id" x-text="entry.name"></li>
            </template>
        </ul>
    </div> --}}
</div>

@include('homepage.hero')
{{-- @include('homepage.features')
@include('homepage.mission')
@include('homepage.download') --}}

@endsection
