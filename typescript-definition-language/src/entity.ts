
export interface JsDocs {
    [key: string]: string | undefined;
}

export interface FuncParameter {
    [key: string]: string;
}

export interface ClassMember {
    [key: string]: string;
}

export interface EnumMember {
    [key: string]: any;
}

export interface Entity {
    name: string;
    documentation?: string;
    jsDocs?: JsDocs;
    type?: 'namespace' | 'interface' | 'class' | 'method' | 'function' | 'property' | 'enum';
    funcParameters?: FuncParameter[],
    classMembers?: ClassMember[];
    enumMembers?: EnumMember[];
}