import * as typescript from "typescript";
import { isUndefined } from "util";
import {entity} from "./entity"

// Hard coded
// Note: slashes must be / not \ as this is what is normalized.
const metadata_file = "R:/coding_practice/typescript-definition-language/test/simple_test.d.ts";
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
const checker: typescript.TypeChecker = program.getTypeChecker();
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

function parseClass(node: typescript.ClassDeclaration): entity {
    const class_name_identifier = node.name;
    if (isUndefined(class_name_identifier)) {
        throw new TypeError('Invalid declaration of a class without a name');
    }

    // Get the class documentation
    let class_documentation: string = "";
    let symbol = checker.getSymbolAtLocation(class_name_identifier);
    if (symbol) {
        class_documentation = typescript.displayPartsToString(symbol.getDocumentationComment(undefined));

        const tags: typescript.JSDocTagInfo[] = symbol.getJsDocTags();

        // Can pick up the tags as part of the js doc comment
        tags.forEach(tag => {
            console.log(tag.name);
            console.log(tag.text)
        });

        const symboltype: typescript.Type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);

        const signatures = symboltype.getConstructSignatures();

        signatures.forEach(signature => {
            
            const declaration = signature.getDeclaration();
            const comment = signature.getDocumentationComment(undefined);

        });

        let output = symboltype.getConstructSignatures().map(signature => signature.getDeclaration);

        
        console.log("====================================\nSymbol:");
        //console.log(output);
        //console.log(symboltype.getConstructSignatures());
        console.log("====================================");
        console.log(symbol.getDocumentationComment(undefined))
        //console.log(class_documentation);
        console.log("====================================");
        
        //console.log(symbol);
    }
    /*
    console.log(source_file.getText());
    console.log(node.getFullStart());
    console.log(typescript.getJSDocClassTag(node));
    console.log(typescript.getJSDocTags(node));
    let comments = typescript.getTrailingCommentRanges(source_file.getText(), node.getFullStart()-7);
    console.log("Comment Ranges:");

    console.log(JSON.stringify(comments));
*/

    const class_name: string = class_name_identifier.escapedText.toString();
    console.log(`Found Class: [${class_name}]`);
    parseModifiers(node.modifiers);

    let e: entity = {name: class_name, documentation:class_documentation};
    return e;
}


let entities: entity[] = [];

// Note: at all stages need to check for unsupported values to make sure that only the positive set is supported.
statements.forEach((x) => {
    if (typescript.isInterfaceDeclaration(x)) {
        parseInterface(x);
    } else if (typescript.isClassDeclaration(x)) {
        const e: entity = parseClass(x);
        entities.push(e);



    } else {
        throw new TypeError('Unsupported declaration');  
    }



    console.log();
})


console.log(JSON.stringify(entities));


