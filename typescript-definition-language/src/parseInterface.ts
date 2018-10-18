import { InterfaceDeclaration, Identifier, SyntaxKind } from "typescript";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";
import { parseDocumentation } from "./parseDocumentation";
import parseNode from "./utils/parseNode";

export function parseInterface(info: programInfo, node: InterfaceDeclaration): Entity[] {
    const nodeIdentifier: Identifier = node.name!;
    let parsedEntities: Entity[] = [];
    let intfEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, intfEntity);

    // Interface members
    node.members.forEach((intfMemberDec, _) => {

        // Add member to current interface's JSON representation
        let methodName: string = (<Identifier>intfMemberDec.name).getText();
        let interfaceMemberDecType: string = SyntaxKind[intfMemberDec.kind];
        intfEntity.Members!.push({ [methodName]: interfaceMemberDecType });

        // // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, intfMemberDec)];
    });

    parsedEntities.unshift(intfEntity);
    return parsedEntities;
}