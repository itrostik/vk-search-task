export function debounce(callback: () => Promise<void>, timeoutMs: number) {
  let timeout: number;
  return function () {
    //здесь каждый раз мы очищаем предыдущий timeout и устанавливаем новый
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await callback();
    }, timeoutMs);
  };
}
