import { For, createSignal } from "solid-js"
import FailureDetailsModal from "./FailureDetailsModal";


export default function Table({failureData}) {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    return (
        <div className="flex flex-col gap-2 mb-[20px]">
            <span> Please review the items and adjust your final ratings </span>
            <div className="border-collapse">
                <For each={failureData}>
                    {(row) => (
                        <div 
                        onClick={() => setIsModalOpen(true)}
                        class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] place-content-between rounded-lg hover:shadow-md cursor-pointer">
                            <div class="text-left px-2 flex flex-col">
                                <strong class="text-black">{row.item}</strong>
                                <small class="text-[#666]">{row.subject}</small>
                            </div>
                            {/* <div class="text-left px-2 w-[200px]">{row.subject}</div> */}
                            <div class="flex flex-row gap-1 items-center">
                                <input placeholder={row.S} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                <input placeholder={row.O} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                <input placeholder={row.D} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                <input placeholder={row.E} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                            </div>
                        </div>
                    )}
                </For>

            </div>
            
            <Show when={isModalOpen()}>
                <FailureDetailsModal
                onClose={() => setIsModalOpen(false)}
                data={{
                    title: "Sample Failure",
                    phase: "Execution",
                    type: "Perception failure",
                    definition: "This is a sample definition of the failure mode. This is a sample definition of the failure mode. This is a sample definition of the failure mode.",
                    example: "For example, the robot fails to recognize an object. For example, the robot fails to recognize an object. For example, the robot fails to recognize an object.",
                }}
                />
            </Show>
        </div>
    )
}