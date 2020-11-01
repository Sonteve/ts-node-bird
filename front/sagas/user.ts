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
        { nickname: "슬리프" },
        { nickname: "엄달" },
        { nickname: "아나테마" },
      ],
      Followers: [
        { nickname: "손티브" },
        { nickname: "바보" },
        { nickname: "손현준" },
      ],
      Posts: [],
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

export default function* userSaga() {
  yield takeLatest(LOG_IN_REQUEST, loginSaga);
  yield takeLatest(LOG_OUT_REQUEST, logoutSaga);
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
}
