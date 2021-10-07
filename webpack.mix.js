const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const {resolve} = require('path')
const path = (...parts) => resolve(__dirname, ...parts);

let isProd = mix.inProduction();
let isDev = !mix.inProduction();
mix
    //.js('resources/js/app.js', 'js')
    .sass('resources/scss/theme.scss', 'css')
    .options({
        processCssUrls: false,
        postCss       : [tailwindcss('./tailwind.config.js')],
    })
    .webpackConfig({
        devtool: 'inline-cheap-module-source-map',
        entry: {
            '/js/app': {
                import: [path('resources/js/app.js')],
                library: {
                    name: [ 'app' ],
                    type: 'window',
                },
            }
        },
        externals: {
            '@streams/core': ['streams', 'core'],
        }
    });

if ( isProd ) {
    mix.sourceMaps();
}

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
