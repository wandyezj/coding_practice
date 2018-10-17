import * as ts from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";

export function parseEnum(info: programInfo, node: ts.EnumDeclaration): Entity[] {
    const node_identifier: ts.Identifier = node.name!;
    let entities: Entity[] = [];
    let enumEntity: Entity = { name: node_identifier.escapedText.toString(), type: 'enum', enumMembers: [] };

    // Documentation
    parseDocumentation(info, node_identifier, enumEntity);

    // Parse enum members and build enumEntity
    node.members.forEach((member: ts.EnumMember) => {
        entities.push(parseEnumMembers(member, info));

        let enumName = member.name.getText();
        let enumVal = member.initializer ? member.initializer.getText() : undefined;
        enumEntity.enumMembers!.push({ [enumName]: enumVal });
    });

    entities.unshift(enumEntity);

    return entities;
}

function parseEnumMembers(node: ts.EnumMember, info: programInfo): Entity {
    let entity: Entity = { name: node.name.getText() };

    // Documentation
    parseDocumentation(info, <ts.Identifier>node.name, entity);

    return entity;
}
