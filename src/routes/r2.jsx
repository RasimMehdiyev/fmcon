import { A } from "@solidjs/router";
import Table from "~/components/Table"
import Button from "~/components/Button"
import { createSignal, createResource, createEffect } from "solid-js";
import { fetchAllFailures, addFailure } from "~/lib/failure";
import { fetchFailureRating, fetchAllRatings } from "~/lib/ratings";

export default function About() {

  const [orderBy, setOrderBy] = createSignal("created_at");
  const [ascending, setAscending] = createSignal(false);

  const [rating] = createResource(
    () => true,
    () => fetchFailureRating(1).then((r) => r)
  );

  const [allRatings] = createResource(
    () => true,
    () => fetchAllRatings().then((r) => r)
  );

  const [failures] = createResource(
    () => ({ orderBy: orderBy(), ascending: ascending() }),
    (opts) => fetchAllFailures(opts).then((r) => r.data)
  );


  return (
    <main class="mx-auto text-gray-700 p-4">
      <Table/>
      <Button cont_w="w-[90%]" position="right" type="SUBMIT"/>
    </main>
  );
}
