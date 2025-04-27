import { For } from 'solid-js'
import { createStore } from 'solid-js/store'

export default function FieldsRenderer({fieldDefinitions, onSubmit, buttonText}) {
    console.log(JSON.stringify(fieldDefinitions));

    const startFilters = () => 
    {
        let obj = {}
        for (const f of fieldDefinitions) {
            obj[f.name] = "";
        }
        return obj
    };


    const [filters, setFilters] = createStore(startFilters());

    return (
        <>
            <For each={fieldDefinitions}>{(f) =>
                <>
                    <label>{f.displayName}</label><input oninput={(e) => setFilters(f.name, e.target.value)}/>
                </>
            }</For>
            <button onclick={() => onSubmit(filters)}>{buttonText}</button>
        </>
    )
}