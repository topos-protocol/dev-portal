import { CreateNodeArgs } from 'gatsby';
import extractQuestionnaire from '../utils/extractQuestionnaire';
import generateSocialCardImage from '../utils/generateSocialCardImage';

const onCreateNode = async ({
  node,
  actions,
  createContentDigest,
  loadNodeContent,
  createNodeId,
}: CreateNodeArgs) => {
  const { createNode, createParentChildLink } = actions;
  const { context }: any = node;

  if (node.internal.type === 'SitePage' && context && context.frontmatter) {
    generateSocialCardImage(context);
  }

  if (node.internal.mediaType !== 'text/plain') {
    return;
  }

  const transformObject = (obj: any[], id: string) => {
    const textNode = {
      id,
      children: null,
      parent: node.id,
      name: node.name,
      content: obj,
      internal: {
        contentDigest: createContentDigest(obj),
        type: 'Text',
      },
    } as any;
    createNode(textNode);
    createParentChildLink({ parent: node, child: textNode });
  };

  const content = await loadNodeContent(node);
  const parsedContent = extractQuestionnaire(content);

  transformObject(parsedContent, createNodeId(`${node.id} >>> TEXT`));
};

export default onCreateNode;
