import { MethodDeclaration, Identifier, SyntaxKind, ParameterDeclaration } from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";

export function parseMethod(info: programInfo, node: MethodDeclaration): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name!;
    let methodEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[SyntaxKind.MethodDeclaration], type: SyntaxKind[node.type!.kind], methodParameters: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, methodEntity);

    // Parameters
    node.parameters.forEach((paramDec: ParameterDeclaration) => {
        let paramName: string = (<Identifier>paramDec.name).getText();
        let paramType: string = SyntaxKind[paramDec.type!.kind];
        methodEntity.methodParameters!.push({ [paramName]: paramType });
    }); 

    return [methodEntity];
}