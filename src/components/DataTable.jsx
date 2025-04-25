import { createResource, For } from "solid-js";
import config from "./config.js";

const queryTableData = async (type) => {
    // const response = await fetch(`http://localhost:5000/api/table/${type}/`);
    // return response.json();

    return [
        {
            id: 1,
            name: "ben"
        },
        {
            id: 2,
            name: "harry"
        }
    ];
}

export default function DataTable({type})
{
    const [tableData] = createResource(type, queryTableData);
    const tableInformation = config[type];
    const columns = tableInformation.properties.filter(p => p.summary);

    return (
        <>
            <h3>{tableInformation.displayName}</h3>

            <table>
                <thead>
                    <tr>
                        <For each={columns}>{(prop) =>
                            <th>{prop.displayName}</th>
                        }</For>
                    </tr>
                </thead>
                <tbody>
                    <For each={tableData()}>{(row) =>
                        <tr>
                            <For each={columns}>{(prop) =>
                                <td>{row[prop.name]}</td>
                            }</For>
                        </tr>
                    }</For> 
                </tbody>
            </table>
        </>
    )
}