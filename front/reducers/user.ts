import { AxiosError } from "axios";
import produce from "immer";
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import { Post } from "../interface/post";
import { LoginParam, SignupParam, UserData } from "../interface/user";
import { removePost } from "./post";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const addPostToMe = createAction(ADD_POST_TO_ME)<Post>();

export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
export const removePostOfMe = createAction(REMOVE_POST_OF_ME)<{ id: number }>();

export const loginAction = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<LoginParam, UserData, AxiosError>();

export const logoutAction = createAsyncAction(
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
)<undefined, undefined, AxiosError>();

export const signupAction = createAsyncAction(
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
)<SignupParam, undefined, AxiosError>();

export const changeNicknameAction = createAsyncAction(
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE
)<string, string, AxiosError>();

type UserAction = ActionType<
  | typeof loginAction
  | typeof logoutAction
  | typeof signupAction
  | typeof addPostToMe
  | typeof changeNicknameAction
  | typeof removePostOfMe
>;
//f8901c8f24b809bc5cfe8eb80ea72569
export interface UserState {
  me: UserData | null;
  signUpData: null;
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: AxiosError | null;
  logOutLoading: boolean; // 로그인 시도중
  logOutDone: boolean;
  logOutError: AxiosError | null;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: AxiosError | null;
  changeNicknameLoading: boolean; // 회원가입 시도중
  changeNicknameDone: boolean;
  changeNicknameError: AxiosError | null;
  followLoading: boolean; // 회원가입 시도중
  followDone: boolean;
  followError: AxiosError | null;
  unfollowLoading: boolean; // 회원가입 시도중
  unfollowDone: boolean;
  unfollowError: AxiosError | null;
}

const initialState: UserState = {
  me: null,
  signUpData: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그인 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 회원가입 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
};

const user = createReducer<UserState, UserAction>(initialState, {
  [LOG_IN_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
    }),
  [LOG_IN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.me = action.payload;
      draft.logInLoading = false;
      draft.logInDone = true;
    }),
  [LOG_IN_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.logInLoading = false;
      draft.logInError = action.payload;
    }),
  [LOG_OUT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
    }),
  [LOG_OUT_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
    }),
  [LOG_OUT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.logOutLoading = false;
      draft.logOutError = action.payload;
    }),
  [SIGN_UP_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
    }),
  [SIGN_UP_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.signUpLoading = false;
      draft.signUpDone = true;
    }),
  [SIGN_UP_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.signUpLoading = false;
      draft.signUpError = action.payload;
    }),
  [ADD_POST_TO_ME]: (state, action) =>
    produce(state, (draft) => {
      if (!draft.me) return;
      draft.me.Posts.unshift(action.payload);
    }),
  [REMOVE_POST_OF_ME]: (state, action) =>
    produce(state, (draft) => {
      if (!draft.me) return;
      const index = draft.me.Posts.findIndex(
        (post) => post.id === action.payload.id
      );
      draft.me.Posts.splice(index, 1);
    }),
  [CHANGE_NICKNAME_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
    }),
  [CHANGE_NICKNAME_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      if (!draft.me) return;
      draft.me.nickname = action.payload;
    }),
  [CHANGE_NICKNAME_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.payload;
    }),
  /* [FOLLOW_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
    }),
  [FOLLOW_SUCCESS]: (state, { payload: data }) =>
    produce(state, (draft) => {
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: data.UserId });
    }),
  [FOLLOW_FAILURE]: (state, { error }) =>
    produce(state, (draft) => {
      draft.followLoading = false;
      draft.followError = error;
    }),
  [UNFOLLOW_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
    }),
  [UNFOLLOW_SUCCESS]: (state, { payload: data }) =>
    produce(state, (draft) => {
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      const index = draft.me.Followings.findIndex((v) => v.id === data.UserId);
      draft.me.Followings.splice(index, 1);
    }),
  [UNFOLLOW_FAILURE]: (state, { error }) =>
    produce(state, (draft) => {
      draft.unfollowLoading = false;
      draft.unfollowError = error;
    }), */
});

export default user;
