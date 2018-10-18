import * as typescript from "typescript";
import { programInfo } from "./programInfo";
import { Entity, JsDocs } from "./entity";
import { isUndefined } from "util";

export interface documentation {
    documentation: string;
    jsDocs: JsDocs;
}

export function parseDocumentation(info: programInfo, nodeIdentifier: typescript.Identifier, entity?: Entity): documentation {
    const docs: documentation = { documentation: "", jsDocs: {} };

    if (!isUndefined(nodeIdentifier)) {
        let symbol = info.checker.getSymbolAtLocation(nodeIdentifier);
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