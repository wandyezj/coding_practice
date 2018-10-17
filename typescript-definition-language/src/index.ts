import {entity} from "./entity";
import {isUndefined} from "util";
import * as typescript from "typescript";
import {parseClass} from "./parseClass";
import {parseInterface} from "./parseInterface";
import {programInfo} from "./programInfo";
import {parseFunction} from "./parseFunction";
import {parseNamespace} from "./parseNamespace";

console.log("---BEGIN---\n");

// Hard coded
// Note: slashes must be / not \ as this is what is normalized.
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/abstract.d.ts";
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/function_test.d.ts";
const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/class_test.d.ts";
const metadata_files = [
    metadata_file,
];

// compile
let compiler_options: typescript.CompilerOptions = {
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  module: typescript.ModuleKind.CommonJS,
  target: typescript.ScriptTarget.ES2015,
};

const program: typescript.Program = typescript.createProgram(metadata_files, compiler_options);
const checker: typescript.TypeChecker = program.getTypeChecker();
// limit to files that match the metadata file

// console.log(program.getSourceFiles().map(x => x.fileName));
// console.log();

const source_files = program.getSourceFiles().filter(x => metadata_files.indexOf(x.fileName) >= 0);

// What is contained in the source (there should be exactly one match)
const source_file = source_files[0];
// console.log(source_file.fileName);
// console.log();
// console.log(source_file);
// console.log('statements:')
// console.log(source_file.statements)

const statements = source_file.statements;

const info: programInfo = {
    source_file:source_file,
    program: program,
    checker: checker
};

let entities: entity[] = [];

// Note: at all stages need to check for unsupported values to make sure that only the positive set is supported.
statements.forEach(x => {
    let parsed_entities: entity[] = []

    if (typescript.isInterfaceDeclaration(x)) {
        console.log("\n---PARSE INTERFACE---\n");
        parsed_entities = parseInterface(info, x);

    } else if (typescript.isClassDeclaration(x)) {
        console.log("\n---PARSE CLASS---\n");
        parsed_entities = parseClass(info, x);

    } else if (typescript.isModuleDeclaration(x)) {
        console.log("\n---PARSE NAMESPACE---\n");
        parsed_entities = parseNamespace(info, x);

    } else if (typescript.isFunctionDeclaration(x)){
        console.log("\n---PARSE FUNCTION---\n");
        parsed_entities = parseFunction(info, x);

    } else {
        throw new TypeError("Unsupported declaration");
    }

    parsed_entities.forEach(e => entities.push(e));

    console.log();
});

// console.log(JSON.stringify(entities));
