import { createSignal } from "solid-js";

export default function Chip({ phase }) {
  const [hovered, setHovered] = createSignal(false);

  const bgClass = () => {
    if (hovered()) {
      switch (phase.toLowerCase()) {
        case "pour":
          return "bg-[#A3E6AC] shadow-md"; // light green
        case "hri":
          return "bg-[#AF8AFF] shadow-md";
        case "mobile":
          return "bg-[#F67F65] shadow-md"; // light pink
        default:
          return "bg-[#266ACC] shadow-md"; // blue for other phases
      }
    }
    return "bg-[#CED0D1]"; // default gray when not hovered
  };

  const textClass = () => {
    if (hovered()) {
      return ["pour", "hri", "mobile"].includes(phase.toLowerCase())
        ? "text-black"
        : "text-white";
    }
    return "text-black";
  };

  return (
    <button
      onClick={() => (window.location.href = "/" + phase.toLowerCase())}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      class={`hover:shadow-md group w-[170px] rounded-md h-[40px] text-center text-lg cursor-pointer flex items-center justify-center transition-colors duration-200 ${bgClass()}`}
    >
      <span
        class={`duration-200 ease-in-out ${
          hovered() ? `${textClass()} text-4xl pb-2` : "text-black"
        }`}
      >
        {hovered() ? "→" : phase.toUpperCase()}
      </span>
    </button>
  );
}
