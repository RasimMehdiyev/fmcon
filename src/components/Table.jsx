import { For } from "solid-js"

export default function Table() {
    
    const failureData = [
        { item: "F01", subject: "Perception failure", S: 1, O: 4, D: 6, E: 8 },
        { item: "F02", subject: "Perception failure", S: 2, O: 5, D: 7, E: 9 },
        { item: "F03", subject: "Communication failure", S: 3, O: 6, D: 8, E: 10 },
        { item: "F04", subject: "Hardware failure", S: 4, O: 7, D: 9, E: 6 },
    ]
    
    
    return (
        <div className="flex flex-col gap-2 mb-[20px] items-center">
            <span> Please review the items and adjust your final ratings </span>
            <div className="w-[90%] border-collapse">
                <For each={failureData}>
                    {(row) => (
                        <div class="flex flex-row border-[1px] border-[#e0e0e0] p-[12px] mb-[8px] place-content-between rounded-lg">
                            <div class="text-left px-2 flex flex-col">
                                <strong class="text-black">{row.item}</strong>
                                <small class="text-[#666]">{row.subject}</small>
                            </div>
                            {/* <div class="text-left px-2 w-[200px]">{row.subject}</div> */}
                            <div class="flex flex-row gap-1">
                                <input placeholder={row.S} class="text-center w-[40px] bg-[#CED0D1] rounded-md text-lg"/>
                                <input placeholder={row.O} class="text-center w-[40px] bg-[#CED0D1] rounded-md text-lg"/>
                                <input placeholder={row.D} class="text-center w-[40px] bg-[#CED0D1] rounded-md text-lg"/>
                                <input placeholder={row.E} class="text-center w-[40px] bg-[#CED0D1] rounded-md text-lg"/>
                            </div>
                        </div>
                    )}
                </For>

            </div>
            
        </div>
    )
}