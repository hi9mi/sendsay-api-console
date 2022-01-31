const setLocalStorage = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = <T>(key: string) => {
  const data = window.localStorage.getItem(key);

  if (data) {
    return JSON.parse(data) as T;
  }

  return null;
};

export {setLocalStorage, getLocalStorage};
