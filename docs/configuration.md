---
title: Configuration
category: getting_started
intro: Streams uses Laravel config files and environment variables for application-level settings.
stage: drafting
sort: 2
---

## Config Files

Streams' config files are located in `config/streams/`. They are PHP files named by area of concern.

```files
├── config/streams/
│   ├── addons.php
│   ├── assets.php
│   ├── cp.php
│   ├── images.php
│   ├── sources.php
│   └── system.php
```

## Environment Variables

It is often helpful to have different configuration setting based on the environment where the site is running. For example, you may wish to enable debug mode on your local server but not your production server.

In a fresh Streams installation you will find an `.env.example` file in the root directory of your application. Rename or copy it to `.env` to enable it. If you install Streams via Composer, this file will be renamed automatically.

Learn more about [environment configuration](https://laravel.com/docs/configuration#environment-configuration) in the Laravel docs.
