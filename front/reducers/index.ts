import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

interface LoginParam {
  id: string;
  password: string;
}

export const loginAction = (data: LoginParam) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

export const changeNickname = (data: string) => {
  return { type: "CHANGE_NICKNAME", data };
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
