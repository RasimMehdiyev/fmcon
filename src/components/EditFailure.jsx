import { createEffect, createSignal } from "solid-js";

const EditFailure = (props) => {
  // props: onClose(), onSave(formData)
  const [formData, setFormData] = createSignal({
    failureTitle: "",
    definition: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSave?.(formData());
    setFormData({ failureTitle: "", definition: "" });
    props.onClose?.();
  };

  createEffect(() => {
    // close on ESC key
    const onKey = (e) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    });
    

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <button
          class="absolute right-3 top-2 cursor-pointer px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={props.onClose}
        >
          ✕
        </button>

        <h2 class="mb-4 text-lg font-semibold">Edit failure</h2>
        <form onSubmit={handleSubmit} class="flex flex-col gap-3">

          <div class="flex flex-col gap-1">
            <label for="failureTitle">Failure Title</label>
            <input type="text" placeholder="" class="rounded-md border border-gray-300 w-[200px] pl-2"/>
          </div>

          <div class="flex flex-col gap-1">
            <legend>What type of failure would you like to add?</legend>
            <div class="grid grid-cols-2 gap-1">
                <div>
                    <input type="radio" id="perception" name="failureType" value="text"/>
                    <label for="perception" class="ml-2">Perception failure</label>
                </div>

                <div>
                    <input type="radio" id="comm" name="failureType" value="text" class="ml-4"/>
                    <label for="comm" class="ml-2">Communication failure</label>
                </div>

                <div>
                    <input type="radio" id="hw" name="failureType" value="text" />
                    <label for="hw" class="ml-2">Hardware failure</label>
                </div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <legend>Which phase?</legend>
            <div class="grid grid-cols-2 gap-1">
                <div>
                    <input type="radio" id="hri" name="phase" value="text"/>
                    <label for="hri" class="ml-2">HRI</label>
                </div>

                <div>
                    <input type="radio" id="pour" name="phase" value="text" class="ml-4"/>
                    <label for="pour" class="ml-2">Pour</label>
                </div>

                <div>
                    <input type="radio" id="mobile" name="phase" value="text" />
                    <label for="mobile" class="ml-2">Mobile</label>
                </div>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label for="definition">Definition:</label>
            <textarea
              id="definition"
              name="definition"
              rows="3"
              value={formData().definition}
              onInput={handleInputChange}
              class="rounded-md border border-gray-300 p-2"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="definition">A short example:</label>
            <textarea
              id="example"
              name="example"
              rows="3"
              value={formData().definition}
              onInput={handleInputChange}
              class="rounded-md border border-gray-300 p-2"
            />
          </div>

          <button
            type="submit"
            class="rounded-md bg-[#266ACC] px-4 py-2 text-white hover:bg-[#1e56a6]"
          >
            Save Failure
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFailure;
