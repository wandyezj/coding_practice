import * as ts from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import {entity, funcParameter} from "./entity";
import {parseDocumentation, documentation} from "./parseDocumentation";

export function parseFunction(info: programInfo, node: any): entity[] {
    const node_identifier: ts.Identifier = node.name;
    let entity: entity = {name: node_identifier.escapedText.toString(), type: 'function', funcParameters: []};

    // Documentation
    let docs: documentation = parseDocumentation(info, node_identifier);
    entity.documentation = docs.documentation;
    entity.metadata = docs.metadata;

    // Parameters
    let symbol: ts.Symbol = info.checker.getSymbolAtLocation(node_identifier)!;
    let functionType = info.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    let signatures = functionType.getCallSignatures()[0];
    signatures.getParameters().forEach(param => {
        let funcParam: funcParameter = {[param.getName()]: info.checker.typeToString(info.checker.getTypeOfSymbolAtLocation(param, param.valueDeclaration!))};
        entity.funcParameters!.push(funcParam);
    });
    
    console.log(entity);
    return [entity];
}