import React, { useState, useEffect } from 'react';
import { Highlight, Prism, themes } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import { twMerge } from 'tailwind-merge';
import { githubToken } from '../../githubToken';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

const languages = ['solidity', 'bash'];

const asyncImport = async (language) => {
  await import(`prismjs/components/prism-${language}`);
};

languages.forEach((language) => {
  asyncImport(language);
});

interface GitHubCodeBlockProps {
  title: string; // The title of the code block.
  language: string; // e.g. solidity, bash, rust, etc.
  org: string; // The GitHub organization name. This is optional if code will not be fetched from GitHub.
  repo: string; // The GitHub repository name. This is optional if code will not be fetched from GitHub.
  tag: string; // The GitHub tag/branch name. This is optional if code will not be fetched from GitHub.
  path: string; // The path to the file in the GitHub repository. This is optional if code will not be fetched from GitHub.
  lines: string; // The lines from the fetched file to display. '1..17', '3-9, 18', etc.
  highlights: string; // The lines from the fetched file to highlight. '3..5', '6, 9, 11', etc.
  nofetch: boolean; // If true, the code will not be fetched from GitHub.
  link: string; // The link to display. This overrides the default, which is to construct it from the github information.
  nocopy: boolean; // An optional line or range of lines that will not be copied to the clipboard when the copy button is pressed.
  copytrim: string; // An optional regular expression that will be used to trim the code before it ia copied.
  separator: string; // A line or lines that will be followed by a visible separator line.
  nolinenumbers: boolean; // If true, line numbers will not be displayed.
}

const calculateLines = (raw) => {
  const lineNumbers = rangeParser(raw);
  if (lineNumbers) {
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const trimCopiedCode = (code, separators_array, copytrim) => {
  if (copytrim) {
    const re = new RegExp(copytrim, 'g');
    code = code.replace(re, '');
  }

  if (separators_array(0)) {
    code = code.split('\n').slice(0, separators_array(0));
  }

  return code;
};

const copyToClipboard = (str, separators_array, copytrim) => {
  const codeToCopy = trimCopiedCode(str, separators_array, copytrim);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codeToCopy).then(
      function () {
        console.log('Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Could not copy text: ', err);
      }
    );
  } else if (window.clipboardData) {
    // Internet Explorer
    window.clipboardData.setData('Text', codeToCopy);
  }
};

const assembleContentUrl = (
  org,
  repo,
  tag,
  path,
  firstLine = 0,
  lastLine = 9999
) => {
  const formattedPath = `${path}`.startsWith('/') ? path.substring(1) : path;
  const formattedTag = tag ? `${tag}/` : '';

  if (firstLine > 0) {
    return `https://github.com/${org}/${repo}/blob/${formattedTag}${formattedPath}#L${firstLine}-L${lastLine}`;
  } else {
    return `https://github.com/${org}/${repo}/blob/${formattedTag}${formattedPath}`;
  }
};

const firstAndLastLines = (code, lines) => {
  if (lines === '..') {
    lines = false;
  }

  let firstLine = 0;
  let lastLine = 0;

  if (lines) {
    const lineNumbers = rangeParser(lines);
    if (lineNumbers[0] > 0) {
      firstLine = lineNumbers[0] - 1;
      if (firstLine < 0) {
        firstLine = 0;
      }
    } else {
      firstLine = 0;
    }
    if (lineNumbers.slice(-1) > 0 && lineNumbers.slice(-1) > firstLine) {
      lastLine = lineNumbers.slice(-1) - 1;
      if (lastLine > code.split('\n').length - 1) {
        lastLine = code.split('\n').length - 1;
      }
    } else {
      lastLine = code.split('\n').length - 1;
    }
  } else {
    firstLine = 0;
    lastLine = code.split('\n').length - 1;
  }

  return [firstLine, lastLine];
};

const trimCode = (code, lines) => {
  const [firstLine, lastLine] = firstAndLastLines(code, lines);

  return code
    .split('\n')
    .slice(firstLine, lastLine + 1)
    .join('\n');
};

export const GitHubCodeBlock: React.FC<
  PropsWithChildren<GitHubCodeBlockProps>
