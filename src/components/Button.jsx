export default function Button({type, onClick, position, cont_w, bfcolor="text-[#F6F8F6]" , bw = 'w-[145px]', bh = "h-[40px]", bc = 'bg-[#266ACC]', bch="hover:bg-[#184079]" , bfont="text-lg"}) {
    
    const buttonPosition = position === "right" ? "flex justify-end mt-[20px]" : "flex justify-start"
    const cont_width = cont_w ? cont_w : "w-full"
    return(
        <div class={`${buttonPosition} ${cont_width}`}>        
            <button onClick={onClick} class={`${bc} ${bfont} ${bfcolor} ${bw} ${bh} rounded-lg cursor-pointer ${bch} font-medium text-center transition-colors duration-200`}>{type}</button>
        </div>
    )
} 