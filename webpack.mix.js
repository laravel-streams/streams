const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix
    .ts('resources/js/app.ts', 'js')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    })
    .webpackConfig(
        function (webpack) {
            return {
                externals: {
                    '@streams/core': ['streams', 'core'],
                    'axios': ['streams', 'core', 'axios'],
                },
                output: {
                    library: ['app'],
                    libraryTarget: 'window',
                }
            };
        }
    ).sourceMaps();


// mix.browserSync({
//     proxy: process.env.APP_URL,
//     files: [
//         'public/js/**/*.js',
//         'public/css/**/*.css',
//         'resources/views/**/*.html',
//         'streams/**/*.json',
//         'streams/**/*.md'
//     ],
//     notify: false
// });
