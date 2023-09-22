---
title: Landingpage example
description: This page demonstrates how to create landingpages
---

# Landingpages

This example demonstrates how to create landingpages. You can use it as a template for new landingpages.

<Banner>
  <BannerImage>![](./images/topos_header.png)</BannerImage>
  <BannerContent>
    ## How landingpages work
    
    Landingpages are normal content pages (`.md`), using some specific components. They can be created and linked like any other content page.

    <ButtonLink to={'https://git.b9lab.com/client-projects/topos-portal/gatsby-platform/-/blob/main/features-test/landingpage.md?plain=1'} label="View Source" />

    <HighlightBox type="info" noIcon>
      Following below, you will find an example of each component, as well as some additional information on their use.
    </HighlightBox>
  </BannerContent>
</Banner>

## Banner

The first component shown above is a **Banner** with an image. You can use the following markdown code to implement a Banner:

```md
<Banner>
  <BannerImage>![](./images/topos_header.png)</BannerImage>
  <BannerContent>
    ## Subtitle
    
    Banner content here

    <ButtonLink to={'https://git.b9lab.com/client-projects/topos-portal/gatsby-platform/-/blob/main/features-test/landingpage.md?plain=1'} label="View Source" />

    <HighlightBox type="info" noIcon>
      HighlightBox without icon
    </HighlightBox>
  </BannerContent>
</Banner>
```

Note that this combination of child elements is optional. You could also create a minimal Banner, without Button an HighlightBox, which could look like this:

<Banner>
  <BannerImage>![](./images/topos_header.png)</BannerImage>
  <BannerContent>
    ## Minimal Banner
    
    Banner content here
  </BannerContent>
</Banner>

Code for this Banner:

```md
<Banner>
  <BannerImage>![](./images/topos_header.png)</BannerImage>
  <BannerContent>
    ## Minimal Banner
    
    Banner content here
  </BannerContent>
</Banner>
```

## Card Grid

You can create a two or three column grid for **navigation cards**.

Example of a two column grid:

<Grid columns={2}>
  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>
</Grid>

Example of a three column grid:

<Grid columns={3}>
  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis dui eu massa semper, sit amet venenatis sapien placerat.
    </Card>
  </GridItem>
</Grid>

<HighlightBox type="info">
  Note that these grids will automatically collapse, depending on your screen size. The three column grid will collapse to a 2 column grid before collapsing to a 1 column grid. Also, when you provide less items than required to fill each column of the grid, they will auto-layout.
</HighlightBox>

To implement this, the following code can be used:

```md
<Grid columns={2}>
  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Card content
    </Card>
  </GridItem>

  <GridItem>
    <Card title="Title" to={'/content/module-1/introduction.html'}>
      Card content
    </Card>
  </GridItem>
</Grid>
```

The `columns` parameter of the `Grid` component defines the number of columns (2 or 3). These cards are meant as navigation cards, so you must assign a link. If you want to create a box without link, please use the HighlightBox component instead.

## Other components

Because landingpages are normal content pages, you can also use all other components, detailed in the feature-test file.

<Grid columns={2}>
  <GridItem>
    <Card title="Feature test" to={'/features-test/index.html'}>
      See all components on the feature-test page.
    </Card>
  </GridItem>
</Grid>

## Linking and index files

You can link the landingpages in the `config.ts` like any other content page. It is not required to name them `index.html`, however you can do so, if you want the page to be displayed when entering the folder url without the filename.
