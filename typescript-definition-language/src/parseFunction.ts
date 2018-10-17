import * as ts from "typescript";
import { programInfo } from "./programInfo";
import { Entity, FuncParameter } from "./entity";
import { parseDocumentation, documentation } from "./parseDocumentation";

export function parseFunction(info: programInfo, node: ts.FunctionDeclaration): Entity[] {
    const node_identifier: ts.Identifier = node.name!;
    let entity: Entity = { name: node_identifier.escapedText.toString(), type: 'function', funcParameters: [] };

    // Documentation
    let docs: documentation = parseDocumentation(info, node_identifier);
    entity.documentation = docs.documentation;
    entity.jsDocs = docs.jsDocs;

    // Parameters
    let symbol: ts.Symbol = info.checker.getSymbolAtLocation(node_identifier)!;
    let functionType = info.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    let signatures = functionType.getCallSignatures()[0];
    signatures.getParameters().forEach(param => {
        let paramName: string = param.getName();
        let funcType: string = info.checker.typeToString(info.checker.getTypeOfSymbolAtLocation(param, param.valueDeclaration!));
        entity.funcParameters!.push({ [paramName]: funcType });
    });

    return [entity];
}