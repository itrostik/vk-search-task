export function debounce(callback: () => Promise<void>, timeoutMs: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await callback();
    }, timeoutMs);
  };
}
