import * as ts from "typescript";

export interface IProgramInfo {
    sourceFile: ts.SourceFile;
    program: ts.Program;
    checker: ts.TypeChecker;
}
