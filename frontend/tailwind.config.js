/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  // Specify the paths to all of the template files in your project
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this if you have other file types
  ],
  theme: {
    extend: {
      // You can extend the default theme here
      // For example, adding custom colors or spacing
    },
  },
  plugins: [
    daisyui, // Include DaisyUI as a plugin
  ],
}