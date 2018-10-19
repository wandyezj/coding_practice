export interface IJsDocs {
    [key: string]: string | undefined;
}

export interface IFuncParameter {
    [key: string]: string;
}

export interface IMember {
    [key: string]: string;
}

export interface IEnumMember {
    [key: string]: any;
}

export interface IEntity {
    name: string;
    documentation?: string;
    jsDocs?: IJsDocs;
    kind?: string;
    type?: string;
    parameters?: IFuncParameter[];
    Members?: IMember[];
    enumMembers?: IEnumMember[];
    propertyType?: any;
    methodParameters?: IFuncParameter[];
    inheritsFrom?: string;
    implements?: string[];
}
