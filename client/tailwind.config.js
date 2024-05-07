/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#0F172A",
          secondary: "#1E293B",
          hover1: "#0f1931",
          hover2: "#1E293B",
          line: "rgb(55 65 81)",
          focus: "rgb(29 78 216)",
          active: "#1E293B",
          myMessage: "rgb(29 78 216)",
          yourMessage: "#1E293B",

          button1Hover: "#0f1931",
          button1Normal: "#1E293B",

          button2Hover: "#0f1931",
          button2Normal: "rgb(29 78 216)",
          button2Inactive: "#ffffff",

          bigButtonNormal: "#1d4ed8",
          bigButtonNormalLight: "#9cb7f7",
          bigButtonHover: "#3a43c5",

          inputField: "rgb(55 65 81)",
          inputFieldFocus: "rgb(29 78 216)",

          loadingBar: "#1d4ed8",

          invalid: "#ef4444",
          valid: "#16a34a",
          
        },
        light: {
          primary: "white",
          secondary: "#f5f5fa",
          hover1: "#9fa7b9",
          hover2: "#fafaff",
          line: "rgb(229 231 235)",
          focus: "rgb(29 78 216)",
          active: "#f5f5fa",
          myMessage: "rgb(29 78 216)",
          yourMessage: "#EEF6F8",

          button1Hover: "rgb(223,223,223)",
          button1Normal: "rgb(239,239,239)",
          
          button2Hover: "rgb(223,223,223)",
          button2Normal: "rgb(29 78 216)",
          button2Inactive: "#000000",

          bigButtonNormal: "#1d4ed8",
          bigButtonHover: "#3a43c5",

          inputField: "rgb(229 231 235)",
          inputFieldFocus: "rgb(29 78 216)",

          loadingBar: "#1d4ed8",

          invalid: "#ef4444",
          valid: "#16a34a",
        },
        common: {
          success: "#93C939",
          danger: "#F77E58",
          messageRead: "#52BDEA",
        }
      },

      animation: {
        loading: 'loading 4s ease-out',
        slideLeft: 'slideLeft 0.1s',
        slideRight: 'slideRight 0.1s',

        scaleCenter: 'scaleCenter 0.1s'
      },
  
      keyframes: {
        loading: {
          '0%': {width: '0%'},
          '100%': {width: '100%'},
        },
        slideLeft: {
          '0%': {right: '0%'},
          '100%': {right: '50%'}
        },
        slideRight: {
          '0%': {left: '0%'},
          '100%': {left: '50%'}
        },

        scaleCenter: {
          '0%': {'transform-origin': 'top center', transform: 'scaleY(0.1)'},
          '100%': {'transform-origin': 'top center', transform: 'scaleY(1)'}
        },
      }
    },
  },
  plugins: [],
}

