
<ul>
    <code>TPL: TEST</code>
    @foreach (entries('docs')->get() as $doc)
    <li>
        {{ Str::markdown($doc->body) }}
    </li>
    @endforeach
</ul>