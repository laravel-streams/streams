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
    proxy: 'streams.test',
    files: [
        'public/js/**/*.js',
        'public/css/**/*.css',
        'resources/views/**/*.html',
        'streams/**/*.json',
        'streams/**/*.md'
    ]
});


mix.version();

// Purge css 
if (mix.inProduction()) {
    mix.sourceMaps().version();
}