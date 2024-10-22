export function useLocalStorage() {

  const setInStorage = (key: string, value: unknown) => {
    const valueString = JSON.stringify(value)
    localStorage.setItem(key, valueString)
  }

  const getFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      const result = window.localStorage.getItem(key);

      if (!result) {
        return;
      }

      return JSON.parse(result);
    }
    return null;
  }

  const deleteFromStorage = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    setInStorage,
    getFromStorage,
    deleteFromStorage
  }
}