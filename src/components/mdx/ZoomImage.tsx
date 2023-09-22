import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface ZoomImageProps extends PropsWithChildren {
  small?: boolean;
}

export const ZoomImage: React.FC<ZoomImageProps> = ({
  children,
  small = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgLink = ref?.current?.querySelector('a');
    if (!imgLink) return;
    imgLink.removeAttribute('href');
    imgLink.removeAttribute('target');
    imgLink.removeAttribute('rel');
  }, []);

  return (
    <div
      data-type="zoom-image"
      className={small ? 'zoom-image-small' : ''}
      ref={ref}
    >
      {children}
    </div>
  );
};
