import { useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import DataDetails from "~/components/DataDetails";

const ClientOnlyDataDetails = clientOnly(() => import("~/components/DataDetails"));

export default function TablePage() {
    const params = useParams();

    // return (<ClientOnlyDataDetails id={params.id} type={params.type}/>);
    return (<DataDetails id={params.id} type={params.type}/>);
}