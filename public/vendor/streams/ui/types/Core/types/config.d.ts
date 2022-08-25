import { Repository } from '../Config';
import { IServiceProviderClass } from '../Support';
export declare type Config = Repository<Configuration> & Configuration;
export interface Configuration {
    debug?: boolean;
    csrf?: string;
}
export interface ApplicationInitOptions {
    providers?: IServiceProviderClass[];
    config?: Configuration;
}
