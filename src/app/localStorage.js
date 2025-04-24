// src/app/localStorage.js
export const loadState = () => {
    try {
      const serialized = localStorage.getItem('cryptoState');
      return serialized ? JSON.parse(serialized) : undefined;
    } catch { return undefined; }
  };
  export const saveState = state => {
    try {
      localStorage.setItem('cryptoState', JSON.stringify(state));
    } catch {}
  };
  