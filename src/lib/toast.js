import { createSignal } from "solid-js";

let _id = 1;

const [toasts, setToasts] = createSignal([]);

function push(type, message, opts = {}) {
  const id = _id++;
  const duration = opts.duration ?? 3500;

  setToasts((prev) => [...prev, { id, type, message }]);

  if (duration > 0) {
    setTimeout(() => dismiss(id), duration);
  }
  return id;
}

export function dismiss(id) {
  setToasts((prev) => prev.filter((t) => t.id !== id));
}

export function useToasts() {
  return toasts;
}

export const toast = {
  success: (msg, opts) => push("success", msg, opts),
  error: (msg, opts) => push("error", msg, opts),
  info: (msg, opts) => push("info", msg, opts),
};
