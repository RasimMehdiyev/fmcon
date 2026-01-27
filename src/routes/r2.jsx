import Table from "~/components/Table";
import Button from "~/components/Button";
import { createSignal, createResource, createEffect, onMount, Show } from "solid-js";

import { fetchFailures } from "~/lib/failure";
import { fetchMyRatings } from "~/lib/ratings"; // IMPORTANT: correct import name

export default function Round2() {
  const [selectedFilter, setSelectedFilter] = createSignal("All ▼");
  const [open, setOpen] = createSignal(false);

  // Always initialize as the object you will read from
  const [failureData, setFailureData] = createSignal({
    title: "Failure Mode Ratings",
    description: "Rate the failure modes based on Severity, Occurrence, and Detection.",
    items: [],
  });

  const [ratingData, setRatingData] = createSignal([]);

  // Client-only gate
  const [ready, setReady] = createSignal(false);
  onMount(() => setReady(true));

  const [ratings, { refetch: refetchRatings }] = createResource(
    ready,
    (isReady) => (isReady ? fetchMyRatings() : []),
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

  const select = (filter) => {
    setSelectedFilter(filter);
    setOpen(false);
  };

  const filteredItems = () => {
    const items = failureData().items ?? [];

    const sel = selectedFilter() || "All ▼";
    const key = sel.replace(" ▼", "").trim();

    if (!key || key.toLowerCase() === "all") return items;

    const want = key.toLowerCase();
    return items.filter((it) => {
      const step = (it?.stepsAffected ?? "").toString().trim().toLowerCase();
      return step === want;
    });
  };


  return (
    <main class="font-sans items-center mx-auto">
      <div class="flex flex-col sm:flex-row place-content-between">
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-2">
            <h2 class="text-lg sm:text-xl font-bold">{failureData().title}</h2>
          </div>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">{failureData().description}</p>

          {/* Visible feedback if things go wrong */}
          <Show when={failures.loading || ratings.loading}>
            <p class="text-sm text-gray-500 mt-2">Loading…</p>
          </Show>

          <Show when={failures.error || ratings.error}>
            <p class="text-sm text-red-600 mt-2">
              {(() => {
                const e = failures.error || ratings.error;
                if (!e) return null;
                return e.message === "NOT_AUTHENTICATED"
                  ? "Not authenticated. Please log in again."
                  : `Failed to load data: ${e.message}`;
              })()}
            </p>
          </Show>
        </div>

        <div class="flex flex-row place-content-between items-center gap-2 mt-4 sm:mt-0">
                  <input type="text" placeholder="Search" class="border-1 border-gray-200 rounded-md pl-3 h-[40px] w-full sm:w-auto" />
                  <div class="relative">
                    <Button onClick={() => setOpen(!open())}>{selectedFilter()}</Button>
        
                    <div
                      class={`absolute right-0 mt-1 w-48 rounded-md shadow-md overflow-hidden
                        transition-all duration-700 ease-out origin-top
                        ${open() ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
                    >
                      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select("HRI ▼")}>HRI</button>
                      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select("Pour ▼")}>Pour</button>
                      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select("Mobile ▼")}>Mobile</button>
                      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => select("All ▼")}>All</button>
                    </div>
                  </div>
        </div>
      </div>

      <Show when={!failures.loading && !ratings.loading}>
        <Table
          failureData={filteredItems() ?? []}   // ✅ was filteredItems().items
          ratingData={ratingData() ?? []}
          mode="round2"
          onSave={(saved) => {
            setRatingData((prev) => {
              const list = Array.isArray(prev) ? prev : [];
              const idx = list.findIndex(
                (r) => Number(r.failure_id) === Number(saved.failure_id)
              );
              if (idx === -1) return [...list, saved];
              const copy = list.slice();
              copy[idx] = saved;
              return copy;
            });

            refetchRatings(); // DB truth
          }}
        />
      </Show>
    </main>
  );
}
