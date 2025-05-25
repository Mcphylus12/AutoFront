import { useParams } from "@solidjs/router";
import DataDetails from "~/components/DataDetails";

export default function TablePage() {
    const params = useParams();

    return (
        <div class="main">
            <DataDetails id={() => params.id} type={() => params.type}/>
        </div>
    );
}