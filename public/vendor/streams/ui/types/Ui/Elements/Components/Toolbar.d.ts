import { FASTElement } from '@microsoft/fast-element';
import { styled } from '../../Support';
export interface Toolbar extends styled.Element {
}
export declare class Toolbar extends FASTElement {
    static defaultCss: styled.CSS;
    handleButtonClick(e: any): void;
}
