
export interface metadata {
    [key: string]: string | undefined;
}

export interface entity {
    name: string;
    documentation?: string;
    metadata?: metadata;
    type?: "namespace" | "interface" | "class" | "method" | "function" | "property"; 
}