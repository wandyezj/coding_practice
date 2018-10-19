import {
  ClassDeclaration,
  Identifier,
  SyntaxKind,
  isConstructorDeclaration,
  InterfaceDeclaration
} from "typescript";
import { Entity } from "./entity";
import { programInfo } from "./programInfo";
import { parseDocumentation } from "./parseDocumentation";
import parseNode from "./utils/parseNode";

export function parseClass(info: programInfo, node: ClassDeclaration): Entity[] {
    const nodeIdentifier: Identifier = node.name!;
    let parsedEntities: Entity[] = [];
    let classEntity: Entity = { name: nodeIdentifier.getText(), kind: SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, classEntity);

    // Class members
    node.members.forEach((classMemberDec, _) => {

        // Add member to current class' JSON representation
        let methodName: string = isConstructorDeclaration(classMemberDec) ? 'Constructor' : (<Identifier>classMemberDec.name).getText();
        let classMemberDecType: string = SyntaxKind[classMemberDec.kind];
        classEntity.Members!.push({ [methodName]: classMemberDecType });

        // // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, classMemberDec)];
    });

    // Inheritance
    if (node.heritageClauses) {
        node.heritageClauses.forEach(heritageClause => {
            if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                classEntity.inheritsFrom = heritageClause.types[0].expression.getText();
            } else {
                let intfs: string[] = [];
                heritageClause.types.map(intfExpression => intfs.push(intfExpression.expression.getText()));
                classEntity.implements = intfs;
            }
        });
    }

    parsedEntities.unshift(classEntity);
    return parsedEntities;
}

