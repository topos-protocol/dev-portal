---
title: Topos ZkEVM Demo
description: Run our zkEVM demo, which lets you run a zkevm locally.
---

## Getting Started

In addition to the Topos Playground, there is another tool for interacting with Topos locally. Use the topos-zkevm-demo to experience the power of the Topos zkEVM on your local environment with an all-in-one Command-Line Interface (CLI) to run your own demo scenario.

### System Requirements

#### Hardware

- Memory: 16GB or more

#### Software

- Linux, MacOS
- [Docker](https://docs.docker.com/get-docker/_) version 17.06.0 or greater
- [Docker Compose](https://docs.docker.com/compose/install/) version 2.0.0 or greater
- [NodeJS](https://nodejs.dev/en/) version 16.0.0 or greater
- [Rust](https://www.rust-lang.org/tools/install) recent nightly (2024)
- Git

### Install / Run the CLI

Depending on your NodeJS environment and preferences, there are several ways to install Topos zkEVM Demo.

To install the topos zkevm demo globally, using `npm`, run the following command:

```bash
$ npm install -g @topos-protocol/topos-zkevm-demo
```

To install the topos zkevm demo globally, using `yarn`, run the following command:

```bash
$ yarn global add @topos-protocol/topos-zkevm-demo
```

Alternatively, you can install and run via `npx`:

```bash
$ npx @topos-protocol/topos-zkevm-demo
```

### Run the demo

Navigate to (soon) to run the demo scenario!

### Development

To build the project locally, run:

```bash
$ npm run build
```

Then, test the newly built CLI:

```bash
$ node dist/main <command>
```

## Up Next

Now that you have been exposed to the tools to run Topos components on your local system, in the next section you will learn about the Topos CLI itself.
