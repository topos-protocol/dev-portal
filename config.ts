import Config from './src/interfaces/Config';

const config: Config = {
  siteTitle: 'Toposware',
  twitterName: '@toposware',
  title: 'Developer Portal',
  rootUrl: 'https://docs.topos.technology/', // used only for the social card atm, required (update when using other environment)
  protectedRoutePrefix: '/protected', // slash at the beginning, but not at the end. Also the page file name has to match.
  includeFolder: ['features-test', 'content', 'legal'],
  indexPath: 'content', // could be content/module-1/introduction.html for example or any path to a html page
  includeProtectedFolder: [],
  protectedPagesPath: '',
  protectedLayoutsPath: '',
  pageTransitionDuration: 0.2,
  enableH3Toc: true,
  headerOffset: 100,
  docSearch: {
    appId: 'S36OISFKTX',
    apiKey: 'fc77ad501873a0a81b4c39e02a4aaaac',
    indexName: 'crawler_Toposware docs platform (new)',
    placeholder: 'Search documentation'
  },
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
        {
          label: 'Why Topos?',
          path: '/content/module-1/2-why-topos.html'
        },
        {
          label: 'Use cases',
          path: '/content/module-1/3-use-cases.html'
        },
        {
          label: 'Topos protocol',
          path: '/content/module-1/4-protocol.html'
        },
        {
          label: 'Cross-subnet messages',
          path: '/content/module-1/5-cross-subnet.html'
        },
        {
          label: 'Messaging protocol',
          path: '/content/module-1/6-messaging-protocol.html'
        }
      ]
    },
    {
      label: 'First steps with Topos',
      content: [
        {
          label: 'Chapter overview: First steps with Topos',
          path: '/content/module-2'
        },
        {
          label: 'ERC20 Messaging',
          path: '/content/module-2/1-ERC20-Messaging.html'
        },
        {
          label: 'Topos Explorer',
          path: '/content/module-2/2-explorer.html'
        },
        {
          label: 'Topos Playground',
          path: '/content/module-2/3-topos-playground.html'
        },
        {
          label: 'Topos CLI',
          path: '/content/module-2/4-cli.html'
        }
      ]
    },
    {
      label: 'Topos Terms',
      content: [
        {
          label: 'Glossary',
          path: '/content/glossary.html'
        }
      ]
    },
    {
      label: 'Legal',
      content: [
        {
          label: 'Privacy policy',
          path: '/legal/privacy-policy.html'
        }
      ]
    }
  ],
  footerLinks: [
    {
      label: 'Privacy Policy',
      path: '/legal/privacy-policy.html'
    }
  ],
  storage: {
    cookieConsentKey: 'cookieConsent'
  }
};

export default config;
