import { FASTElement } from '@microsoft/fast-element';
import { NestedCSSProperties as BaseNestedCSSProperties } from 'typestyle/src/types';
import { Observable } from '../../../Core';
import { Theme } from '../../Theme/Theme';
export interface StyledDecoratorOptions {
    observe?: boolean;
    importStylesheets?: boolean;
    importSelector?: string;
}
export declare function styled(options?: StyledDecoratorOptions): ClassDecorator;
export declare namespace styled {
    interface Element extends FASTElement {
        css?: (Observable & CSS) | CSS;
        updateCss(): void;
    }
    type Styles = {
        [P in keyof NestedCSSProperties]: NestedCSSProperties[P] | ((theme: Theme) => NestedCSSProperties[P]);
    };
    type CSS = Record<string, Styles>;
}
export interface NestedCSSProperties extends BaseNestedCSSProperties {
    $displayName?: string;
}
export declare type StyleFunction = (className: string, obj: styled.Styles) => void;
