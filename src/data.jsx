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
        boppers: "hallo",
        back: 1
    },
    {
        id: "oof",
        boppers: "flumber",
        back: 1
    }
]

export const fields = {
    testActionField: [
        {
            name: "hello",
            value: "hello"
        },
        {
            name: "Second Option",
            value: "second"
        }
    ]
}

export const configData = {
    routes: [
        {
            type: "table",
            tableKey: "test"
        },
        {
            type: "frame",
            name: "ifrmaetest",
            displayName: "Iframe Test",
            url: "https://www.youtube.com/embed/aJoo79OwZEI"
        }
    ],
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
                        {
                            name: "free",
                            displayName: "Free Action Field",
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
                    filterable: true,
                    link: {
                        type: "details",
                        dataType: "secondmodel"
                    }
                },
                {
                    name: "boppers",
                    displayName: "OOF",
                    summary: true
                },
                {
                    name: "back",
                    displayName: "back",
                    link: {
                        type: "details",
                        dataType: "test"
                    }
                }
            ]
        }
    }
};

export const actions = {
    testTableAction: (fields, context) => {
        return {
            success: true,
            message: JSON.stringify(fields) + "\n" + JSON.stringify(context)
        }
    },
    testAction: (fields, context) => {
        return {
            success: true,
            message: JSON.stringify(fields) + "\n" + JSON.stringify(context)
        }
    }
} 