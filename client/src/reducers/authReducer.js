export const initialState = {
  currentUser: null,
  token: "",
  loading: false,
  erroeMessage: null,
};

export const AuthReducer = (state, action) => {
  console.log("dispatch", action);
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        token: action.payload,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        erroeMessage: action.error,
      };
    case "REQUEST_REGISTER":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        token: action.payload,
        loading: false,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        loading: false,
        erroeMessage: action.error,
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: "",
        token: "",
      };
    default:
      return state;
  }
};
