/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins-Regular', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
        "poppins-extrabold": ['Poppins-ExtraBold', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-light': ['Poppins-Light', 'sans-serif'],
        'poppins-black': ['Poppins-Black', 'sans-serif'],
        'poppins-thin': ['Poppins-Thin', 'sans-serif'],
        'poppins-extraLight': ['Poppins-ExtraLight', 'sans-serif'],

      }
    },
  },
  plugins: [],
}