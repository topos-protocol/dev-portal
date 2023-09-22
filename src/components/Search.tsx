import React from 'react';
import { DocSearch } from '@docsearch/react';
import config from '../../config';

export const Search: React.FC = () => {
  return (
    <DocSearch
      appId={config.docSearch.appId}
      apiKey={config.docSearch.apiKey}
      indexName={config.docSearch.indexName}
      placeholder={config.docSearch.placeholder}
    />
  );
};
