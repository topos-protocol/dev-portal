import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import Base from '../components/base';

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Not found</title>
  </>
);

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Base noReadingTime>
      <h1 className="mb-8">Page not found</h1>
      <p>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/" className="button">
          Go home
        </Link>
        .
      </p>
    </Base>
  );
};

export default NotFoundPage;
