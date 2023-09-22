import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { StaticNav } from './StaticNav';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sibebar';
import { ReadingTime } from './ReadingTime';
import { motion } from 'framer-motion';
import config from '../../config';
import convertToAnchorLink from '../utils/convertToAnchorLink';
import { SidebarLinkType } from '../interfaces/SidebarLinkType';
import mediumZoom from 'medium-zoom';
import { twMerge } from 'tailwind-merge';
import mermaid, { MermaidConfig } from 'mermaid';
import wrapCodeComponent from '../utils/wrapCodeComponent';
import CookieConsent from '../components/CookieConsent';

interface BaseProps {
  children?: ReactNode;
  noReadingTime?: boolean;
}

const Base: React.FC<BaseProps> = ({ children, noReadingTime = false }) => {
  const aside = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);
  const [navExpanded, setNavExpanded] = useState<boolean>(false);
  const [tocExpanded, setTocExpanded] = useState<boolean>(false);
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLinkType[]>([]);
  const [pageTransition, setPageTransition] = useState<boolean>(false);

  const sidebarPosition = () => {
    const asideNode = aside.current;
    const mainNode = main.current;
    if (!asideNode || !mainNode) return;
    asideNode.style.left =
      window.innerWidth > 1023
        ? `${mainNode.getBoundingClientRect().right}px`
        : 'auto';
  };

  const clickOutsideToc = ({ target }: any) => {
    if (
      target.classList.contains('toc') ||
      (aside.current && aside.current.contains(target))
    )
      return null;
    setTocExpanded(false);
  };

  const initSidebar = () => {
    if (!main.current || !aside.current) return;

    const headingNodes: NodeListOf<HTMLHeadingElement> =
      main.current.querySelectorAll('h2[id], h3[id]');
    const links: SidebarLinkType[] = [];

    headingNodes.forEach((heading: HTMLHeadingElement) => {
      if (heading.parentElement?.tagName !== 'MAIN') return;

      const { textContent = '' } = heading;

      if (!textContent) return;

      const link: string = convertToAnchorLink(textContent);

      if (!config.enableH3Toc && heading.tagName === 'H3') return;

      links.push({
        link,
        label: textContent,
        node: heading,
      });
    });

    setSidebarLinks(links);
  };

  const initMermaid = () =>
    mermaid.init(
      {
        theme: 'neutral',
        fontFamily: 'Roboto',
        altFontFamily: 'Roboto Mono',
      } as MermaidConfig,
      document.querySelectorAll('.mermaid')
    );

  useEffect(() => {
    document
      ?.querySelector('html')
      ?.classList.toggle('max-md:overflow-hidden', navExpanded);
  }, [navExpanded]);

  useEffect(() => {
    if (!tocExpanded) return;
    if (navExpanded) setNavExpanded(false);
    aside.current?.focus();
  }, [tocExpanded]);

  useEffect(() => {
    if (!pageTransition) return;
    let timer = setTimeout(
      () => setPageTransition(false),
      config.pageTransitionDuration * 1000 * 2
    );
    () => clearTimeout(timer);
  }, [pageTransition]);

  useEffect(() => {
    initSidebar();
    sidebarPosition();
    wrapCodeComponent();
    mediumZoom('[data-type="zoom-image"] .gatsby-resp-image-image', {
      margin: 0,
      background: 'rgba(255, 255, 255, 0.8)',
    });
    initMermaid();
    document.addEventListener('mousedown', clickOutsideToc);
    window.addEventListener('resize', sidebarPosition);
    return () => {
      window.removeEventListener('resize', sidebarPosition);
      document.removeEventListener('mousedown', clickOutsideToc);
    };
  }, []);

  return (
    <div className="relative min-h-full overflow-hidden antialiased">
      <Header
        navExpanded={navExpanded}
        setNavExpanded={setNavExpanded}
        tocExpanded={tocExpanded}
        setTocExpanded={setTocExpanded}
        tocEnabled={sidebarLinks.length > 0}
      />
      <div className="mx-auto flex max-w-[1920px] flex-1 flex-col flex-wrap justify-between overflow-hidden pt-20 md:flex-row lg:flex-nowrap">
        <div
          className="flex w-full flex-1 justify-end overflow-hidden px-4 py-8 md:ml-56 md:px-8 md:pt-12 lg:mr-64 xl:ml-72 xl:mr-72"
          ref={main}
        >
          <motion.main
            onAnimationStart={() => setPageTransition(true)}
            className="md-container w-full max-w-[76rem]"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{
              type: 'spring',
              mass: 0.5,
              stiffness: 100,
              duration: config.pageTransitionDuration,
            }}
          >
            {!noReadingTime && <ReadingTime mainRef={main} />}
            {children}
          </motion.main>
        </div>
        <div
          className={twMerge(
            'z-1 custom-scroll fixed bottom-0 top-[80px] order-first flex transform-gpu flex-col overflow-y-auto overflow-x-hidden bg-white py-8 max-md:w-full max-md:transition-all md:w-56 md:py-12 xl:w-72',
            navExpanded
              ? 'max-md:-translate-y-0'
              : 'max-md:-translate-y-[calc(100%+80px)]'
          )}
        >
          <StaticNav
            setNavExpanded={setNavExpanded}
            pageTransition={pageTransition}
          />
        </div>
        <Sidebar
          tocExpanded={tocExpanded}
          setTocExpanded={setTocExpanded}
          sidebarLinks={sidebarLinks}
          ref={aside}
        />
      </div>
      <div className="mx-auto max-w-[1920px]">
        <Footer />
      </div>
      <CookieConsent />
    </div>
  );
};

export default Base;
