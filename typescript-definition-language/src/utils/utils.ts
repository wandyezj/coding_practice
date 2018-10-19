import * as ts from 'typescript';
import { IProgramInfo } from "../programInfo";
import { IEntity, IJsDocs } from "../Entity";
import { isUndefined } from "util";

export function isDeclaration(obj: ts.Statement | ts.NamedDeclaration): obj is ts.NamedDeclaration {
    return (<ts.NamedDeclaration>obj).name !== undefined;
}

export interface documentation {
    documentation: string;
    jsDocs: IJsDocs;
}

export function parseDocumentation(info: IProgramInfo, nodeIdentifier: ts.Identifier, IEntity?: IEntity): documentation {
    const docs: documentation = { documentation: "", jsDocs: {} };

    if (!isUndefined(nodeIdentifier)) {
        let symbol = info.checker.getSymbolAtLocation(nodeIdentifier);
        if (symbol) {
            docs.documentation = ts.displayPartsToString(symbol.getDocumentationComment(undefined));

            const tags: ts.JSDocTagInfo[] = symbol.getJsDocTags();

            // Can pick up the tags as part of the js doc comment
            tags.forEach(tag => {
                docs.jsDocs[tag.name] = tag.text;
            });
        }
    }

    if (IEntity) {
        IEntity.documentation = docs.documentation;
        IEntity.jsDocs = docs.jsDocs
    }

    return docs;
}