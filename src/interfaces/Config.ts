export interface NavigationItemType {
  label: string;
  path?: string;
  content?: NavigationItemType[];
}

interface DocSearch {
  appId: string;
  apiKey: string;
  indexName: string;
  placeholder: string;
}

interface IStorage {
  cookieConsentKey: string;
}

export default interface Config {
  title: string;
  rootUrl: string;
  protectedRoutePrefix: string; // slash at the beginning, but not at the end
  includeFolder: string[];
  includeProtectedFolder: string[];
  protectedPagesPath: string;
  protectedLayoutsPath: string;
  navigation: NavigationItemType[];
  pageTransitionDuration: number;
  enableH3Toc: boolean;
  siteTitle: string;
  twitterName: string;
  footerLinks: NavigationItemType[];
  headerOffset: number;
  indexPath: string;
  docSearch: DocSearch;
  storage: IStorage;
}
