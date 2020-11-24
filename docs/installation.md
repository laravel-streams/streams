---
sort: 1
title: Installation
category: getting_started
intro: Streams can be installed as a new blank project or added to an existing Laravel application.
stage: review
enabled: true
---

## Downloading Streams

### Via Composer Create-Project

When creating a new Streams project, the [core](/docs/core/introduction), [ui](/docs/ui/introduction), and [api](/docs/api/introduction) packages are all included by default.

```bash
composer create-project streams/streams example.local --prefer-dist --stability=dev
```

### Local Development Server

If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the `serve` Artisan command. This command will start a development server at [http://localhost:8000](http://localhost:8000):

```bash
php artisan serve
```

### What's next?

Your streams project is now ready for you to start coding.

- [Configuration](configuration)
- [Debugging](debugging)

#### Ready to dive in?

- [Data Modeling](streams)
- [Laravel Enhancement](core)
- [Frontend Development](frontend)
- [User Interface](ui)
- [API Readiness](api)

## Existing Laravel Projects

You can add the Streams platform to existing Laravel projects by requiring the packages you need.

### Requiring Packages

The `core` package is responsible for the meat and taters; it is the only **required** package.

```bash
composer require streams/core
```

#### To include UI features:

```bash
composer require streams/ui
```

#### To include API features:

```bash
composer require streams/api
```

#### Update Composer Scripts

This step is **optional**. You may find it helpful to compare our default `scripts` below to your own and decide what you would like to include.

```json
// composer.json
"scripts": {
    "pre-autoload-dump": [
        "rm -Rf bootstrap/cache/*.php"
    ],
    "post-autoload-dump": [
        "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
        "@php artisan package:discover --ansi",
        "@php artisan clear --ansi",
        "@php artisan vendor:publish --ansi --tag=public",
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


## Updating
From within your project, use Composer to update individual packages:

```bash
composer update streams/core --with-dependencies
```

You can, of course, update your entire project using `composer update`.
