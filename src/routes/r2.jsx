import { A } from "@solidjs/router";
import Table from "~/components/Table"
import Button from "~/components/Button"
import { createSignal, createResource, createEffect } from "solid-js";
import { fetchAllFailures, addFailure } from "~/lib/failure";
import { fetchFailureRating, fetchAllRatings } from "~/lib/ratings";

export default function Round2() {

  const [orderBy, setOrderBy] = createSignal("created_at");
  const [ascending, setAscending] = createSignal(false);
  const [selectedFilter, setSelectedFilter] = createSignal("All ▼");
  const [open, setOpen] = createSignal(false);
  const select = (filter) => {
    setSelectedFilter(filter);
    setOpen(false);
  };

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

  const failureDatas = {
    title: "Failure Mode Rating",
    description: "Please review the items and adjust your final ratings",
    items: [
      { item: "F01", subject: "Perception failure", S: 1, O: 4, D: 6, severity: "High" },
      { item: "F02", subject: "Perception failure", S: 2, O: 5, D: 7, severity: "High" },
      { item: "F03", subject: "Communication failure", S: 3, O: 6, D: 8,severity: "High"},
      { item: "F04", subject: "Hardware failure", S: 4, O: 7, D: 9, severity: "High" },]
    ,
    };

  const data = () => failureDatas;

  return (
    <main class="font-sans items-center mx-auto">
      {/* <h1 class="font-bold text-2xl pb-2">Failure Mode Rating</h1> */}
            <div class="flex flex-col sm:flex-row place-content-between ">
              <div class="flex flex-col">
                <div class="flex flex-row items-center gap-2">
                  <h2 class="text-lg sm:text-xl font-bold">{data().title}</h2>
                </div>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">{data().description}</p>
              </div>
      
              <div class="flex flex-row place-content-between items-center gap-2 mt-4 sm:mt-0">
                <input type="text" placeholder="Search" class="border-1 border-gray-200 rounded-md pl-3 h-[40px] w-full sm:w-auto" />
                <div class="relative">
                  <Button
                    onClick={() => setOpen(!open())}
                  >
                    {selectedFilter()}
                  </Button>
      
                  <div
                    class={`absolute right-0 mt-1 w-48 bg-white rounded-md shadow-md overflow-hidden 
                      transition-all duration-700 ease-out origin-top 
                      ${open() ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                  >
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select('Perception ▼')}>Perception</button>
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select('Communication ▼')}>Communication</button>
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select('Hardware ▼')}>Hardware</button>
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select('All ▼')}>All</button>
                  </div>
                </div>
              </div>
            </div>
      <Table failureData={failureDatas.items} isRating={true} />
      
      <div class="w-[90%] flex justify-end mt-[20px]">
        <Button>SUBMIT</Button>
      </div>

    </main>
  );
}
