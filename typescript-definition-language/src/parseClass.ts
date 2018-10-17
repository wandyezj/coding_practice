import * as ts from "typescript";
import { Entity, ClassMember } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation, documentation } from "./parseDocumentation";

export function parseClass(info: programInfo, node: ts.ClassDeclaration): Entity[] {
    const node_identifier: ts.Identifier = node.name!;
    let entity: Entity = { name: node_identifier.escapedText.toString(), type: 'class', classMembers: [] };

    // Documentation
    let docs: documentation = parseDocumentation(info, node_identifier);
    entity.documentation = docs.documentation;
    entity.jsDocs = docs.jsDocs;

    // Class members
    let symbol: ts.Symbol = info.checker.getSymbolAtLocation(node_identifier)!;
    symbol.members!.forEach((val, key) => {
        let methodName: string = key.toString();
        let declaration: ts.Declaration = val.getDeclarations()![0];
        let declarationType: string = ts.SyntaxKind[declaration.kind].replace('Declaration', '');
        entity.classMembers!.push({ [methodName]: declarationType });
    });

    return [entity];
}