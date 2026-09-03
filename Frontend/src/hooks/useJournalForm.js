import { useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      if (action.payload) {
        return { ...action.payload, date: action.payload.date?.slice(0, 10) };
      }
      return initialState;
    default:
      return state;
  }
}

export function useJournalForm() {
  return useReducer(formReducer, initialState);
}
