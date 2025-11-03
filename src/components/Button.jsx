export default function Button({type, position, cont_w}) {
    const buttonPosition = position === "right" ? "flex justify-end mt-[20px]" : "flex justify-start mt-[20px]"
    const cont_width = cont_w ? cont_w : "w-full"
    return(
        <div class={`${buttonPosition} ${cont_width} `}>        
            <button class={`bg-[#266ACC] text-[#F6F8F6] w-[145px] h-[40px] rounded-lg cursor-pointer hover:bg-[#184079] font-medium`}>{type}</button>
        </div>
    )
} 