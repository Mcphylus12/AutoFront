import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import PresetField from './PresetField';

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

    const [filters, setFilters] = createStore({ root: startFilters()});

    createEffect(() => {
        setFilters('root', startFilters());
    });

    return (
        <>
            <For each={fieldDefinitions()}>{(f) =>
                <>
                    <Show when={f.preset} fallback={
                        <><label>{f.displayName}:</label><input value={filters.root[f.name]} oninput={(e) => setFilters('root', f.name, e.target.value)}/></>
                    }>
                        <PresetField field={f} value={filters.root[f.name]} oninput={(e) => setFilters('root', f.name, e.target.value)}/>
                    </Show>                
                </>
            }</For>
            <button onclick={() => onSubmit(filters.root)}>{buttonText}</button>
        </>
    )
}