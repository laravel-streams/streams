---
title: Documentation Status
intro: All documentation at a bird's eye view.
---

<?php $areas = ['docs' => 'Streams', 'core' => 'Core', 'ui' => 'UI']; ?>

<br>

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
---

<br>

<?php $default = Streams::make($stream)->fields->stage->default; ?>

@foreach (Streams::entries($stream)->where('category', null)->get() as $page)
- <a href="/{{$path}}/{{$page->id}}">{{ $page->title }}</a> <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach

@foreach (Streams::make($stream)->fields->category->config['options'] as $category => $label)

<?php $pages = Streams::entries($stream)->where('category', $category)->get() ?>

@if ($pages->isNotEmpty())
### {{ $label }}
@foreach ($pages as $page)
- <a href="/{{$path}}/{{$page->id}}">{{ $page->title }}</a> <strong>[{{ $page->stage ?: $default }}]</strong>
@endforeach
@endif

@endforeach
@endforeach
