import { PluginRef } from 'gatsby';
import config from '../../config';

const includeFolders = () => {
  const mapFolders = (folders: string[]): PluginRef[] => {
    return folders.map((path) => {
      return {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: path,
        },
        __key: 'docs',
      };
    });
  };

  const protectedFolderConfig = mapFolders(config.includeProtectedFolder);
  const publicFolderConfig = mapFolders(config.includeFolder);

  return protectedFolderConfig.concat(publicFolderConfig);
};

export default includeFolders;
