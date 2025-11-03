import { createSignal } from "solid-js";

export default function Chip({ phase = "text" }) {
    const [hovered, setHovered] = createSignal(false);

    return (
        <button
            onClick={() => alert(`You clicked on ${phase}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`group w-[170px] rounded-md h-[40px] text-center text-lg cursor-pointer flex items-center justify-center transition-colors duration-200 ${
                hovered() ? "bg-[#266ACC]" : "bg-[#CED0D1]"
            }`}
        >
            {hovered() ? (
                <span className="duration-200 ease-in-out text-white text-4xl pb-2">
                    +
                </span>
            ) : (
                <span className="duration-200 ease-in-out">
                    {phase}
                </span>
            )}
        </button>
    );
}