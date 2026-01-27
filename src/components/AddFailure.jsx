import { Show, createEffect, createSignal, onMount, onCleanup } from "solid-js";
import Button from "./Button";
import ImageModal from "./ImageModal";

const STEP_OPTIONS = ["HRI", "Pour", "Mobile"];

const AddFailure = (props) => {
  const [step, setStep] = createSignal(1);
  const [showImageModal, setShowImageModal] = createSignal(false);

  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal(null);

  // Client-only gate
  const [ready, setReady] = createSignal(false);
  onMount(() => setReady(true));

  const [formData, setFormData] = createSignal({
    title: "",
    definition: "",
    stepsAffected: "",
    example: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (s) => {
    const d = formData();

    if (s === 2 && !d.title.trim()) return "Please enter a failure title.";
    if (s === 3 && !d.definition.trim()) return "Please enter a detailed description.";
    if (s === 4 && !d.stepsAffected) return "Please select which step is affected (HRI, Pour, or Mobile).";
    if (s === 5 && !d.example.trim()) return "Please provide a short example.";

    return null;
  };

  const nextStep = () => {
    setError(null);
    const msg = validateStep(step());
    if (msg) {
      setError(msg);
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const msg = validateStep(5);
    if (msg) {
      setError(msg);
      return;
    }

    const payload = {
      title: formData().title.trim(),
      definition: formData().definition.trim(),
      stepsAffected: formData().stepsAffected,
      example: formData().example.trim(),
    };

    try {
      setSaving(true);
      await props.onSave?.(payload);
      props.onClose?.();
    } catch (err) {
      const m =
        err?.message === "NOT_AUTHENTICATED"
          ? "Not authenticated. Please log in again."
          : err?.message || "Failed to submit failure.";
      setError(m);
    } finally {
      setSaving(false);
    }
  };

  createEffect(() => {
    // SSR-safe: only attach listeners on client
    if (typeof window === "undefined") return;

    const onKey = (e) => e.key === "Escape" && !saving() && props.onClose?.();
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <button
          class="absolute right-3 top-2 cursor-pointer px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
          onClick={() => props.onClose?.()}
          disabled={saving()}
        >
          ✕
        </button>

        <h2 class="mb-4 text-lg font-semibold">Add new failure</h2>

        <Show when={error()}>
          <p class="text-sm text-red-600 mb-3">{error()}</p>
        </Show>

        <Show when={step() === 1}>
          <div>
            <p class="mb-4">
              After watching the videos of MOBI performing the pouring tasks,
              please propose failure modes you believe could realistically occur.
              Each failure mode should be described independently. Please keep your
              descriptions clear and concise (approx. 3-5 sentences per field).
            </p>
            <div class="flex-col flex gap-1 mb-2">
              <iframe 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="w-full h-[190px]"
                src="https://www.youtube.com/embed/gcHi0ebrDps" frameborder="0"></iframe>
              <iframe 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="w-full h-[190px]"
                src="https://www.youtube.com/embed/YT722xtxg7k" frameborder="0"></iframe>
            </div>
            <div class="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={saving()}>
                Next
              </Button>
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
              <label for="title">Failure Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData().title}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 w-full pl-2"
                disabled={saving()}
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary" disabled={saving()}>
                Back
              </Button>
              <Button type="submit" disabled={saving()}>
                Next
              </Button>
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
              <label for="definition">Detailed description:</label>
              <p class="text-sm text-gray-500">
                a. What happens during this failure?
                <br />
                b. Under which conditions would it occur? Which internal or external factors contribute to this failure?
              </p>
              <textarea
                id="definition"
                name="definition"
                rows="5"
                value={formData().definition}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 p-2"
                disabled={saving()}
              />
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary" disabled={saving()}>
                Back
              </Button>
              <Button type="submit" disabled={saving()}>
                Next
              </Button>
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
              <label for="stepsAffected">
                Which step(s) of the provided robot workflow does this failure affect?
              </label>

              <img
                src="/assets/images/flowchart.png"
                alt="Flowchart"
                class="my-4 cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />

              <select
                id="stepsAffected"
                name="stepsAffected"
                value={formData().stepsAffected}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 w-full p-2"
                disabled={saving()}
              >
                <option value="" disabled>
                  Select one…
                </option>
                {STEP_OPTIONS.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary" disabled={saving()}>
                Back
              </Button>
              <Button type="submit" disabled={saving()}>
                Next
              </Button>
            </div>
          </form>
        </Show>

        <Show when={step() === 5}>
          <form onSubmit={handleSubmit} class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label for="example">
                Please provide a short example of a situation when such an error can occur.
              </label>
              <textarea
                id="example"
                name="example"
                rows="3"
                value={formData().example}
                onInput={handleInputChange}
                class="rounded-md border border-gray-300 p-2"
                disabled={saving()}
              />
            </div>

            <div class="flex justify-between">
              <Button onClick={prevStep} variant="secondary" disabled={saving()}>
                Back
              </Button>
              <Button type="submit" disabled={saving()}>
                {saving() ? "Submitting…" : "Submit"}
              </Button>
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
