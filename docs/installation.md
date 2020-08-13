---
title: Installation
category: getting_started
sort: 0
---

## System Requirements 

Before installing Streams please ensure [Laravel system requirements](https://laravel.com/docs/installation#server-requirements) are met. No database is required.

## Supported Image Libraries

The following libraries are supported for [Image](docs/streams/images) support:

- GD Library (>=2.0)
- Imagick PHP extension (>=6.5.7)

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
