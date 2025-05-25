import { useParams } from "@solidjs/router";
import { useRawConfig } from "~/components/ConfigProvider";

export default function () {
    const config = useRawConfig();
    const params = useParams();

    return (<iframe frameborder="0" src={config.config.routes.find(r => r.name == params.name).url}/>)
}