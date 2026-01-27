import { createSignal, Show, onMount, createEffect, createResource } from "solid-js";
import Button from "~/components/Button";
import AddFailure from "~/components/AddFailure";
import EditFailure from "~/components/EditFailure";
import Table from "~/components/Table";
import { fetchMyFailures, createFailure, updateFailure } from "~/lib/failure";
import { toast } from "~/lib/toast";


export default function Round1() {
  const [isAddFailureOpen, setIsAddFailureOpen] = createSignal(false);
  const [isEditFailureOpen, setIsEditFailureOpen] = createSignal(false);
  const [selectedFilter, setSelectedFilter] = createSignal("All ▼");
  const [open, setOpen] = createSignal(false);
  const [error, setError] = createSignal(null);
  const [selectedFailure, setSelectedFailure] = createSignal(null);


  const [ready, setReady] = createSignal(false);
  onMount(() => setReady(true));

  const [failures, { refetch: refetchFailures }] = createResource(
    ready,
    (isReady) => (isReady ? fetchMyFailures() : []),
    { initialValue: [] }
  );

  const [failureData, setFailureData] = createSignal({
    title: "Failure Modes",
    description: "Failures you added for the barista robot.",
    items: [],
  });

  createEffect(() => {
    setFailureData((prev) => ({
      ...prev,
      items: failures() ?? [],
    }));
  });

  const select = (filter) => {
    setSelectedFilter(filter);
    setOpen(false);
  };

  const handleSaveFailure = async (payload) => {
    setError(null);
    try {
      await createFailure(payload);
      toast.success("Failure created.");
      await refetchFailures();
    } catch (e) {
      if (e?.message === "NOT_AUTHENTICATED") toast.error("Please log in again.");
      else toast.error(e?.message || "Failed to create failure.");
      throw e;
    }
  };

  const handleDeleteFailure = async (id) => {
  try {
    await deleteFailure(id);
    toast.success("Failure deleted.");
    setIsEditFailureOpen(false);
    setSelectedFailure(null);
    await refetchFailures();
  } catch (e) {
    if (e?.message === "NOT_AUTHENTICATED") toast.error("Please log in again.");
    else toast.error(e?.message || "Failed to delete failure.");
    throw e;
  }
};

  const handleEditFailure = async (payload) => {
    setError(null);
    try{
      await updateFailure(payload.id, payload);
      toast.success("Failure updated.");
      setIsEditFailureOpen(false);
      setSelectedFailure(null);
      await refetchFailures();
    } catch (e){
        if (e?.message === "NOT_AUTHENTICATED") toast.error("Please log in again.");
        else toast.error(e?.message || "Failed to edit failure.");
        throw e; 
    }
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
      <div class="flex flex-col sm:flex-row place-content-between ">
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-2 ">
            <h2 class="text-lg sm:text-xl font-bold">{failureData().title}</h2>
            <Button
              onClick={() => setIsAddFailureOpen(true)}
              size="sm"
              class="w-[25px] h-[15px] mt-[3px] flex items-center justify-center pb-[2px]"
            >
              +
            </Button>
          </div>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">{failureData().description}</p>
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

      <Table
        failureData={filteredItems()}
        isRating={false}
        onRowClick={(row) => {
          setSelectedFailure(row);
          setIsEditFailureOpen(true);
        }}
      />

      <Show when={isAddFailureOpen()}>
        <AddFailure
          onClose={() => setIsAddFailureOpen(false)}
          onSave={handleSaveFailure}
        />
      </Show>

      <Show when={isEditFailureOpen() && selectedFailure()}>
        <EditFailure
          data={selectedFailure()}
          onClose={() => setIsEditFailureOpen(false)}
          onSave={handleEditFailure}
          onDelete={handleDeleteFailure}
        />
      </Show>
    </main>
  );
}
