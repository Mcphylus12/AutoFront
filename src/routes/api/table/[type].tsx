export async function POST({params, request}) {
    if (params.type == "test")
    {
        const body = await new Response(request.body).json();
        console.log(JSON.stringify(body));
        const filters = body.filters;

        const data = [
            {
                id: 1,
                name: "ben",
                deets: "bum"
            },
            {
                id: 2,
                name: "harry",
                deets: "oof"
            }
        ];

        return data.filter(d => !filters.name || filters.name == d.name);
    }

    return [];
}