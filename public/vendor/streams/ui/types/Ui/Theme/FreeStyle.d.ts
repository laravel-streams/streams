/**
 * Valid CSS property values.
 */
export declare type PropertyValue = number | boolean | string | null | undefined;
/**
 * Input styles object.
 */
export interface Styles {
    $unique?: boolean;
    $global?: boolean;
    $displayName?: string;
    [selector: string]: PropertyValue | PropertyValue[] | Styles;
}
/**
 * Propagate change events.
 */
export interface Changes {
    add(style: Container<any>, index: number): void;
    change(style: Container<any>, oldIndex: number, newIndex: number): void;
    remove(style: Container<any>, index: number): void;
}
/**
 * Cache-able interface.
 */
export interface Container<T> {
    id: string;
    clone(): T;
    getStyles(): string;
}
/**
 * Implement a cache/event emitter.
 */
export declare class Cache<T extends Container<any>> {
    changes?: Changes;
    sheet: string[];
    changeId: number;
    private _keys;
    private _children;
    private _counters;
    constructor(changes?: Changes);
    add(style: T): void;
    remove(style: T): void;
    values(): T[];
    merge(cache: Cache<any>): this;
    unmerge(cache: Cache<any>): this;
    clone(): Cache<T>;
}
/**
 * Selector is a dumb class made to represent nested CSS selectors.
 */
export declare class Selector implements Container<Selector> {
    selector: string;
    constructor(selector: string);
    get id(): string;
    getStyles(): string;
    clone(): Selector;
}
/**
 * The style container registers a style string with selectors.
 */
export declare class Style extends Cache<Selector> implements Container<Style> {
    style: string;
    private pid;
    constructor(style: string, pid: string);
    get id(): string;
    getStyles(): string;
    clone(): Style;
}
/**
 * Implement rule logic for style output.
 */
export declare class Rule extends Cache<Rule | Style> implements Container<Rule> {
    rule: string;
    style: string;
    private pid;
    constructor(rule: string, style: string, pid: string);
    get id(): string;
    getStyles(): string;
    clone(): Rule;
}
/**
 * The FreeStyle class implements the API for everything else.
 */
export declare class FreeStyle extends Cache<Rule | Style> implements Container<FreeStyle> {
    id: string;
    useDisplayName: boolean;
    constructor(id: string, changes?: Changes);
    registerStyle(styles: Styles): string;
    registerRule(rule: any, styles: any): void;
    getStyles(): string;
    clone(): FreeStyle;
}
/**
 * Exports a simple function to create a new instance.
 */
export declare function create(changes?: Changes): FreeStyle;
