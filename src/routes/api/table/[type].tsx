import { secondModelData, testData } from "~/data";

export async function POST({params, request}) {
    if (params.type == "test")
    {
        const body = await new Response(request.body).json();
        const filters = body.filters;

        const data = testData;

        return data.filter(d => !filters.name || filters.name == d.name);
    }

    if (params.type == "secondmodel")
    {
        const body = await new Response(request.body).json();
        const filters = body.filters;

        const data = secondModelData;

        return data.filter(d => !filters.id || filters.id == d.id);
    }

    return [];
}