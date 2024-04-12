import type { GatsbyConfig } from 'gatsby';
import includeFolders from './src/utils/includeFolders';
import platformConfig from './config';
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const config: GatsbyConfig = {
  flags: {
    FAST_DEV: false,
  },
  siteMetadata: {
    title: 'Topos Developer Portal',
    siteUrl: 'https://docs.topos.technology',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'academy',
        short_name: 'academy',
        start_url: '/',
        background_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-mermaid-remark',
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              linkImagesToOriginal: true,
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1216,
              quality: env === 'development' ? 80 : 80,
            },
          },
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              svgIcon:
                '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9375 4.5H2.8125C2.66332 4.5 2.52024 4.55926 2.41475 4.66475C2.30926 4.77024 2.25 4.91332 2.25 5.0625V15.1875C2.25 15.3367 2.30926 15.4798 2.41475 15.5852C2.52024 15.6907 2.66332 15.75 2.8125 15.75H12.9375C13.0867 15.75 13.2298 15.6907 13.3352 15.5852C13.4407 15.4798 13.5 15.3367 13.5 15.1875V5.0625C13.5 4.91332 13.4407 4.77024 13.3352 4.66475C13.2298 4.55926 13.0867 4.5 12.9375 4.5ZM12.375 14.625H3.375V5.625H12.375V14.625ZM15.75 2.8125V12.9375C15.75 13.0867 15.6907 13.2298 15.5852 13.3352C15.4798 13.4407 15.3367 13.5 15.1875 13.5C15.0383 13.5 14.8952 13.4407 14.7898 13.3352C14.6843 13.2298 14.625 13.0867 14.625 12.9375V3.375H5.0625C4.91332 3.375 4.77024 3.31574 4.66475 3.21025C4.55926 3.10476 4.5 2.96168 4.5 2.8125C4.5 2.66332 4.55926 2.52024 4.66475 2.41475C4.77024 2.30926 4.91332 2.25 5.0625 2.25H15.1875C15.3367 2.25 15.4798 2.30926 15.5852 2.41475C15.6907 2.52024 15.75 2.66332 15.75 2.8125Z" fill="white"/></svg>',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'GTM-MZ6B9TP5', // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: platformConfig.pageTransitionDuration * 1000 * 2,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/',
      },
      __key: 'data',
    },
    ...includeFolders(),
    'gatsby-plugin-catch-links',
  ],
};

export default config;
