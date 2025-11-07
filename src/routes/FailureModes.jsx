import { For, createSignal, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import Button from "~/components/Button";
import AddFailure from "~/components/AddFailure";
import EditFailure from "~/components/EditFailure";


function detectModeFromPath(pathname = "/") {
  const lower = pathname.toLowerCase();
  if (lower.includes("/hri") || lower.includes("hri")) return "hri";
  if (lower.includes("/pour") || lower.includes("pour")) return "pour";
  if (lower.includes("/mobile") || lower.includes("mobile")) return "mobile";
  return "default";
}

export default function FailureModes() {
  const location = useLocation();
  const mode = () => detectModeFromPath(location.pathname);
  const [isAddFailureOpen, setIsAddFailureOpen] = createSignal(false);
  const [isEditFailureOpen, setIsEditFailureOpen] = createSignal(false);
  const [selectedFilter, setSelectedFilter] = createSignal("All ▼");
  const [open, setOpen] = createSignal(false);

  const select = (filter) => {
    setSelectedFilter(filter);
    setOpen(false);
  };

  const failureData = {
    hri: {
      title: "HRI Failure Modes",
      description: "Failures you added for human-robot interaction tasks.",
      items: [
        { id: "F01", name: "Communication Breakdown", note: "Misunderstandings between human and robot.", severity: "Communication" },
        { id: "F02", name: "Sensor Malfunction", note: "Robot sensors fail to detect human presence.", severity: "Hardware" },
        { id: "F03", name: "Unexpected Human Behavior", note: "Humans act in ways not anticipated by the robot.", severity: "Perception" },
      ],
    },
    pour: {
      title: "Pour Failure Modes",
      description: "Failures you added for pouring tasks.",
      items: [
        { id: "F04", name: "Spillage", note: "Liquid spills during pouring.", severity: "High" },
        { id: "F05", name: "Underfill", note: "Container is not filled to the desired level.", severity: "Medium" },
        { id: "F06", name: "Overfill", note: "Container is filled beyond its capacity.", severity: "Low" },
      ],
    },
    mobile: {
      title: "Mobile Failure Modes",
      description: "Failures you added for mobile robot tasks.",
      items: [
        { id: "F07", name: "Navigation Error", note: "Robot fails to navigate to the target location.", severity: "High" },
        { id: "F08", name: "Obstacle Collision", note: "Robot collides with obstacles in its path.", severity: "Medium" },
        { id: "F09", name: "Battery Depletion", note: "Robot runs out of power during operation.", severity: "Low" },
      ],
    },
  };

  const data = () => failureData[mode()] || failureData["default"];

  const handleSaveFailure = (newFailure) => {
    console.log("New failure added:", newFailure);
    setIsAddFailureOpen(false);
  };

  const handleEditFailure = (editedFailure) => {
    console.log("Failure edited:", editedFailure);
    setIsEditFailureOpen(false);
  }

  const filteredItems = () => {
    const sel = selectedFilter() || "All";
    const key = sel.replace(" ▼", "").trim();
    if (key.toLowerCase() === "all") return data().items;
    return data().items.filter((it) => it.severity && it.severity.toLowerCase() === key.toLowerCase());
  };

  return (
    <div class="font-sans p-4 items-center mx-auto w-[90%]">
      <div class="flex flex-row place-content-between">
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-3">
            <h2 class="text-xl font-bold w-[350px]">{data().title}</h2>
            <Button
              onClick={() => setIsAddFailureOpen(true)}
              type="+"
              bfcolor="text-white"
              bc="bg-gray-500"
              bh="h-[20px]"
              bw="w-[20px]"
              bch="hover:bg-gray-600"
              bfont="text-[14px]"
            />
          </div>
          <p class="text-gray-600 mt-1">{data().description}</p>
        </div>

        <div class="flex flex-row place-content-between items-center gap-2">
          <input type="text" placeholder="Search" class="border-1 border-gray-200 rounded-md pl-3 h-[40px]" />
          <div class="relative">
            <button
              onClick={() => setOpen(!open())}
              class="bg-[#266ACC] text-white px-3 h-[40px] rounded-md"
            >
              {selectedFilter()}
            </button>

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

      <div class="mt-3">
        <For each={filteredItems()}>
          {(it) => (
            <div 
              onClick = {() => setIsEditFailureOpen(true) }
              class="border border-gray-200 rounded-md p-3 mb-2 flex justify-between items-center gap-3 hover:shadow-md cursor-pointer transition-shadow duration-200">
              <div>
                <strong class="block">
                  {it.id} — {it.name}
                </strong>
                <small class="text-gray-500 text-sm">{it.note}</small>
              </div>
              <div
                class={`px-3 py-1 rounded-xl font-semibold text-xs transition-all duration-200 transform hover:scale-125 hover:pb-2 ${
                  it.severity === "Hardware"
                    ? "bg-[#ffebe6] text-[#9D1C06]"
                    : it.severity === "Perception"
                    ? "bg-[#fff4e5] text-[#6A4A00]"
                    : "bg-[#eef7ff] text-[#044C8C]"
                }`}
              >
                {it.severity}
              </div>
            </div>
          )}
        </For>
      </div>

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
    </div>
  );
}
