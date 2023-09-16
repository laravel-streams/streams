import { Collection } from '../../Core';
import { FASTElementDefinition } from '@microsoft/fast-element';
export interface DefinitionCollectionItem {
    name: string;
    definition: FASTElementDefinition;
}
export declare class DefinitionCollection extends Collection<DefinitionCollectionItem> {
    set(name: string, definition: FASTElementDefinition): this;
    get(name: any): DefinitionCollectionItem;
    has(name: any): boolean;
}
