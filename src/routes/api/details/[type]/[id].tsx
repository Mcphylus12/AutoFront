import { secondModelData, testData } from "~/data";

export function GET({params}) {
    if (params.type == "test")
    {
        const data = testData;
    
        return data.filter(i => i.id == params.id)[0];
    }

    if (params.type == "secondmodel")
    {
        const data = secondModelData;
    
        return data.filter(i => i.id == params.id)[0];
    }

    return {}
}