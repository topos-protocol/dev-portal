/** @type {import('tailwindcss').Config} */
const blue = '#2500ff' // official pallet
const dark_blue = '#110074' // derivation from official pallet
const black = '#000700' // official pallet
const almost_black = '#1d1d1d' // semi-official pallet
const white = '#ffffff' // official pallet
const light_grey = '#d4dbdd' // official pallet
const dark_grey = '#7f8889' // official pallet
const light_cool_yellow = '#f7ffa1' // derivation from official pallet
const cool_yellow = '#f4ff84' // official pallet
const safety_yellow = '#e7ff00' // official pallet
const warm_grey = '#dbdbcb' // official pallet
const lightest_teal = '#c3faff' // derivation from official pallet
const lighter_almost_teal = '#89eebf' // semi-official pallet
const light_teal = '#55f3db' // official pallet
const dark_teal = '#00a7b6' // official pallet
const salmon = '#ffe2d8' // official pallet
const light_salmon = '#ffefe9' // official pallet
const clay = '#d2c5ae' // semi-official pallet
const light_clay = '#ffe3d9' // semi-official pallet
const lighter_clay = '#fff0ea' // semi-official pallet

module.exports = {
  //darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/protected/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': white, // Light mode background color
        'dark-bg': almost_black, // Dark mode background color
        'medium-bg': light_grey,
        'neutral-bg': dark_grey,
        'text-reg': black, // Regular text color
        'title-reg': almost_black, // Regular title color for pages
        'text-darkmode': white, // Darkmode regular text color; it would be interesting to have a mechanism where text color could be determined at the page level, as there might be some pages where we want something to stand out by using the cool_yellow or the light_teal, instead.
        'title-darkmode': white,
        'light-text': '#b3b3b3',
        'light-border': '#ebebec',
        'light-bg': '#bbbdc1',
        'action-reg': dark_teal,
        'button-text': white,
        'highlight-light': salmon,
        'highlight-bg': lightest_teal, // Info highlight box background color
        'highlight-title': almost_black,
        'highlight-fg': almost_black, // Info highlight box foreground color
        'alert-bg': safety_yellow,
        'alert-fg': almost_black,
        'tip-bg': salmon,
        'tip-bg-darkmode': clay,
        'tip-fg': almost_black,
        'secondary-bg': lighter_clay, // click-to-expand background and other misc backgrounds
        'icon-fill': dark_teal,
        'code-top': dark_grey, // basic code box top line
        'code-bg': almost_black, // basic code box 
        'button-linear-end': light_teal, // light color on a button gradient
        'button-hover': dark_teal, // color of a button mouseover
        'button-active': dark_teal,
        'error-bg': '#f6bf3d',
        'ghcode-black-bg': black,
        'ghcode-action-bg': black,
        'ghcode-loading': clay,
        'ghcode-language-bg': white,
        'ghcode-language-bg-darkmode': clay,
        'ghcode-button': dark_teal,
      },
      screens: {
        'large-screen': '1536px',
      },
      boxShadow: {
        imageBlock: `0 0 0 400px ${almost_black}`,
      },
    },
  },
  plugins: [],
};
