import { fields } from "~/data";

export function GET({params}) {
    return fields[params.name];
}