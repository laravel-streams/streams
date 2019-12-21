import CopyWebpackPlugin from 'copy-webpack-plugin'
import { Builder } from '@anomaly/webpack';
import { resolve } from 'path';

const path                = (...parts) => resolve(__dirname, ...parts);
const builder             = new Builder({
    globs: [
        'vendor/anomaly/streams-platform',
        'addons/*/*/*',
        'core/*/*',
    ],
    // finder: new AddonFinder(),
    // mode: process.env.NODE_ENV,
    // rootPath: process.cwd()
    // namespace: process.env.WEBPACK_NAMESPACE
});
const { wp, env, addons } = builder.init();


/**
 * Use `wp` to customise webpack configuration. It's based on webpack-chain.
 *
 * The `addons` array contains all addons that have a pyro entrypoint in its package.json
 *
 * @example
 * let addon = addons.get('<package.json name>')
 * // or
 * let addon = addons.findByComposerName('<composer.json name>')
 */
wp.extendConfig(config => {
    config.plugins.push(new CopyWebpackPlugin([
        {from: path('node_modules/vue/dist/vue.min.js'),to:resolve(builder.options.outputPath, 'js/vue.js')}
    ], {

    }))
})
wp.plugin('copy').use(CopyWebpackPlugin, )
wp.optimization
    .splitChunks({
        cacheGroups: {
            vendors: {
                name   : 'vendors',
                test   : /[\\/]node_modules[\\/](inversify|reflect-metadata|core-js|axios|tapable|util|lodash|element-ui|tslib|process|debug|regenerator-runtime|@babel\/runtime)/,
                enforce: true,
                chunks : 'initial',
            },
        },
    });
// wp.resolve.alias.set('@anomaly/streams-platform', path('streams-platform/resources/src'))
const config = builder.toConfig();
export { config, builder };
export default config;