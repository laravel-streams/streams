/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: false,
    content: [
      './storage/framework/views/*.php',
      './resources/**/*.blade.php',
      './docs/*.md',
    ],
    options: {
      whitelist: [],
    }
  },
  content: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './docs/*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
