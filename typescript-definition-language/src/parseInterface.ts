import * as typescript from "typescript";
import { parseModifiers } from "./parseModifiers";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";
import { parseDocumentation, documentation } from "./parseDocumentation";

export function parseInterface(info: programInfo, node: typescript.InterfaceDeclaration): Entity[] {
    const node_identifier: typescript.Identifier = node.name!;
    const name: string = node_identifier.escapedText.toString();
    console.log(`Found Interface: [${name}]`);

    // Documentation
    const docs: documentation = parseDocumentation(info, node_identifier);
    console.log(docs);

    // dealing with modifiers.
    parseModifiers(info, node.modifiers);



    // console.log(node.modifiers);
    // console.log(x.name);
    // console.log(x.name.escapedText);

    console.log(node.members);

    return [{ name: name }]
}