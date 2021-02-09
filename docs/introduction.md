---
title: Introduction
sort: 0
stage: review
enabled: 1
---

## What is Laravel Streams?

Laravel Streams is a system of interoperable PHP packages that act as a standardized platform to build, manage, and interact with Laravel applications. It is a new breed of CMS. We call it a data management system (DMS); It behaves like an application *generator* but carries almost no overhead. 

### Motivation

- Here

### Use Cases

As a data-centric application engine, Laravel Streams is well suited to build nearly anything.

- Websites
- Prototyping
- PWA Backbone
- Headless CMS
- Integrated CMS
- Application Core
- Development Automation

## How does it work?

Laravel Streams focuses primarily on basic JSON descriptions of your data, which we call **streams**.

```json
// streams/music.json
{
    "name": "Music",
    "fields": {
        "title": "string",
        "mp3": "file",
        "artist": {
            "type": "relationship",
            "stream": "artist"
        }
    }
}
```

The source of this data can be anything. By default, Laravel Streams leverages a flat-file database engine. All databases supported by Laravel are inherently supported.

### Building Upon Data

By building upon data structure, we can use stream configurations to help drastically reduce the time required to do things like:

- Validating the data.
- CRUD'ing the data via a fluent and extensive API.
- Generate code from stream configurations.
- Generate stream configurations from data.
- Serving and consuming the data via API.
- Building comprehensive control panels.
- Generating quality, fake data.

### Principle Concerns

Laravel Streams focuses on abstracting these fundamental areas of application development.

- [Data Modeling](streams)
- [Laravel Enhancement](core)
- [Frontend Development](frontend)
- [User Interface](ui)
- [API Readiness](api)
<!-- - [CLI Interface](cli) -->

## Core Packages

Know what you are looking for already? Dive right into our core packages.

- [Streams Core](core/introduction)
- [Streams UI](ui/introduction)
- [Streams API](api/introduction)


## Community Resources

- [Discord](https://discord.gg/vhz8NZC)
- [Stack Exchange](https://stackoverflow.com/search?q=laravel+streams)
- [GitHub](https://github.com/anomalylabs/streams)
<!-- - [YouTube](https://www.youtube.com/user/AIWebSystems) -->
