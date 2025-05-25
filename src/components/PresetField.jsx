import { createResource, Show } from "solid-js";
import { useBaseUrl } from "./ConfigProvider";


const queryField = async ({name, basePath}) => {
    const response = await fetch(`${basePath}/field/${name}`);
    return response.json();
}

export default function PresetField({field, value, oninput}) {
    const basePath = useBaseUrl();
    const resourceParams = () => ({name: field.name, basePath: basePath});
    const [fieldData] = createResource(resourceParams, queryField);

    return (
        <>
            <label>{field.displayName}:</label>
            <Show when={fieldData()}>
                <select value={value} oninput={(e) => oninput(e)}>
                    <For each={fieldData()}>{(f) =>
                        <>
                            <option value={f.value}>{f.name}</option>
                        </>
                    }</For>
                </select>
            </Show>
        </>
    )
}