import { For, Match, Show, Switch } from "solid-js";

export default function Pager({pagination, goto}) {

    const pages = () => range(pagination()?.currentPage, pagination()?.numPages);
    return (
        <div class="flex-h-center pagination">
            <Switch>
                <Match when={pagination()?.type == 'pages'}>
                    <>
                        <Show when={pagination()?.currentPage > 1}>
                            <div onClick={() => goto({page: pagination()?.currentPage - 1})}>Prev</div>
                        </Show>
                        <For each={pages()}>{(pageNum, i) => 
                            <div class={pageNum === pagination()?.currentPage ? 'active' : ''} onclick={() => goto({page: pageNum})}>{pageNum}</div>
                        }</For>
                        <Show when={pagination()?.currentPage < pagination()?.numPages}>
                            <div onClick={() => goto({page: pagination()?.currentPage + 1})}>Next</div>
                        </Show>
                    </>
                </Match>
                <Match when={pagination()?.type == 'nextprev'}>
                    <div onClick={() => goto({cursor: pagination()?.prev})}>Prev</div>
                    <div onClick={() => goto({cursor: pagination()?.next})}>Next</div>
                </Match>
            </Switch>
        </div>
    )
}

const range = (current, max) => {
    const bottom = Math.max(1, current - 4);
    const top = Math.min(max, current + 4);
    const aarray = Array.from(
      { length: top - bottom + 1 },
      (_, i) => bottom + i,
    );

    return aarray;

    console.log(JSON.stringify(aarray));
}
  