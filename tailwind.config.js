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
        'text-reg': black, // Regular text color
        'title-reg': dark_blue, // Regular title color for pages
        'light-text': '#b3b3b3',
        'light-border': '#ebebec',
        'light-bg': '#bbbdc1',
        'action-reg': dark_teal,
        'button-text': white,
        'highlight-light': light_salmon,
        'highlight-bg': lightest_teal, // Info highlight box background color
        'highlight-title': almost_black,
        'highlight-fg': almost_black, // Info highlight box foreground color
        'alert-bg': safety_yellow,
        'alert-fg': almost_black,
        'tip-bg': salmon,
        'tip-fg': almost_black,
        'secondary-bg': lighter_clay, // click-to-expand background and other misc backgrounds
        'icon-fill': dark_teal,
        'code-top': dark_grey, // basic code box top line
        'code-bg': almost_black, // basic code box 
        'button-linear-end': light_teal, // light color on a button gradient
        'button-hover': dark_teal, // color of a button mouseover
        'button-active': dark_teal,
        'error-bg': '#f6bf3d',
        'ghcode-action-bg': black,
        'ghcode-loading': clay,
        'ghcode-language-bg': white,
        'ghcode-button': dark_teal,
      },
      screens: {
        'large-screen': '1536px',
      },
    },
  },
  plugins: [],
};
