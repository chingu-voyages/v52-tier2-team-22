export const loadState = (key) => {
  try {
    if (localStorage.getItem(key) !== null) {
      const serializedState = localStorage.getItem(key);
      return JSON.parse(serializedState);
    } 
  } catch (err) {
    console.error("Error loading state:", err);
    return;
  }
};

export const saveState = (state, key) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

export const deleteState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};
