import * as typescript from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import { entity } from "./entity";

export function parseInterface(info: programInfo, node: typescript.InterfaceDeclaration): entity[] {
    const name: string = node.name.escapedText.toString();
    console.log(`Found Interface: [${name}]`);

    // dealing with modifiers.
    parseModifiers(info, node.modifiers);

    // console.log(node.modifiers);
    // console.log(x.name);
    // console.log(x.name.escapedText);

    console.log(node.members);

    return [{name:name}]
}