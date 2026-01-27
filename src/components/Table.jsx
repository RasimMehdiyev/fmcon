import { For, createSignal, Show, createEffect } from "solid-js";
import FailureDetailsModal from "./FailureDetailsModal";
import RankFailures from "./RankFailures";
import Chip from "./Chip";

export default function Table(props) {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [selectedFailure, setSelectedFailure] = createSignal(null);
  const hasIRR = () => props.mode === "finale" && props.irr;
  const headers = () => (props.mode ? ["S", "O", "D"] : []);

  const handleRowClick = (row) => {
    setSelectedFailure(row);
    setIsModalOpen(true);
    props.onRowClick?.(row);
  };
  
  const ratingByFailureId = () => {
    const map = new Map();
    for (const r of props.ratingData ?? []) {
      map.set(Number(r.failure_id), r);
    }
    return map;
  };

  const selectedRating = () =>
    selectedFailure() ? ratingByFailureId().get(Number(selectedFailure().id)) : null;

  const rowValues = (row) => {
    if (props.getRowValues) return props.getRowValues(row);

    if (props.mode === "finale") {
      const stats = ratingByFailureId().get(Number(row.id));
      return {
        S: stats?.severity?.avg ?? "",
        O: stats?.occurrence?.avg ?? "",
        D: stats?.detectability?.avg ?? "",
      };
    }

    if (props.mode === "round2") {
      const myRating = ratingByFailureId().get(Number(row.id));
      return {
        S: myRating?.severity ?? "",
        O: myRating?.occurrence ?? "",
        D: myRating?.detectability ?? "",
      };
    }

    return { S: "", O: "", D: "" };
  };

  // Use the same grid template for header and rows
  // Col1: Failure mode + step
  // Col2: Definition
  // Col3: S/O/D OR Chip/Edit column
  const gridClass = () => {
    if (props.mode) {
      return "grid grid-cols-[320px_1fr_140px] items-center gap-6";
    }
    return "grid grid-cols-[320px_1fr_140px] items-center gap-6";
  };

  const definitionClass =
    "text-left text-gray-700 text-sm leading-snug overflow-hidden " +
    "break-words"; 

  return (
    <div class="flex flex-col mb-[20px] mt-3">
      <div class="border-collapse">
        {/* HEADER */}
        <div class={`border-[1px] mt-[20px] border-[#e0e0e0] p-[12px] mb-[6px] rounded-lg bg-gray-200 ${gridClass()}`}>
          <div class="text-left px-2 flex flex-col">
            <p class="text-black font-bold">Failure mode</p>
            <small class="text-[#666]">Affected step</small>
          </div>

          <div class="text-left font-bold">Definition</div>

          <div class="flex flex-col items-center justify-center">
              <Show when={!!props.mode}>
                <Show when={props.mode === "finale"}><p class="pl-[5px]"><b>Average</b></p></Show>
                <div class="flex flex-row justify-end gap-1">
                  <For each={headers()}>
                    {(h) => (
                      <p class="w-[40px] text-center text-lg font-bold">{h}</p>
                    )}
                  </For>
                </div>
              </Show>
           
            <Show when={!props.mode}>
              <div class="w-[140px]" />
            </Show>
          </div>

        </div>

        {/* ROWS */}
        <For each={props.failureData || []}>
          {(row) => {
            const v = () => rowValues(row);

            return (
              <div
                class={`bg-white border-[1px] border-[#e0e0e0] p-[12px] mb-[6px] rounded-lg hover:shadow-md cursor-pointer transition-shadow duration-200 ${gridClass()}`}
                onClick={() => handleRowClick(row)}
              >
                {/* LEFT COLUMN */}
                <div class="text-left px-2 flex flex-col min-w-0">
                  <p class="text-black font-bold truncate">{row.title}</p>
                  <small class="text-[#666]">{row.stepsAffected}</small>
                </div>

                {/* MIDDLE COLUMN */}
                <div class="min-w-0">
                  <div class={definitionClass}>
                    {/* Use slice, not trim */}
                    {(row.definition ?? "").toString().slice(0, 180)}
                    {(row.definition ?? "").length > 180 ? "…" : ""}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div class="flex flex-row justify-end gap-1 items-center">
                  <Show when={props.mode === "finale"}>
                    <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {typeof v().S === "number" ? v().S.toFixed(2) : v().S}
                    </p>
                    <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {typeof v().O === "number" ? v().O.toFixed(2) : v().O}
                    </p>
                    <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {typeof v().D === "number" ? v().D.toFixed(2) : v().D}
                    </p>
                  </Show>

                  <Show when={props.mode === "round2"}>
                    <p class="text-center h-[30px] w-[40px] bg-white rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {v().S}
                    </p>
                    <p class="text-center h-[30px] w-[40px] bg-white rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {v().O}
                    </p>
                    <p class="text-center h-[30px] w-[40px] bg-white rounded-md text-base border-[1px] border-[#e0e0e0] flex items-center justify-center">
                      {v().D}
                    </p>
                  </Show>

                  <Show when={!props.mode}>
                    <div class="w-[140px] flex justify-end">
                      <Chip
                        type={row.severity}
                        class="px-3 py-1 rounded-xl font-semibold text-xs transition-all duration-200 transform hover:scale-110"
                      />
                    </div>
                  </Show>
                </div>
              </div>
            );
          }}
        </For>
      </div>

      <Show when={isModalOpen() && props.mode === "round2"}>
        <RankFailures
          onClose={() => setIsModalOpen(false)}
          data={selectedFailure()}
          userId={props.userId}
          onSave={(saved) => props.onSave?.(saved)}
          initialRating={selectedRating()}
        />
      </Show>

      <Show when={isModalOpen() && props.mode === "finale"}>
        <FailureDetailsModal
          onClose={() => setIsModalOpen(false)}
          data={selectedFailure()}
        />
      </Show>

    </div>
  );
}
