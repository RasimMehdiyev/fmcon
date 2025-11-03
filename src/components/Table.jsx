export default function Table() {
    return(
        <div class="flex flex-col gap-2 mb-[20px] ">
            <span> Please review the items and adjust your final ratings </span>
            <div class="w-[100%] h-auto  flex flex-col">
                        <div class="mx-[250px] h-[60px] bg-[#F6F8F6] border-1 border-gray-300 flex flex-row place-content-between items-center px-4">
                            <p class="text-xl font-medium">Item</p>
                            <p class="text-xl font-medium">Subject</p>
                            <div class="flex flex-row gap-2 ">
                                <p class="text-xl w-[30px] font-medium">S</p>
                                <p class="text-xl w-[30px] font-medium">O</p>
                                <p class="text-xl w-[30px] font-medium">D</p>
                                <p class="text-xl w-[30px] font-medium">E</p>
                            </div>
                        </div>
                        <div class="mx-[250px] h-[60px] bg-gray-50 border-1 border-gray-300 flex flex-row place-content-between items-center px-4">
                            <p class="text-lg">Failure mode 1</p>
                            <p class="pr-[70px] text-lg">Perception failure</p>
                            <div class="flex flex-row gap-1 pr-3 items-center">
                                <input placeholder="4" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="5" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="3" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="2" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                            </div>
                        </div>
                        <div class="mx-[250px] h-[60px] bg-gray-50 border-1 border-gray-300 flex flex-row place-content-between items-center px-4">
                            <p class="text-lg">Failure mode 2</p>
                            <p class="pr-[70px] text-lg">Perception failure</p>
                            <div class="flex flex-row gap-1 pr-3 items-center">
                                <input placeholder="4" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="5" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="3" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="2" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                            </div>
                        </div>
                        <div class="mx-[250px] h-[60px] bg-gray-50 border-1 border-gray-300 flex flex-row place-content-between items-center px-4">
                            <p class="text-lg">Failure mode 3</p>
                            <p class="pr-[70px] text-lg">Communication failure</p>
                            <div class="flex flex-row gap-1 pr-3 items-center">
                                <input placeholder="4" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="5" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="3" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="2" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                            </div>
                        </div>
                        <div class="mx-[250px] h-[60px] bg-gray-50 border-1 border-gray-300 flex flex-row place-content-between items-center px-4">
                            <p class="text-lg">Failure mode 4</p>
                            <p class="pr-[70px] text-lg">Hardware failure</p>
                            <div class="flex flex-row gap-1 pr-3 items-center">
                                <input placeholder="4" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="5" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="3" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                <input placeholder="2" class="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                            </div>
                        </div>
                </div>
        </div>
        
    )
}