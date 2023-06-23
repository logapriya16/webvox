export const postReducer = (state, action) => {
  switch (action.type) {
    case "loading_post":
      return { ...state, isPostLoading: action.payload };
    case "set_post":
      return { ...state, allpost: action.payload };
    case "set_bookmarks":
      return { ...state };
    default:
      return state;
  }
};
