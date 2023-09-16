declare type Types = string | number | Date | boolean | Function;
export declare type PathsToStringProps<T> = T extends Types ? [] : {
    [K in Extract<keyof T, Types>]: [K, ...PathsToStringProps<T[K]>];
}[Extract<keyof T, Types>];
export declare type Join<T extends string[], D extends string> = T extends [] ? never : T extends [infer F] ? F : T extends [infer F, ...infer R] ? F extends string ? `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;
export {};
