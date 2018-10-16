import * as typescript from "typescript";

export interface programInfo {
    source_file: typescript.SourceFile;
    program: typescript.Program;
    checker: typescript.TypeChecker;
}