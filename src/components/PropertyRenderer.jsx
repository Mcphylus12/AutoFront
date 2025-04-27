
import { Switch } from "solid-js"

export default function PropertyRenderer({linkData, value})
{
    return (
        <>
            <Switch>
                <Match when={!linkData}>
                    {value}
                </Match>
                <Match when={linkData.type == "details"}>
                    <a href={`/details/${linkData.dataType}/${value}`}>{value}</a>
                </Match>
                <Match when={linkData.type == "table"}>
                    <a href={`/table/${linkData.dataType}?${linkData.targetField}=${value}`}>{value}</a>
                </Match>
            </Switch>
        </>
    )
}