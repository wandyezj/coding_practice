import { IEntity } from "../Entity";
import * as ts from "typescript";
import { IProgramInfo } from "../programInfo";
import { parseDocumentation, isDeclaration } from "./utils"

export default function parseNode(info: IProgramInfo, node: any): IEntity[] {
    if (ts.isModuleDeclaration(node)) {
        console.log("---PARSE NAMESPACE---\n");
        return parseNamespace(info, node);

    } else if (ts.isClassDeclaration(node)) {
        console.log("---PARSE CLASS---\n");
        return parseClass(info, node);

    } else if (ts.isInterfaceDeclaration(node)) {
        console.log("---PARSE INTERFACE---\n");
        return parseInterface(info, node);

    } else if (ts.isEnumDeclaration(node)) {
        console.log("---PARSE ENUM---\n");
        return parseEnum(info, node);

    } else if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isMethodSignature(node) || ts.isConstructorDeclaration(node)) {
        console.log("---PARSE FUNCTION---\n");
        return parseFunction(info, node);

    } else if (ts.isParameter(node)) {
        console.log("---PARSE PARAMETER---\n");
        return parseParameter(info, node);

    } else if (ts.isPropertyDeclaration(node) || ts.isPropertySignature(node)) {
        console.log("---PARSE PROPERTY---\n");
        return parseProperty(info, node);

    } else if (ts.isVariableDeclaration(node)) {
        console.log("---PARSE VARIABLE---\n");
        return parseVariable(info, node);
    }

    throw new TypeError(`Unsupported declaration: ${ts.SyntaxKind[node.kind]}`);
}

function parseNamespace(info: IProgramInfo, node: ts.ModuleDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = <ts.Identifier>node.name;
    let parsedEntities: IEntity[] = [];
    let moduleIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, moduleIEntity);

    // Module members
    (<ts.ModuleBlock>node.body!).statements.forEach((child: any) => {

        // Add child to current namespace's JSON representation
        if (!isDeclaration(child)) {
            child = child.declarationList.declarations[0]
        }

        let methodName: string = child.name!.getText();
        let interfaceMemberDecType: string = ts.SyntaxKind[child.kind];
        moduleIEntity.Members!.push({ [methodName]: interfaceMemberDecType });

        // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, child)];
    });

    parsedEntities.unshift(moduleIEntity);
    return parsedEntities;
}

function parseClass(info: IProgramInfo, node: ts.ClassDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = node.name!;
    let parsedEntities: IEntity[] = [];
    let classIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, classIEntity);

    // Class members
    node.members.forEach((classMemberDec, _) => {

        // Add member to current class' JSON representation
        let methodName: string = ts.isConstructorDeclaration(classMemberDec) ? 'Constructor' : (<ts.Identifier>classMemberDec.name).getText();
        let classMemberDecType: string = ts.SyntaxKind[classMemberDec.kind];
        classIEntity.Members!.push({ [methodName]: classMemberDecType });

        // // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, classMemberDec)];
    });

    // Inheritance
    if (node.heritageClauses) {
        node.heritageClauses.forEach(heritageClause => {
            if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                classIEntity.inheritsFrom = heritageClause.types[0].expression.getText();
            } else {
                let intfs: string[] = [];
                heritageClause.types.map(intfExpression => intfs.push(intfExpression.expression.getText()));
                classIEntity.implements = intfs;
            }
        });
    }

    parsedEntities.unshift(classIEntity);
    return parsedEntities;
}

function parseInterface(info: IProgramInfo, node: ts.InterfaceDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = node.name!;
    let parsedEntities: IEntity[] = [];
    let intfIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], Members: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, intfIEntity);

    // Interface members
    node.members.forEach((intfMemberDec, _) => {

        // Add member to current interface's JSON representation
        let methodName: string = (<ts.Identifier>intfMemberDec.name).getText();
        let interfaceMemberDecType: string = ts.SyntaxKind[intfMemberDec.kind];
        intfIEntity.Members!.push({ [methodName]: interfaceMemberDecType });

        // // Parse the members individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, intfMemberDec)];
    });

    // Inheritance
    if (node.heritageClauses) {
        node.heritageClauses.forEach(heritageClause => {
            let extensions: string[] = [];
            heritageClause.types.map(intfExpression => extensions.push(intfExpression.expression.getText()));
            intfIEntity.implements = extensions;
        });
    }

    parsedEntities.unshift(intfIEntity);
    return parsedEntities;
}

