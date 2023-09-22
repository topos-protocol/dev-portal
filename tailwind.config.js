/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/protected/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-reg': '#495059',
        'title-reg': '#1B2430',
        'light-text': '#b3b3b3',
        'light-border': '#ebebec',
        'light-bg': '#bbbdc1',
        'action-reg': '#00c890',
        'button-text': '#ffffff',
        'highlight-light': '#F2FFEB',
        'highlight-bg': '#e7fedb',
        'highlight-title': '#025376',
        'highlight-fg': '#2a7a78',
        'alert-bg': '#fff7e7',
        'alert-fg': '#95680e',
        'tip-bg': '#DCF3FA',
        'tip-fg': '#4167c8',
        'secondary-bg': '#f5f5f5',
        'icon-fill': '#545461',
        'code-top': '#29293d',
        'code-bg': '#3b3b45',
        'button-linear-end': '#8cde9d',
        'button-hover': '#1eb4B3',
        'button-active': '#025376',
        'error-bg': '#f6bf3d',
      },
      screens: {
        'large-screen': '1536px',
      },
    },
  },
  plugins: [],
};
