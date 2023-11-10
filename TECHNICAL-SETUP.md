# Technical Setup



# Install and run locally

Install packages with your package manager

```
npm install
```

> [!WARNING]
> Note: This platform uses gatsby version 5, which requires nodejs 18 or later.

## Gatsby CLI

This platform uses Gatsby. For local development, you might want to install the gatsby-cli tools which allow you to run gatsby commands directly. Install it globally with:

```
npm i -g gatsby-cli
```

## Run locally

You can start the local development environment with

```
npm run start
```

which calls the Gatsby command `gatsby develop`.

# Platform configuration

The configuration is split into two files, located in the root folder:
* `gatsby-config.ts` - main gatsby configuration file including plugin config
* `config.ts` - menu/content, meta and theme configuration

## Main menu and files

The `config.ts` file defines the main menu and all content files that should be linked there. This configuration is in the `navigation` section and looks like this:
```
navigation: [
  {
    label: 'What is Topos?',
    content: [
      {
        label: 'Chapter overview: What is Topos?',
        path: '/content/module-1'
      },
      {
        label: 'Introduction',
        path: '/content/module-1/1-introduction.html'
      },
    ]
  },
  {
    label: 'First steps with Topos',
    content: [
      {
        label: 'Chapter overview: First steps with Topos',
        path: '/content/module-2'
      },
    ]
  }
]
```

Note that:

* The top elements labeled _What is Topos_ and _First steps with Topos_ are the Category names (Modules), which contain multiple content files (Sections) inside. Files will be displayed in the same order configured here.
* When linking to an index file (named `index.md`), you should link to the folder (eg. `/content/module-1`).

> [!IMPORTANT]
> This file is the main file to inform the platform about the content structure - it also sources into the prev/next page navigation.

### Filenames

Files are prefixed with a number indicating their position in the config - this is just for convenience when viewing the file system and does not impact the menu.

### Adding new content folders

The content is located in the `content` folder. If you want to add another folder next to the content folder, you also need to update the `includeFolder` setting in the `config.ts` file.

# Build process

You can start the build process locally with `npm run build`. During the build process:

* All images are processed (resized to a max size, further size variants are being created, images are being comrpessed).
* Sharing cars (social-cards) are being prepared for all pages.
* Static html pages are being generated.

The output is generated in the `public` folder. 

# Deployment

The page deploys as a static page. Preview deployments are build and deployed on Netlify, the main page deploys to GitHub Pages using a [GitHub Action](.github/workflows/deploy.yml).
