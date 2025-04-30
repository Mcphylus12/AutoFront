import { createSignal, For, Show, useContext } from "solid-js";
import FieldsRenderer from "./FieldsRenderer";
import { useBaseUrl } from "./ConfigProvider";


export default function Actions({type, actions, value}) {
    const basePath = useBaseUrl();
    const [runningAction, setRunningAction] = createSignal(null);
    const [resultContent, setResultContent] = createSignal(null);

    const submitAction = async (fields) => {
        const response = await fetch(`${basePath}/action/${type}/${runningAction().name}`, {
            method: "POST",
            body: JSON.stringify({
                fields: fields,
                context: value
            })
        });

        var result = await response.json();

        setResultContent(result);
        setRunningAction(null);
    }
    
    const closeModal = () => {
        setRunningAction(null);
        setResultContent(null);
    }

    return (
        <div>
            <Show when={actions()}>
                <h4>Actions</h4>
                <For each={actions()}>{(a) =>
                    <>
                        <button onclick={() => setRunningAction(a)}>{a.displayName}</button>
                    </>
                }</For>
            </Show>
            <Show when={runningAction()}>
                <div class="modal">
                    <div>
                        <h4>{runningAction().displayName}</h4>
                        <div class="form-columns">
                            <FieldsRenderer buttonText="Submit Action" fieldDefinitions={() => runningAction().fields} onSubmit={submitAction}/>
                            <button onclick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </Show>
            <Show when={resultContent()}>
                <div class="modal">
                    <div>
                        <h4>Success {resultContent().success}</h4>
                        {resultContent().message}
                        <button onclick={closeModal}>Close</button>
                    </div>
                </div>
            </Show>
        </div>
    )
}