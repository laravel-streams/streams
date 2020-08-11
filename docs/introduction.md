---
title: Introduction
intro: Streams is a way of building Laravel applications by data-structure.
sort: 0
---

- About Streams
    - Technically Speaking?
- Streams Features
- Popular Resources
    - [Installing & Updating](installation) - Installing and updating Streams & add-ons.
    - [Cheatsheet](cheatsheet) - Only what you need to know all at once.
    - [Quickstart](quickstart) – Install and render data in 60 seconds.
    - Tutorials – Follow along with tutorials.
- Community Resources
    - [Discord](https://discord.gg/vhz8NZC)
    - [Stack Exchange](https://stackoverflow.com/search?q=laravel+streams)
    - [GitHub](https://github.com/anomalylabs)
    - [YouTube](https://www.youtube.com/user/AIWebSystems)
    - Awesome Streams List (eventually right? lol)

---
# Streams Project Documentation Overview
---

<?php $default = Streams::make('docs')->fields->stage->default; ?>

@foreach (Streams::entries('docs')->where('category', null)->get() as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach

@foreach (Streams::make('docs')->fields->category->config['options'] as $category => $label)

<?php $pages = Streams::entries('docs')->where('category', $category)->get() ?>

@if ($pages->isNotEmpty())
### {{ $label }}
@foreach ($pages as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach
@endif

@endforeach


---
# Core Documentation Overview
---

<?php $default = Streams::make('docs.streams')->fields->stage->default; ?>

@foreach (Streams::entries('docs.streams')->where('category', null)->get() as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach

@foreach (Streams::make('docs.streams')->fields->category->config['options'] as $category => $label)

<?php $pages = Streams::entries('docs.streams')->where('category', $category)->get() ?>

@if ($pages->isNotEmpty())
### {{ $label }}
@foreach ($pages as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach
@endif

@endforeach


---
# UI Documentation Overview
---

<?php $default = Streams::make('docs.ui')->fields->stage->default; ?>

@foreach (Streams::entries('docs.ui')->where('category', null)->get() as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach

@foreach (Streams::make('docs.ui')->fields->category->config['options'] as $category => $label)

<?php $pages = Streams::entries('docs.ui')->where('category', $category)->get() ?>

@if ($pages->isNotEmpty())
### {{ $label }}
@foreach ($pages as $page)
- {{ $page->title }} <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach
@endif

@endforeach
