import { createSignal, createEffect, onCleanup, Show } from "solid-js";

export default function ImageModal(props) {
  const [scale, setScale] = createSignal(1);

  // Run when "open" changes
  createEffect(() => {
    if (!props.open()) {
      setScale(1);
      return;
    }
    const onKey = (e) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  return (
    <Show when={props.open()}>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={props.onClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          class="bg-white rounded shadow-lg max-w-[96vw] max-h-[96vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="flex items-center justify-between p-2">
            <div class="w-full flex gap-2 flex-row items-center place-content-end">
              <button
                class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)))}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))}
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                onClick={props.onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div class="p-4 flex items-center justify-center">
            <div class="max-w-[88vw] max-h-[80vh] overflow-auto">
              <img
                src={props.src}
                alt={props.alt ?? ""}
                style={{ "transform": `scale(${scale()})`, "transform-origin": "center" }}
                class="block max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
