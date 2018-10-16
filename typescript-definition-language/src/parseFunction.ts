import * as typescript from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import {entity} from "./entity";

export function parseFunction(info: programInfo, node: typescript.FunctionDeclaration): entity[] {
    return [{name:"function"}];
}