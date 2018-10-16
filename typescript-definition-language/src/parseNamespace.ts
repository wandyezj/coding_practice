import * as typescript from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import {entity} from "./entity";

export function parseNamespace(info: programInfo, node: typescript.ModuleDeclaration): entity[] {
    return [{name:"namespace"}];
}