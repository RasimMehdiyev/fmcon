import { A } from "@solidjs/router";
import Table from "~/components/Table"
import Button from "~/components/Button"
import { createSignal, createResource, createEffect } from "solid-js";
import { fetchAllFailures, addFailure } from "~/lib/failure";
import { fetchFailureRating, fetchAllRatings } from "~/lib/ratings";

export default function Round2() {

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

  const failureDatas = [
        { item: "F01", subject: "Perception failure", S: 1, O: 4, D: 6, E: 8 },
        { item: "F02", subject: "Perception failure", S: 2, O: 5, D: 7, E: 9 },
        { item: "F03", subject: "Communication failure", S: 3, O: 6, D: 8, E: 10 },
        { item: "F04", subject: "Hardware failure", S: 4, O: 7, D: 9, E: 6 },
    ]
    ;

  return (
    <main class="mx-auto text-gray-700 p-4">
      <Table failureData={failureDatas}/>
      <Button cont_w="w-[90%]" position="right" type="SUBMIT"/>
    </main>
  );
}
