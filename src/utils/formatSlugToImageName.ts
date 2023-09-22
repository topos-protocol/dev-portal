const formatSlugToImageName = (slug: string): string =>
  slug.replaceAll('/', '-').replace('.html', '');

export default formatSlugToImageName;
