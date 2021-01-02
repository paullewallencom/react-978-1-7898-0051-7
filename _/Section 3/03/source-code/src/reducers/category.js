import { START_FETCHING_CATEGORIES } from "../actions/types";

const INITIAL_STATE = {
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      return { ...state, loading: true };
    default:
      return state;
  }
};
