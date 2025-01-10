import preset from './vendor/streams/ui/tailwind.preset.js'

export default {
  presets: [preset],
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
