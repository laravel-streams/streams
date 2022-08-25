import { StringType } from 'csx/lib/types';
import { Property } from 'csstype';
/**
 * A CSS Color.  Includes utilities for converting between color types
 */
export declare class Color implements StringType<Property.Color> {
    /**
     * Format of the color
     * @private
     */
    private f;
    /**
     * True if the color should output opacity in the formatted result
     * @private
     */
    private o;
    /**
     * Channel 0
     * @private
     */
    private r;
    /**
     * Channel 1
     * @private
     */
    private g;
    /**
     * Channel 2
     * @private
     */
    private b;
    /**
     * Channel Alpha
     * @private
     */
    private a;
    _name?: string;
    toVar(name: string): string;
    name(name: string): this;
    get var(): string;
    constructor(format: 'rgb' | 'hsl', r: number, g: number, b: number, a: number, hasAlpha: boolean);
    /**
     * Converts the stored color into string form (which is used by Free Style)
     */
    toString(): Property.Color;
    /**
     * Converts to hex rgb(255, 255, 255) to #FFFFFF
     */
    toHexString(): string;
    /**
     * Converts to the Hue, Saturation, Lightness color space
     */
    toHSL(): Color;
    /**
     * Converts to the Hue, Saturation, Lightness color space and adds an alpha channel
     */
    toHSLA(): Color;
    /**
     * Converts to the Red, Green, Blue color space
     */
    toRGB(): Color;
    /**
     * Converts to the Red, Green, Blue color space and adds an alpha channel
     */
    toRGBA(): Color;
    red(): number;
    green(): number;
    blue(): number;
    hue(): number;
    saturation(): number;
    lightness(): number;
    alpha(): number;
    opacity(): number;
    invert(): Color;
    lighten(percent: string | number, relative?: boolean): Color;
    darken(percent: string | number, relative?: boolean): Color;
    saturate(percent: string | number, relative?: boolean): Color;
    desaturate(percent: string | number, relative?: boolean): Color;
    grayscale(): Color;
    fade(percent: string | number): Color;
    fadeOut(percent: string | number, relative?: boolean): Color;
    fadeIn(percent: string | number, relative?: boolean): Color;
    mix(mixin: string | Color, weight?: number): Color;
    tint(weight: number): Color;
    shade(weight: number): Color;
    spin(degrees: number): Color;
}
/**
 * Creates a color from a hex color code or named color.
 * e.g. color('red') or color('#FF0000') or color('#F00'))
 */
export declare function color(value: Property.Color): Color;
/**
 * Creates a color from hue, saturation, and lightness.  Alpha is automatically set to 100%
 * @param hue The hue of the color. This should be a number between 0-360.
 * @param saturation The saturation of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 * @param lightness The lightness of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 * @param alpha The alpha of the color. This should be a number between 0-1 or a percentage string between 0%-100%. If not specified, this defaults to 1.
 */
export declare function hsl(hue: number, saturation: string | number, lightness: string | number, alpha?: string | number): Color;
/**
 * Creates a color from hue, saturation, lightness, and alpha
 * @param hue The hue of the color. This should be a number between 0-360.
 * @param saturation The saturation of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 * @param lightness The lightness of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 * @param alpha The alpha of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 */
export declare function hsla(hue: number, saturation: string | number, lightness: string | number, alpha: string | number): Color;
/**
 * Creates a color form the red, blue, and green color space.  Alpha is automatically set to 100%
 * @param red The red channel of the color. This should be a number between 0-255.
 * @param blue The blue channel of the color. This should be a number between 0-255.
 * @param green The green channel of the color. This should be a number between 0-255.
 * @param alpha The alpha of the color. This should be a number between 0-1 or a percentage string between 0%-100%. If not specified, this defaults to 1.
 */
export declare function rgb(red: number, blue: number, green: number, alpha?: string | number): Color;
/**
 * Creates a color form the red, blue, green, and alpha in the color space
 * @param red The red channel of the color. This should be a number between 0-255.
 * @param blue The blue channel of the color. This should be a number between 0-255.
 * @param green The green channel of the color. This should be a number between 0-255.
 * @param alpha The alpha of the color. This should be a number between 0-1 or a percentage string between 0%-100%.
 */
export declare function rgba(red: number, blue: number, green: number, alpha: string | number): Color;
