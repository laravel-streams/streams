---
title: UI Testing
intro: 
enabled: true
sort: 14
---

<ul>
    @foreach(Streams::collection() as $stream)
    <li><a href="ui/{{$stream->handle}}/table">{{$stream->handle}}</a></li>
    @endforeach
</ul>
