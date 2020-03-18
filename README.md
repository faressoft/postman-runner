# Postman Runner

[![npm](https://img.shields.io/npm/v/postman-runner.svg)](https://www.npmjs.com/package/postman-runner)
[![npm](https://img.shields.io/npm/l/postman-runner.svg)](https://github.com/faressoft/postman-runner/blob/master/LICENSE)

> CLI productivity dev tool to run postman collections interactively

<p align="center">
  <a href="https://terminalizer.com/view/1e1c92633466" target="_blank">
    <img src="/img/demo.gif?raw=true"/>
  </a>
</p>


The image ☝️ made by my [Terminalizer](https://github.com/faressoft/terminalizer). Check the [Demo](https://terminalizer.com/view/1e1c92633466) in a web player

---

# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [FAQ](#faq)
* [License](#license)

# Features

Based on [newman](https://github.com/postmanlabs/newman) from Postman

* Fuzzy searching for collections, environments, and requests
* Selects multiple requests to execute
* Executes the selected requests again by pressing enter
* Executes [pre-request scripts](https://learning.postman.com/docs/postman/scripts/pre-request-scripts/)
* Executes [tests scripts](https://learning.postman.com/docs/postman/scripts/intro-to-scripts/)
* Allows you to edit `body` and `querystring` in your preferred editor on runtime
* Syntax highlighting

# Installation

```bash
npm install postman-runner -g
```

# Usage

```bash
postman
```

When you run the tool for the first time you will be asked to update its configuration file to specify the path where you store your postman collections (`*.postman_collection.json`) and environments (`*.postman_environment.json`) files in.

# FAQ

### How to edit in vscode

The tool opens the default editor that is specified by the environment variable `$EDITOR`. First make sure you have the `code` command installed, check [launching-from-the-command-line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) for more details. To change the default editor add the following line into your `.bash_profile` for `bash` or `.zshrc` if you use `zsh`

```bash
export EDITOR="code -w"
```

### How to edit in nano

The tool opens the default editor that is specified by the environment variable `$EDITOR`. First make sure you have the `code` command installed, check [launching-from-the-command-line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) for more details. To change the default editor add the following line into your `.bash_profile` for `bash` or `.zshrc` if you use `zsh`

```bash
export EDITOR="nano"
```

# License

This project is under the MIT license.
