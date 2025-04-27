export function GET() {
    return {
        roots: ["test"],
        types: {
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
                        summary: true,
                        filterable: true
                    },
                    {
                        name: "deets",
                        displayName: "Details",
                        summary: true,
                        link: {
                            type: "table",
                            dataType: "secondmodel",
                            targetField: "id"
                        }
                    }
                ],
                actions: [
                    {
                        name: "testAction",
                        displayName: "Test Action",
                        fields: [
                            {
                                name: "testActionField",
                                displayName: "Test Action Field",
                                preset: "testActionPreset"
                            },
                        ]
                    }
                ],
                tableActions: [
                    {
                        name: "testTableAction",
                        displayName: "Test Action",
                        fields: [
                            {
                                name: "testActionField",
                                displayName: "Test Action Field",
                                preset: "testActionPreset"
                            },
                        ]
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
}