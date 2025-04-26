export function GET() {
    return {
        test: {
            displayName: "Test",
            properties: [
                {
                    name: "id",
                    displayName: "ID",
                    summary: true,
                    link: {
                        type: "details",
                        dataType: "test"
                    }
                },
                {
                    name: "name",
                    displayName: "Name",
                    summary: true
                },
                {
                    name: "deets",
                    displayName: "Details"
                }
            ]
        },
        secondmodel: {
            displayName: "An Alias",
            properties: [
                {
                    name: "id",
                    displayName: "ID",
                    summary: true
                },
                {
                    name: "boppers",
                    displayName: "OOF",
                    summary: true
                }
            ]
        }
    }
}