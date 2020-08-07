---
title: Getting Started
intro: Streams is a fast, simple, and flexible data-first development system for Laravel.
---

## Before Starting

Streams is a [Laravel](https://laravel.com/)-centric idealogy. Before using Streams, make sure you have an understanding of how to use Laravel.


## Data First

A [Stream](streams) defines data and provides access to it's [Entries](entries).

### Stream Definition

```json
{
    "name": "Content",
    "slug": "content",
    "description": "Generic JSON content.",
    
    "type": "filebase",
    "format": "md",
    
    "fields":{}
}
```
