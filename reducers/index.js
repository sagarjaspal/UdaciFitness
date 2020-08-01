import { SET_ENTRIES, ADD_ENTRY } from "../actions";

const entries = (state = {}, action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return {
        ...state,
        ...action.entries,
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry,
      };
    default:
      return state;
  }
};

export default entries;
