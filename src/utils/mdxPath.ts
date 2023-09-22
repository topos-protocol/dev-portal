export const mdxPath = (path: string): string => {
  const baseDir = __dirname.replace('src/utils', '');
  const newPath = path.replace(baseDir, '').replace(/.md(x)?/, '');

  if (newPath.includes('/index')) {
    return newPath.replace('/index', '');
  } else {
    return `${newPath}.html`;
  }
};
