import React, { PropsWithChildren } from 'react';

export const BannerImage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bannerimage relative -z-10 order-first flex w-full flex-1 lg:order-last lg:w-auto [&>span]:block [&>span]:w-full">
      {children}
    </div>
  );
};

export const BannerContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bannercontent md-container order-last max-large-screen:flex-1 lg:order-first large-screen:w-1/3 [&>.highlightbox]:bg-highlight-light [&>.highlightbox]:px-6 [&>.highlightbox]:text-neutral-700">
      {children}
    </div>
  );
};

export const Banner: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="banner relative mb-12 flex flex-col items-start justify-between gap-4 lg:flex-row">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...{ index } });
        }
        return child;
      })}
    </section>
  );
};
