import { For, Match, Switch } from "solid-js";
import { useRawConfig } from "./ConfigProvider"

export default function Routes() {
    const rawConfig = useRawConfig();
    return (
        <>
            
            <a href="/">Home</a>
            <For each={rawConfig.config.routes}>{(r) =>
            <Switch>
                <Match when={r.type == "table"}>
                    <a href={`/table/${r.tableKey}`}>Table: {rawConfig.config.types[r.tableKey].displayName}</a>
                </Match>
                <Match when={r.type == "frame"}>
                    <a href={`/frame/${r.name}`}>{r.displayName}</a>
                </Match>
            </Switch>
            }</For>
        </>
    )
}