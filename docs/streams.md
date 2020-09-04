---
title: Data Modeling
category: core_concepts
intro: Data modeling is where we begin.
stage: drafting 
sort: 0
---

The `anomaly/streams-core` package is responsible for the fundamental data-modeling features in the Streams platform.

- [Streams Core](core/introduction)

### Code Configured Schema

All configured data-structures (called Streams) are defined in the root `streams/` directory.

- [Streams](core/streams)

### Flat-file Databases

The Streams platform supports all Laravel databases and adds flat-file database support.

- [Sources](core/sources)

### Streams ORM

The Streams ORM standardizes querying and create/update functionality between all configured databases.

### Object Prototypes

Prototype objects called "Entries" provide a performant and deep attribute access system.

```php
$entry->image; // path/to/image.jpg

$entry->expand('image')->tag(); // <img href="path/to/image.jpg" alt="Image">
```
