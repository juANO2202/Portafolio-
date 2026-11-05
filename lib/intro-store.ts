import { useSyncExternalStore } from "react";

/**
 * Estado global mínimo: ¿ya terminó la intro? El hero espera a este valor para empezar a animarse,
 * así su entrada ocurre a la vista y no detrás del telón.
 */
let done = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function finishIntro() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false,
  );
}
