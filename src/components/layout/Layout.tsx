import React from 'react';
import { PageProps } from 'gatsby';
import config from '../../../config';
import { Accordion, AccordionItem } from '../mdx/Accordion';
import { TabGroup, TabGroupItem } from '../mdx/TabGroup';
import { Steps, StepItem } from '../mdx/Steps';
import { HighlightBox } from '../mdx/HighlightBox';
import { YoutubePlayer } from '../mdx/YoutubePlayer';
import { PageNode, PageNodeContext } from '../../interfaces/PageDataQuery';
import { CodeBlock } from '../mdx/CodeBlock';
import { Questionnaire } from '../mdx/Questionnaire';
import { ImageCarousel } from '../mdx/ImageCarousel';
import { ChapterNavigation } from '../ChapterNavigation';
import { Banner, BannerImage, BannerContent } from '../mdx/Banner';
import { ButtonLink } from '../mdx/ButtonLink';
import { Card } from '../mdx/Card';
import { Grid, GridItem } from '../mdx/Grid';
import { MdLink } from '../mdx/MdLink';
import { Heading } from '../Heading';
import { ZoomImage } from '../mdx/ZoomImage';
import { MDXProvider } from '@mdx-js/react';
import { GitHubCodeBlock } from '../GitHubCodeBlock';
import Base from '../base';
import formatSlugToImageName from '../../utils/formatSlugToImageName';

export const Head = ({ pageContext }: PageNode) => {
  const title = `${
    pageContext.frontmatter?.title ? `${pageContext.frontmatter.title} |` : ''
  } ${config.title}`;
  const description = pageContext.frontmatter?.description || '';
  const image = formatSlugToImageName(pageContext.slug);
  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      {['og:title', 'twitter:title'].map((name) => (
        <meta name={name} content={pageContext.frontmatter?.title} key={name} />
      ))}
      {['description', 'og:description', 'twitter:description'].map((name) => (
        <meta name={name} content={description} key={name} />
      ))}
      {['og:image', 'twitter:image'].map((name) => (
        <meta
          name={name}
          content={`${config.rootUrl}social-cards/${image}.png`}
          key={name}
        />
      ))}
      {config.googleSiteVerification && (
        <meta
          name="google-site-verification"
          content={config.googleSiteVerification}
        />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={config.twitterName} />
      <meta name="og:site_name" content={config.title} />
      <meta name="publish-date" content={process.env.GATSBY_BUILD_DATE} />
      <meta name="version" content={process.env.GATSBY_GIT_SHA} />
    </>
  );
};

const Layout: React.FC<PageProps<Object, PageNodeContext>> = ({
  children,
  pageContext,
}) => {
  const components = {
    Accordion,
    AccordionItem,
    Banner,
    BannerImage,
    BannerContent,
    ButtonLink,
    Card,
    CodeBlock,
    GitHubCodeBlock,
    Grid,
    GridItem,
    HighlightBox,
    ImageCarousel,
    Questionnaire,
    Steps,
    StepItem,
    TabGroup,
    TabGroupItem,
    YoutubePlayer,
    ZoomImage,
    h2: (props: any) => <Heading {...props} type="h2" />,
    h3: (props: any) => <Heading {...props} type="h3" />,
    a: (props: any) => <MdLink {...props} />,
  } as any;

  return (
    <Base>
      <MDXProvider components={components}>
        {children}
        <ChapterNavigation currentSlug={pageContext.slug} />
      </MDXProvider>
    </Base>
  );
};

export default Layout;
