import { Application, ServiceProvider } from '../Core';
import { StreamsUiConfiguration } from './types';
import { UIManager } from './UIManager';
declare module '../Core/Foundation/Application' {
    interface Application {
        ui: UIManager;
    }
}
declare module '../Core/types/config' {
    interface Configuration {
        ui?: StreamsUiConfiguration;
    }
}
export declare class UiServiceProvider extends ServiceProvider {
    configure(config: Application['config']): void;
    register(): void;
    boot(): void;
    bootKeymap(): void;
}
