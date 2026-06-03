type Debounced<A extends unknown[]> = ((...args: A) => void) & {
  cancel: () => void;
};

// Minimal debounce: trailing-edge call after `wait` ms idle. `.cancel()` drops any pending call (used to stop a preview write from racing a restore).
export default function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  wait: number,
): Debounced<A> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: A) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      func(...args);
    }, wait);
  };
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = undefined;
  };
  return debounced;
}
