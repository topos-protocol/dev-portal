# gatsby-platform

## Install

Install submodule (if you need to handle protected logic)
```
git submodule init
git submodule update
```
With newer git versions, you can also use the following command instead
```
git clone git@git.b9lab.com:internal-projects/nextgen-documentation-platform/gatsby-platform.git --recurse-submodules
```

```
npm install
```

```
npm install -g gatsby-cli 
```

## Configuration

See [config.ts](./config.ts)

Remember to configure the platform to work with `gatsby-platform-module`, for more informations see [here](https://git.b9lab.com/internal-projects/nextgen-documentation-platform/gatsby-platform-module/tree/main/README.md)

## Dev

```
npm run develop
```

## Build

```
gatsby build
```
