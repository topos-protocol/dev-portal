import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
  ForwardedRef,
} from 'react';
import { useViewport } from '../hooks/useViewport';
import { SidebarLinkType } from '../interfaces/SidebarLinkType';
import { motion } from 'framer-motion';
import config from '../../config';
import { twMerge } from 'tailwind-merge';

interface SidebarLinkProps {
  link: string;
  label: string;
  setTocExpanded: Dispatch<SetStateAction<boolean>>;
  activeSection: string;
  node: HTMLHeadingElement | null;
}

interface SidebarProps {
  setTocExpanded: Dispatch<SetStateAction<boolean>>;
  tocExpanded: boolean;
  sidebarLinks: SidebarLinkType[];
  ref: ForwardedRef<HTMLDivElement>;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  label,
  setTocExpanded,
  activeSection,
  node,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!node) return;
    e.preventDefault();
    setTocExpanded(false);
    window.scrollTo({
      top: node.offsetTop - config.headerOffset,
      behavior: 'smooth',
    });
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${link}`);
    }
  };
  return (
    <li>
      <a
        className={twMerge(
          'relative inline-flex transform-gpu transition-all ease-in-out before:absolute before:inset-y-0 before:-left-8 before:w-0 before:bg-action-reg before:opacity-0 before:transition-all hover:text-action-reg',
          activeSection === link &&
            'font-semibold text-action-reg lg:before:w-0.5 lg:before:opacity-100',
          node?.tagName === 'H3' && 'pl-4 text-sm'
        )}
        href={`#${link}`}
        onClick={handleClick}
      >
        {label}
      </a>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = forwardRef(
  ({ setTocExpanded, tocExpanded, sidebarLinks }, ref) => {
    const viewport = useViewport();
    const [activeSection, setActiveSection] = useState<string>('');

    const handleUserInteractions = () => {
      if (
        window.scrollY >=
        Math.ceil(document.documentElement.scrollHeight - window.innerHeight)
      ) {
        return setActiveSection(sidebarLinks[sidebarLinks.length - 1].link);
      }
      for (let i = 0; i < sidebarLinks.length; i++) {
        const node = sidebarLinks[i].node;
        if (!node) continue;
        if (window.scrollY + window.innerHeight / 4 >= node.offsetTop) {
          setActiveSection(sidebarLinks[i].link);
        }
      }
    };

    useEffect(() => {
      if (!sidebarLinks.length) return;
      handleUserInteractions();
      ['scroll', 'resize'].forEach((eventName) =>
        window.addEventListener(eventName, handleUserInteractions)
      );
      return () =>
        ['scroll', 'resize'].forEach((eventName) =>
          window.removeEventListener(eventName, handleUserInteractions)
        );
    }, [sidebarLinks]);

    return (
      <motion.aside
        variants={{
          hide: { opacity: 0 },
          show: { opacity: 100 },
        }}
        transition={{ duration: config.pageTransitionDuration }}
        initial="hide"
        animate={sidebarLinks.length > 0 ? 'show' : 'hide'}
        ref={ref}
        tabIndex={0}
        dir={viewport.width && viewport.width > 1023 ? 'rtl' : 'ltr'}
        className={twMerge(
          'fixed right-4 top-[64px] max-h-[calc(100vh-80px)] w-64 min-w-[20rem] origin-top-right transform-gpu overflow-auto rounded-xl border bg-white px-4 py-6 shadow-xl transition-all ease-in-out md:right-8 md:px-6 lg:pointer-events-auto lg:right-auto lg:top-[80px] lg:z-auto lg:ml-0 lg:min-w-min lg:translate-x-0 lg:translate-y-0 lg:scale-100 lg:border-0 lg:px-0 lg:py-12 lg:pt-8 lg:opacity-100 lg:shadow-none lg:transition-none xl:w-72',
          tocExpanded
            ? 'z-10 translate-y-1 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-5 scale-0 opacity-0'
        )}
      >
        {sidebarLinks.length > 0 && (
          <div
            className="border-l-1 flex flex-col gap-4 md:px-4 lg:border-l lg:px-8"
            dir="ltr"
          >
            <h2 className="text-base font-semibold">On this page</h2>
            <nav aria-label="Table of content">
              <ul className="sidebar-links flex flex-col gap-4">
                {sidebarLinks.map(({ link, label, node }: SidebarLinkType) => (
                  <SidebarLink
                    key={link}
                    link={link}
                    setTocExpanded={setTocExpanded}
                    label={label}
                    activeSection={activeSection}
                    node={node}
                  />
                ))}
              </ul>
            </nav>
          </div>
        )}
      </motion.aside>
    );
  }
);
