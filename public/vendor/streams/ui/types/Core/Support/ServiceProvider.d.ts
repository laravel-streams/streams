import { Application } from '../Foundation';
export declare const isServiceProviderClass: (value: any) => value is IServiceProviderClass;
export declare class ServiceProvider implements IServiceProvider {
    app: Application;
    constructor(app: Application);
}
export declare type Constructor<Type = any> = new (...args: any[]) => Type;
export declare type IServiceProviderClass = {
    new (app: Application): IServiceProvider;
};
export interface IServiceProvider {
    app: Application;
    providers?: IServiceProviderClass[];
    singletons?: Record<string, Constructor>;
    bindings?: Record<string, Constructor>;
    configure?(config: Application['config']): void;
    register?(): any | Promise<any>;
    boot?(): any | Promise<any>;
}
