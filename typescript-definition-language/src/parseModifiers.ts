import * as typescript from "typescript";
import { isUndefined } from "util";
import { IProgramInfo } from "./programInfo";
// the only allowable modifier should be declare

export function parseModifiers(
  info: IProgramInfo,
  modifiers: typescript.NodeArray<typescript.Modifier> | undefined,
): string[] {
  if (!isUndefined(modifiers)) {
    modifiers.forEach(x => {
      if (typescript.isModifier(x)) {
        const modifier: typescript.Modifier = x as typescript.Modifier;
        // console.log(modifier);
        // Can look at the specific text from the source file to get the type (in this case it should be 'declare')
        const modifierText = modifier.getText(info.sourceFile);
        console.log(`\tModifier: [${modifierText}]`);
      }
    });
  }

  return [];
}
