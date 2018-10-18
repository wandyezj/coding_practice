import { Identifier, SyntaxKind, ParameterDeclaration } from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";

export function parseParameter(info: programInfo, node: ParameterDeclaration): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name;

    // Is there anywhere else where optional types need to be handled? 
    let type = SyntaxKind[node.type!.kind];
    if (node.questionToken) {
        type += '?';
    }
    let paramEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], type: type };

    // Documentation
    parseDocumentation(info, nodeIdentifier, paramEntity);

    return [paramEntity];
}