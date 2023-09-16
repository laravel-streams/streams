import { FASTElement } from '@microsoft/fast-element';
export declare class Alert extends FASTElement {
    label?: string;
    type: string;
    types: string[];
    get classes(): string;
}
