## Starter Project

This is a blank TALL-stack project using Streams.

<<<<<<< HEAD
### Features

- Users
- Files
- Navigation
- Admin Panel
=======
### Getting Started
>>>>>>> develop

```
composer create-project streams/streams:1.0.x-dev

cd streams

php artisan serve
```

### Cloning Manually

- Clone this repository locally.
- Run `composer install` within the project.
- Run `cp .env.example .env` and adjust as needed.
- Run `php artisan key:generate` to secure the install.
- Use `php artisan serve` to start your local web server.
- Use `npm install && npm run dev` to start your dev server.

### Included Packages

<<<<<<< HEAD
Your streams project is now ready for you to start coding.

- [Configuration](https://streams.dev/docs/configuration)
- [Debugging](https://streams.dev/docs/debugging)

## Users

The package comes with the default Laravel `App\Models\User` pre-defined. If you would like to use it, be sure to run migrations first.

```bash
php artisan migrate
```

## Included Packages

First-party packages:

- [Streams Core](https://streams.dev/docs/core)
- [Streams API](https://streams.dev/docs/api)
- [Streams UI](https://streams.dev/docs/ui)
=======
- [Streams Core](https://streams.dev/packages/streams/core)
- [Streams API](https://streams.dev/packages/streams/api)
- [Streams UI](https://streams.dev/packages/streams/ui)
>>>>>>> develop
