import { ServiceProvider } from '../Support';
import { Streams, StreamsConfiguration } from '@laravel-streams/api-client';
import { Application } from '../Foundation';
declare module '../types/config' {
    interface Configuration {
        api?: StreamsConfiguration;
    }
}
export declare class HttpServiceProvider extends ServiceProvider {
    configure(config: Application['config']): void;
    /**
     * Register the service.
     */
    register(): void;
    protected registerStreams(): void;
}
declare module '../Foundation/Application' {
    interface Application {
        streams: Streams;
        api: Streams;
    }
}
