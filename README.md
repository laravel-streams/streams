# Laravel Streams

Streams is a self-hosted PHP 7 starter application using [Streams Core](docs/core/introduction) and [Streams UI](docs/ui/introduction) built on Laravel 7. It defaults to flat-file storage but can connected to anything for data and content storage using a consistent API. It has built-in support for all Laravel databases. Naturally, templating is powered by Blade.

## Requirements

Streams does not add to [Laravel system requirements](https://laravel.com/docs/installation#server-requirements).

## Supported Image Libraries

The following libraries are supported for [Image](docs/streams/images) support:

- GD Library (>=2.0)
- Imagick PHP extension (>=6.5.7)

## Getting started

- [Installation](http://image.intervention.io/getting_started/installation)
- [Laravel Framework Integration](http://image.intervention.io/getting_started/installation#laravel)
- [Basic Usage](http://image.intervention.io/use/basics)

## Code Examples

```php
// open an image file
$img = Image::make('public/foo.jpg');

// resize image instance
$img->resize(320, 240);

// insert a watermark
$img->insert('public/watermark.png');

// save image in desired format
$img->save('public/bar.jpg');
```

Refer to the [official documentation](http://image.intervention.io/) to learn more about Intervention Image.

## Contributing

Contributions to the Intervention Image library are welcome. Please note the following guidelines before submitting your pull request.

- Follow [PSR-2](http://www.php-fig.org/psr/psr-2/) coding standards.
- Write tests for new functions and added features
- API calls should work consistently with both GD and Imagick drivers

## License

Intervention Image is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2017 [Oliver Vogel](http://olivervogel.com/)
