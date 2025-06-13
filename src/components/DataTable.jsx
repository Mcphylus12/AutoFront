import { batch, createEffect, createResource, createSignal, For, Match, onMount, Show, Suspense } from "solid-js";
import { useBaseUrl, useConfig } from "./ConfigProvider";
import PropertyRenderer from "./PropertyRenderer";
import Actions from "./Actions";
import FieldsRenderer from "./FieldsRenderer";
import Pager from "./Pager";

const queryTableData = async ({type, filters, pagination, basePath, sorts}) => {
    const response = await fetch(`${basePath}/table/${type}`, {
        method: "POST",
        body: JSON.stringify({
            pagination: pagination,
            filters: filters,
            sorts: sorts
        })
    });
    return response.json();
}

export default function DataTable({type, initialFilters, setQueryParam})
{
    const [pagination, setPagination] = createSignal(null);
    const [sorts, setSorts] = createSignal({});
    const [currentType, setCurrentType] = createSignal(type());
    const tableInformation = () => useConfig(type());
    const columns = () => tableInformation().properties.filter(p => p.summary);
    const filterDefs = () => tableInformation().properties.filter(p => p.filterable);
    
    createEffect(() => {
        const newType = type();
        if (newType !== currentType()) {
            batch(() => {
                setCurrentType(newType)
                setPagination(null);
                setSorts({});
            })
        }
    });

    const basePath = useBaseUrl();
    const resourceParams = () => ({type: currentType(), sorts: sorts(), filters: initialFilters(), pagination: pagination(), basePath: basePath});
    const [tableData, { refetch }] = createResource(resourceParams, queryTableData);

    const refetchData = (f) => {
        setQueryParam(f);

        setTimeout(() => {
            refetch();
        }, 0);
    }

    const updateSort = (column) => {
        if (sorts().column == column.name)
        {
            setSorts(prev => ({
                ...prev,
                value: (prev.value + 1) % 3
            }));
        } else {
            setSorts({
                column: column.name,
                value: 1
            }); 
        }
    }
    
    return (
        <>
            <h2>{tableInformation().displayName}</h2>
            <div class="columns">
                <Show when={filterDefs().length > 0}>
                    <div class="filters">
                        <h3>Filters</h3>
                        <div class="form">
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
                                    <th>{prop.displayName} 
                                    <Show when={prop.sortable}>
                                        <span onclick={() => updateSort(prop)} class="sorter">
                                            <div class={sorts()?.column == prop.name && sorts().value == 1 ? "active up" : "up"}></div>
                                            <div class={sorts()?.column == prop.name && sorts().value == 2 ? "active down" : "down"}></div>
                                        </span>
                                    </Show>
                                    </th>
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
                    <Pager pagination={() => tableData()?.pagination} goto={(data) => setPagination(data)}/>
                </Suspense>
            </div>
        </>
    )
}