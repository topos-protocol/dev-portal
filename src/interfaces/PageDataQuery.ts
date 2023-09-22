export interface PageQueryData {
  allSitePage: {
    nodes: PageNode[];
  };
}

export interface PageData {
  allSitePage: {
    nodes: PageNode[];
  };
}

export interface PageNode {
  id: string;
  path: string;
  title?: string;
  pageContext: PageNodeContext;
}

export interface PageNodeContext {
  id: string;
  slug: string;
  frontmatter?: PageNodeFrontmatter;
}

export interface PageNodeFrontmatter {
  title: string;
  order: number;
  description: string;
  tags?: string[];
}
