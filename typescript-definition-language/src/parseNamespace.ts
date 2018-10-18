import { ModuleDeclaration, Identifier, SyntaxKind, ModuleBlock, Statement, NamedDeclaration } from "typescript";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";
import { parseDocumentation } from "./parseDocumentation";
import parseNode from "./utils/parseNode";

export function parseNamespace(info: programInfo, node: ModuleDeclaration): Entity[] {
    const nodeIdentifier: Identifier = <Identifier>node.name;
    let parsedEntities: Entity[] = [];
    let moduleEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, moduleEntity);

    // Module members
    (<ModuleBlock>node.body!).statements.forEach((child: any) => {

        // Add child to current namespace's JSON representation
        if (!isDeclaration(child)) {
            child = child.declarationList.declarations[0]
        }

        let methodName: string = child.name!.getText();
        let interfaceMemberDecType: string = SyntaxKind[child.kind];
        moduleEntity.Members!.push({ [methodName]: interfaceMemberDecType });
       
        // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, child)];
    });

    parsedEntities.unshift(moduleEntity);
    return parsedEntities;
}

function isDeclaration(obj: Statement | NamedDeclaration): obj is NamedDeclaration {
    return (<NamedDeclaration>obj).name !== undefined;
}