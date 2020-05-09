export const setStorageItem = (key: string, data: any): void => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorageItem = (key: string): void => {
  return localStorage.removeItem(key);
};

export const getStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};
