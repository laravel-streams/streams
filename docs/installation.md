---
sort: 1
stage: drafting
title: Installation
category: getting_started
intro: Streams can be installed as a new blank project or added to an existing Laravel application.
---

## Downloading Streams

Streams utilizes [Composer](https://getcomposer.org/) to manage its dependencies. Before using Streams, make sure you have Composer installed on your machine.

### Via Starter Project

- [Example](https://github.com/anomalylabs/example)

### Via Composer Create-Project

```bash
composer create-project anomaly/streams example.com --prefer-dist --stability=dev
```

### Local Development Server

If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the `serve` Artisan command. This command will start a development server at [http://localhost:8000](http://localhost:8000):

```bash
php artisan serve
```


## Adding Streams To Laravel Projects

You can also add Streams to an existing Laravel project.

1.) Update the `scripts` portion of `composer.json`.

```bash
// composer.json
"scripts": {
    "pre-autoload-dump": [
        "rm -Rf bootstrap/cache/*.php"
    ],
    "post-autoload-dump": [
        "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
        "@php artisan package:discover --ansi",
        "@php artisan assets:clear --ansi",
        "@php artisan cache:clear --ansi",
        "@php artisan view:clear --ansi",
        "@php artisan vendor:publish --ansi --tag=assets",
        "@php artisan queue:restart --ansi"
    ],
    "post-root-package-install": [
        "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
    ],
    "post-create-project-cmd": [
        "@php artisan key:generate --ansi"
    ]
}
```

2.) Require the packages you would like to leverage.

```bash
composer require anomaly/streams-platform anomaly/streams-ui anomaly/streams-api
```


## Updating
From within your project, use Composer to update the Streams core package:

```bash
composer update anomaly/streams-platform --with-dependencies
```

You can of course update your entire project, including Streams core using `composer update`.
