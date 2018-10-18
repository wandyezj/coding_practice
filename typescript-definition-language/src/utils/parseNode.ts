import { Entity } from "../entity";
import {
  isInterfaceDeclaration,
  isClassDeclaration,
  isModuleDeclaration,
  isFunctionDeclaration,
  isEnumDeclaration,
  isPropertyDeclaration,
  isMethodDeclaration,
  isParameter,
  SyntaxKind,
  isMethodSignature,
  isPropertySignature,
  isConstructorDeclaration,
  isVariableDeclaration
} from "typescript";
import { parseClass } from "../parseClass";
import { parseInterface } from "../parseInterface";
import { programInfo } from "../programInfo";
import { parseFunction } from "../parseFunction";
import { parseNamespace } from "../parseNamespace";
import { parseEnum } from "../parseEnum";
import { parseProperty } from "../parseProperty";
import { parseParameter } from "../parseParameter";
import { parseVariable } from "../parseVariable";

export default function parseNode(info: programInfo, node: any): Entity[] {
    if (isInterfaceDeclaration(node)) {
        console.log("---PARSE INTERFACE---\n");
        return parseInterface(info, node);

    } else if (isClassDeclaration(node)) {
        console.log("---PARSE CLASS---\n");
        return parseClass(info, node);

    } else if (isModuleDeclaration(node)) {
        console.log("---PARSE NAMESPACE---\n");
        return parseNamespace(info, node);

    } else if (isFunctionDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isConstructorDeclaration(node)) {
        console.log("---PARSE FUNCTION---\n");
        return parseFunction(info, node);

    } else if (isEnumDeclaration(node)) {
        console.log("---PARSE ENUM---\n");
        return parseEnum(info, node);

    } else if (isPropertyDeclaration(node) || isPropertySignature(node)) {
        console.log("---PARSE PROPERTY---\n");
        return parseProperty(info, node);

    } else if (isParameter(node)) {
        console.log("---PARSE PARAMETER---\n");
        return parseParameter(info, node);

    } else if (isVariableDeclaration(node)) {
        console.log("---PARSE VARIABLE---\n");
        return parseVariable(info, node);
    }

    throw new TypeError(`Unsupported declaration: ${SyntaxKind[node.kind]}`);
}