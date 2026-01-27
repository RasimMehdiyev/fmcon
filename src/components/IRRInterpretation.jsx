import { createMemo, Show } from "solid-js";
import InfoIcon from "./InfoIcon";

function band(v) {
    if (v == null || !Number.isFinite(v)) return "nodata";
    if (v >= 0.75) return "good";
    if (v >= 0.4) return "ok";
    return "bad";
}

function label(v) {
    if (v == null || !Number.isFinite(v)) return "No data";
    return v.toFixed(2);
}

function colorClass(b) {
    if (b === "good") return "border-green-400 bg-green-50 text-green-900";
    if (b === "ok") return "border-amber-400 bg-amber-50 text-amber-900";
    if (b === "bad") return "border-red-400 bg-red-50 text-red-900";
    return "border-gray-200 bg-gray-50 text-gray-600";
}

export default function IRRInterpretation(props) {
    // IMPORTANT: compute reactively
    const irrObj = createMemo(() => (props.irr && typeof props.irr === "object" ? props.irr : null));

    const s = createMemo(() => {
        const v = irrObj()?.severity;
        const n = v == null ? null : Number(v);
        return Number.isFinite(n) ? n : null;
    });

    const o = createMemo(() => {
        const v = irrObj()?.occurrence;
        const n = v == null ? null : Number(v);
        return Number.isFinite(n) ? n : null;
    });

    const d = createMemo(() => {
        const v = irrObj()?.detectability;
        const n = v == null ? null : Number(v);
        return Number.isFinite(n) ? n : null;
    });

    return (
        <div class="mt-4">
            <div class="flex flex-row">
                <h2 class="text-xl font-bold mb-2">Inter-rater Reliability Scores - How consistent were the raters?</h2>
                <InfoIcon title="How to read this">
                    <ul class="list-disc pl-5 space-y-1">
                        <li><span class="font-semibold text-green-700">Green</span>: people largely agreed on the scores.</li>
                        <li><span class="font-semibold text-amber-700">Amber</span>: some agreement, but treat results with caution.</li>
                        <li><span class="font-semibold text-red-700">Red</span>: inconsistent ratings; consider clarifying guidelines.</li>
                    </ul>
                </InfoIcon>
            </div>

            <Show when={irrObj()} fallback={
                <p class="text-gray-600">
                    No data. This tells you how much different people gave similar scores for the same failure modes.
                </p>
            }>
                <p class="text-gray-700 mb-4">
                    Higher values mean stronger agreement. Values near zero mean raters often disagreed.
                    Negative values mean agreement was worse than random chance.
                </p>

                <div class="grid grid-cols-1 gap-3">
                    <div class={`rounded-lg border p-4 ${colorClass(band(s()))}`}>
                        <div class="font-semibold">Severity (S)</div>
                        <div class="text-3xl font-bold mt-2">{label(s())}</div>
                        <div class="mt-2 text-sm">
                            <Show
                                when={s() != null}
                                fallback={"No data"}
                            >
                                {band(s()) === "good" && "Strong agreement on Severity."}
                                {band(s()) === "ok" && "Some agreement on Severity. Use with caution."}
                                {band(s()) === "bad" && "Low agreement on Severity. Consider clarifying the guidelines."}
                            </Show>
                        </div>
                    </div>

                    <div class={`rounded-lg border p-4 ${colorClass(band(o()))}`}>
                        <div class="font-semibold">Occurrence (O)</div>
                        <div class="text-3xl font-bold mt-2">{label(o())}</div>
                        <div class="mt-2 text-sm">
                            <Show
                                when={o() != null}
                                fallback={"No data"}
                            >
                                {band(o()) === "good" && "Strong agreement on Occurrence."}
                                {band(o()) === "ok" && "Some agreement on Occurrence. Use with caution."}
                                {band(o()) === "bad" && "Low agreement on Occurrence. Consider clarifying the guidelines."}
                            </Show>
                        </div>
                    </div>

                    <div class={`rounded-lg border p-4 ${colorClass(band(d()))}`}>
                        <div class="font-semibold">Detectability (D)</div>
                        <div class="text-3xl font-bold mt-2">{label(d())}</div>
                        <div class="mt-2 text-sm">
                            <Show
                                when={d() != null}
                                fallback={"No data"}
                            >
                                {band(d()) === "good" && "Strong agreement on Detectability."}
                                {band(d()) === "ok" && "Some agreement on Detectability. Use with caution."}
                                {band(d()) === "bad" && "Low agreement on Detectability. Consider clarifying the guidelines."}
                            </Show>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    );
}
