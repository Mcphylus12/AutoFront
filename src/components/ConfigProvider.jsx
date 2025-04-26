import { createContext, createResource, useContext } from "solid-js";

const ConfigContext = createContext();

const fetchConfig = async () => {
    const basepathResult = await fetch("/bootstrap.json");
    const bootstrap = await basepathResult.json();

    const response = await fetch(`${bootstrap.basepath}/config`);
    return { bootStrap: bootstrap, config: await response.json()};
}

export function ConfigProvider(props) {
    const [config] = createResource(fetchConfig);

    return (
        <Show when={config()} >
            <ConfigContext.Provider value={config()}>
                {props.children}
            </ConfigContext.Provider>
        </Show>
    )
}


export function useConfig(type) { return useContext(ConfigContext).config[type]; }
export function useBaseUrl() { return useContext(ConfigContext).bootStrap.basepath; }