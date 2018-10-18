import { EnumDeclaration, Identifier, SyntaxKind, EnumMember } from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";

export function parseEnum(info: programInfo, node: EnumDeclaration): Entity[] {
    const nodeIdentifier: Identifier = node.name!;
    let entities: Entity[] = [];
    let enumEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], enumMembers: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, enumEntity);

    // Parse enum members and build enumEntity
    node.members.forEach((member: EnumMember) => {
        entities.push(parseEnumMembers(member, info));

        let enumName: string = member.name.getText();
        let enumVal: string | undefined = member.initializer ? member.initializer.getText() : undefined;
        enumEntity.enumMembers!.push({ [enumName]: enumVal });
    });

    entities.unshift(enumEntity);

    return entities;
}

function parseEnumMembers(node: EnumMember, info: programInfo): Entity {
    let entity: Entity = { name: node.name.getText() };

    // Documentation
    parseDocumentation(info, <Identifier>node.name, entity);

    return entity;
}
