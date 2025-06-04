import { createEffect, createResource, createSignal, For, Match, onMount, Show, Suspense } from "solid-js";
import { useBaseUrl, useConfig } from "./ConfigProvider";
import PropertyRenderer from "./PropertyRenderer";
import Actions from "./Actions";
import FieldsRenderer from "./FieldsRenderer";
import Pager from "./Pager";

const queryTableData = async ({type, filters, basePath}) => {
    const response = await fetch(`${basePath}/table/${type}`, {
        method: "POST",
        body: JSON.stringify({
            filters: filters
        })
    });
    return response.json();
}

export default function DataTable({type, initialFilters, setQueryParam})
{
    const tableInformation = () => useConfig(type());
    const columns = () => tableInformation().properties.filter(p => p.summary);
    const filterDefs = () => tableInformation().properties.filter(p => p.filterable);
    
    const basePath = useBaseUrl();
    const resourceParams = () => ({type: type(), filters: initialFilters(), basePath: basePath});
    const [tableData, { refetch }] = createResource(resourceParams, queryTableData);

    const refetchData = (f) => {
        setQueryParam(f);

        setTimeout(() => {
            refetch();
        }, 0);
    }
    
    return (
        <>
            <h2>{tableInformation().displayName}</h2>
            <div class="columns">
                <Show when={filterDefs().length > 0}>
                    <div class="filters">
                        <h3>Filters</h3>
                        <div class="form-columns">
                            <FieldsRenderer buttonText="Fetch Data" fieldDefinitions={filterDefs} onSubmit={refetchData} initialData={initialFilters}/>
                        </div>
                    </div>
                </Show>
                <Actions actions={() => tableInformation().tableActions} type={type} />
            </div>
            <div>
                <Suspense>
                    <h3>Data</h3>
                    <table>
                        <thead>
                            <tr>
                                <For each={columns()}>{(prop) =>
                                    <th>{prop.displayName}</th>
                                }</For>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={tableData()?.items}>{(row) =>
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
                    <Pager pagination={() => tableData()?.pagination} goto={(data) => {console.log(JSON.stringify(data))}}/>
                </Suspense>
            </div>
        </>
    )
}