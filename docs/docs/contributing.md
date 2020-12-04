---
id: contributing
title: Contributing
---

## Get involved

There are many ways to contribute to React Schedule Meeting, and many of them do not involve writing any code. Here's a few ideas to get started:

- Start using React Schedule Meeting! Go through the [Getting Started](installation.md) guides. Does everything work as expected? If not, we're always looking for improvements. Let us know by [opening an issue](#reporting-new-issues).
- Help us making the docs better. File an issue if you find anything that is confusing or can be improved. 
- Take a look at the [features requested](https://github.com/TylerAHolden/react-schedule-meeting/labels/enhancement) by others in the community and consider opening a pull request if you see something you want to work on.

Contributions are very welcome.

### Reporting new issues

When [opening a new issue](https://github.com/TylerAHolden/react-schedule-meeting/issues/new/choose), please make sure to provide as much information as possible to help us help you resolve the issue.

- **One issue, one bug:** Please report a single bug per issue.
- **Provide reproduction steps:** List all the steps necessary to reproduce the issue. The person reading your bug report should be able to follow these steps to reproduce your issue with minimal effort.

### Reporting bugs

We use [GitHub Issues](https://github.com/TylerAHolden/react-schedule-meeting/issues) for our public bugs. If you would like to report a problem, take a look around and see if someone already opened an issue about it. If you a are certain this is a new, unreported bug, you can submit a [bug report](#reporting-new-issues).

You can also file issues as [feature requests or enhancements](https://github.com/TylerAHolden/react-schedule-meeting/labels/feature). 

## Working on React Schedule Meeting code

### Installation

1. Ensure you have [Yarn](https://yarnpkg.com/) installed
2. After cloning the repository, run `yarn install` in the root of the repository
3. To start a local development server serving the React Schedule Meeting docs, go into the `docs` directory and run `yarn start`

### Semantic commit messages

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

**Example**

```
feat: allow overriding of webpack config
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

The various types of commits:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

Use lower case not title case!

### Code conventions

#### Style guide

[Prettier](https://prettier.io/) will catch most styling issues that may exist in your code. You can check the status of your code styling by simply running `npm run prettier`.

However, there are still some styles that Prettier cannot pick up.

#### General

- **Most important: Look around.** Match the style you see used in the rest of the project. This includes formatting, naming files, naming things in code, naming things in documentation.

#### Documentation

- Do not wrap lines at 80 characters - configure your editor to soft-wrap when editing documentation.

## Pull requests

### Your first pull request

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

Working on your first Pull Request? You can learn how from this free video series:

[**How to Contribute to an Open Source Project on GitHub**](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

### Proposing a change

If you would like to request a new feature or enhancement but are not yet thinking about opening a pull request, you can also file an issue with [feature template](https://github.com/TylerAHolden/react-schedule-meeting/issues/new?template=feature.md/).

### Sending a pull request

Small pull requests are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it. It is recommended to follow this [commit message style](#semantic-commit-messages).

Please make sure the following is done when submitting a pull request:

1. Fork [the repository](https://github.com/TylerAHolden/react-schedule-meeting/) and create your branch from `master`.
1. Make sure to test your changes.
1. Make sure your code lints (`yarn prettier && yarn lint`).

All pull requests should be opened against the `master` branch.

#### Breaking changes

When adding a new breaking change, follow this template in your pull request:

```md
### New breaking change here

- **Who does this affect**:
- **How to migrate**:
- **Why make this breaking change**:
```

### What happens next?

The core React Schedule Meeting team will be monitoring for pull requests. Do help us by keeping pull requests consistent by following the guidelines above.

## License

By contributing to React Schedule Meeting, you agree that your contributions will be licensed under its MIT license.