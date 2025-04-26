import { createResource, For, Match, Show } from "solid-js";
import { useBaseUrl, useConfig } from "./ConfigProvider";
import { createStore } from "solid-js/store";

const queryTableData = async ({type, filters, basePath}) => {
    const response = await fetch(`${basePath}/table/${type}`, {
        method: "POST",
        body: JSON.stringify({
            filters: filters
        })
    });
    return response.json();
}

export default function DataTable({type})
{
    const basePath = useBaseUrl();
    const tableInformation = () => useConfig(type());
    const columns = () => tableInformation().properties.filter(p => p.summary);
    const filterDefs = () => tableInformation().properties.filter(p => p.filterable);

    const startFilters = () => 
    {
        let obj = {}
        for (const f of filterDefs()) {
            obj[f.name] = "";
        }
        return obj
    };


    const [filters, setFilters] = createStore(startFilters());
    const resourceParams = () => ({type: type(), filters: filters, basePath: basePath});
    const [tableData, { refetch }] = createResource(resourceParams, queryTableData);

    return (
        <>
            <h3>{tableInformation().displayName}</h3>
            <Show when={filterDefs().length > 0}>
                <h4>Filters</h4>
                <div class="form-columns">
                    <For each={filterDefs()}>{(f) =>
                        <>
                            <label>{f.displayName}</label><input oninput={(e) => setFilters(f.name, e.target.value)}/>
                        </>
                    }</For>
                    <button onclick={() => refetch()}>Fetch Data</button>
                </div>
            </Show>

            <table>
                <thead>
                    <tr>
                        <For each={columns()}>{(prop) =>
                            <th>{prop.displayName}</th>
                        }</For>
                    </tr>
                </thead>
                <tbody>
                    <For each={tableData()}>{(row) =>
                        <tr>
                            <For each={columns()}>{(prop) =>
                                <td>
                                    <Switch>
                                        <Match when={!prop.link}>
                                            {row[prop.name]}
                                        </Match>
                                        <Match when={prop.link.type == "details"}>
                                            <a href={`/details/${prop.link.dataType}/${row[prop.name]}`}>{row[prop.name]}</a>
                                        </Match>
                                        <Match when={prop.link.type == "table"}>
                                            <a href={`/table/${prop.link.dataType}?${prop.link.targetField}=${row[prop.name]}`}>{row[prop.name]}</a>
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