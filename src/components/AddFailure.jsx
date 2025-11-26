import { createEffect, createSignal, Show } from "solid-js";
import Button from "./Button";
import ImageModal from "./ImageModal";

const AddFailure = (props) => {
  // props: onClose(), onSave(formData)
  const [step, setStep] = createSignal(1);
  const [showImageModal, setShowImageModal] = createSignal(false);
  const [formData, setFormData] = createSignal({
    failureTitle: "",
    definition: "",
    description: "",
    steps: "",
    example: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData());
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

  const nextStep = () => {
    setStep(step() + 1);
  };

  const prevStep = () => {
    setStep(step() - 1);
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <button
          class="absolute right-3 top-2 cursor-pointer px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={props.onClose}
        >
          ✕
        </button>

        <h2 class="mb-4 text-lg font-semibold">Add new failure</h2>

        <Show when={step() === 1}>
          <div>
            <p class="mb-4">
              After watching the provided videos of MOBI performing the pouring
              tasks, please propose failure modes you believe could
              realistically occur. Each failure mode should be described
              independently. Please keep your descriptions clear and concise
              (approx. 3-5 sentences per field).
            </p>
            <div class="flex justify-end">
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        </Show>

        <Show when={step() === 2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            class="flex flex-col gap-3"
          >
            <div class="flex flex-col gap-1">
              <label for="failureTitle">Failure Title</label>
              <input
                type="text"
                name="failureTitle"
                id="failureTitle"
                value={formData().failureTitle}
                onInput={handleInputChange}
                placeholder=""
                class="rounded-md border border-gray-300 w-full pl-2"
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Show>

        <Show when={step() === 3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            class="flex flex-col gap-3"
          >
            <div class="flex flex-col gap-1">
              <label for="description">Detailed description:</label>
              <p class="text-sm text-gray-500">
                a. What happens during this failure?
                <br />
                b. Under which conditions would it occur?
                <br />
                c. What underlying factors might contribute to it?
              </p>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData().description}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 p-2"
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Show>

        <Show when={step() === 4}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            class="flex flex-col gap-3"
          >
            <div class="flex flex-col gap-1">
              <label for="steps">
                Which step(s) of the provided robot workflow does this failure
                affect? (Select from flowchart)?
              </label>
              <img
                src="/assets/images/flowchart.png"
                alt="Flowchart"
                class="my-4 cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />
              <input
                type="text"
                name="steps"
                id="steps"
                value={formData().steps}
                onInput={handleInputChange}
                placeholder=""
                class="rounded-md border border-gray-300 w-full pl-2"
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Show>

        <Show when={step() === 5}>
          <form onSubmit={handleSubmit} class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label for="example">
                Please provide a short example of a situation when such an error
                can occur.
              </label>
              <textarea
                id="example"
                name="example"
                rows="3"
                value={formData().example}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 p-2"
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary">
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Show>
      </div>
      <Show when={showImageModal()}>
        <ImageModal
          src="/assets/images/flowchart.png"
          onClose={() => setShowImageModal(false)}
        />
      </Show>
    </div>
  );
};

export default AddFailure;