import { IEntity } from "./Entity";
import * as ts from "typescript";
import { IProgramInfo } from "./programInfo";
import parseNode from "./utils/parseNode";

console.log("---BEGIN---\n");

// Hard coded
// Note: slashes must be / not \ as this is what is normalized.
// const metadataFile = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/abstract.d.ts";
// const metadataFile = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/functionTest.d.ts";
// const metadataFile = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/classTest.d.ts";
// const metadataFile = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/enumTest.d.ts";
// const metadataFile = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/interfaceTest.d.ts";
const metadataFile =
    "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/abstract.d.ts";
const metadataFiles = [metadataFile];

// compile
let compilerOptions: ts.CompilerOptions = {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
};

const program: ts.Program = ts.createProgram(metadataFiles, compilerOptions);
const checker: ts.TypeChecker = program.getTypeChecker();

// limit to files that match the metadata file
const sourceFiles = program
    .getSourceFiles()
    .filter(x => metadataFiles.indexOf(x.fileName) >= 0);

// What is contained in the source (there should be exactly one match)
const sourceFile = sourceFiles[0];
const statements = sourceFile.statements;

const info: IProgramInfo = {
    checker,
    program,
    sourceFile,
};

// Note: at all stages need to check for unsupported values to make sure that only the positive set is supported.
let entities: IEntity[] = [];
statements.forEach(node => {
    let parsedEntities: IEntity[] = parseNode(info, node);
    parsedEntities.forEach(e => entities.push(e));
});

entities.forEach(IEntity => {
    console.log(IEntity);
    console.log();
});
