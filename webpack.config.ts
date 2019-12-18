import { PyroBuilder } from '@pyro/webpack';
import { resolve }     from 'path';

const path                = (...parts) => resolve(__dirname, ...parts);
const builder             = new PyroBuilder({
    globs: [
        'vendor/anomaly/streams-platform',
        'addons/*/*/*',
        'core/*/*',
    ],
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

wp.blocks.plugins.size(wp)

const config = builder.toConfig();
export { config, builder };
export default config;