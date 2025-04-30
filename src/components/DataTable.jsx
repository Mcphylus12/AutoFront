import { createEffect, createResource, createSignal, For, Match, onMount, Show } from "solid-js";
import { useBaseUrl, useConfig } from "./ConfigProvider";
import PropertyRenderer from "./PropertyRenderer";
import Actions from "./Actions";
import FieldsRenderer from "./FieldsRenderer";

const queryTableData = async ({type, filters, basePath}) => {
    const response = await fetch(`${basePath}/table/${type}`, {
        method: "POST",
        body: JSON.stringify({
            filters: filters
        })
    });
    return response.json();
}

export default function DataTable({type, initialFilters})
{
    const basePath = useBaseUrl();
    const tableInformation = () => useConfig(type());
    const columns = () => tableInformation().properties.filter(p => p.summary);
    const filterDefs = () => tableInformation().properties.filter(p => p.filterable);


    const [filters, setFilters] = createSignal(initialFilters());
    const resourceParams = () => ({type: type(), filters: filters(), basePath: basePath});
    const [tableData, { refetch }] = createResource(resourceParams, queryTableData);

    const refetchData = (f) => {
        setFilters(f);
        refetch();
    }
    
    return (
        <>
            <h3>{tableInformation().displayName}</h3>
            <Show when={filterDefs().length > 0}>
                <div>
                    <h4>Filters</h4>
                    <div class="form-columns">
                        <FieldsRenderer buttonText="FetchData" fieldDefinitions={filterDefs} onSubmit={refetchData} initialData={initialFilters}/>
                    </div>
                </div>
            </Show>
            <Actions actions={() => tableInformation().tableActions} type={type} />
            <div>
                <h4>Data</h4>
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
                                        <PropertyRenderer linkData={prop.link} value={() => row[prop.name]} />
                                    </td>
                                }</For>
                            </tr>
                        }</For> 
                    </tbody>
                </table>
            </div>
        </>
    )
}