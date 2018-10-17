
export interface jsDocs {
    [key: string]: string | undefined;
}

export interface funcParameter {
    [key: string] : string;
}

export interface classMember {
    [key: string]: string;
}

export interface entity {
    name: string;
    documentation?: string;
    jsDocs?: jsDocs;
    type?: "namespace" | "interface" | "class" | "method" | "function" | "property"; 
    funcParameters?: funcParameter[],
    classMembers?: classMembers[];
}