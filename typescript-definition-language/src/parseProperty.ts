import {
  PropertyDeclaration,
  Identifier,
  SyntaxKind,
  PropertySignature
} from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";

export function parseProperty(info: programInfo, node: PropertyDeclaration | PropertySignature): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name;
    let propertyEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], type: SyntaxKind[node.type!.kind] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, propertyEntity);

    return [propertyEntity];
}