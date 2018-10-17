
import * as typescript from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import { entity, jsDocs } from "./entity";
import { isUndefined } from "util";

export interface documentation {
    documentation: string;
    jsDocs: jsDocs;
}

export function parseDocumentation(info: programInfo, node_identifier: typescript.Identifier): documentation
{
    const docs: documentation = {documentation:"", jsDocs:{}};

    if (!isUndefined(node_identifier)) {
        let symbol = info.checker.getSymbolAtLocation(node_identifier);
        if (symbol) {
            docs.documentation = typescript.displayPartsToString(symbol.getDocumentationComment(undefined));
    
            const tags: typescript.JSDocTagInfo[] = symbol.getJsDocTags();
    
            // Can pick up the tags as part of the js doc comment
            tags.forEach(tag => {
                docs.jsDocs[tag.name] = tag.text;
            });
        }
    }

    return docs;
}