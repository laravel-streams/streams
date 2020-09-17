---
title: Requirements
category: getting_started
intro: Technical, server, and developer requirements for using the Streams platform.
sort: 0
stage: review
enabled: true
references:
    - https://docs.djangoproject.com/en/3.1/
    - https://craftcms.com/docs/3.x/
---

## Tech Specs

Streams is a self-hosted PHP 7 application, designed as [Composer](https://getcomposer.org) packages for [Laravel](https://laravel.com). 

Templating is, of course, powered by Blade. 

### Server Requirements
    
To run the Streams core packages, you will need to meet the following basic Laravel requirements:

- PHP >= 7.3
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

The following libraries are supported for [image manipulation](/docs/core/images):

- GD Library
- Imagick PHP extension

## Developer Requirements

The Streams platform enhances and extends the concepts of Laravel. While the platform simplifies interfacing with Laravel services, it is highly encouraged (though not required) to familiarize yourself with [how the framework works](https://laravel.com/docs).

The Streams platform utilizes [Composer](https://getcomposer.org/) to manage its dependencies. Before using Streams, make sure you have Composer installed on your machine. No worries if you are new to Composer, we will guide you on using it along the way.

### Frontend Development

The frontend is yours. We provide extensive tools to use as desired, but this is where your creativity and style shine. Write or generate HTML and let Streams get it to the browser via Laravel.

- Write a Single Page Application (SPA) with [Vue.js](https://vuejs.org/), [React](https://reactjs.org/), [Sapper](https://sapper.svelte.dev/), or whatever using our native JS components, or not.
- Use HTML and [Blade templates](https://laravel.com/docs/blade) to build a dynamic experience.
- Use [Webpack](https://webpack.js.org/), [Laravel Mix](https://laravel.com/docs/mix), or [Gulp](https://gulpjs.com/) to compile your JavaScript and SCSS/LESS.
