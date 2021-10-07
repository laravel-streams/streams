const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix
    .js('resources/js/app.js', 'js')
    .sass('resources/scss/theme.scss', 'css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    })
    .webpackConfig(
        function (webpack) {
            return {
                externals: {
                    '@laravel-streams/core': ['streams', 'core'],
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
