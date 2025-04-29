import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'

export default function FieldsRenderer({fieldDefinitions, onSubmit, buttonText, initialData}) {
    const startFilters = () => 
    {
        let obj = {}
        for (const f of fieldDefinitions()) {
            if (initialData?.()?.[f.name]) {
                obj[f.name] = initialData()[f.name];
            }
            else
            {
                obj[f.name] = "";
            }

        }
        return obj
    };

    const [filters, setFilters] = createStore(startFilters());

    createEffect(() => {
        setFilters(s => startFilters());
    })

    return (
        <>
            <For each={fieldDefinitions()}>{(f) =>
                <>
                    <label>{f.displayName}</label><input value={filters[f.name]} oninput={(e) => setFilters(f.name, e.target.value)}/>
                </>
            }</For>
            <button onclick={() => onSubmit(filters)}>{buttonText}</button>
        </>
    )
}