import { useParams } from "@solidjs/router";
import DataDetails from "~/components/DataDetails";

export default function TablePage() {
    const params = useParams();

    // return (<ClientOnlyDataDetails id={params.id} type={params.type}/>);
    return (<DataDetails id={() => params.id} type={() => params.type}/>);
}