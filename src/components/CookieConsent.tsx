import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Link } from 'gatsby';
import config from '../../config';

const isBrowser = typeof window !== 'undefined';

const CookieConsent: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState<string | boolean | null>(
    null
  );

  useEffect(() => {
    setCookieConsent(
      isBrowser &&
        localStorage?.getItem(config.storage.cookieConsentKey) === null
        ? false
        : 'true'
    );
  });

  // On initial page load, cookieConsent is null, so we don't render anything.
  // The useEffect hook will then set it, and on re-render, if "OK" has been clicked,
  // cookieConsent will be 'true', and we again don't render anything.
  if (cookieConsent === null || cookieConsent === 'true') return null;

  const handleConsent = () => {
    setCookieConsent('true');
    if (isBrowser)
      localStorage.setItem(config.storage.cookieConsentKey, 'true');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-4 border-t border-neutral-300 bg-light-border p-4 shadow-xl sm:flex-row sm:justify-between">
      <p className="flex-1">
        We are using cookies, by using our website you agree to{' '}
        <Link to="/legal/privacy-policy.html">our Privacy Policy</Link>
      </p>
      <div className="self-end">
        <Button type="button" onClick={handleConsent}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
