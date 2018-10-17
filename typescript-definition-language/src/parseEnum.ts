import * as ts from "typescript";
import { Entity, EnumMember } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation, documentation } from "./parseDocumentation";

export function parseEnum(info: programInfo, node: ts.EnumDeclaration): Entity[] {
    const node_identifier: ts.Identifier = node.name!;
    let entity: Entity = { name: node_identifier.escapedText.toString(), type: 'enum', enumMembers: [] };

    // Documentation
    let docs: documentation = parseDocumentation(info, node_identifier);
    entity.documentation = docs.documentation;
    entity.jsDocs = docs.jsDocs;

    // Enum members
    node.members.forEach((member: ts.EnumMember) => {
        let enumName = member.name.getText();
        let enumVal = member.initializer ? member.initializer.getText() : undefined;
        entity.enumMembers!.push({ [enumName]: enumVal });
    });

    return [entity];
}