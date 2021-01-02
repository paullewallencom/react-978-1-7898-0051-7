import { GET_MOVIES, START_FETCHING_MOVIES } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  movies: null,
  page: 1,
  maxPage: null,
  CATEGORY_FOLDER: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_MOVIES:
      return { ...state, loading: true };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload.movies,
        page: action.payload.page,
        maxPage: action.payload.maxPage,
        CATEGORY_FOLDER: action.payload.CATEGORY_FOLDER,
        loading: false
      };
    default:
      return state;
  }
};
