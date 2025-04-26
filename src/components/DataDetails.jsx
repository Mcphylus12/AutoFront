import { createResource, For, Match, Show, Suspense } from "solid-js";
import { useConfig } from "./ConfigProvider.jsx";

const queryDetailsData = async ({type, id}) => {
    // const response = await fetch(`http://localhost:5000/api/table/${type}/`);
    // return response.json();

    const data = [
        {
            id: 1,
            name: "ben",
            deets: "bum"
        },
        {
            id: 2,
            name: "harry",
            deets: "oof"
        }
    ];

    return data.filter(i => i.id == id)[0];
}

export default function DataDetails({type, id}) {
    const [details] = createResource({type, id}, queryDetailsData);
    const tableInformation = useConfig(type);
    return (
        <>
            <h3>{tableInformation.displayName}</h3>
            <Suspense fallback={<div>Loading...</div>}>
                <div>
                    <For each={tableInformation.properties}>{(prop) =>
                        <>
                            <div>{prop.displayName}</div>
                            <div>
                                <Switch>
                                    <Match when={!prop.link}>
                                        {details()?.[prop.name]}
                                    </Match>
                                    <Match when={prop.link.type == "details"}>
                                        <a href={`/details/${type}/${details()?.[prop.name]}`}>{details()?.[prop.name]}</a>
                                    </Match>
                                    <Match when={prop.link.type == "table"}>
                                        <a href={`/table/${type}?${prop.name}=${details()?.[prop.name]}`}>{details()?.[prop.name]}</a>
                                    </Match>
                                </Switch>
                            </div>
                        </>
                    }</For>
                </div>
            </Suspense>
        </>
    )
} 