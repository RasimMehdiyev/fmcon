import { For, createSignal } from "solid-js"
import FailureDetailsModal from "./FailureDetailsModal";


export default function Table(props) {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    return (
        <div className="flex flex-col gap-2 mb-[20px]">
            <span> Please review the items and adjust your final ratings </span>
                <div className="border-collapse">
                        <div 
                            class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] rounded-lg place-content-between bg-gray-200">
                            <div 
                                class="text-left px-2  w-[85%]  flex flex-col">
                                <p class="text-black font-bold">Item</p>
                                <small class="text-[#666]">Subject</small>
                            </div>
                            <div class="flex flex-row gap-1 items-center">
                                <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">S</p>
                                <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">O</p>
                                <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">D</p>
                                <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">E</p>
                                {
                                    props.isFinale && 
                                        <p class="text-center h-[30px] w-[40px] text-lg flex items-center justify-center font-bold">IQR</p>
                                }
                            </div>
                        </div>
                <For each={props.failureData}>
                    {(row) => (
                        <div 
                            class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] rounded-lg place-content-between hover:shadow-md cursor-pointer transition-shadow duration-200">
                            <div 
                                onClick={() => !props.isFinale && setIsModalOpen(true)}
                                class="text-left px-2  w-[85%]  flex flex-col">
                                <p class="text-black font-bold">{row.item}</p>
                                <small class="text-[#666]">{row.subject}</small>
                            </div>
                            <div class="flex flex-row gap-1 items-center">
                                {props.isFinale ? (
                                    <>
                                        <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0] flex items-center justify-center">{row.S ?? ''}</p>
                                        <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0] flex items-center justify-center">{row.O ?? ''}</p>
                                        <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0] flex items-center justify-center">{row.D ?? ''}</p>
                                        <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0] flex items-center justify-center">{row.E ?? ''}</p>
                                        <p class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0] flex items-center justify-center">{row.IQR ?? ''}</p>
                                    </>
                                ) : (
                                    <>
                                        <input placeholder={row.S} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                        <input placeholder={row.O} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                        <input placeholder={row.D} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                        <input placeholder={row.E} class="text-center h-[30px] w-[40px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"/>
                                    </>
                                )}
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