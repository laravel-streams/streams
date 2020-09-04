---
title: Requirements
category: getting_started
intro: Technical, server, and developer requirements for using the Streams platform.
sort: 0
stage: drafting
references:
    - https://docs.djangoproject.com/en/3.1/
    - https://craftcms.com/docs/3.x/
---

## Tech Specs

Streams is a self-hosted PHP 7 application, designed as [Composer](https://getcomposer.org) packages for [Laravel](https://laravel.com). Templating is of course powered by Blade. 

### Server Requirements
    
To run Streams you will need a to meet the following basic requirements.

- PHP >= 7.2.5
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

### Supported Image Libraries

The following libraries are supported for [Image manipulation](docs/streams/images):

- GD Library
- Imagick PHP extension

## Developer Requirements

Streams enhances and extends the concepts of Laravel. While Streams simplifies interfacing with Laravel, it is highly encouraged (though not required) to familiarize yourself with how the [framework works]([Laravel Documentation](https://laravel.com/docs)).

Streams utilizes [Composer](https://getcomposer.org/) to manage its dependencies. Before using Streams, make sure you have Composer installed on your machine. If you are new to Composer, no worries! We will guide you on how to use it along the way.

### The frontend is yours

- Write a Single Page Application (SPA) with [Vue.js](https://vuejs.org/), [React](https://reactjs.org/), [Sapper](https://sapper.svelte.dev/), or whatever using our native JS components, or not.
- Use HTML and [Blade templates](https://laravel.com/docs/blade) to build a dynamic experience.
- Use [Webpack](https://webpack.js.org/), [Laravel Mix](https://laravel.com/docs/mix), or [Gulp](https://gulpjs.com/) to compile your JavaScript and SCSS/LESS

**It is up to you.** Write or generate HTML and let Streams get it to the browser via Laravel.
