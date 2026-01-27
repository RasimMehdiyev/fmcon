import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { apiLogin } from "~/lib/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [uuid, setUuid] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiLogin(uuid().trim(), password());
      navigate("/");
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ "max-width": "520px", margin: "40px auto", padding: "16px" }}>
      <h1 style={{ "font-size": "20px", "margin-bottom": "12px" }}>
        Login
      </h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: "10px" }}>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>UUID</span>
          <input
            value={uuid()}
            onInput={(e) => setUuid(e.currentTarget.value)}
            autocomplete="username"
            required
            style={{ padding: "8px", "font-size": "14px" }}
          />
        </label>

        <label style={{ display: "grid", gap: "6px" }}>
          <span>Password</span>
          <input
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            autocomplete="current-password"
            required
            style={{ padding: "8px", "font-size": "14px" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading()}
          style={{ padding: "10px", "font-size": "14px", cursor: "pointer" }}
        >
          {loading() ? "Logging in..." : "Login"}
        </button>

        <Show when={error()}>
          <div style={{ color: "crimson", "white-space": "pre-wrap" }}>
            {error()}
          </div>
        </Show>
      </form>
    </div>
  );
}