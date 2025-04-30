import { For } from "solid-js";
import { useRawConfig } from "./ConfigProvider"

export default function Routes() {
    const rawConfig = useRawConfig();
    return (
        <>
            <a href="/">Index</a>
            <a href="/about">About</a>
            <For each={rawConfig.config.routes}>{(r) =>
                <a href={`/table/${r}`}>Table: {rawConfig.config.types[r].displayName}</a>
            }</For>
        </>
    )
}