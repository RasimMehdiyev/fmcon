import { For } from "solid-js";
import { useLocation } from "@solidjs/router";

function detectModeFromPath(pathname = "/") {
  const lower = pathname.toLowerCase();
  if (lower.includes("/hri") || lower.includes("hri")) return "hri";
  if (lower.includes("/pour") || lower.includes("pour")) return "pour";
  if (lower.includes("/mobile") || lower.includes("mobile")) return "mobile";
  return "default";
}


export default function FailureModes() {
  const location = useLocation(); // SSR-consistent
  const mode = () => detectModeFromPath(location.pathname);

  const failureData = {
    hri: {
    title: "HRI Failure Modes",
    description: "Failures you added for human-robot interaction tasks.",
    items: [
        { id: "F01", name: "Communication Breakdown", note: "Misunderstandings between human and robot.", severity: "High" },
        { id: "F02", name: "Sensor Malfunction", note: "Robot sensors fail to detect human presence.", severity: "Medium" },
        { id: "F03", name: "Unexpected Human Behavior", note: "Humans act in ways not anticipated by the robot.", severity: "Low" },
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
}


  const data = () => failureData[mode()] || failureData["default"];
  return (
    <div style={{ "font-family": "system-ui, sans-serif", padding: "16px" }}>
      <h2>{data().title}</h2>
      <p style={{ color: "#555", "margin-top": "4px" }}>{data().description}</p>

      <div style={{ "margin-top": "12px" }}>
        <For each={data().items}>
          {(it) => (
            <div
              style={{
                border: "1px solid #e0e0e0",
                "border-radius": "6px",
                padding: "12px",
                "margin-bottom": "8px",
                display: "flex",
                "justify-content": "space-between",
                "align-items": "center",
                gap: "12px",
              }}
            >
              <div>
                <strong style={{ display: "block" }}>
                  {it.id} — {it.name}
                </strong>
                <small style={{ color: "#666" }}>{it.note}</small>
              </div>
                    <div
                    class={`px-3 py-1 rounded-xl font-semibold text-xs transition-all duration-200 transform hover:scale-125 hover:pb-2
                        ${
                        it.severity === "High"
                            ? "bg-[#ffebe6] text-[#9D1C06]"
                            : it.severity === "Medium"
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
    </div>
  );
}
