import { For, createSignal, Show } from "solid-js";
import Button from "~/components/Button";
import AddFailure from "~/components/AddFailure";
import EditFailure from "~/components/EditFailure";
import Table from "~/components/Table";

export default function Round1() {
  const [isAddFailureOpen, setIsAddFailureOpen] = createSignal(false);
  const [isEditFailureOpen, setIsEditFailureOpen] = createSignal(false);
  const [selectedFilter, setSelectedFilter] = createSignal("All ▼");
  const [open, setOpen] = createSignal(false);

  const select = (filter) => {
    setSelectedFilter(filter);
    setOpen(false);
  };

  const failureData = {
    title: "Failure Modes",
    description: "Failures you added for the barista robot.",
    items: [
      { id: "F01", name: "Communication Breakdown", note: "Misunderstandings between human and robot.", severity: "1" },
      { id: "F02", name: "Sensor Malfunction", note: "Robot sensors fail to detect human presence.", severity: "2" },
      { id: "F03", name: "Unexpected Human Behavior", note: "Humans act in ways not anticipated by the robot.", severity: "3" },
      { id: "F04", name: "Spillage", note: "Liquid spills during pouring.", severity: "3" },
      { id: "F05", name: "Underfill", note: "Container is not filled to the desired level.", severity: "2" },
      { id: "F06", name: "Overfill", note: "Container is filled beyond its capacity.", severity: "2" },
      { id: "F07", name: "Navigation Error", note: "Robot fails to navigate to the target location.", severity: "1" },
      { id: "F08", name: "Obstacle Collision", note: "Robot collides with obstacles in its path.", severity: "3" },
      { id: "F09", name: "Battery Depletion", note: "Robot runs out of power during operation.", severity: "2" },
    ],
  };

  const data = () => failureData;

  const handleSaveFailure = (newFailure) => {
    console.log("New failure added:", newFailure);
    // Here you would typically update your state or backend
    setIsAddFailureOpen(false);
  };

  const handleEditFailure = (editedFailure) => {
    console.log("Failure edited:", editedFailure);
    // Here you would typically update your state or backend
    setIsEditFailureOpen(false);
  }

  const filteredItems = () => {
    const sel = selectedFilter() || "All";
    const key = sel.replace(" ▼", "").trim();
    if (key.toLowerCase() === "all") return data().items;
    return data().items.filter((it) => it.severity && it.severity.toLowerCase() === key.toLowerCase());
  };

  return (
    <main class="font-sans items-center mx-auto">
      <div class="flex flex-col sm:flex-row place-content-between ">
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-2">
            <h2 class="text-lg sm:text-xl font-bold">{data().title}</h2>
            <Button
              onClick={() => setIsAddFailureOpen(true)}
              size="sm"
              class="w-6 h-6 flex items-center justify-center !rounded-full"
            >
              +
            </Button>
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

      <Table failureData={filteredItems()} isRating={false} />

      <Show when={isAddFailureOpen()}>
        <AddFailure
          onClose={() => setIsAddFailureOpen(false)}
          onSave={handleSaveFailure}
        />
      </Show>

      <Show when={isEditFailureOpen()}>
        <EditFailure
          onClose={() => setIsEditFailureOpen(false)}
          onSave={handleEditFailure}
        />
      </Show>
    </main>
  );
}