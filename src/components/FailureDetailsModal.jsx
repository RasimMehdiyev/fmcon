import { createEffect, createSignal } from "solid-js";


const FailureDetailsModal = (props) => {
  // props: onClose(), onSave(formData)
  const [formData, setFormData] = createSignal({
    failureTitle: "",
    definition: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     props.onSave?.(formData());
//     setFormData({ failureTitle: "", definition: "" });
//     props.onClose?.();
//   };

  createEffect(() => {
    // close on ESC key
    const onKey = (e) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    });
    

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mx-auto ">
      <div class="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <button
          class="absolute right-3 top-2 cursor-pointer px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={props.onClose}
        >
          ✕
        </button>

        <h2 class="mb-4 text-lg font-semibold">Failure details</h2>
        <div class="flex flex-col gap-3">

          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg" >
            <p class="font-bold">{props.data.title}</p>
            <p class="mt-[-5px] text-xs text-gray-400">{props.data.phase} — {props.data.type}</p>
          </div>

          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg">
            <p><b>Definition: </b>{props.data.definition}</p>
          </div>

          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg">
            <p><b>Example:</b> {props.data.example}</p>
          </div>

          <button
            type="submit"
            class="hidden rounded-md bg-[#266ACC] px-4 py-2 text-white hover:bg-[#1e56a6]"
          >
            Save Failure
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureDetailsModal;
