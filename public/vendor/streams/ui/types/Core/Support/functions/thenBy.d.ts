declare class opt {
    direction?: number;
    ignoreCase?: boolean;
    cmp?: (v1: any, v2: any) => number;
}
export interface IThenBy<T> {
    (v1: T, v2: T): number;
    thenBy(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt): IThenBy<T>;
}
export declare let firstBy: <T = any>(key: ((v1: T, v2?: T) => any) | keyof T, direction?: number | opt) => IThenBy<T>;
export {};
