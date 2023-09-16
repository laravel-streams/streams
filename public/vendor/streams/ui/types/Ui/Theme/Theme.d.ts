import { UIManager } from '../UIManager';
import { Join, PathsToStringProps } from '../../Core/types/helpers';
import { DotNotatedColorKeys } from './colors';
import { Color } from './Color';
export declare abstract class Theme {
    protected ui: UIManager;
    abstract name: string;
    extends?: typeof Theme;
    palette: {
        primary: Color;
        success: Color;
        info: Color;
        warning: Color;
        danger: Color;
    };
    base: {
        font_color: string;
        background_color: string;
        font_size: string;
        font_family: string;
    };
    ui_toolbar: {
        height: string;
        background: string;
        color: string;
    };
    ui_cp: {};
    ui_cp_sidebar: {
        width: string;
        background: string;
        color: string;
    };
    ui_cp_header: {
        height: string;
        background: string;
        color: string;
    };
    ui_alert: {
        label_size: string;
        message_size: string;
        success_background: string;
        success_color: string;
        info_background: string;
        info_color: string;
        warning_background: string;
        warning_color: string;
        danger_background: string;
        danger_color: string;
    };
    constructor(ui: UIManager);
    abstract onLoad(): any;
    var(name: Variable): string;
    get(key: DotNotatedThemeKeys): any;
    color(key: DotNotatedColorKeys): Color;
}
declare const variables: {
    ui_color: string;
    ui_background_color: string;
    ui_cp_header_height: string;
    ui_cp_header_background: string;
    ui_cp_sidebar_width: string;
    ui_cp_sidebar_background: string;
    ui_cp_sidebar_color: string;
    ui_toolbar_height: string;
    ui_toolbar_background: string;
    ui_toolbar_color: string;
    ui_alert_label_size: string;
    ui_alert_message_size: string;
    ui_alert_success_background: string;
    ui_alert_success_color: string;
    ui_alert_info_background: string;
    ui_alert_info_color: string;
    ui_alert_warning_background: string;
    ui_alert_warning_color: string;
    ui_alert_danger_background: string;
    ui_alert_danger_color: string;
};
declare type Variables = typeof variables;
declare type Variable = keyof Variables;
export declare const theme: {
    ui: {
        color: string;
        background_color: string;
    };
    ui_toolbar: {
        height: string;
        background: string;
        color: string;
    };
    ui_cp: {};
    ui_cp_sidebar: {
        width: string;
        background: string;
        color: string;
    };
    ui_cp_header: {
        height: string;
        background: string;
        color: string;
    };
    ui_alert: {
        label_size: string;
        message_size: string;
        success_background: string;
        success_color: string;
        info_background: string;
        info_color: string;
        warning_background: string;
        warning_color: string;
        danger_background: string;
        danger_color: string;
    };
};
export declare type DotNotatedThemeKeys = Join<PathsToStringProps<typeof theme>, '.'>;
export declare const t: (key: DotNotatedThemeKeys) => any;
export declare class DefaultTheme extends Theme {
    name: 'default';
    onLoad(): void;
}
export {};
