# Contributing to Kindly

Thank you for your interest in contributing to Kindly! Kindly is a UNICEF-led [digital public good](https://digitalpublicgoods.net) that aims to end cyberbullying and make students feel safer. We welcome contributions from everyone.

Please take a moment to review this guide — it will help you understand our workflow and set expectations for a smooth collaboration.

## Code of Conduct

This project and everyone participating in it is governed by the [Kindly Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [kindly@unicef.org](mailto:kindly@unicef.org).

## How to Contribute

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/unicef/kindly/issues) on GitHub. When filing an issue:

- **Search existing issues** first to avoid duplicates.
- **Use a descriptive title** that captures the problem or request.
- **Provide steps to reproduce** bugs — include environment details (OS, browser, Python version) and any relevant logs or screenshots.
- For feature requests, describe the use case and why it would benefit the project.

### Pull Request Workflow

We follow a standard fork-based workflow:

1. **Fork** the [unicef/kindly](https://github.com/unicef/kindly) repository to your GitHub account.
2. **Create a branch** from `main` with a descriptive name (e.g., `fix-typo-readme`, `feat-add-spanish-model`).
3. **Make your changes** — keep commits focused and atomic. Write clear, concise commit messages.
4. **Test your changes** thoroughly. If you add a feature, include tests where possible.
5. **Push** your branch to your fork.
6. **Open a pull request** against the `main` branch of `unicef/kindly`. In your PR description:
   - Explain **what** you changed and **why**.
   - Link to any related issues (e.g., `Closes #42`).
   - Note any breaking changes or special considerations.
7. **Review** — a maintainer will review your PR. Be responsive to feedback and be prepared to make revisions. Once approved, a maintainer will merge it.

### Development Setup

Refer to the [Kindly Documentation Site](https://unicef.github.io/kindly) for architecture overview, API reference, and technical development guides — including the [development setup](https://unicef.github.io/kindly/technical/development) instructions.

### Pre-commit Hooks

This repository uses [pre-commit](https://pre-commit.com/) to run linting and formatting checks before each commit. After cloning the repo, install the hooks with:

```bash
pre-commit install
```

This will run `pylint` on Python files automatically. You can also run all hooks manually at any time:

```bash
pre-commit run --all-files
```

## License

- **Code** in this repository is licensed under the [GNU Affero General Public License v3.0](LICENSE).
- **Data** in this repository is licensed under the [Creative Commons Attribution-ShareAlike 4.0](LICENSE.data.md).

By contributing, you agree that your contributions will be licensed under these same terms.