> = ({
  children,
  title,
  language = 'text',
  org,
  repo,
  tag = 'main',
  path,
  lines = '',
  highlights = '',
  nofetch = false,
  link = null,
  nocopy = false,
  copytrim = '',
  separator = '',
  nolinenumbers = false,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const className = `language-${language}`;
  const highlights_array = calculateLines(highlights);
  const separators_array = calculateLines(separator);

  const [firstLine, setFirstLine] = useState(0);
  const [lastLine, setLastLine] = useState(0);
  const [contentUrl, setContentUrl] = useState(
    assembleContentUrl(org, repo, tag, path)
  );
  const childrenCode =
    children?.props?.dangerouslySetInnerHTML?.__html
      ?.replace(
        /^<div class="gatsby-highlight" data-language="text"><pre class="language-\w+"><code class="language-text">/,
        ''
      )
      .replace(/<\/code><\/pre><\/div>$/, '') || '';

  const [code, setCode] = useState(
    !nofetch && org && repo && path ? '' : childrenCode
  );

  const baseUrl = assembleContentUrl(org, repo, tag, path);

  useEffect(() => {
    console.log('useEffect() called');

    const doFetch = async (url, attributes) => {
      console.log('doFetch() called');
      console.log(`url: ${url}`);
      console.log(`attributes: ${JSON.stringify(attributes)}`);
      return await fetch(url, attributes)
        .then((response) => response.json())
        .then((data) => {
          console.log('retrieved....')
          console.log(data);
          if (data?.message?.startsWith('API rate limit exceeded')) {
            return undefined;
          } else if (data.message == 'Not Found') {
            return false;
          } else {
            return data;
          }
        });
    };

    console.log('doFetch() defined');

    const fetchCode = async () => {
      if (!nofetch && org && repo && path) {
        let attributes = {
          headers: {},
        };
        let number_of_attempts = 0;
        let finished = false;

        while (!finished && number_of_attempts < 2) {
          if (number_of_attempts > 0) {
            console.log('Retrying with authentication...');
            attributes.headers['Authorization'] = `token ${githubToken}`;
            attributes.headers['X-GitHub-Api-Version'] = '2022-11-28';
          }

          console.log(
            `fetching with attributes: ${JSON.stringify(attributes)}`
          );
          const url = `https://api.github.com/repos/${org}/${repo}/contents/${path}?ref=${tag}`;
          const data = await doFetch(url, attributes);
          console.log('got data....')
          if (data === undefined) {
            console.log('API rate limit exceeded');
            finished = false;
          } else if (data === false) {
            finished = true;
          } else {
            finished = true;
            const raw_code = atob(data.content);
            const parsed_code = trimCode(raw_code, lines);
            setCode(parsed_code);
            if (lines != '') {
              const [_firstLine, _lastLine] = firstAndLastLines(
                raw_code,
                lines
              );
              setFirstLine(_firstLine + 1);
              setLastLine(_lastLine + 1);
              setContentUrl(
                assembleContentUrl(
                  org,
                  repo,
                  tag,
                  path,
                  _firstLine + 1,
                  _lastLine + 1
                )
              );
            }
          }

          number_of_attempts++;
        }
      }
    };

    fetchCode();
  }, []);

  return (
    <>
      {title && (
        <div className={twMerge('githubblock-title')}>{title}</div>)}
      <div className={twMerge('githubblock',title ? '' : 'no-title')}>
        <div className={twMerge('header')}>
          <div className={twMerge('language')}>{`${language}`}</div>
          <div className={twMerge('spacer')}></div>
          {!nocopy && (
            <button
              onClick={() => {
                copyToClipboard(code, separators_array, copytrim);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);
              }}
              className={twMerge('button')}
            >
              {isCopied ? '🎉 Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className={twMerge('code')}>
          {code ? (
            <Highlight code={code} language={language} theme={themes.nightOwl}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={twMerge('code-wrapper', className)}
                  style={{
                    ...style,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      {...getLineProps({ line, key: i })}
                      style={{
                        background: highlights_array(i)
                          ? '#00f5c426'
                          : 'transparent',
                        display: 'block',
                      }}
                    >
                      {!nolinenumbers && (
                        <div
                          style={{
                            marginRight: '1rem',
                            userSelect: 'none',
                            float: 'left',
                            width: '2.5rem',
                            borderRight: '3px solid #606060',
                          }}
                        >
                          {i + 1}
                        </div>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                      {separators_array(i) && (
                        <div
                          style={{
                            borderBottom: '1px solid #606060',
                            width: '100%',
                            margin: '0.5rem 0',
                          }}
                        ></div>
                      )}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          ) : (
            <div className={twMerge('loading')}>
              Loading{' '}
              <a href={baseUrl} target="_blank">
                {baseUrl}
              </a>
              ...
            </div>
          )}
        </div>
        <div className={twMerge('url')}>
          <a href={link || contentUrl} target={'_blank'}>
            {link || (path && contentUrl)}
          </a>
        </div>
      </div>
    </>
  );
};
