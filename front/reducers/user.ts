import produce from "immer";
import { ActionType, createAction, createReducer } from "typesafe-actions";
import { LoginParam } from "../interface/user";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

export const loginAction = createAction(LOG_IN)<LoginParam>();
export const logoutAction = createAction(LOG_OUT)();

type UserAction = ActionType<typeof loginAction | typeof logoutAction>;

export interface UserState {
  isLoggedIn: boolean;
  me: LoginParam | null;
  signUpData: null;
  loginData: null;
}

const initialState: UserState = {
  isLoggedIn: false,
  me: null,
  signUpData: null,
  loginData: null,
};

const user = createReducer<UserState, UserAction>(initialState, {
  [LOG_IN]: (state, action) =>
    produce(state, (draft) => {
      draft.me = action.payload;
      draft.isLoggedIn = true;
    }),
  [LOG_OUT]: (state) =>
    produce(state, (draft) => {
      draft.me = null;
      draft.isLoggedIn = false;
    }),
});

export default user;
