export const testData = [
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
]

export const secondModelData = [
    {
        id: "hello",
        boppers: "hallo"
    },
    {
        id: "oof",
        boppers: "flumber"
    }
]

export const configData = {
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
                    summary: true,
                    filterable: true
                },
                {
                    name: "boppers",
                    displayName: "OOF",
                    summary: true
                }
            ]
        }
    }
};