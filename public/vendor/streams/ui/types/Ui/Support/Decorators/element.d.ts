import { PartialFASTElementDefinition } from '@microsoft/fast-element';
export declare function element(name: string): ClassDecorator;
export declare function element(def: PartialFASTElementDefinition): ClassDecorator;
export declare function element(name: string, def?: Omit<PartialFASTElementDefinition, 'name'>): ClassDecorator;
