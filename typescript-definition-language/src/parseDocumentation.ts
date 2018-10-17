
import * as typescript from "typescript";
import { parseModifiers } from "./parseModifiers";
import { programInfo } from "./programInfo";
import { Entity, JsDocs } from "./entity";
import { isUndefined } from "util";

export interface documentation {
    documentation: string;
    jsDocs: JsDocs;
}

export function parseDocumentation(info: programInfo, node_identifier: typescript.Identifier, entity?: Entity): documentation {
    const docs: documentation = { documentation: "", jsDocs: {} };

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
    
    if (entity) {
        entity.documentation = docs.documentation;
        entity.jsDocs = docs.jsDocs
    }

    return docs;
}