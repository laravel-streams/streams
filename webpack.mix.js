const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');


// Do we want notifications?
mix.disableSuccessNotifications();

// Transpile js and sass
mix.js('resources/js/app.js', 'js')
    .sass('resources/sass/theme.scss', 'css');

mix.options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')],
});


mix.browserSync({
    proxy: process.env.APP_URL,
    files: [
        'public/js/**/*.js',
        'public/css/**/*.css',
        'resources/views/**/*.html',
        'streams/**/*.json',
        'streams/**/*.md'
    ],
    notify: false
});


mix.version();

// Purge css 
if (mix.inProduction()) {
    mix.sourceMaps().version();
}