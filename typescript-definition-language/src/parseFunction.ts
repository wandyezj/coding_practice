import {
  FunctionDeclaration,
  MethodDeclaration,
  Identifier,
  SyntaxKind,
  ParameterDeclaration,
  MethodSignature,
  ConstructorDeclaration,
  isConstructorDeclaration,
  TypeReferenceNode
} from "typescript";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";
import { parseDocumentation } from "./parseDocumentation";
import parseNode from "./utils/parseNode";

// Seems parsing a function and parsing a method are the exact same.
export function parseFunction(info: programInfo, node: FunctionDeclaration | MethodDeclaration | MethodSignature | ConstructorDeclaration): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name!;
    let parsedEntities: Entity[] = [];

    // Clearly hacky, rework using inheritance.
    let kind: string = isConstructorDeclaration(node) ? 'Constructor' : SyntaxKind[node.kind];
    let name: string = isConstructorDeclaration(node) ? 'Constructor' : nodeIdentifier.getText();
    let type: string = isConstructorDeclaration(node) ? 'Constructor' : SyntaxKind[node.type!.kind];

    // More hackyness, custom types also needs to be taken into accound for the real implementation.
    if (node.type!.kind === SyntaxKind.TypeReference) {
        type = (<TypeReferenceNode>node.type!).typeName.getText();
    }

    let functionEntity: Entity = { name: name, kind: kind, type: type, parameters: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, functionEntity);

    // Parameters
    node.parameters.forEach((paramDec: ParameterDeclaration) => {

        // Add parameter to current function's JSON representation
        let paramName: string = (<Identifier>paramDec.name).getText();
        let paramType: string = SyntaxKind[paramDec.type!.kind];
        functionEntity.parameters!.push({ [paramName]: paramType });

        // Parse the parameters individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, paramDec)];
    }); 

    parsedEntities.unshift(functionEntity);
    return parsedEntities;
}