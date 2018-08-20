import { isUndefined } from "util";
import * as path from 'path';
import * as fs from "fs";

console.log("Starting");

import {Locals} from './locals';
import { ParseComponents, Component } from "./Component";

Locals();

const directory_SEIV : string | undefined = process.env["SEIV"];

if (isUndefined(directory_SEIV)) {
    console.log("SET SEIV=");
    process.exit();
}

console.log(`SEIV=${directory_SEIV}`);


const directory_data : string = path.join(directory_SEIV as string, 'data');

const file_components : string = path.join(directory_data, 'Components.txt');

const component_data :string = fs.readFileSync(file_components, 'utf8');

const components : Component[] =  ParseComponents(component_data);

//console.log(component_data);

for (const component of components) {
    if (component.IsWeapon()) {
        console.log(`Component Name: ${component.name}`);
    }
}