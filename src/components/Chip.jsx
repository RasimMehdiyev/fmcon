import { createSignal } from "solid-js";
import { FaSolidPencil } from 'solid-icons/fa'

export default function Chip(props) {
  const [hovered, setHovered] = createSignal(false);

  const bgClass = () => {
      return "bg-[#b9ceeb] shadow-md"; // blue for other phases
  };

  const textClass = () => {
    if (hovered()) {
      return ["1", "2", "3"].includes(props.type)
        ? "text-black"
        : "text-white";
    }
    return "text-black";
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      class={`${props.class} ${bgClass()} ${textClass()} flex items-center justify-center hover:bg-[#9ab9e3]`}
    >
      <span>
        <FaSolidPencil />
      </span>
    </button>
  );
}