// Seems parsing a function and parsing a method are the exact same.
function parseFunction(info: IProgramInfo, node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.MethodSignature | ts.ConstructorDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = <ts.Identifier>node.name!;
    let parsedEntities: IEntity[] = [];
    let funcType = node.type!;

    // Clearly hacky, rework using inheritance.
    // Handles constructors.
    let kind: string = ts.isConstructorDeclaration(node) ? 'Constructor' : ts.SyntaxKind[node.kind];
    let name: string = ts.isConstructorDeclaration(node) ? 'Constructor' : nodeIdentifier.getText();
    let type: string = ts.isConstructorDeclaration(node) ? 'Constructor' : ts.SyntaxKind[node.type!.kind];

    // More hackyness.
    // Handles object types.
    if (funcType.kind === ts.SyntaxKind.TypeReference) {
        type = (<ts.TypeReferenceNode>node.type!).typeName.getText();
    }

    // Rework this too!
    // Handles array types (object types too).
    if (funcType.kind === ts.SyntaxKind.ArrayType) {
        funcType = (<ts.ArrayTypeNode>funcType).elementType;
        type = funcType.kind === ts.SyntaxKind.TypeReference ? (<ts.TypeReferenceNode>funcType).typeName.getText() : ts.SyntaxKind[funcType.kind];
        type += ' Array';
    }

    // Necesita rehacer este tambien!
    // Handles intersection types.
    if (funcType.kind === ts.SyntaxKind.IntersectionType) {
        type = '';
        (<ts.IntersectionTypeNode>funcType).types.forEach(curType => {
            if (curType.kind === ts.SyntaxKind.TypeReference) {
                type = type + (<ts.TypeReferenceNode>curType).typeName.getText() + ' & ';
            } else {
                type = type + ts.SyntaxKind[curType.kind] + ' & ';
            }
        });
        type = type.slice(0, -3);
    };

    let funcIEntity: IEntity = { name: name, kind: kind, type: type, parameters: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, funcIEntity);

    // Parameters
    node.parameters.forEach((paramDec: ts.ParameterDeclaration) => {

        // Add parameter to current function's JSON representation
        let paramName: string = (<ts.Identifier>paramDec.name).getText();
        let paramType: string = ts.SyntaxKind[paramDec.type!.kind];
        funcIEntity.parameters!.push({ [paramName]: paramType });

        // Parse the parameters individually.
        parsedEntities = [...parsedEntities, ...parseNode(info, paramDec)];
    });

    parsedEntities.unshift(funcIEntity);
    return parsedEntities;
}

function parseEnum(info: IProgramInfo, node: ts.EnumDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = node.name!;
    let entities: IEntity[] = [];
    let enumIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], enumMembers: [] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, enumIEntity);

    // Parse enum members and build enumIEntity
    node.members.forEach((member: ts.EnumMember) => {
        entities.push(parseEnumMembers(member, info));

        let enumName: string = member.name.getText();
        let enumVal: string | undefined = member.initializer ? member.initializer.getText() : undefined;
        enumIEntity.enumMembers!.push({ [enumName]: enumVal });
    });

    entities.unshift(enumIEntity);

    return entities;
}

function parseParameter(info: IProgramInfo, node: ts.ParameterDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = <ts.Identifier>node.name;

    // Is there anywhere else where optional types need to be handled? 
    let type = ts.SyntaxKind[node.type!.kind];
    if (node.questionToken) {
        type += '?';
    }
    let paramIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], type: type };

    // Documentation
    parseDocumentation(info, nodeIdentifier, paramIEntity);

    return [paramIEntity];
}

function parseProperty(info: IProgramInfo, node: ts.PropertyDeclaration | ts.PropertySignature): IEntity[] {
    const nodeIdentifier: ts.Identifier = <ts.Identifier>node.name;
    let propertyIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], type: ts.SyntaxKind[node.type!.kind] };

    // Documentation
    parseDocumentation(info, nodeIdentifier, propertyIEntity);

    return [propertyIEntity];
}

function parseVariable(info: IProgramInfo, node: ts.VariableDeclaration): IEntity[] {
    const nodeIdentifier: ts.Identifier = <ts.Identifier>node.name;

    // Super hacky, either make into function or have a super class all parsers derive from. 
    // Don't want to copy and paste this into all parsers. 
    // Handles union types
    let variableType = node.type!;
    let typeTest = ts.SyntaxKind[variableType.kind];
    if (variableType.kind === ts.SyntaxKind.UnionType) {
        typeTest = '';
        (<ts.UnionTypeNode>variableType).types.forEach(type => {
            typeTest += ts.SyntaxKind[type.kind];
            typeTest += ' | ';
        });
        typeTest = typeTest.slice(0, -3);
    }

    let variableIEntity: IEntity = { name: nodeIdentifier.getText(), kind: ts.SyntaxKind[node.kind], type: typeTest };

    // Documentation
    parseDocumentation(info, nodeIdentifier, variableIEntity);

    return [variableIEntity];
}

function parseEnumMembers(node: ts.EnumMember, info: IProgramInfo): IEntity {
    let IEntity: IEntity = { name: node.name.getText() };

    // Documentation
    parseDocumentation(info, <ts.Identifier>node.name, IEntity);

    return IEntity;
}