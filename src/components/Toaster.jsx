import { For } from "solid-js";
import { dismiss, useToasts } from "~/lib/toast";

const tone = (type) => {
  if (type === "success") return "bg-green-600";
  if (type === "error") return "bg-red-600";
  return "bg-gray-800";
};

export default function Toaster() {
  const toasts = useToasts();

  return (
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-[340px] pointer-events-none">
      <For each={toasts()}>
        {(t) => (
          <div class="pointer-events-auto">
            <div
              class={`relative overflow-hidden rounded-lg shadow-lg text-white px-4 py-3 ${tone(
                t.type
              )} animate-toast-in`}
            >
              <div class="flex items-start justify-between gap-3">
                <div class="text-sm leading-snug">
                  <div class="font-semibold">
                    {t.type === "success" ? "Success" : t.type === "error" ? "Error" : "Notice"}
                  </div>
                  <div class="mt-1">{t.message}</div>
                </div>

                <button
                  class="text-white/90 hover:text-white font-bold leading-none"
                  onClick={() => dismiss(t.id)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Progress bar */}
              <div class="absolute left-0 bottom-0 h-[3px] w-full bg-white/30">
                <div
                  class="h-full bg-white/80 animate-toast-progress origin-left"
                  style={{
                    "animation-duration": `${t.duration ?? 3500}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </For>

      {/* CSS animations (scoped) */}
      <style>
        {`
          @keyframes toastIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .animate-toast-in {
            animation: toastIn 220ms ease-out;
          }

          @keyframes toastProgress {
            from { transform: scaleX(1); }
            to   { transform: scaleX(0); }
          }
          .animate-toast-progress {
            animation-name: toastProgress;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    </div>
  );
}
