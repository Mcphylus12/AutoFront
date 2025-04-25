import { createResource } from "solid-js"

export default {
    test: {
        displayName: "Test",
        properties: [
            {
                name: "id",
                displayName: "ID",
                summary: true,
                filterable: true
            },
            {
                name: "name",
                displayName: "Name",
                summary: true
            }
        ]
    }
}