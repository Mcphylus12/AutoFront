import { useParams } from "@solidjs/router";
import DataDetails from "~/components/DataDetails";

export default function TablePage() {
    const params = useParams();

    return (
        <main>
            <DataDetails id={() => params.id} type={() => params.type}/>
        </main>
    );
}