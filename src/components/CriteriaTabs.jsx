import { createSignal, Index } from "solid-js";
import LevelRow from "./LevelRow";

export default function CriteriaTabs() {
  const criteria = [
    {
      id: "severity",
      title: "Severity",
      description:
        "How severe would the impact of this failure mode be on MOBI's performance and user experience?",
      levels: [
        {
          label: "Low Severity",
          tone: "border-green-500",
          text: "The robot spills a few drops of coffee on the counter, or underfills the glass slightly.",
        },
        {
          label: "Medium Severity",
          tone: "border-yellow-500",
          text: "The robot knocks over an empty glass (no breakage). Requires a full restart of the task",
        },
        {
          label: "High Severity",
          tone: "border-red-500",
          text: "The robot drops and shatters a glass or pours hot liquid onto a user’s hand. This requires immediate emergency intervention and poses a risk of physical injury.",
        },
      ],
    },
    {
      id: "occurrence",
      title: "Occurrence Frequency",
      description: "How often do you think this failure mode would occur in real-world scenarios?",
      levels: [
        {
          label: "Rare",
          tone: "border-green-500",
          text: "A failure that might happen once a year or even more, e.g., the gripper mechanism snapping in half due to metal fatigue.",
        },
        {
          label: "Occasional",
          tone: "border-yellow-500",
          text: "A failure that occurs often enough to be annoying, but does not stop operations (e.g., once every 50 pours), e.g., the robot struggles to grasp a wet bottle on the first try.",
        },
        {
          label: "Often",
          tone: "border-red-500",
          text: "A failure that happens almost every time a specific condition met, e.g., every time light is dim, the robot misjudges the glass height.",
        },
      ],
    },
    {
      id: "detectability",
      title: "Detectability Difficulty",
      description: "How hard is it to detect this failure before or during execution?",
      levels: [
        {
          label: "Obvious",
          tone: "border-green-500",
          text: "Something a human watching the robot would immediately notice, e.g., the bottle visibly slipping from the gripper for 2 seconds before falling.",
        },
        {
          label: "Subtle",
          tone: "border-yellow-500",
          text: "A casual observer might miss it, but an experience barista would notice, e.g., the angle of the bottle is 5 degrees off.",
        },
        {
          label: "No warning signs",
          tone: "border-red-500",
          text: "Everything looks perfect, e.g., the glass looks fine, then suddenly shatters (thermal shock). If a human can't see it coming, the robot’s RGB-D camera likely can't either.",
        },
      ],
    },
  ];

  const [openId, setOpenId] = createSignal(criteria[0].id);
  const active = () => criteria.find((c) => c.id === openId()) || criteria[0];

  return (
    <div class="space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Index each={criteria}>
          {(c) => (
            <button
              type="button"
              onClick={() => setOpenId(c().id)}   // <-- c is an accessor in <Index>
              class={[
                "text-left rounded-xl border p-3 transition",
                openId() === c().id
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              <div class="font-semibold text-sm">{c().title}</div>
              <div
                class={[
                  "text-xs mt-1",
                  openId() === c().id ? "text-gray-200" : "text-gray-600",
                ].join(" ")}
              >
                Tap to view levels and examples
              </div>
            </button>
          )}
        </Index>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 class="font-semibold text-base text-gray-900">{active().title}</h3>
        <p class="text-sm text-gray-700 mt-1">{active().description}</p>

        <div class="mt-4 space-y-3">
          <Index each={active().levels}>
            {(lvl) => (
              <LevelRow
              label={() => lvl().label}
              tone={() => lvl().tone}
              text={() => lvl().text}
            />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
}
