import { Entity } from "./entity";
import * as ts from "typescript";
import { programInfo } from "./programInfo";
import parseNode from "./utils/parseNode";

console.log("---BEGIN---\n");

// Hard coded
// Note: slashes must be / not \ as this is what is normalized.
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/abstract.d.ts";
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/functionTest.d.ts";
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/classTest.d.ts";
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/enumTest.d.ts";
// const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/interfaceTest.d.ts";
const metadata_file = "C:/Users/geren/Desktop/coding_practice/typescript-definition-language/test/abstract.d.ts";
const metadata_files = [metadata_file];

// compile
let compiler_options: ts.CompilerOptions = {
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2015
};

const program: ts.Program = ts.createProgram(metadata_files, compiler_options);
const checker: ts.TypeChecker = program.getTypeChecker();

// limit to files that match the metadata file
const source_files = program
  .getSourceFiles()
  .filter(x => metadata_files.indexOf(x.fileName) >= 0);

// What is contained in the source (there should be exactly one match)
const source_file = source_files[0];
const statements = source_file.statements;
// console.log(source_file.fileName, ' Statements:');
// console.log(statements)

const info: programInfo = {
  source_file: source_file,
  program: program,
  checker: checker
};

// Note: at all stages need to check for unsupported values to make sure that only the positive set is supported.
let entities: Entity[] = [];
statements.forEach(node => {
  let parsed_entities: Entity[] = parseNode(info, node);
  parsed_entities.forEach(e => entities.push(e));
});

entities.forEach(entity => {
  console.log(entity);
  console.log();
});
