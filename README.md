# Toposware docs platform

This repository contains the documentation platform for [Toposware](https://toposware.com).

The platform is deployed automatically to

➡️ [https://docs.topos.technology](https://docs.topos.technology)

This repository is currently maintained by [B9Lab](https://github.com/b9lab).

## Contribute

We welcome all contributions to this repository. If you see any error or would like to propose an idea, please feel free to open an Issue, or submit an update via a Pull Request.

> [!NOTE]
> Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) guide for further information.

## Install
Install packages using

```
npm install
```
(or equivalent commands for your package manager)

For local development, it is recommended to also install the gatsby-cli globally using:
```
npm install -g gatsby-cli 
```

## Configuration

Next to the default `gatsby-config.ts` file, additional configuration options are exposed in `config.ts`.

> [!NOTE]
> Please refer to the [TECHNICAL-SETUP.md](TECHNICAL-SETUP.md) guide for more information on the configuration, build and deployment of the platform.

## Run local dev environment

To run a local dev environment, start:
```
npm run develop
```


## Build

To build the distribution package, run:

```
gatsby build
```

This will generate the dist output in the `public` folder
