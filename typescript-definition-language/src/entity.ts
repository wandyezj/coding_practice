
export interface metadata {
    [key: string]: string;
}

export interface entity {
    name: string;
    documentation?: string;
    metadata?: metadata;
    type?: "namespace" | "interface" | "class" | "method" | "function" | "property"; 
}