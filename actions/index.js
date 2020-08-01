export const SET_ENTRIES = "SET_ENTRIES";
export const ADD_ENTRY = "ADD_ENTRY";

export const setEntries = (entries) => ({
  type: SET_ENTRIES,
  entries,
});

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
});
