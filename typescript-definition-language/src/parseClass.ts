import * as ts from "typescript";
import {entity, classMember} from "./entity";
import {programInfo} from "./programInfo";
import {parseDocumentation, documentation} from "./parseDocumentation";

export function parseClass(info: programInfo, node: any): entity[] {
    const node_identifier: ts.Identifier = node.name;
    let entity: entity = {name: node_identifier.escapedText.toString(), type: 'class', classMembers: []};

    // Documentation
    let docs: documentation = parseDocumentation(info, node_identifier);
    entity.documentation = docs.documentation;
    entity.jsDocs = docs.jsDocs;

    // Class members
    let symbol: ts.Symbol = info.checker.getSymbolAtLocation(node_identifier)!;
    let members = symbol.members;
    members!.forEach((val, key) => {
        let declaration: ts.Declaration = val.getDeclarations()![0];
        let declarationType: string = ts.SyntaxKind[declaration.kind].replace('Declaration', '');
        let classMember: classMember = {[val.getName()]: declarationType};
        entity.classMembers!.push(classMember);
    });

    console.log(entity);
    return [entity];
}