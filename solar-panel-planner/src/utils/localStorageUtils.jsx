// export const loadState = () => {
//   try {
//     if (localStorage.getItem("request") !== null) {
//       const serializedState = localStorage.getItem("request");
//       return JSON.parse(serializedState);
//     } 
//   } catch (err) {
//     console.error("Error loading state:", err);
//     return;
//   }
// };

// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("request", serializedState);
//   } catch (err) {
//     console.error("Error saving state:", err);
//   }
// };

// export const deleteState = () => {
//   try {
//     localStorage.removeItem("request");
//   } catch (err) {
//     console.error("Error saving state:", err);
//   }
// };
