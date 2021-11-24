const INITIAL_STATE = {
  token: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: state.token,
      };
    default:
      return state;
  }
};
export default reducer;
