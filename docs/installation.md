---
sort: 1
stage: drafting
title: Installation
category: getting_started
references: 
    - https://statamic.dev/installation
---


- **Intro:** Introduce the idea in one sentance.
- **Explaination:** An elevator pitch that signals the reader to continue or not (keep looking for relavant page).
    - Streams can be installed as a new blank project or added to an existing Laravel application.
- **Sections/Features:** Separate sections/sub-sections (h2s/h3s) consistently. This will build the ToC.
    - Creating a new project
        - Starter projects
    - Adding to existing Laravel projects
        - Core is required
        - UI is optional
        - API is optional
    - Updating
    - Next steps
- **Code Examples:** Code examples and snippets.
- **Insights:** Tips, post scriptum, creative links.
- **Additional Reading:** Link to related ideas/topics/guides/recipes.

## Installing Streams

Streams utilizes [Composer](https://getcomposer.org/) to manage its dependencies. Before using Streams, make sure you have Composer installed on your machine.

### Via Composer Create-Project

```bash
composer create-project anomaly/streams example.com --prefer-dist --stability=dev
```

### Local Development Server

If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the `serve` Artisan command. This command will start a development server at [http://localhost:8000](http://localhost:8000):

```bash
php artisan serve
```


### Distributions

You can also use one of our distributions to jump ahead with a pre-built application ready to customize and extend. Each distribution has its own installation docs.

- [PyroCMS](https://pyrocms.com/docs)


## Adding Streams To Laravel Projects

You can also easily add Streams to an existing Laravel project.

### Require Streams Core

```bash
composer require anomaly/streams-platform
```

### Require Streams UI

```bash
composer require anomaly/streams-ui
```

### Require Streams API

```bash
composer require anomaly/streams-api
```


## Updating
From within your project, use Composer to update the Streams core package:

```bash
composer update anomaly/streams-platform --with-dependencies
```

You can of course update your entire project, including Streams core using `composer update`.
