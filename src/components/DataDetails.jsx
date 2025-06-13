import { createResource, For, Match, Show, Suspense } from "solid-js";
import { useConfig, useBaseUrl } from "./ConfigProvider.jsx";
import PropertyRenderer from "./PropertyRenderer.jsx";
import Actions from "./Actions.jsx";

const queryDetailsData = async ({basePath, type, id}) => {
    const response = await fetch(`${basePath}/details/${type}/${id}`);
    return response.json();
}

export default function DataDetails({type, id}) {
    const basePath = useBaseUrl();
    const resourceParams = () => ({type: type(), id: id(), basePath: basePath});
    const [details] = createResource(resourceParams, queryDetailsData);
    const tableInformation = () => useConfig(type());
    return (
        <>
            <h3>{tableInformation().displayName}</h3>
            <Suspense fallback={<div>Loading...</div>}>
                <div class="form">
                    <For each={tableInformation().properties}>{(prop) =>
                        <>
                            <div>{prop.displayName}</div>
                            <div>
                                <PropertyRenderer linkData={prop.link} value={() => details()?.[prop.name]} />
                            </div>
                        </>
                    }</For>
                </div>
                <Actions actions={() => tableInformation().actions} value={details} type={type}/>
            </Suspense>
        </>
    )
} 