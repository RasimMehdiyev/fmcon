import { createEffect, createSignal, onCleanup  } from "solid-js";
import { upsertRating } from "~/lib/ratings";

const clampInt = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  const i = Math.trunc(n);
  if (i < 1 || i > 10) return null;
  return i;
};

const RankFailures = (props) => {
  const [formData, setFormData] = createSignal({
    severity: "",
    occurrence: "",
    detectability: "",
  });

  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal(null);

  createEffect(() => {
    const fid = props?.data?.id;
    const r = props?.initialRating;

    if (!fid) return;

    setFormData({
      severity: r?.severity != null ? String(r.severity) : "",
      occurrence: r?.occurrence != null ? String(r.occurrence) : "",
      detectability: r?.detectability != null ? String(r.detectability) : "",
    });

    setError(null);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const severity = clampInt(formData().severity);
    const occurrence = clampInt(formData().occurrence);
    const detectability = clampInt(formData().detectability);

    if (severity == null || occurrence == null || detectability == null) {
      setError("Please enter S, O, and D as integers from 1 to 10.");
      return;
    }

    if (!props?.data?.id) {
      setError("Missing failure id.");
      return;
    }

    const payload = {
      failure_id: props.data.id,
      severity,
      occurrence,
      detectability,
    };

    try {
      setSaving(true);
      const saved = await upsertRating(payload);

      props.onSave?.(saved);
      props.onClose?.();
    } catch (err) {
      let msg;
      if (err?.message === "NOT_AUTHENTICATED") msg = "Not authenticated. Please log in again.";
      else if (err?.message === "INVALID_JSON_FROM_UPSERT") msg = "Server returned an invalid response.";
      else msg = err?.message || "Failed to save rating.";
      setError(msg);
      console.log(msg);
    } finally {
      setSaving(false);
    }
  };

  // ESC handling: avoid registering multiple listeners over time
  createEffect(() => {
    const onKey = (e) => e.key === "Escape" && props.onClose?.();
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });


  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mx-auto">
      <div class="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <button
          class="absolute right-3 top-2 cursor-pointer px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={() => props.onClose?.()}
          disabled={saving()}
        >
          ✕
        </button>

        <h2 class="mb-4 text-lg font-semibold">Add rating</h2>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg">
            <p class="font-bold">{props.data?.title}</p>
            <p class="mt-[-5px] text-xs text-gray-400">{props.data?.stepsAffected}</p>
          </div>

          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg">
            <p><b>Definition: </b>{props.data?.definition}</p>
          </div>

          <div class="flex flex-col gap-1 border-1 border-gray-200 p-2 rounded-lg">
            <p><b>Example:</b> {props.data?.example}</p>
          </div>

          <div class="flex flex-row gap-4 justify-center mt-2">
            <div class="flex flex-col items-center">
              <label class="text-xs font-semibold mb-1">Severity</label>
              <input
                name="severity"
                type="number"
                min="1"
                max="10"
                value={formData().severity}
                onInput={handleInputChange}
                class="text-center h-[36px] w-[60px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                disabled={saving()}
              />
            </div>

            <div class="flex flex-col items-center">
              <label class="text-xs font-semibold mb-1">Occurrence</label>
              <input
                name="occurrence"
                type="number"
                min="1"
                max="10"
                value={formData().occurrence}
                onInput={handleInputChange}
                class="text-center h-[36px] w-[60px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                disabled={saving()}
              />
            </div>

            <div class="flex flex-col items-center">
              <label class="text-xs font-semibold mb-1">Detectability</label>
              <input
                name="detectability"
                type="number"
                min="1"
                max="10"
                value={formData().detectability}
                onInput={handleInputChange}
                class="text-center h-[36px] w-[60px] bg-[#ECF0F1] rounded-md text-lg border-[1px] border-[#e0e0e0]"
                disabled={saving()}
              />
            </div>
          </div>

          {error() && (
            <p class="text-sm text-red-600 mt-1">{error()}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            class="rounded-md bg-[#266ACC] px-4 py-2 text-white hover:bg-[#1e56a6] mt-4 disabled:opacity-50"
            disabled={saving()}
          >
            {saving() ? "Saving…" : "Save Rating"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankFailures;
