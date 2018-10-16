
import * as typescript from "typescript";
import {parseModifiers} from "./parseModifiers";
import {programInfo} from "./programInfo";
import { entity, metadata } from "./entity";
import { isUndefined } from "util";

export interface documentation {
    documentation: string;
    metadata: metadata;
}

export function parseDocumentation(info: programInfo, node_identifier: typescript.Identifier): documentation
{
    const docs: documentation = {documentation:"", metadata:{}};

    if (!isUndefined(node_identifier)) {
        let symbol = info.checker.getSymbolAtLocation(node_identifier);
        if (symbol) {
            docs.documentation = typescript.displayPartsToString(symbol.getDocumentationComment(undefined));
    
            const tags: typescript.JSDocTagInfo[] = symbol.getJsDocTags();
    
            // Can pick up the tags as part of the js doc comment
            tags.forEach(tag => {
                docs.metadata[tag.name] = tag.text;
            });
        }
    }

    return docs;
}