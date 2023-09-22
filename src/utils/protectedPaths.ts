import config from '../../config';

export const isProtectedMdxPath = (path: string): boolean => {
  const baseDir = __dirname.replace('src/utils', '');
  const cleanedPath = path.replace(baseDir, '').replace(/.md(x)?/, '');

  return config.includeProtectedFolder.some((path) => {
    const match = `${path}/`;
    return cleanedPath.startsWith(match) || path === match;
  });
};
