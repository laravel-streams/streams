import { Application } from '../../Core';
import { Theme } from './Theme';
import { interfaces } from 'inversify';
import Newable = interfaces.Newable;
export declare class ThemeManager {
    app: Application;
    themes: Record<string, Newable<Theme>>;
    active?: Theme;
    register(name: string, theme: Newable<Theme>): void;
    load(name: string): void;
    unload(): void;
}
