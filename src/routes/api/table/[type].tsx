import { secondModelData, testData } from "~/data";

export async function POST({params, request}) {
    const body = await new Response(request.body).json();
    if (params.type == "test")
    {
        const filters = body.filters;

        const data = testData;

        return toPagination(data.filter(d => !filters.name || filters.name == d.name), body.pagination);
    }

    if (params.type == "secondmodel")
    {
        const filters = body.filters;

        const data = secondModelData;

        return toPagination(data.filter(d => !filters.id || filters.id == d.id), body.pagination);
    }

    return [];
}

function toPagination(data, pagination)
{
    return {
        items: data,
        pagination: {
            type: 'pages',
            numPages: 10,
            currentPage: pagination?.page || 5
        }
    }
    
    // return {
    //     items: data,
    //     pagination: {
    //         type: 'nextprev',
    //         next: 'nexting',
    //         prev: 'prevving'
    //     }
    // }
}