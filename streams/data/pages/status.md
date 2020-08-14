---
title: Documentation Status
intro: All documentation at a bird's eye view.
---

- <a href="docs">DOCUMENTATION HOME</a>

<?php $areas = ['docs' => 'Streams', 'core' => 'Core', 'ui' => 'UI', 'api' => 'API']; ?>

<br>

# Documentation Parts

The below is an attempt to both guide structure of new documentation pages and act as reconciliation of documentation features per page.

- **Intro:** Introduce the idea in one sentance.
- **Explaination:** An elevator pitch that signals the reader to continue or not (keep looking for relavant page).
- **Sections/Features:** Separate sections/sub-sections (h2s/h3s) consistently. This will build the ToC.
- **Code Examples:** Code examples and snippets.
- **Insights:** Tips, post scriptum, creative links.
- **Additional Reading:** Link to related ideas/topics/guides/recipes.

# Available Categories
---
@foreach (Streams::make('docs')->fields->category->config['options'] as $label)
- {{$label}}
@endforeach

<br><br>

# Available Stages
---
@foreach (Streams::make('docs')->fields->stage->config['options'] as $label)
- {{$label}}
@endforeach

<br><br>

# Documentation Areas
---
@foreach ($areas as $area => $label)

<?php $parts = array_unique(['docs', $area]) ?>
<?php $path = implode('/', $parts) ?>
<?php $stream = implode('_', $parts) ?>

- {{$label}}: {{Streams::make($stream)->description}}
@endforeach

@foreach ($areas as $area => $label)

<?php $parts = array_unique(['docs', $area]) ?>
<?php $path = implode('/', $parts) ?>
<?php $stream = implode('_', $parts) ?>

<br><br>

## {{ $label }} Documentation Overview
{!! Streams::make($stream)->notes !!}
---

<br>

<?php $default = Streams::make($stream)->fields->stage->default; ?>

@foreach (Streams::entries($stream)->orderBy('sort', 'ASC')->orderBy('title', 'ASC')->where('category', null)->get() as $page)
- <a href="/{{$path}}/{{$page->id}}">{{ $page->title }}</a> <strong>[{{ $page->stage ?: $default }}]</strong>
@if (!$page->intro)
<span style="color: red">No Intro</span>
@else
<span style="color: green">Intro</span>
@endif
@endforeach

@foreach (Streams::make($stream)->fields->category->config['options'] as $category => $label)

<?php $pages = Streams::entries($stream)->orderBy('sort', 'ASC')->orderBy('title', 'ASC')->where('category', $category)->get() ?>

@if ($pages->isNotEmpty())
### {{ $label }}
@foreach ($pages as $page)
- <a href="/{{$path}}/{{$page->id}}">{{ $page->title }}</a> <strong>[{{ $page->stage ?: $default }}]</strong>
@if (!$page->intro)
<span style="color: red">No Intro</span>
@else
<span style="color: green">Intro</span>
@endif
@endforeach
@endif

@endforeach
@endforeach
