import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/roboto.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="Roboto"
    />,
    <link
      rel="preload"
      href="/fonts/roboto-bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="Roboto bold"
    />,
    <link
      rel="preload"
      href="/fonts/roboto-mono.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="Roboto-Mono"
    />,
  ]);
};
