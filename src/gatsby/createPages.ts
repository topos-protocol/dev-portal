import path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { mdxPath } from '../utils/mdxPath';
import { isProtectedMdxPath } from '../utils/protectedPaths';
import config from '../../config';

const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;
  const layout = path.resolve(`./src/components/layout/Layout.tsx`);

  return graphql(`
    {
      allMdx {
        edges {
          node {
            id
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMdx.edges.forEach(({ node }: any) => {
      const path = mdxPath(node.internal.contentFilePath);
      const isProtectedRoute = isProtectedMdxPath(
        node.internal.contentFilePath
      );
      if (!isProtectedRoute) {
        createPage({
          path: path === config.indexPath ? '/' : path,
          component: `${layout}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            id: node.id,
            slug: path,
          },
        });
      }
    });
  });
};

export default createPages;
