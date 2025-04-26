import { useParams } from "@solidjs/router";
import DataTable from "~/components/DataTable";

export default function TablePage() {
    const params = useParams();

    return (<DataTable type={() => params.type}/>);
}