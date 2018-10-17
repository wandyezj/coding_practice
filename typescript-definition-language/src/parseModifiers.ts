import * as typescript from "typescript";
import { isUndefined } from "util";
import { programInfo } from "./programInfo";
// the only allowable modifier should be declare

export function parseModifiers(info: programInfo, modifiers: typescript.NodeArray<typescript.Modifier> | undefined): string[] {


    if (!isUndefined(modifiers)) {

        modifiers.forEach(x => {
            if (typescript.isModifier(x)) {
                const modifier: typescript.Modifier = x as typescript.Modifier;
                // console.log(modifier);
                // Can look at the specific text from the source file to get the type (in this case it should be 'declare')
                const modifier_text = modifier.getText(info.source_file);
                console.log(`\tModifier: [${modifier_text}]`);
            }
        });
    }

    return [];
}
