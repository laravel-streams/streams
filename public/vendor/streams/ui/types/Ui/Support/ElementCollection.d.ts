import { Collection } from '../../Core';
import { FASTElement, PartialFASTElementDefinition } from '@microsoft/fast-element';
export interface ElementCollectionItem<T extends typeof FASTElement = typeof FASTElement> {
    name: string;
    element: T;
    definition: PartialFASTElementDefinition;
}
export declare class ElementCollection extends Collection<ElementCollectionItem> {
    add(name: string, element: typeof FASTElement, definition: PartialFASTElementDefinition): this;
    set(name: string, element: typeof FASTElement, definition: PartialFASTElementDefinition): this;
    get<T extends typeof FASTElement>(name: any): ElementCollectionItem<T>;
    has(name: any): boolean;
}
