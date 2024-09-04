export function useGetLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    const result = window.localStorage.getItem(key);

    if (!result) {
      return;
    }

    return JSON.parse(result);
  }

  return null;
}
