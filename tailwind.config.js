/** @type {import('tailwindcss').Config} */

module.exports = {
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
