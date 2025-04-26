import { createResource, For, Match, Show, Suspense } from "solid-js";
import { useConfig, useBaseUrl } from "./ConfigProvider.jsx";

const queryDetailsData = async ({basePath, type, id}) => {
    const response = await fetch(`${basePath}/details/${type}/${id}`);
    return response.json();
}

export default function DataDetails({type, id}) {
    const basePath = useBaseUrl();
    const [details] = createResource({basePath, type, id}, queryDetailsData);
    const tableInformation = useConfig(type);
    return (
        <>
            <h3>{tableInformation.displayName}</h3>
            <Suspense fallback={<div>Loading...</div>}>
                <div class="form-columns">
                    <For each={tableInformation.properties}>{(prop) =>
                        <>
                            <div>{prop.displayName}</div>
                            <div>
                                <Switch>
                                    <Match when={!prop.link}>
                                        {details()?.[prop.name]}
                                    </Match>
                                    <Match when={prop.link.type == "details"}>
                                        <a href={`/details/${prop.link.dataType}/${details()?.[prop.name]}`}>{details()?.[prop.name]}</a>
                                    </Match>
                                    <Match when={prop.link.type == "table"}>
                                        <a href={`/table/${prop.link.dataType}?${prop.link.targetField}=${details()?.[prop.name]}`}>{details()?.[prop.name]}</a>
                                    </Match>
                                </Switch>
                            </div>
                        </>
                    }</For>
                </div>
            </Suspense>
        </>
    )
} 