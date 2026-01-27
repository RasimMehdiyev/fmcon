import { createEffect, createSignal, onCleanup } from "solid-js";

const STEP_OPTIONS = ["HRI", "Pour", "Mobile"];

const EditFailure = (props) => {
  // props:
  // - data: existing failure { id, title, definition, stepsAffected, example }
  // - onClose()
  // - onSave(payload)  <-- should return a Promise if it does API update
  const [deleting, setDeleting] = createSignal(false);
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal(null);

  // Initialize once from props.data (and keep synced when opening a different item)
  const initFromProps = () => ({
    title: props.data?.title ?? "",
    definition: props.data?.definition ?? "",
    stepsAffected: props.data?.stepsAffected ?? "HRI",
    example: props.data?.example ?? "",
  });

  const [formData, setFormData] = createSignal(initFromProps());

  createEffect(() => {
    // If props.data changes while the modal is mounted, re-init the form
    setFormData(initFromProps());
    setError(null);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const d = formData();

    const title = (d.title ?? "").trim();
    const definition = (d.definition ?? "").trim();
    const stepsAffected = d.stepsAffected;
    const example = (d.example ?? "").trim();

    if (!props.data?.id) {
      setError("Missing failure id.");
      return;
    }
    if (!title) {
      setError("Please provide a failure title.");
      return;
    }
    if (!definition) {
      setError("Please provide a definition.");
      return;
    }
    if (!STEP_OPTIONS.includes(stepsAffected)) {
      setError("stepsAffected must be one of: HRI, Pour, Mobile.");
      return;
    }
    if (!example) {
      setError("Please provide an example.");
      return;
    }

    const payload = {
      id: props.data.id,
      title,
      definition,
      stepsAffected,
      example,
    };

    try {
      setSaving(true);
      await props.onSave?.(payload);
      props.onClose?.();
    } catch (err) {
      const msg =
        err?.message === "NOT_AUTHENTICATED"
          ? "Not authenticated. Please log in again."
          : err?.message || "Failed to save failure.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setError(null);

    const id = formData().id;
    if (!id) {
      setError("Missing failure id.");
      return;
    }

    const ok = window.confirm("Delete this failure? This cannot be undone.");
    if (!ok) return;

    try {
      setDeleting(true);
      await props.onDelete?.(id);

      // close modal after successful delete
      props.onClose?.();
    } catch (e2) {
      setError(e2?.message || "Failed to delete failure.");
    } finally {
      setDeleting(false);
    }
  };

  createEffect(() => {
    if (typeof window === "undefined") return;

    const onKey = (e) => {
      if (e.key === "Escape" && !saving()) props.onClose?.();
    };

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

        <h2 class="mb-4 text-lg font-semibold">Edit failure</h2>

        {error() && <p class="text-sm text-red-600 mb-3">{error()}</p>}

        <form onSubmit={handleSubmit} class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label for="title">Failure Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData().title}
              onInput={handleInputChange}
              class="rounded-md border border-gray-300 w-full pl-2 h-[40px]"
              disabled={saving()}
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="stepsAffected">Step affected</label>
            <select
              id="stepsAffected"
              name="stepsAffected"
              value={formData().stepsAffected}
              onInput={handleInputChange}
              class="rounded-md border border-gray-300 w-full p-2 bg-white"
              disabled={saving()}
            >
              {STEP_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label for="definition">Definition</label>
            <textarea
              id="definition"
              name="definition"
              rows="4"
              value={formData().definition}
              onInput={handleInputChange}
              class="rounded-md border border-gray-300 p-2"
              disabled={saving()}
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="example">A short example</label>
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

          <div class="flex flex-row justify-between">
            <button
              type="submit"
              class="rounded-md bg-[#266ACC] px-4 py-2 text-white hover:bg-[#1e56a6] disabled:opacity-50"
              disabled={saving()}
            >
              {saving() ? "Saving…" : "Save Failure"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              class="rounded-md bg-[#cc2626] px-4 py-2 text-white hover:bg-[#8a1919] disabled:opacity-50"
              disabled={saving() || deleting()}
            >
              {deleting() ? "Deleting…" : "Delete Failure"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFailure;
