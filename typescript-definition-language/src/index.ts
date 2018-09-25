import * as typescript from "typescript";
import { isUndefined } from "util";

// Hard coded
// Note: slashes must be / not \ as this is what is normalized.
const metadata_file = "R:/coding_practice/typescript-definition-language/test/test.d.ts";
const metadata_files = [
    metadata_file
];



// compile
let compiler_options = {
  target: typescript.ScriptTarget.ES2015,
  module: typescript.ModuleKind.CommonJS,
  experimentalDecorators: true,
  emitDecoratorMetadata: true
};

const program: typescript.Program = typescript.createProgram(metadata_files, compiler_options);

// limit to files that match the metadata file

console.log(program.getSourceFiles().map(x =>x.fileName));

const source_files = program.getSourceFiles().filter(x => metadata_files.indexOf(x.fileName) >= 0);

// What is contained in the source (there should be exactly one match)
const source_file = source_files[0];
console.log(source_file);

//console.log('statements:')
//console.log(source_file.statements)

const statements = source_file.statements;


console.log('\n\nParsed Types:')

// the only allowable modifier should be declare 

function parseModifiers(modifiers: typescript.NodeArray<typescript.Modifier> | undefined): void {


    if (!isUndefined(modifiers)){

        modifiers.forEach((x) => {
            if (typescript.isModifier(x)) {
                const modifier: typescript.Modifier = x as typescript.Modifier;
                //console.log(modifier);
                // Can look at the specific text from the source file to get the type (in this case it should be 'declare')
                const modifier_text = modifier.getText(source_file);
                console.log(`\tModifier: [${modifier_text}]`);
            }
        });
    }
}




function parseInterface(node: typescript.InterfaceDeclaration): void {
    console.log(`Found Interface: [${node.name.escapedText}]`);

    // dealing with modifiers.
    parseModifiers(node.modifiers);

    //console.log(node.modifiers);
    //console.log(x.name);
    //console.log(x.name.escapedText);

    console.log(node.members);


}

function parseClass(node: typescript.ClassDeclaration): void {
    const class_name = node.name;
    if (isUndefined(class_name)) {
        throw new TypeError('Invalid declaration of a class without a name');
    }

    
    console.log(`Found Class: [${class_name.escapedText}]`);
    parseModifiers(node.modifiers);
}

// Note: at all stages need to check for unsupported values to make sure that only the positive set is supported.
statements.forEach((x) => {
    if (typescript.isInterfaceDeclaration(x)) {
        parseInterface(x);
    } else if (typescript.isClassDeclaration(x)) {
        parseClass(x);
    } else {
        throw new TypeError('Unsupported declaration');  
    }
    console.log();
})



