---
title: Installation
intro: Streams utilizes [Composer](https://getcomposer.org/) to manage its dependencies. Before using Streams, make sure you have Composer installed on your machine.
---

## Installing Streams

### Via Composer Create-Project

```bash
composer create-project anomalylabs/streams example.com --prefer-dist --stability=dev
```

### Local Development Server

If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the `serve` Artisan command. This command will start a development server at [http://localhost:8000](http://localhost:8000):

php artisan serve


### Distributions

You can also use one of our distributions to jump ahead with a pre-built application ready to customize and extend. Each distrobution has its own installation docs.

- [PyroCMS](https://pyrocms.com/docs)


## Adding Streams To Laravel Projects

You can also easily add Streams to an existing Laravel project.

### Require Streams Core

```bash
composer require anomalylabs/streams-platform
```

After Streams is installed, you will have `streams/` and `config/streams.php` added to your project. Your app will continue to work as before and you’ll have [Streams](/getting-started) available at your fingertips.


## Updating
From within your project, use Composer to update the Streams core package:

```bash
composer update anomalylabs/streams-platform --with-dependencies
```

You can of course update your entire project, including Streams core using `composer update`.
