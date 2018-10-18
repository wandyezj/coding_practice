import { SourceFile, Program, TypeChecker } from "typescript";

export interface programInfo {
    source_file: SourceFile;
    program: Program;
    checker: TypeChecker;
}