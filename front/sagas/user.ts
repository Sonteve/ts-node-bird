import { call, delay, put, takeLatest } from "redux-saga/effects";
import { LoginParam } from "../interface/user";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  loginAction,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  logoutAction,
  signupAction,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  CHANGE_NICKNAME_REQUEST,
  changeNicknameAction,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  followAction,
  unfollowAction,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";
import { ActionType } from "typesafe-actions";

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

function* loginSaga(action: ReturnType<typeof loginAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    const dummyUser = {
      nickname: "sonteve",
      id: 1,
      Followings: [
        { id: "asd", nickname: "슬리프" },
        { id: "zv", nickname: "엄달" },
        { id: "qqw", nickname: "아나테마" },
      ],
      Followers: [
        { id: "mng", nickname: "손티브" },
        { id: "sdsa", nickname: "바보" },
        { id: "vkfmn", nickname: "손현준" },
      ],
      Posts: [{ id: 1 }],
    };
    yield put({
      type: LOG_IN_SUCCESS,
      payload: dummyUser,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

function* logoutSaga(action: ActionType<typeof logoutAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

function* signUpSaga(action: ActionType<typeof signupAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

function* changeNicknameSaga(
  action: ActionType<typeof changeNicknameAction.request>
) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* followSaga(action: ActionType<typeof followAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(500);
    yield put({
      type: FOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollowSaga(action: ActionType<typeof unfollowAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(500);
    yield put({
      type: UNFOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

export default function* userSaga() {
  yield takeLatest(LOG_IN_REQUEST, loginSaga);
  yield takeLatest(LOG_OUT_REQUEST, logoutSaga);
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNicknameSaga);
  yield takeLatest(FOLLOW_REQUEST, followSaga);
  yield takeLatest(UNFOLLOW_REQUEST, unfollowSaga);
}
