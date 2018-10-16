import * as typescript from "typescript";
import {entity} from "./entity";
import {isUndefined} from "util";
import {programInfo} from "./programInfo";
import {parseModifiers} from "./parseModifiers";

export function parseClass(info: programInfo, node: typescript.ClassDeclaration): entity[] {
    const class_name_identifier = node.name;
    if (isUndefined(class_name_identifier)) {
        throw new TypeError("Invalid declaration of a class without a name");
    }

    // Get the class documentation
    let class_documentation: string = "";
    let symbol = info.checker.getSymbolAtLocation(class_name_identifier);
    if (symbol) {
        class_documentation = typescript.displayPartsToString(symbol.getDocumentationComment(undefined));

        const tags: typescript.JSDocTagInfo[] = symbol.getJsDocTags();

        // Can pick up the tags as part of the js doc comment
        tags.forEach(tag => {
            console.log(tag.name);
            console.log(tag.text);
        });

        /*
        const symbol_type: typescript.Type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);

        const signatures = symbol_type.getConstructSignatures();

        signatures.forEach(signature => {

            const declaration = signature.getDeclaration();
            const comment = signature.getDocumentationComment(undefined);

        });

        let output = symbol_type.getConstructSignatures().map(signature => signature.getDeclaration);


        console.log("====================================\nSymbol:");
        //console.log(output);
        //console.log(symbol_type.getConstructSignatures());
        console.log("====================================");
        console.log(symbol.getDocumentationComment(undefined))
        //console.log(class_documentation);
        console.log("====================================");

        //console.log(symbol);
        */
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
    parseModifiers(info, node.modifiers);

    let e: entity = {name: class_name, documentation: class_documentation};
    return [e];
}