import { createEffect, createResource, createSignal, onMount, Show } from "solid-js";
import { fetchMyProfile, updateMyProfile } from "~/lib/user";

export default function Profile() {
    // Always initialize with the shape you read
    const [profileData, setProfileData] = createSignal({
        id: null,
        occupation: "",
        experienceYears: null,
        expAI: "",
        expRobot: "",
    });

    const [editing, setEditing] = createSignal(false);
    const [saving, setSaving] = createSignal(false);
    const [error, setError] = createSignal(null);

    const [draft, setDraft] = createSignal({
        occupation: "",
        experienceYears: "",
        expAI: "",
        expRobot: "",
    });

    // Client-only gate
    const [ready, setReady] = createSignal(false);
    onMount(() => setReady(true));

    const [profile, { refetch: refetchProfile }] = createResource(
        ready,
        (isReady) => (isReady ? fetchMyProfile() : null),
        { initialValue: null }
    );

    // Sync resource -> profileData + draft (only when not editing)
    createEffect(() => {
        const p = profile();
        if (!p) return;

        setProfileData({
            id: p.id ?? null,
            occupation: p.occupation ?? "",
            experienceYears: p.experienceYears ?? null,
            expAI: p.expAI ?? "",
            expRobot: p.expRobot ?? "",
        });

        // Do not overwrite user's typing while editing
        if (!editing()) {
            setDraft({
                occupation: p.occupation ?? "",
                experienceYears: p.experienceYears != null ? String(p.experienceYears) : "",
                expAI: p.expAI ?? "",
                expRobot: p.expRobot ?? "",
            });
        }
    });

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setDraft((prev) => ({ ...prev, [name]: value }));
    };

    const startEdit = () => {
        setError(null);
        const p = profileData();
        setDraft({
            occupation: p.occupation ?? "",
            experienceYears: p.experienceYears != null ? String(p.experienceYears) : "",
            expAI: p.expAI ?? "",
            expRobot: p.expRobot ?? "",
        });
        setEditing(true);
    };

    const cancelEdit = () => {
        setError(null);
        const p = profileData();
        setDraft({
            occupation: p.occupation ?? "",
            experienceYears: p.experienceYears != null ? String(p.experienceYears) : "",
            expAI: p.expAI ?? "",
            expRobot: p.expRobot ?? "",
        });
        setEditing(false);
    };

    const saveEdit = async () => {
        setError(null);

        // Validate years
        const yearsRaw = draft().experienceYears;
        const years =
            yearsRaw === "" || yearsRaw == null ? null : Math.trunc(Number(yearsRaw));

        if (years !== null) {
            if (!Number.isFinite(years) || years < 0 || years > 60) {
                setError("Years of experience must be a number between 0 and 60.");
                return;
            }
        }

        const payload = {
            occupation: draft().occupation.trim() || null,
            experienceYears: years,
            expAI: draft().expAI.trim() || null,
            expRobot: draft().expRobot.trim() || null,
        };

        try {
            setSaving(true);
            await updateMyProfile(payload);
            await refetchProfile(); // pull DB truth
            setEditing(false);
        } catch (e) {
            if (e?.message === "NOT_AUTHENTICATED") {
                setError("Not authenticated. Please log in again.");
            } else {
                setError(e?.message || "Failed to save profile.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div class="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    class="bg-cover bg-center h-56 p-4"
                    style={{
                        "background-image":
                            "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop')",
                    }}
                >
                    <div class="flex justify-end gap-2">
                        <Show when={!editing()}>
                            <button
                                class="text-white text-xs font-bold rounded-lg bg-blue-500 px-3 py-2 hover:bg-blue-600 disabled:opacity-50"
                                onClick={startEdit}
                                disabled={!ready() || profile.loading}
                            >
                                Edit
                            </button>
                        </Show>

                        <Show when={editing()}>
                            <button
                                class="text-white text-xs font-bold rounded-lg bg-gray-600 px-3 py-2 hover:bg-gray-700 disabled:opacity-50"
                                onClick={cancelEdit}
                                disabled={saving()}
                            >
                                Cancel
                            </button>
                            <button
                                class="text-white text-xs font-bold rounded-lg bg-blue-500 px-3 py-2 hover:bg-blue-600 disabled:opacity-50"
                                onClick={saveEdit}
                                disabled={saving()}
                            >
                                {saving() ? "Saving…" : "Save"}
                            </button>
                        </Show>
                    </div>

                    <div class="flex items-center mt-4">
                        <img
                            class="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white"
                            src={"/image.png"}
                            alt="Avatar"
                        />
                        <div class="ml-4">
                            <h2 class="text-xl sm:text-2xl font-bold text-white">
                                {profileData().occupation || "Your Profile"}
                            </h2>
                        </div>
                    </div>
                </div>

                <div class="p-6">
                    <Show when={error()}>
                        <p class="text-sm text-red-600 mb-3">{error()}</p>
                    </Show>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h3 class="font-bold text-gray-800">Occupation</h3>

                            <Show
                                when={editing()}
                                fallback={<p class="text-gray-600">{profileData().occupation || "—"}</p>}
                            >
                                <input
                                    class="mt-2 w-full border border-gray-200 rounded-md p-2"
                                    name="occupation"
                                    value={draft().occupation}
                                    onInput={onChange}
                                    disabled={saving()}
                                />
                            </Show>
                        </div>

                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h3 class="font-bold text-gray-800">Years of Experience</h3>

                            <Show
                                when={editing()}
                                fallback={<p class="text-gray-600">{profileData().experienceYears ?? "—"}</p>}
                            >
                                <input
                                    class="mt-2 w-full border border-gray-200 rounded-md p-2"
                                    name="experienceYears"
                                    type="number"
                                    min="0"
                                    max="60"
                                    value={draft().experienceYears}
                                    onInput={onChange}
                                    disabled={saving()}
                                />
                            </Show>
                        </div>

                        <div class="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
                            <h3 class="font-bold text-gray-800">AI Experience</h3>

                            <Show
                                when={editing()}
                                fallback={<p class="text-gray-600 whitespace-pre-line">{profileData().expAI || "—"}</p>}
                            >
                                <textarea
                                    class="mt-2 w-full border border-gray-200 rounded-md p-2 min-h-[110px]"
                                    name="expAI"
                                    value={draft().expAI}
                                    onInput={onChange}
                                    disabled={saving()}
                                />
                            </Show>
                        </div>

                        <div class="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
                            <h3 class="font-bold text-gray-800">Robot Experience</h3>

                            <Show
                                when={editing()}
                                fallback={<p class="text-gray-600 whitespace-pre-line">{profileData().expRobot || "—"}</p>}
                            >
                                <textarea
                                    class="mt-2 w-full border border-gray-200 rounded-md p-2 min-h-[110px]"
                                    name="expRobot"
                                    value={draft().expRobot}
                                    onInput={onChange}
                                    disabled={saving()}
                                />
                            </Show>
                        </div>
                    </div>

                    <Show when={profile.loading}>
                        <p class="text-sm text-gray-500 mt-3">Loading profile…</p>
                    </Show>
                </div>
            </div>
        </div>
    );
}
