import { For, createSignal, Show } from "solid-js";
import FailureDetailsModal from "./FailureDetailsModal";
import EditFailure from "./EditFailure";
import Chip from "./Chip";

export default function Table(props) {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [selectedFailure, setSelectedFailure] = createSignal(null);

  const headers = () => {
    if (props.isRating) {
      return ["S", "O", "D"];
    }
    return [];
  };

  const handleRowClick = (row) => {
    setSelectedFailure(row);
    setIsModalOpen(true);
  };

  return (
    <div class="flex flex-col mb-[20px] mt-3">
      <div class="border-collapse">
        <div class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] rounded-lg place-content-between bg-gray-200">
          <div class="text-left px-2 w-[85%] flex flex-col">
            <p class="text-black font-bold">Item</p>
            <small class="text-[#666]">Subject</small>
          </div>
          <Show when={props.isRating}>
            <div class="flex flex-row gap-1 items-center">
              <For each={headers()}>
                {(header) => (
                  <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">
                    {header}
                  </p>
                )}
              </For>
            </div>
          </Show>
        </div>
        <For each={props.failureData}>
          {(row) => (
            <div
              class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] rounded-lg place-content-between hover:shadow-md cursor-pointer transition-shadow duration-200"
              onClick={() => handleRowClick(row)}
            >
              <div class="text-left px-2 w-[85%] flex flex-col">
                <p class="text-black font-bold">{row.id || row.item}</p>
                <small class="text-[#666]">{row.name || row.subject}</small>
              </div>
              <Show when={props.isRating}>
                <div class="flex flex-row gap-1 items-center">
                  <input
                    placeholder={row.S}
                    class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                  />
                  <input
                    placeholder={row.O}
                    class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                  />
                  <input
                    placeholder={row.D}
                    class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                  />
                </div>
              </Show>
              <Show when={!props.isRating}>
                <Chip type={row.severity} class={"px-3 py-1 rounded-xl font-semibold text-xs transition-all duration-200 transform hover:scale-125 hover:pb-2 "} />
              </Show>
            </div>
          )}
        </For>
      </div>

      <Show when={isModalOpen() && props.isRating}>
        <FailureDetailsModal
          onClose={() => setIsModalOpen(false)}
          data={selectedFailure()}
        />
      </Show>
      <Show when={isModalOpen() && !props.isRating}>
        <EditFailure
          onClose={() => setIsModalOpen(false)}
          data={selectedFailure()}
        />
      </Show>
    </div>
  );
}