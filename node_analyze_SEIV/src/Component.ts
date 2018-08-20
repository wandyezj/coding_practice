import { isUndefined } from "util";



type ComponentPropertyName = 'Name' | 'Description' | 'Weapon Type' | 'Tonnage Space Taken';

const property_name : ComponentPropertyName =  'Name';
const property_description : ComponentPropertyName =  'Description';
const property_weapon_type : ComponentPropertyName =  'Weapon Type';
const property_size : ComponentPropertyName =  'Tonnage Space Taken';

export class ComponentProperty {
    constructor (public name : string, public value : string) {

    }
}

export class Component {

    public name : string;
    public weapon_type : string;
    public size : number;

    constructor (private properties : ComponentProperty[]) {
        this.name = this.GetProperty(property_name);
        this.weapon_type = this.GetProperty(property_weapon_type);
        this.size = Number(this.GetProperty(property_size));
    }

    public GetProperty(name: ComponentPropertyName) : string {
        const matching = this.properties.filter(item => item.name === name);
        return (matching.length > 0) ? matching[0].value : '';
    }

    public ToString() : string {
        return `${this.name}`;
    }

    public IsWeapon() : boolean {
        return !(this.weapon_type === 'None');
    }

}

// class to define the weapon stats for a component
export class WeaponStats {

}


export function ParseComponents(data: string) : Component[] {
    let components : Component[] = []; 

    const lines : string[] = data.split('\n');

    const start : number = lines.indexOf("*BEGIN*\n");
    const end : number = lines.indexOf("*END*\n");

    const delimitor_key_value = ':=';

    const component_lines = lines.slice(start + 1, end);

    let in_component : boolean = false;
    let current_component_properties : ComponentProperty[] = [];

    for (const rawline of component_lines) {

        const line : string = rawline.trim();
        if (line === '') {

            if (in_component) {
                console.log('Component End');

                components.push(new Component(current_component_properties));
                in_component = false;
                current_component_properties = [];
            }
        } else {
            const delim_index_start : number = line.indexOf(delimitor_key_value);
            if (delim_index_start > 0) {
                if (!in_component) {
                    console.log('Component Start');
                }
                in_component = true;

                const property_name : string = line.substring(0, delim_index_start).trim();
                const property_value : string = line.substring(delim_index_start + delimitor_key_value.length).trim();
                current_component_properties.push(new ComponentProperty(property_name, property_value));
            }
            
        }

        
    }

    return components;
}