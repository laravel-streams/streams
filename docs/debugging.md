---
title: Debugging
category: getting_started
intro: Debugging is an essential form of critical thinking.
stage: drafting
sort: 20
---

## Ignition Error Handler

[Ignition][https://flareapp.io/ignition] is an included Laravel package for debugging. It provides a clean and organized stack trace, code snippets, and request information. Ignition can even be used to share the error message others.

To enable Ignition, set `APP_DEBUG=true` in your [.env](/configuration#environment-variables) file.

## Debug Bar

The debug bar is a convenient way to explore many of the things happening in any given page request. You can see data the application is fetching, which views are being rendered, information on the current route, available variables, user's session, request data, and more. The debug bar is included with Streams as a development dependency by default.

### How to install the debug bar

Require the package with Composer:

``` bash
composer require --dev barryvdh/laravel-debugbar
```

### How to enable the debug bar

Set `APP_DEBUG` and `DEBUGBAR_ENABLED` to `true` in your `.env` file to enable the debug bar.

> The debug bar injects javascript into the page and adds significant overhead to each request. **Make sure to turn it off when you're testing your site's performance!**

## Logs

Laravel's logging system can log messages and errors to file, debug services, and even Slack. The default behavior logs these messages to files stored in `storage/logs`. Log files will be named by date.

Learn more about [configuring Laravel logging channels][logging].

## Laravel Telescope

Streams suggests [Laravel Telescope][telescope], an elegant debug assistant for the Laravel framework.

[composer]: https://getcomposer.org/
[telescope]: https://laravel.com/docs/telescope
[logging]: https://laravel.com/docs/logging#configuration
[ignition]: https://flareapp.io/docs/ignition-for-laravel/introduction
