import * as typescript from "typescript";
import { parseModifiers } from "./parseModifiers";
import { programInfo } from "./programInfo";
import { Entity } from "./entity";

export function parseNamespace(info: programInfo, node: typescript.ModuleDeclaration): Entity[] {
    return [{ name: "namespace" }];
}