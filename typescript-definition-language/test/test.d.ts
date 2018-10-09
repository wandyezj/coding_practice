
// https://www.typescriptlang.org/docs/handbook/interfaces.html
// Interfaces are considered shape only
// No functions are allowed
declare interface interface_x {
    property_string: string;
    property_number: number;
}

/**
 * Documentation class_x
 * @name hi
 * @namespace hello
 * @beta
 * @internal
 */
declare class class_x {
    /**
     * Documentation property_readonly_number
     */
    readonly property_readonly_number: number;

    /**
     * Documentation method_string
     */
    method_string(): string;

    /**
     * Documentation method_arguments_string
     */
    method_arguments_string(): string;
}