import { createResource, For, Match, Show } from "solid-js";
import { useConfig } from "./ConfigProvider";

const queryTableData = async (type) => {
    // const response = await fetch(`http://localhost:5000/api/table/${type}/`);
    // return response.json();

    return [
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
}

export default function DataTable({type})
{
    const [tableData] = createResource(type, queryTableData);
    const tableInformation = useConfig(type);
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
                                <td>
                                    <Switch>
                                        <Match when={!prop.link}>
                                            {row[prop.name]}
                                        </Match>
                                        <Match when={prop.link.type == "details"}>
                                            <a href={`/details/${type}/${row[prop.name]}`}>{row[prop.name]}</a>
                                        </Match>
                                        <Match when={prop.link.type == "table"}>
                                            <a href={`/table/${type}?${prop.name}=${row[prop.name]}`}>{row[prop.name]}</a>
                                        </Match>
                                    </Switch>
                                </td>
                            }</For>
                        </tr>
                    }</For> 
                </tbody>
            </table>
        </>
    )
}