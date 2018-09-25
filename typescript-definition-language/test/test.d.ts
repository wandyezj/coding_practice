
// https://www.typescriptlang.org/docs/handbook/interfaces.html
// Interfaces are considered shape only
// No functions are allowed
declare interface interface_x {
    property_string: string;
    property_number: number;
}

declare class class_x {
    readonly property_readonly_number: number;
    method_string(): string;
}