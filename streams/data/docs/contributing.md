---
title: Contribution Guide
---
# How to Contribute to Streams

Thank you for considering participating to the project!

This is a guideline for contributing to Streams, its documentation, and addons. All components are hosted here in the [AnomalyLabs organization](https://github.com/anomalylabs) on GitHub. We welcome your feedback, proposed changes, and updates to these guidelines. We always welcome thoughtful issues and consider pull requests.

#### Table of Contents

- [What You Should Know Before Contributing](#what-you-should-know-before-contributing)
- [Streams is FOSS](#streams-is-foss)
- [How to Get Support](#how-to-get-support)
- [How You Can Contribute](#how-you-can-contribute)
- [Which Repo?](#which-repo)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Security Disclosures](#security-disclosures)
- [Core Enhancements](#core-enhancements)
- [Compiled Assets](#compiled-assets)
- [Control Panel Translations](#control-panel-translations)
- [Documentation Edits](#documentation-edits)
- [Pull Requests](#pull-requests)

## What You Should Know Before Contributing

### Streams isn’t FOSS

Streams is Free Open Source Software.

### How to Get Support

If you're looking for official developer support, please go to [streams.dev/support](https://streams.dev/support) and we will always do our best to reply in a timely manner. **Github issues are intended for reporting bugs and resolving issues with the software.**

You can chat and collaborate with other developers in the community — [Discord](https://streams.dev/discord) and [Stack Overflow](https://stackoverflow.com#streams) are the best places to go.

## How You Can Contribute

### Which Repo?

Streams is broken out into a few Github repositories. Here's a quick summary of each.

- [`streams/cms`](https://github.com/streams/cms) is the core package. It doesn't run by itself but is instead a dependency consumed by Laravel apps. 99% of the work goes on here.
- [`streams/streams`](https://github.com/streams/streams) is the starter Laravel app used to build a new site.
- [`streams/docs`](https://github.com/streams/docs) is the Streams 3 documentation site that is curently running on [streams.dev](https://streams.dev).

### Bug Reports

First things first. If the bug is security related refer to our [security disclosures](#security-disclosures) procedures instead of opening an issue.

Next, please search through the [open issues](https://github.com/streams/cms/issues) to see if it has already been opened.

If you _do_ find a similar issue, upvote it by adding a :thumbsup: [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Only leave a comment if you have relevant information to add.

If no one has filed the issue yet, feel free to [submit a new one](https://github.com/streams/cms/issues/new). Please include a clear description of the issue, follow along with the issue template, and provide and as much relevant information as possible. Code examples demonstrating the the issue are the best way to ensure a timely solution to the issue.

### Feature Requests

Feature requests should be created in the [streams/ideas](https://github.com/streams/ideas) repository.

### Security Disclosures

If you discover a security vulnerability, please review our [Security Policy](https://github.com/streams/cms/security/policy), then report the issue directly to us from [streams.dev/support](https://streams.dev/support). We will review and respond privately via email.

### Documentation Edits

Streams's documentation lives in the [https://github.com/streams/docs](https://github.com/streams/docs) repository. Improvements or corrections to them can be submitted as a pull request.

### Core Enhancements

If you would like to work on a new core feature or improvement, first create a [Github issue](https://github.com/streams/cms/issues) for it if there’s not one already. While we appreciate community contributions, we do remain selective about what features make it into Streams itself, so don’t take it the wrong way if we recommend that you to pursue the idea as an addon instead.

### Compiled Assets

If you are submitting a change that will affect a compiled file, such as most of the files in `resources/sass` or `resources/js`, do not commit the compiled files. Due to their large size, they cannot realistically be reviewed by our team. This could be exploited as a way to inject malicious code into Streams. In order to defensively prevent this, all compiled files will be generated and committed by the core Streams team.

### Control Panel Translations

We welcome new translations and updates! Please follow [these instructions](https://streams.dev/cp-translations#contributing-a-new-translation) on how to contribute to Streams's translation files.

### Pull Requests

Pull requests should clearly describe the problem and solution. Include the relevant issue number if there is one. If the pull request fixes a bug, it should include a new test case that demonstrates the issue, if possible.
