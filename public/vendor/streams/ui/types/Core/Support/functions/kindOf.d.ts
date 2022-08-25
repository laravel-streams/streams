export declare type KindsOf = 'number' | 'string' | 'boolean' | 'function' | 'regexp' | 'array' | 'date' | 'error' | 'object';
export declare function kindOf(value: any): KindsOf;
export declare const isNumber: (value: any) => value is number;
export declare const isString: (value: any) => value is string;
export declare const isBoolean: (value: any) => value is boolean;
export declare const isFunction: (value: any) => value is Function;
export declare const isRegExp: (value: any) => value is RegExp;
export declare const isArray: (value: any) => value is any[];
export declare const isDate: (value: any) => value is Date;
export declare const isError: (value: any) => value is Error;
export declare const isObject: (value: any) => value is object;
export declare const isNothing: (value: any) => value is null;
export declare const isNumericString: (value: any) => boolean;
export declare const isStringNumber: (value: any) => value is string | number;
export declare function isNumberObject(target: any): boolean;
/** @see https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise */
export declare function isES6Promise(p: any): boolean;
export declare function isNativePromise(p: any): boolean;
export declare function isPromise<T = any>(p: any): p is PromiseLike<T>;
