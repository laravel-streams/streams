module.exports = {
    purge: {
        enabled: false,
        content: [
            './resources/views/**/*.html',
            './resources/js/**/*.vue',
            './resources/js/**/*.js',
        ],
        options: {
            whitelist: [],
        }
    },

    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
