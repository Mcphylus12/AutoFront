import { actions } from "~/data";

export async function POST({params, request}) {
    const {
        fields,
        context
    } = await new Response(request.body).json();

    return actions[params.action](fields, context);
}