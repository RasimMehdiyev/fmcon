import { createEffect } from "solid-js";

const ImageModal = (props) => {
  createEffect(() => {
    const onKey = (e) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={props.onClose}
    >
      <div class="relative">
        <button
          class="absolute -right-10 top-0 cursor-pointer px-2 py-1 text-white"
          onClick={props.onClose}
        >
          ✕
        </button>
        <img
          src={props.src}
          alt="Enlarged"
          class="max-h-[90vh] max-w-[90vw]"
        />
      </div>
    </div>
  );
};

export default ImageModal;