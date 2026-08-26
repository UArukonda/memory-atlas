import { useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  place: "",
  date: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useMemoryForm() {
  return useReducer(formReducer, initialState);
}
