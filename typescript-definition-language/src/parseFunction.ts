import {
  FunctionDeclaration,
  MethodDeclaration,
  Identifier,
  SyntaxKind,
  ParameterDeclaration,
  MethodSignature,
  ConstructorDeclaration,
  isConstructorDeclaration,
  TypeReferenceNode,
  ArrayTypeNode,
  IntersectionTypeNode
} from "typescript";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";
import { parseDocumentation } from "./parseDocumentation";
import parseNode from "./utils/parseNode";

// Seems parsing a function and parsing a method are the exact same.
export function parseFunction(info: programInfo, node: FunctionDeclaration | MethodDeclaration | MethodSignature | ConstructorDeclaration): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name!;
    let parsedEntities: Entity[] = [];
    let funcType = node.type!;

    // Clearly hacky, rework using inheritance.
    // Handles constructors.
    let kind: string = isConstructorDeclaration(node) ? 'Constructor' : SyntaxKind[node.kind];
    let name: string = isConstructorDeclaration(node) ? 'Constructor' : nodeIdentifier.getText();
    let type: string = isConstructorDeclaration(node) ? 'Constructor' : SyntaxKind[node.type!.kind];

    // More hackyness.
    // Handles object types.
    if (funcType.kind === SyntaxKind.TypeReference) {
        type = (<TypeReferenceNode>node.type!).typeName.getText();
    }

    // Rework this too!
    // Handles array types (object types too).
    if (funcType.kind === SyntaxKind.ArrayType) {
        funcType = (<ArrayTypeNode>funcType).elementType;
        type = funcType.kind === SyntaxKind.TypeReference ? (<TypeReferenceNode>funcType).typeName.getText() : SyntaxKind[funcType.kind];
        type += ' Array';
    }

    // Necesita rehacer este tambien!
    // Handles intersection types.
    if (funcType.kind === SyntaxKind.IntersectionType) {
        type = '';
        (<IntersectionTypeNode>funcType).types.forEach(curType => {
            if (curType.kind === SyntaxKind.TypeReference) {
                type = type + (<TypeReferenceNode>curType).typeName.getText() + ' & ';
            } else {
                type = type + SyntaxKind[curType.kind] + ' & ';
            }
        });
        type = type.slice(0, -3);
    };

    let funcEntity: Entity = { name: name, kind: kind, type: type, parameters: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, funcEntity);

    // Parameters
    node.parameters.forEach((paramDec: ParameterDeclaration) => {

        // Add parameter to current function's JSON representation
        let paramName: string = (<Identifier>paramDec.name).getText();
        let paramType: string = SyntaxKind[paramDec.type!.kind];
        funcEntity.parameters!.push({ [paramName]: paramType });

        // Parse the parameters individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, paramDec)];
    }); 

    parsedEntities.unshift(funcEntity);
    return parsedEntities;
}