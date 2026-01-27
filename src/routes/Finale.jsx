import { createEffect, createResource, Show } from "solid-js";
import Table from "~/components/Table";
import { fetchFailuresWithStats } from "~/lib/ratings";
import { fetchIrr } from "~/lib/ratings";
import { fetchFailures } from "~/lib/failure"
import { createSignal, onMount, } from "solid-js";
import IRRInterpretation from "~/components/IRRInterpretation";


export default function Finale() {
    const [ratingData, setRatingData] = createSignal([]);
    const [failureData, setFailureData] = createSignal([])
    const [ready, setReady] = createSignal(false);

    onMount(() => setReady(true));

    const [ratings, { refetch: refetchRatings }] = createResource(
        ready,
        (isReady) => (isReady ? fetchFailuresWithStats() : []),
        { initialValue: [] }
    );
    const [irr, { refetch: refetchIrr }] = createResource(
        ready,
        (isReady) => (isReady ? fetchIrr() : []),
        { initialValue: [] }
    );


    const [failures] = createResource(
        ready,
        (isReady) => (isReady ? fetchFailures() : []),
        { initialValue: [] }
    );

    createEffect(() => {
        setFailureData((prev) => ({
            ...prev,
            items: failures() ?? [],
        }));

        setRatingData(ratings() ?? []);
    });

    return (
        <main class="mx-auto text-gray-700 p-4 w-[90%]">
            <h1 class="font-bold text-2xl pb-2">Final Results</h1>
            <Show when={irr()}>
                <IRRInterpretation irr={irr()} />
            </Show>
            <Table failureData={failures()} ratingData={ratings()} irr={irr()} mode={"finale"} />
        </main>
    );
};