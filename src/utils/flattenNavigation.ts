import { NavigationItemType } from '../interfaces/Config';

const flattenNavigation = (navigation: NavigationItemType[]): any => {
  let flat: NavigationItemType[] = [];

  return navigation
    .map((nav: NavigationItemType) => {
      if (nav.content && nav.content.length) {
        flat = [...flat, ...nav.content];
      }
      return nav;
    })
    .concat(flat.length ? flattenNavigation(flat) : flat)
    .filter((nav: NavigationItemType) => !!nav.path);
};

export default flattenNavigation;
