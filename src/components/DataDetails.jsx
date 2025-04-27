import { createResource, For, Match, Show, Suspense } from "solid-js";
import { useConfig, useBaseUrl } from "./ConfigProvider.jsx";
import PropertyRenderer from "./PropertyRenderer.jsx";

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
                                <PropertyRenderer linkData={prop.link} value={details()?.[prop.name]} />
                            </div>
                        </>
                    }</For>
                </div>
                <Actions actions={tableInformation().actions} value={details()} />
            </Suspense>
        </>
    )
} 