import { createSignal, Index, onCleanup, onMount, Switch, Match  } from "solid-js";

import { clientOnly } from "@solidjs/start";

const FlashCard = clientOnly(() => import("./FlashCard"));
const CriteriaTabs = clientOnly(() => import("./CriteriaTabs"));

export default function RoundCarousel(props) {
  const [activeIdx, setActiveIdx] = createSignal(0);

  const goPrev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIdx((i) => Math.min(props.rounds.length - 1, i + 1));

  onMount(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    onCleanup(() => window.removeEventListener("keydown", onKeyDown));
  });

  const active = () => props.rounds[activeIdx()];

  return (
    <div class="max-w-3xl ">
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm text-gray-600">
          {activeIdx() + 1} / {props.rounds.length}
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIdx() === 0}
            class={[
              "px-3 py-1.5 rounded-lg text-sm border",
              activeIdx() === 0
                ? "bg-gray-100 text-gray-400 border-gray-200 !cursor-not-allowed"
                : "bg-white hover:bg-gray-50 border-gray-300",
            ].join(" ")}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIdx() === props.rounds.length - 1}
            class={[
              "px-3 py-1.5 rounded-lg text-sm border",
              activeIdx() === props.rounds.length - 1
                ? "bg-gray-100 text-gray-400 border-gray-200 !cursor-not-allowed"
                : "bg-white hover:bg-gray-50 border-gray-300",
            ].join(" ")}
          >
            Next
          </button>
        </div>
      </div>

      <div class="flex gap-2 mb-3 flex-wrap">
        <Index each={props.rounds}>
          {(r, idx) => (
            <button
              type="button"
              onClick={() => setActiveIdx(idx)}  // <-- idx is a number
              class={[
                "text-xs px-2 py-1 rounded-full border transition  cursor-pointer",
                idx === activeIdx()
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {r().title}
            </button>
          )}
        </Index>
      </div>

      <FlashCard title={active().title} subtitle={active().subtitle}>
        <div class="space-y-4 text-sm text-gray-700">
          <p>{active().text}</p>

          <Switch>
            <Match when={active().id === "r2"}>
              <CriteriaTabs />
            </Match>
          </Switch>
        </div>
      </FlashCard>
    </div>
  );
}
