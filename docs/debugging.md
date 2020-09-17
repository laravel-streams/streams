---
title: Debugging
category: getting_started
intro: Debugging is an essential form of critical thinking.
stage: review
enabled: review
sort: 20
---

## Ignition Error Handler

[Ignition](https://flareapp.io/ignition) is an included Laravel package for debugging. It provides a clean and organized stack trace, code snippets, and request information. You can even share the error message with others.

To enable Ignition, set `APP_DEBUG=true` in your [.env](/configuration#environment-variables) file.

## Debug Bar

The debug bar is a convenient way to explore what is happening in any given application request. You can see data the application is fetching, which views are in use, information on the current route, available variables, session data, request data, and more. The debug bar comes with the Streams platform as a development dependency by default.

### Installing the Debug Bar 

If needed, you can install the debug bar manually using Composer:

``` bash
composer require --dev barryvdh/laravel-debugbar
```

### Enabling the Debug Bar 

Set `APP_DEBUG` and `DEBUGBAR_ENABLED` to `true` in your `.env` file to enable the debug bar.

> Be aware! Enabling the debug bar adds significant overhead to each request.

## Application Logs

Laravel's logging system can log messages and errors to file, debug services, and even Slack. The default behavior logs these messages to files stored in `storage/logs`; one file per day.

Learn more about [configuring Laravel logging channels][logging].

## Laravel Telescope

We suggest [Laravel Telescope][telescope], an elegant debug assistant for the Laravel framework, as a companion during your development work.

[composer]: https://getcomposer.org/
[telescope]: https://laravel.com/docs/telescope
[logging]: https://laravel.com/docs/logging#configuration
[ignition]: https://flareapp.io/docs/ignition-for-laravel/introduction
