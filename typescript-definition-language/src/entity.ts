export interface JsDocs {
    [key: string]: string | undefined;
}

export interface FuncParameter {
    [key: string]: string;
}

export interface Member {
    [key: string]: string;
}

export interface EnumMember {
    [key: string]: any;
}

export interface Entity {
    name: string;
    documentation?: string;
    jsDocs?: JsDocs;
    kind?: string;
    type?: string;
    parameters?: FuncParameter[];
    Members?: Member[];
    enumMembers?: EnumMember[];
    propertyType?: any;
    methodParameters?: FuncParameter[];
    inheritsFrom?: string;
    implements?: string[];
}