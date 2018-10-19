import {
    Identifier,
    SyntaxKind,
    VariableDeclaration,
    isMappedTypeNode,
    UnionTypeNode,
    ArrayTypeNode
  } from "typescript";
  import { Entity } from "./entity";
  import { programInfo } from "./programInfo";
  import { parseDocumentation } from "./parseDocumentation";
  
  export function parseVariable(info: programInfo, node: VariableDeclaration): Entity[] {
      const nodeIdentifier: Identifier = <Identifier>node.name;

      // Super hacky, either make into function or have a super class all parsers derive from. 
      // Don't want to copy and paste this into all parsers. 
      // Handles union types
      let variableType = node.type!;
      let typeTest = SyntaxKind[variableType.kind];
      if (variableType.kind === SyntaxKind.UnionType) {
        typeTest = '';
        (<UnionTypeNode>variableType).types.forEach(type => {
            typeTest+= SyntaxKind[type.kind];
            typeTest += ' | ';
        });
        typeTest = typeTest.slice(0, -3);
      }

      let variableEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], type: typeTest };
  
      // Documentation
      parseDocumentation(info, nodeIdentifier, variableEntity);
  
      return [variableEntity];
  }