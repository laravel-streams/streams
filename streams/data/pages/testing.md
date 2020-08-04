---
enabled: true
sort: 14
title: 'Foo Bar Baz'
doc: installation
cover: 'public::img/streams.png'
docs: 
    - getting-started
    - installation
    - streams
---

#### Boolean
{{ $entry->enabled }}

#### Integer
{{ $entry->sort }}

#### Text
{{ $entry->title }}

#### Entry
{{ $entry->expand('doc')->title }}

#### Entries
@foreach($entry->expand('docs') as $doc)
- {{ $doc->title }}
@endforeach

#### Image
{!! $entry->expand('cover')->resize(400) !!}

<hr>

#### Textarea - Body
{{ $entry->body }}

<hr>

#### Entry::Stream::ToArray
<pre>{{print_r($entry->stream())}}</pre>

#### Entry::ToArray
<pre>{{print_r($entry->toArray())}}</pre>
