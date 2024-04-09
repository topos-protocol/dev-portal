import React, { useEffect, useState } from 'react';

const modeLabel = (mode) => {
  switch (mode) {
    case 0:
      return 'light';
    case 1:
      return 'dark';
    case 2:
      return 'default';
    default:
      return 'default';
  }
};

const setModeClass = (mode) => {
  const isBrowser = typeof window !== 'undefined';
  if (
    isBrowser && (
    localStorage.getItem('mode') == 1 ||
    (localStorage.getItem('mode') == 2 &&
      window.matchMedia('(prefers-color-scheme: dark)').matches))
  ) {
    console.log('set to dark');
    document.documentElement.classList.add('dark');
  } else {
    console.log('remove dark');
    document.documentElement.classList.remove('dark');
  }
};

export const ModeToggle: React.FC = () => {
  // Initialize state with mode from localStorage if available, or default to 2 (System Default)
  const [mode, setMode] = useState(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      var savedMode = localStorage.getItem('mode');
    } else {
      var savedMode = 2;
    }
    return savedMode !== null ? parseInt(savedMode, 10) : 2;
  });

  // Effect hook to save mode to localStorage whenever it changes
  useEffect(() => {
    console.log(modeLabel(mode));
    localStorage.setItem('mode', mode);
    setModeClass(mode);
  }, [mode]);

  return (
    <div className="mode-toggle">
      <div className={`indicator indicator-pos-${mode}`}></div>
      <button className="mode-icon" onClick={() => setMode(0)}>
        ☀️
      </button>
      <button className="mode-icon" onClick={() => setMode(1)}>
        🌙
      </button>
      <button className="mode-icon" onClick={() => setMode(2)}>
        🖥️
      </button>
    </div>
  );
};

export default ModeToggle;
