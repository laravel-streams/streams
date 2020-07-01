---
enabled: true
sort: 14
title: 'Foo Bar Baz'
doc: getting-started
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

<hr>

#### Textarea
{{ $entry->body }}

<hr>

#### Entry
{{ $entry->expand('doc')->title }}

#### Entries
@foreach($entry->expand('docs') as $doc)
- {{ $doc->title }}
@endforeach

#### Entry::Stream::ToArray
<pre>{{print_r($entry->stream())}}</pre>

#### Entry::ToArray
<pre>{{print_r($entry->toArray())}}</pre>
