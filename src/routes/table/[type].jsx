import { useParams, useSearchParams } from "@solidjs/router";
import DataTable from "~/components/DataTable";

export default function TablePage() {
    const params = useParams();
    const searchParams = useSearchParams();

    return (
        <div class="main">
            <DataTable type={() => params.type} initialFilters={() => searchParams[0]} setQueryParam={searchParams[1]}/>
        </div>
    );
}