/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: false,
  content: [
    './vendor/streams/ui/**/*.blade.php',
    './resources/**/*.blade.php',
    './docs/*.md',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
