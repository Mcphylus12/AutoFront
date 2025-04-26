export function GET({params}) {
    if (params.type == "test")
    {
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
    
        return data.filter(i => i.id == params.id)[0];
    }

    return {}
}